import { type ComponentType, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ClipboardList,
  ChevronRight,
  TrendingUp,
  Globe,
  Briefcase,
  Package,
  Activity,
  Zap,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Domain, Lead, Product, Project } from "@/src/types";
import { listLeads } from "@/src/services/leads.service";
import { listDomains } from "@/src/services/domains.service";
import { listProjects } from "@/src/services/projects.service";
import { listProducts } from "@/src/services/products.service";

type StatItem = {
  label: string;
  value: string;
  icon: ComponentType<{ size?: number }>;
};

function toRelativeTime(value: string | null) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day ago`;
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [leadRows, domainRows, projectRows, productRows] = await Promise.all([
          listLeads(),
          listDomains(false),
          listProjects(false),
          listProducts(false),
        ]);
        setLeads(leadRows);
        setDomains(domainRows);
        setProjects(projectRows);
        setProducts(productRows);
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const recentLeads = useMemo(() => leads.slice(0, 5), [leads]);
  const activeDomains = useMemo(
    () => domains.filter((item) => item.is_active).length,
    [domains],
  );
  const activeProjects = useMemo(
    () => projects.filter((item) => item.is_active).length,
    [projects],
  );
  const activeProducts = useMemo(
    () => products.filter((item) => item.is_active).length,
    [products],
  );
  const convertedLeads = useMemo(
    () => leads.filter((item) => item.status === "closed").length,
    [leads],
  );
  const conversionRate = useMemo(() => {
    if (leads.length === 0) return "0%";
    const pct = (convertedLeads / leads.length) * 100;
    return `${pct.toFixed(1)}%`;
  }, [convertedLeads, leads.length]);

  const stats: StatItem[] = [
    { label: "Total Leads", value: String(leads.length), icon: ClipboardList },
    { label: "Active Domains", value: String(activeDomains), icon: Globe },
    { label: "Active Projects", value: String(activeProjects), icon: Briefcase },
    { label: "Active Products", value: String(activeProducts), icon: Package },
    { label: "Conversion Rate", value: conversionRate, icon: TrendingUp },
  ];

  const engines = [
    { label: "Domains", path: "/admin/domains", color: "bg-blue-500/10 text-blue-600", count: activeDomains },
    { label: "Projects", path: "/admin/projects", color: "bg-violet-500/10 text-violet-600", count: activeProjects },
    { label: "Products", path: "/admin/products", color: "bg-teal-500/10 text-teal-600", count: activeProducts },
    { label: "Leads", path: "/admin/leads", color: "bg-orange-500/10 text-orange-600", count: leads.length },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-brand-walnut uppercase tracking-[.3em] mb-2">
            <Activity size={12} /> Live Overview
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-blue">System Control Center</h1>
          <p className="text-slate-blue/40 text-sm mt-1">All metrics below are loaded from DB or project fallback data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((item) => (
          <div key={item.label} className="bg-pure-white p-6 rounded-3xl border border-cool-gray/30 shadow-sm">
            <div className="w-12 h-12 bg-slate-blue/5 rounded-2xl flex items-center justify-center text-brand-walnut mb-5">
              <item.icon size={22} />
            </div>
            <div className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-[.2em] mb-1">
              {item.label}
            </div>
            <div className="text-3xl font-display font-bold text-slate-blue">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-pure-white rounded-[2.5rem] border border-cool-gray/30 overflow-hidden shadow-sm flex flex-col">
          <div className="p-8 border-b border-cool-gray/20 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-blue flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <ClipboardList size={18} />
              </div>
              Recent Pipeline Leads
            </h2>
            <Link to="/admin/leads" className="text-[10px] font-bold text-brand-walnut hover:underline flex items-center gap-1 uppercase tracking-widest">
              Full Pipeline <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-light-cream/30 text-[10px] font-bold text-slate-blue/30 uppercase tracking-widest border-b border-cool-gray/10">
                  <th className="px-8 py-4">Client Contact</th>
                  <th className="px-8 py-4">Industry Sector</th>
                  <th className="px-8 py-4">Current Status</th>
                  <th className="px-8 py-4">Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cool-gray/10">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-8 text-sm text-slate-blue/45">Loading leads...</td>
                  </tr>
                ) : recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-8 text-sm text-slate-blue/45">No leads found.</td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-light-cream/40 transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-blue text-sm">{lead.name}</div>
                        <div className="text-[10px] text-slate-blue/30 font-bold uppercase mt-0.5">
                          {lead.company || "No company"}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-slate-blue/5 rounded-lg text-[10px] font-bold text-slate-blue uppercase tracking-wide border border-slate-blue/10">
                          {lead.industry || "General"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-bold text-slate-blue/70 uppercase tracking-widest">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-[10px] text-slate-blue/30 font-bold uppercase">
                        {toRelativeTime(lead.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-pure-white p-8 rounded-[2.5rem] border border-cool-gray/30 shadow-sm">
            <h3 className="text-sm font-bold text-slate-blue mb-8 uppercase tracking-widest">Active Engines</h3>
            <div className="grid grid-cols-2 gap-3">
              {engines.map((engine) => (
                <Link key={engine.label} to={engine.path} className="flex flex-col items-center gap-3 p-5 bg-light-gray/30 rounded-3xl border border-transparent hover:border-brand-walnut/20 hover:bg-pure-white transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${engine.color}`}>
                    {engine.label === "Domains" ? <Globe size={18} /> : engine.label === "Projects" ? <Briefcase size={18} /> : engine.label === "Products" ? <Package size={18} /> : <ImageIcon size={18} />}
                  </div>
                  <span className="text-[9px] font-bold text-slate-blue/60 uppercase tracking-[.2em]">{engine.label}</span>
                  <span className="text-sm font-bold text-slate-blue">{engine.count}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-brand-black p-8 rounded-[2.5rem] text-pure-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Zap size={16} className="text-accent-gold" />
                  </div>
                  <h3 className="font-display font-bold italic text-sm tracking-widest">Data Sources</h3>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Admin modules read from database services. When DB is unavailable, project fallback constants are used by the same service layer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
