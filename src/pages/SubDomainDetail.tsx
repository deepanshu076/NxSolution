import { useEffect, useMemo, useState } from "react";
import { Play, ArrowRight, Cpu, Wifi, Monitor, Layers } from "lucide-react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import type { Domain, Solution, Subdomain } from "@/src/types";
import { getDomainBySlug } from "@/src/services/domains.service";
import { listSubdomains } from "@/src/services/subdomains.service";
import { listSolutionsBySubdomain } from "@/src/services/solutions.service";
import { domains as constantDomains } from "@/src/constants/domains";
import { solutionsData } from "@/src/constants/solutions";

type DetailItem = {
  title: string;
  desc: string;
  image: string;
};

type EnrichedSolution = Solution & {
  localChallenges?: DetailItem[];
  localLayers?: DetailItem[];
};

const defaultChallengeImage =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200";
const defaultLayerImage =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200";

function normalizeYoutubeUrl(url: string) {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (short?.[1]) return `https://www.youtube.com/embed/${short[1]}`;
  const watch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watch?.[1]) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
}

function fallbackDetails(solution: EnrichedSolution) {
  const title = solution.title;
  return {
    challenges: [
      {
        title: `${title}: Visibility Gap`,
        desc: "Manual processes create blind spots and delayed decisions in this subdomain.",
        image: defaultChallengeImage,
      },
      {
        title: `${title}: Response Delay`,
        desc: "Without automation, incident response and compliance handling become inconsistent.",
        image: defaultChallengeImage,
      },
      {
        title: `${title}: Data Fragmentation`,
        desc: "Operational data remains siloed and difficult to act on in real-time.",
        image: defaultChallengeImage,
      },
    ],
    layers: [
      {
        title: "Live Monitoring Layer",
        desc: "Central dashboard and event visibility for continuous operations.",
        image: defaultLayerImage,
      },
      {
        title: "Automation Layer",
        desc: "Rule-based triggers for proactive actions and faster interventions.",
        image: defaultLayerImage,
      },
      {
        title: "Analytics Layer",
        desc: "Actionable insights and optimization recommendations from captured events.",
        image: defaultLayerImage,
      },
    ],
  };
}

export default function SubDomainDetail() {
  const { domain, subdomain } = useParams();
  const [domainData, setDomainData] = useState<Domain | null>(null);
  const [subdomainData, setSubdomainData] = useState<Subdomain | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [activeSolutionId, setActiveSolutionId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!domain || !subdomain) {
        setError("Subdomain not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const domainRow = await getDomainBySlug(domain);
        const subdomainRows = await listSubdomains(domainRow.id, true);
        const subdomainRow = subdomainRows.find(
          (row) => (row.slug || "").toLowerCase() === subdomain.toLowerCase(),
        );

        if (!subdomainRow) {
          throw new Error("Subdomain not found.");
        }

        const solutionRows = await listSolutionsBySubdomain(subdomainRow.id, true);
        setDomainData(domainRow);
        setSubdomainData(subdomainRow);
        setSolutions(solutionRows);
      } catch (err) {
        const constantDomain = constantDomains.find((item) => item.id === domain);
        const constantSubdomainName = (constantDomain?.subdomains ?? []).find(
          (item) =>
            item
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") === subdomain,
        );

        if (constantDomain && constantSubdomainName) {
          setDomainData({
            id: constantDomain.id,
            slug: constantDomain.id,
            name: constantDomain.name,
            description: constantDomain.description ?? null,
            icon: null,
            color: constantDomain.color ?? null,
            image_url: constantDomain.image ?? null,
            order_index: 0,
            is_active: true,
            created_at: null,
            updated_at: null,
          });
          setSubdomainData({
            id: `${constantDomain.id}-${subdomain}`,
            domain_id: constantDomain.id,
            name: constantSubdomainName,
            slug: subdomain,
            description: null,
            icon: null,
            order_index: 0,
            is_active: true,
            created_at: null,
            updated_at: null,
          });
          setSolutions([]);
        } else {
          setError(
            err instanceof Error ? err.message : "Unable to load subdomain page.",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [domain, subdomain]);

  const mergedSolutions = useMemo(() => {
    const constantFallback = solutionsData
      .filter((item) => item.subdomainSlug === subdomain)
      .map((item, index) => ({
        id: `constant-${item.id}-${index}`,
        domain_id: domainData?.id ?? null,
        subdomain_id: subdomainData?.id ?? null,
        title: item.name,
        slug: item.slug,
        description: item.description ?? null,
        video_url: item.videoUrl ?? null,
        thumbnail_url: null,
        tags: item.features ?? null,
        is_active: true,
        order_index: index,
        created_at: null,
        updated_at: null,
        localChallenges: [
          {
            title: "Access Bottlenecks",
            desc: "Legacy processes slow down user movement and approvals.",
            image: defaultChallengeImage,
          },
          {
            title: "Security Blind Spots",
            desc: "Limited observability increases operational risk.",
            image: defaultChallengeImage,
          },
          {
            title: "No Actionable Insights",
            desc: "Data exists but does not support timely decisions.",
            image: defaultChallengeImage,
          },
        ],
        localLayers: [
          {
            title: "Sensing Layer",
            desc: "Capture live data from entry points and movement events.",
            image: defaultLayerImage,
          },
          {
            title: "Control Layer",
            desc: "Automated policies enforce security and workflow rules.",
            image: defaultLayerImage,
          },
          {
            title: "Intelligence Layer",
            desc: "Operational insights help improve efficiency continuously.",
            image: defaultLayerImage,
          },
        ],
      })) as EnrichedSolution[];

    const db = solutions.map((item) => item as EnrichedSolution);
    const map = new Map<string, EnrichedSolution>();
    for (const item of constantFallback) map.set(item.slug, item);
    for (const item of db) map.set(item.slug, item);
    return Array.from(map.values());
  }, [domainData?.id, solutions, subdomain, subdomainData?.id]);

  useEffect(() => {
    if (mergedSolutions.length === 0) {
      setActiveSolutionId(null);
      setIsPlaying(false);
      setActiveChallenge(0);
      setActiveLayer(0);
      return;
    }

    const currentExists = mergedSolutions.some(
      (solution) => solution.id === activeSolutionId,
    );

    if (!activeSolutionId || !currentExists) {
      setActiveSolutionId(mergedSolutions[0].id);
      setIsPlaying(false);
      setActiveChallenge(0);
      setActiveLayer(0);
    }
  }, [activeSolutionId, mergedSolutions]);

  const activeSolution = useMemo(
    () =>
      mergedSolutions.find((solution) => solution.id === activeSolutionId) ??
      null,
    [activeSolutionId, mergedSolutions],
  );

  const featuredSolution = activeSolution ?? mergedSolutions[0] ?? null;
  const activeVideo = normalizeYoutubeUrl(featuredSolution?.video_url ?? "");
  const activeDetails = featuredSolution
    ? {
        challenges:
          featuredSolution.localChallenges ??
          fallbackDetails(featuredSolution).challenges,
        layers:
          featuredSolution.localLayers ?? fallbackDetails(featuredSolution).layers,
      }
    : {
        challenges: [
          {
            title: "No solution selected",
            desc: "Pick a solution above to view the video, challenges, and implementation layers.",
            image: defaultChallengeImage,
          },
          {
            title: "Add a solution in DB",
            desc: "A database row or solution constant will populate this area automatically.",
            image: defaultChallengeImage,
          },
          {
            title: "Fallback content ready",
            desc: "The page still renders the complete UI so the subdomain never feels blank.",
            image: defaultChallengeImage,
          },
        ],
        layers: [
          {
            title: "Video Layer",
            desc: "Shows the solution video from the database or solutions.ts.",
            image: defaultLayerImage,
          },
          {
            title: "Challenge Layer",
            desc: "Explains the operational problem solved by the selected subdomain.",
            image: defaultLayerImage,
          },
          {
            title: "Insight Layer",
            desc: "Summarizes the implementation and automation value.",
            image: defaultLayerImage,
          },
        ],
      };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <p className="text-slate-blue/60">Loading subdomain...</p>
      </div>
    );
  }

  if (error || !domainData || !subdomainData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-blue">Subdomain not found</h2>
          <p className="mt-2 text-slate-blue/60">{error ?? "Please try again."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-20">
      <section className="relative min-h-[400px] md:min-h-[500px] bg-brand-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/80 to-brand-black" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-[10px] md:text-xs font-bold text-accent-sky tracking-[.3em] uppercase">
            {domainData.name}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold text-pure-white uppercase tracking-tight">
            {subdomainData.name}
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-pure-white/70 text-sm md:text-base">
            {subdomainData.description ??
              "Targeted solutions and media are managed from admin with DB + constants merged."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-pure-white">
        <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-xl md:text-2xl font-display font-black text-brand-black uppercase tracking-wider">
              Targeted Solutions
            </h2>
          </div>

          {mergedSolutions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cool-gray/30 bg-light-gray/30 px-6 py-12 text-center text-slate-blue/55">
              No targeted solutions available yet.
            </div>
          ) : (
            <>
              <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4">
                {mergedSolutions.map((solution) => (
                  <button
                    key={solution.id}
                    onClick={() => {
                      setActiveSolutionId(solution.id);
                      setIsPlaying(false);
                      setActiveChallenge(0);
                      setActiveLayer(0);
                    }}
                    className={`text-left relative flex-shrink-0 w-72 md:w-80 rounded-2xl p-5 border transition-all ${
                      solution.id === activeSolutionId
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="h-28 rounded-xl overflow-hidden bg-slate-100 mb-4">
                      {solution.thumbnail_url ? (
                        <img
                          src={solution.thumbnail_url}
                          alt={solution.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                          No thumbnail
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-brand-black">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-blue/60 line-clamp-2">
                      {solution.description ?? "No description provided."}
                    </p>
                  </button>
                ))}
              </div>

              <section className="pt-10">
                <div className="relative w-full max-w-4xl mx-auto aspect-video bg-brand-black rounded-[2rem] overflow-hidden border-[6px] border-pure-white shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
                  {isPlaying && activeVideo && featuredSolution ? (
                    <iframe
                      src={`${activeVideo}${activeVideo.includes("?") ? "&" : "?"}autoplay=1`}
                      title={featuredSolution.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {featuredSolution?.thumbnail_url ? (
                        <img
                          src={featuredSolution.thumbnail_url}
                          alt={featuredSolution.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-65"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-brand-black" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent" />
                      {activeVideo && featuredSolution ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-600/30"
                          >
                            <Play size={28} className="ml-1 fill-white" />
                          </button>
                        </div>
                      ) : null}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white font-black text-xl md:text-2xl">
                          {featuredSolution?.title ?? "No solution selected"}
                        </h3>
                        <p className="mt-2 text-pure-white/75 text-sm">
                          {featuredSolution?.description ?? "Pick a solution above to view its video and details."}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#F4F5F7] rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-[2rem] p-3 shadow-sm h-[380px] lg:h-[460px]">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`challenge-${activeChallenge}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={activeDetails.challenges[activeChallenge].image}
                    alt={activeDetails.challenges[activeChallenge].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 border border-white/20">
                  <p className="text-white text-xs font-black uppercase tracking-widest mb-1">
                    Impact Area
                  </p>
                  <p className="text-white/95 text-sm font-medium leading-tight">
                    {activeDetails.challenges[activeChallenge].title}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-sky mb-3">
                The Problem
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-black text-[#1A1F2B] uppercase mb-6">
                The Challenges
              </h2>
              <div className="space-y-3">
                {activeDetails.challenges.map((challenge, i) => (
                  <button
                    key={`${challenge.title}-${i}`}
                    onClick={() => setActiveChallenge(i)}
                    className={`w-full text-left p-5 rounded-2xl transition-all ${
                      activeChallenge === i
                        ? "bg-white shadow-md border-l-4 border-accent-sky"
                        : "bg-white/70 border border-slate-200/60 hover:shadow-sm"
                    }`}
                  >
                    <h3 className="text-sm md:text-base font-bold text-[#1A1F2B] mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {challenge.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#F8F9FB] border border-slate-100 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-[2rem] p-3 shadow-sm h-[380px] lg:h-[460px] order-2 lg:order-1">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`layer-${activeLayer}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={activeDetails.layers[activeLayer].image}
                    alt={activeDetails.layers[activeLayer].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 border border-white/20">
                  <p className="text-white/80 text-[9px] font-black uppercase tracking-[0.3em] mb-1">
                    Integrated Tech Layer
                  </p>
                  <p className="text-white font-medium text-sm leading-tight">
                    {activeDetails.layers[activeLayer].title}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-sky mb-3">
                The Solution
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-black text-[#1A1F2B] uppercase mb-6">
                Engineered Intelligence Layer
              </h2>
              <div className="space-y-3">
                {activeDetails.layers.map((layer, i) => (
                  <button
                    key={`${layer.title}-${i}`}
                    onClick={() => setActiveLayer(i)}
                    className={`w-full text-left p-5 rounded-2xl transition-all ${
                      activeLayer === i
                        ? "bg-white shadow-md border-l-4 border-accent-sky"
                        : "bg-white/70 border border-slate-200/60 hover:shadow-sm"
                    }`}
                  >
                    <h3 className="text-sm md:text-base font-bold text-[#1A1F2B] mb-1">
                      {layer.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {layer.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F2EE]">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[9px] md:text-xs font-black text-[#8D6E63] uppercase tracking-[0.3em] mb-3">
              Tech Stack
            </span>
            <h2 className="text-xl md:text-3xl font-display font-black text-brand-black uppercase tracking-tight">
              Core Hardware & Software
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
            {[
              { name: "Node-S Sensors", icon: Cpu },
              { name: "IQ Dashboard", icon: Monitor },
              { name: "Hub-Z Controller", icon: Layers },
              { name: "Comms-X Gateway", icon: Wifi },
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-white border border-[#E0Dcd5] p-6 md:p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#8D6E63]/5 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-[#F9F7F5] shadow-sm flex items-center justify-center mb-6 border border-[#E0Dcd5]">
                  <tech.icon size={22} className="text-[#8D6E63]/60" />
                </div>
                <h4 className="text-sm md:text-base font-black text-brand-black mb-1">
                  {tech.name}
                </h4>
                <span className="text-[8px] font-black text-[#8D6E63] uppercase tracking-widest">
                  Enterprise
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="bg-brand-black text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all hover:bg-slate-800 hover:shadow-2xl hover:shadow-black/20 group">
              Consult with Solutions Architect
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
