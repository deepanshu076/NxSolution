import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Building2 } from "lucide-react";
import type { Domain, Subdomain } from "@/src/types";
import { getDomainBySlug } from "@/src/services/domains.service";
import { listSubdomains } from "@/src/services/subdomains.service";
import { domains as constantDomains } from "@/src/constants/domains";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getImageForSubdomain(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes("gate") || t.includes("entry")) {
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";
  }
  if (t.includes("office") || t.includes("admin")) {
    return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";
  }
  if (t.includes("lab") || t.includes("computer")) {
    return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80";
  }
  const fallback = [
    "https://images.unsplash.com/photo-1497215844834-3151b1fba50d?w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  ];
  return fallback[index % fallback.length];
}

export default function DomainDetail() {
  const { domain } = useParams();
  const [domainData, setDomainData] = useState<Domain | null>(null);
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!domain) {
        setError("Domain not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const domainRow = await getDomainBySlug(domain);
        const subdomainRows = await listSubdomains(domainRow.id, true);
        setDomainData(domainRow);
        setSubdomains(subdomainRows);
      } catch (err) {
        const fallback = constantDomains.find((item) => item.id === domain);
        if (fallback) {
          setDomainData({
            id: fallback.id,
            slug: fallback.id,
            name: fallback.name,
            description: fallback.description ?? null,
            icon: null,
            color: fallback.color ?? null,
            image_url: fallback.image ?? null,
            order_index: 0,
            is_active: true,
            created_at: null,
            updated_at: null,
          });
          setSubdomains(
            (fallback.subdomains ?? []).map((name, index) => ({
              id: `${fallback.id}-${index}`,
              domain_id: fallback.id,
              name,
              slug: toSlug(name),
              description: null,
              icon: null,
              order_index: index,
              is_active: true,
              created_at: null,
              updated_at: null,
            })),
          );
        } else {
          setError(err instanceof Error ? err.message : "Unable to load domain.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [domain]);

  const formattedDomain = useMemo(() => {
    if (domainData?.name) return domainData.name;
    return domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "Domain";
  }, [domain, domainData]);

  const mergedSubdomains = useMemo(() => {
    if (!domainData) return subdomains;
    const constantDomain = constantDomains.find((item) => item.id === domainData.slug);
    const fromConstants = (constantDomain?.subdomains ?? []).map((name, index) => ({
      id: `constant-${domainData.slug}-${index}`,
      domain_id: domainData.id,
      name,
      slug: toSlug(name),
      description: null,
      icon: null,
      order_index: 1000 + index,
      is_active: true,
      created_at: null,
      updated_at: null,
    }));

    const map = new Map<string, Subdomain>();
    for (const item of fromConstants) map.set(item.slug, item);
    for (const item of subdomains) map.set(item.slug || toSlug(item.name), item);
    return Array.from(map.values());
  }, [domainData, subdomains]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <p className="text-slate-blue/60">Loading domain...</p>
      </div>
    );
  }

  if (error || !domainData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-blue">Domain not found</h2>
          <p className="mt-2 text-slate-blue/60">{error ?? "Please try again."}</p>
          <Link
            to="/domains"
            className="mt-6 inline-block rounded-xl bg-brand-walnut px-5 py-3 text-sm font-bold text-pure-white"
          >
            Back to Domains
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-20">
      <section className="relative min-h-[420px] flex items-center justify-center bg-brand-black overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] text-accent-sky">
          <Building2 size={360} strokeWidth={1} />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-pure-white">
            Smart Systems for <span className="text-accent-sky">{formattedDomain}</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-pure-white/65 text-sm md:text-base">
            {domainData.description ?? "Explore implementation-ready subdomains configured by your admin team."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-pure-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-black">
              Specific Sub-Domains
            </h2>
          </div>

          {mergedSubdomains.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cool-gray/30 bg-light-gray/30 px-6 py-12 text-center text-slate-blue/55">
              No subdomains available for this domain yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {mergedSubdomains.map((sd, i) => (
                <Link
                  key={sd.id}
                  to={`/domains/${domainData.slug}/${sd.slug || toSlug(sd.name)}`}
                  className="group relative h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-brand-black border border-cool-gray/30 flex flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-walnut/50"
                >
                  <div className="absolute inset-0">
                    <img
                      src={getImageForSubdomain(sd.name, i)}
                      alt={sd.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-black/30" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-90" />
                  </div>
                  <div className="relative z-10 p-4 sm:p-5 w-full flex justify-between items-end">
                    <div className="flex-1 pr-3">
                      <h4 className="text-sm md:text-base font-bold text-pure-white leading-tight">
                        {sd.name}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-pure-white/10 backdrop-blur-sm border border-pure-white/20 flex items-center justify-center text-pure-white shrink-0 group-hover:bg-brand-walnut group-hover:border-brand-walnut transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
