import { motion } from "motion/react";
import {
  Building2,
  Factory,
  Stethoscope,
  ShoppingBag,
  Truck,
  Hotel,
  Home as HomeIcon,
  Landmark,
  ArrowUpRight,
  ShieldAlert,
  Cctv,
  Building,
  BarChart3,
  Fingerprint,
  UserCheck,
  Zap,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { domains } from "../constants/domains";
import type { Domain } from "@/src/types";
import { listDomains } from "@/src/services/domains.service";
import PageHero from "../components/ui/PageHero";

const solutions = [
  {
    name: "Smart Access Systems",
    image: "/images/smart access system.jpeg",
    description: "Multi-layered entry control using AI facial recognition and secure encrypted RFID systems for total facility security.",
    features: ["Biometric", "RFID", "Cloud Control"],
    icon: <Fingerprint size={32} strokeWidth={1.5} />
  },
  {
    name: "Attendance Systems",
    image: "/images/attendance system.jpeg",
    description: "Automated presence tracking that eliminates proxy attendance and manual logging across campuses and factories.",
    features: ["Real-time", "Anti-proxy", "Insights"],
    icon: <UserCheck size={32} strokeWidth={1.5} />
  },
  {
    name: "Security Intel",
    image: "/images/security intelligence.jpeg",
    description: "24/7 proactive monitoring that uses computer vision to detect anomalies and trigger instant security protocols.",
    features: ["Proactive", "AI Vision", "Instant Alert"],
    icon: <ShieldAlert size={32} strokeWidth={1.5} />
  },
  {
    name: "Surveillance Monitoring",
    image: "/images/survillance monitoring.jpeg",
    description: "Industrial-grade monitoring integrated with AI to detect incidents before they escalate.",
    features: ["4K Monitoring", "Motion Alert", "NVR Storage"],
    icon: <Cctv size={32} strokeWidth={1.5} />
  },
  {
    name: "Facility Management",
    image: "/images/facility management.png",
    description: "Automated space and resource management for large institutional and corporate campuses.",
    features: ["Resource Mgmt", "Space Analytics", "Maintenance"],
    icon: <Building size={32} strokeWidth={1.5} />
  },
  {
    name: "Analytics Dashboard",
    image: "/images/Analytics Dashboard.png",
    description: "Centralized data hub providing actionable insights into every aspect of your operations.",
    features: ["Live Stats", "Report Engine", "API Access"],
    icon: <BarChart3 size={32} strokeWidth={1.5} />
  }
];

export default function Domains() {
  const [domainRows, setDomainRows] = useState<Domain[]>([]);
  const [isLoadingDomains, setIsLoadingDomains] = useState(true);
  const [error, setError] = useState<any>(null);

  const loadDomains = async () => {
    try {
      setIsLoadingDomains(true);
      setError(null);
      const rows = await listDomains(true);
      setDomainRows(rows);
    } catch (err) {
      console.error("[Domains] Failed to load domains", err);
      setError(err);
    } finally {
      setIsLoadingDomains(false);
    }
  };

  useEffect(() => {
    void loadDomains();
  }, []);

  const refetch = () => void loadDomains();

  const dbDomains = domainRows.map((domain, index) => ({
    id: domain.slug,
    name: domain.name,
    image:
      domain.image_url ||
      `https://images.unsplash.com/photo-1497215844834-3151b1fba50d?w=800&q=80&sig=${index}`,
  }));

  const domainMap = new Map<string, { id: string; name: string; image: string }>();
  for (const item of domains) domainMap.set(item.id, item);
  for (const item of dbDomains) domainMap.set(item.id, item);
  const uiDomains = Array.from(domainMap.values());

  return (
    <div className="flex flex-col pt-16 md:pt-20">
      {/* ── HERO SECTION ── */}
      <PageHero
        titleLine1="Domains We Power with"
        titleLine2="Smart Ecosystems"
        descriptionLine1="Intelligent systems tailored for different industries — solving real"
        descriptionLine2="operational challenges across diverse environments."
      >
        <Link to="/solutions" className="px-10 py-4 bg-nx-navy text-nx-white rounded-full font-black transition-all hover:bg-nx-navy-hover hover:scale-105 shadow-xl w-full sm:w-auto text-center text-[10px] uppercase tracking-widest whitespace-nowrap">
          Explore Solutions
        </Link>
        <button className="px-10 py-4 border border-nx-navy/20 text-nx-navy rounded-full font-black hover:bg-nx-navy/5 backdrop-blur-sm transition-all hover:scale-105 w-full sm:w-auto text-center text-[10px] uppercase tracking-widest whitespace-nowrap">
          Talk to Expert
        </button>
      </PageHero>



      {/* ── DOMAINS GRID ── */}
      <section className="pt-0 pb-0 bg-nx-white">
        <div className="px-2 md:px-4">
          <div className="bg-[#f2f2f2] rounded-[3rem] p-10 md:p-16 border border-black/5 shadow-inner relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-nx-navy/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-nx-steel/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col items-center mb-12 text-center">
                <span className="text-[10px] font-black text-nx-navy/30 tracking-[0.5em] uppercase mb-4 block">Select Domain</span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-nx-navy uppercase tracking-tight">
                  Explore <span className="text-nx-steel">Domains</span>
                </h2>
                <div className="h-1.5 w-16 bg-nx-navy/10 rounded-full mt-5" />
              </div>

              {/* Loading State */}
              {isLoadingDomains && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-nx-navy/20 border-t-nx-navy" />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-10">
                  <p className="text-red-500 mb-3">Failed to load domains</p>
                  <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-nx-navy text-white rounded-full text-sm"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!isLoadingDomains && !error && uiDomains?.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-nx-navy/60">No domains available at the moment.</p>
                </div>
              )}

              {/* Domains Grid with Data from Backend */}
              {!isLoadingDomains && !error && uiDomains?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {uiDomains.map((dom) => (
                    <Link
                      key={dom.id}
                      to={`/domains/${dom.id}`}
                      className="group block flex-col items-center text-center transition-all"
                    >
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-nx-white mb-6 border border-nx-steel/10 transition-all duration-500 group-hover:shadow-2xl group-hover:border-nx-navy/20 relative shadow-md">
                        <img
                          src={dom.image}
                          alt={dom.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-nx-navy/0 group-hover:bg-nx-navy/5 transition-colors duration-300" />
                      </div>
                      <h3 className="text-sm md:text-lg font-black text-nx-navy group-hover:text-nx-navy transition-colors leading-tight px-1 uppercase tracking-wider">
                        {dom.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}
