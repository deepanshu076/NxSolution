import { motion } from "motion/react";
import { 
  Users, 
  ClipboardList, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ChevronRight,
  TrendingUp,
  Globe,
  Briefcase,
  Zap,
  Image as ImageIcon,
  MoreVertical,
  Activity,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Leads", value: "1,284", delta: "+12.5%", positive: true, icon: ClipboardList },
  { label: "Active Domains", value: "12", delta: "0%", positive: true, icon: Globe },
  { label: "Active Projects", value: "256", delta: "+4.2%", positive: true, icon: Briefcase },
  { label: "Conversion Rate", value: "6.8%", delta: "-0.5%", positive: false, icon: TrendingUp },
];

const recentLeads = [
  { id: "L001", name: "John Smith", company: "EduTech Corp", industry: "Education", status: "Qualified", date: "2 mins ago" },
  { id: "L002", name: "Maria Garcia", company: "City Hospital", industry: "Healthcare", status: "New", date: "15 mins ago" },
  { id: "L003", name: "Robert Chen", company: "Global Mfg", industry: "Manufacturing", status: "In Progress", date: "1 hr ago" },
  { id: "L004", name: "Sarah Miller", company: "Retail Hub", industry: "Retail", status: "Proposal", date: "3 hrs ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-brand-walnut uppercase tracking-[.3em] mb-2">
              <Activity size={12} /> Live Overview
           </div>
           <h1 className="text-3xl font-display font-bold text-slate-blue">System Control Center</h1>
           <p className="text-slate-blue/40 text-sm mt-1">Welcome back to the NX-Admin management hub.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-pure-white border border-cool-gray/50 text-slate-blue px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-light-cream transition-all shadow-sm">Export Data</button>
           <button className="bg-brand-walnut text-pure-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-black transition-all flex items-center gap-2 shadow-xl shadow-brand-walnut/20">
              <Plus size={16} /> New Resource
           </button>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-pure-white p-6 rounded-3xl border border-cool-gray/30 shadow-sm hover:border-brand-walnut/30 transition-all group">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-blue/5 rounded-2xl flex items-center justify-center text-brand-walnut group-hover:bg-brand-walnut group-hover:text-pure-white transition-all">
                   <s.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${s.positive ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                   {s.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {s.delta}
                </div>
             </div>
             <div className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-[.2em] mb-1">{s.label}</div>
             <div className="text-3xl font-display font-bold text-slate-blue">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── RECENT LEADS TABLE ── */}
        <div className="lg:col-span-2 bg-pure-white rounded-[2.5rem] border border-cool-gray/30 overflow-hidden shadow-sm flex flex-col">
           <div className="p-8 border-b border-cool-gray/20 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-blue flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
                    <ClipboardList size={18} />
                 </div>
                 Recent Pipeline Leads
              </h2>
              <Link to="/admin/leads" className="text-[10px] font-bold text-brand-walnut hover:underline flex items-center gap-1 uppercase tracking-widest">Full Pipeline <ChevronRight size={14}/></Link>
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
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-light-cream/40 transition-colors cursor-pointer group">
                         <td className="px-8 py-5">
                            <div className="font-bold text-slate-blue text-sm group-hover:text-brand-walnut transition-colors">{lead.name}</div>
                            <div className="text-[10px] text-slate-blue/30 font-bold uppercase mt-0.5">{lead.company}</div>
                         </td>
                         <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-slate-blue/5 rounded-lg text-[10px] font-bold text-slate-blue uppercase tracking-wide border border-slate-blue/10">{lead.industry}</span>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                               <div className={`w-2 h-2 rounded-full ${lead.status === "New" ? "bg-blue-500" : lead.status === "Qualified" ? "bg-green-500" : "bg-brand-walnut"}`} />
                               <span className="text-[10px] font-bold text-slate-blue/70 uppercase tracking-widest">{lead.status}</span>
                            </div>
                         </td>
                         <td className="px-8 py-5 text-[10px] text-slate-blue/20 font-bold uppercase">{lead.date}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="p-6 bg-light-gray/20 border-t border-cool-gray/10 mt-auto text-center">
              <button className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-[.3em] hover:text-brand-walnut transition-colors">See all activity records</button>
           </div>
        </div>

        {/* ── SIDEBAR CARDS ── */}
        <div className="space-y-8">
           <div className="bg-pure-white p-8 rounded-[2.5rem] border border-cool-gray/30 shadow-sm">
              <h3 className="text-sm font-bold text-slate-blue mb-8 uppercase tracking-widest">Active Engines</h3>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   { label: "Content", icon: ImageIcon, path: "/admin/cms", color: "bg-orange-500/10 text-orange-600" },
                   { label: "Domains", icon: Globe, path: "/admin/domains", color: "bg-blue-500/10 text-blue-600" },
                   { label: "Projects", icon: Briefcase, path: "/admin/projects", color: "bg-purple-500/10 text-purple-600" },
                   { label: "Products", icon: Package, path: "/admin/products", color: "bg-teal-500/10 text-teal-600" }
                 ].map((act, i) => (
                   <Link key={i} to={act.path} className="flex flex-col items-center gap-4 p-6 bg-light-gray/30 rounded-3xl border border-transparent hover:border-brand-walnut/20 hover:bg-pure-white transition-all group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.color} group-hover:scale-110 transition-transform`}>
                        <act.icon size={18} />
                      </div>
                      <span className="text-[9px] font-bold text-slate-blue/60 uppercase tracking-[.2em]">{act.label}</span>
                   </Link>
                 ))}
              </div>
           </div>

           <div className="bg-brand-black p-8 rounded-[2.5rem] text-pure-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 grid-bg" />
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <Zap size={16} className="text-accent-gold" />
                       </div>
                       <h3 className="font-display font-bold italic text-sm tracking-widest">Engine Status</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                       <span className="text-[8px] font-bold uppercase tracking-widest text-green-500">Stable</span>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    {["CMS Engine", "CRM Pipeline", "Asset Manager", "Auth Service"].map((e) => (
                      <div key={e} className="space-y-2">
                         <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-pure-white/40">
                            <span>{e}</span>
                            <span className="text-accent-gold">100%</span>
                         </div>
                         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-brand-walnut rounded-full shadow-[0_0_10px_#6B4F3A]" />
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest whitespace-nowrap">v2.4.0 Deployment Active</span>
                    <button className="text-accent-sky text-[10px] font-bold uppercase hover:underline underline-offset-4">Refresh Systems</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
