import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { projectsData } from "@/src/constants/projects";
import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import { 
  Calendar, 
  FileText, 
  BarChart3, 
  ChevronRight, 
  Play, 
  Info, 
  MessageSquare,
  ArrowRight,
  Clock,
  Target,
  Zap,
  ShieldCheck,
  Cpu,
  Layout,
  Settings,
  Share2
} from "lucide-react";
import { useState } from "react";

const domainProjects = [
  { id: "education", name: "Education", count: "14 projects", emoji: "🏫", color: "#1a1a18", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80" },
  { id: "manufacturing", name: "Manufacturing", count: "9 projects", emoji: "🏭", color: "#1c1a18", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" },
  { id: "healthcare", name: "Healthcare", count: "11 projects", emoji: "🏥", color: "#181c1a", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { id: "corporate", name: "Corporate", count: "16 projects", emoji: "🏢", color: "#1a1c18", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: "retail", name: "Retail", count: "8 projects", emoji: "🏪", color: "#1c1818", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" },
  { id: "logistics", name: "Logistics", count: "7 projects", emoji: "🏗", color: "#181a1c", image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=800&q=80" },
  { id: "government", name: "Government", count: "6 projects", emoji: "🏛", color: "#1a1818", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80" },
  { id: "residential", name: "Residential", count: "5 projects", emoji: "🏘", color: "#181c1c", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80" },
];

const coreProducts = [
  { name: "Node-S Sensors", sub: "Enterprise Standard", icon: <Cpu size={20} strokeWidth={1.5} />, color: "text-[#64748B]", bg: "bg-slate-50" },
  { name: "IQ Dashboard", sub: "Enterprise Standard", icon: <Layout size={20} strokeWidth={1.5} />, color: "text-[#64748B]", bg: "bg-slate-50" },
  { name: "Hub-Z Controller", sub: "Enterprise Standard", icon: <Settings size={20} strokeWidth={1.5} />, color: "text-[#64748B]", bg: "bg-slate-50" },
  { name: "Comms-X Gateway", sub: "Enterprise Standard", icon: <Share2 size={20} strokeWidth={1.5} />, color: "text-[#64748B]", bg: "bg-slate-50" },
];

export default function ProjectDetail() {
  const { slug, project: legacySlug } = useParams();
  const currentSlug = slug || legacySlug;
  const project = projectsData.find((p) => p.slug === currentSlug);

  if (!project) return <Navigate to="/projects" />;

  return (
    <div className="flex flex-col pt-20 bg-pure-white">
      {/* ── HIGH-CONTRAST HERO SECTION (MATCHING NEW DESIGN) ── */}
      <section className="relative min-h-[500px] bg-[#0B1221] flex items-center justify-center overflow-hidden">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] grid grid-cols-4 grid-rows-2 gap-[2px]">
           {domainProjects.slice(0, 8).map((_, i) => (
             <div key={i} className="bg-white" />
           ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-3 text-orange-500 font-bold text-xs md:text-sm uppercase tracking-[0.4em] mb-6"
            >
              {project.domainId} • {project.type}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-display font-bold mb-8 leading-[1.1] text-white tracking-tight"
            >
              {project.title.split(" ").length > 3 ? (
                 <>
                   {project.title.split(" ").slice(0, 3).join(" ")} <br className="hidden md:block" />
                   {project.title.split(" ").slice(3).join(" ")}
                 </>
              ) : project.title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              {project.overview.split(".")[0]}. <br className="hidden md:block" />
              {project.overview.split(".")[1] ? project.overview.split(".")[1] + "." : ""}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── STAGGERED CONTENT GRID ── */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          
          {/* Row 1: Challenges (LEFT) & Video (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24 items-stretch">
            
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-black text-[#64748B] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <span className="w-10 h-[1px] bg-slate-200" />
                The Operational Challenges
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {project.requirements.map((req, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex gap-6 items-center group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-300 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                       <Target size={18} />
                    </div>
                    <div>
                      <p className="text-brand-black text-lg font-bold leading-tight">{req}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-black text-[#64748B] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <span className="w-10 h-[1px] bg-slate-200" />
                System Walkthrough
              </h3>
              <div className="group relative flex-grow bg-brand-black rounded-[3rem] overflow-hidden shadow-2xl min-h-[400px]">
                 <img src={project.image} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-orange-500 text-pure-white flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.4)]"
                    >
                       <Play fill="currentColor" size={32} className="ml-1" />
                    </motion.button>
                 </div>
              </div>
            </div>
          </div>

          {/* Row 2: Photo (LEFT) & Solutions (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
            
            <div className="flex flex-col">
              <h3 className="text-sm font-black text-[#64748B] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <span className="w-10 h-[1px] bg-slate-200" />
                Technical Insight
              </h3>
              <div className="flex-grow rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-inner group relative">
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                 <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20">
                    <div className="flex justify-between items-center gap-6">
                       <div>
                          <p className="text-brand-black font-black text-xs uppercase tracking-widest mb-1">Impact Factor</p>
                          <p className="text-slate-500 text-xs italic">{project.impact}</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black text-[#64748B] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <span className="w-10 h-[1px] bg-slate-200" />
                Solution Architecture
              </h3>
              <div className="space-y-4">
                {project.implementation.map((imp, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-pure-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                    <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                       <Zap size={18} />
                    </div>
                    <p className="text-lg text-brand-black font-bold">{imp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HARDWARE SECTION ── */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-3"
          >
            <span className="w-8 h-[1px] bg-slate-200" />
            Hardware & Infrastructure
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-black text-brand-black mb-16 uppercase tracking-tight"
          >
            Core Products Leveraged
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreProducts.map((prod, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm flex flex-col items-center hover:shadow-xl transition-all duration-500 group border border-slate-100"
              >
                <div className={`w-14 h-14 rounded-full ${prod.bg} flex items-center justify-center ${prod.color} mb-8 group-hover:scale-110 transition-all duration-500`}>
                  {prod.icon}
                </div>
                <h4 className="text-xl font-display font-black text-brand-black mb-2 group-hover:text-[#64748B] transition-colors">{prod.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{prod.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SMALLER METRICS STRIP ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
           <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {project.metrics.map((m, i) => (
                <div key={i} className="text-center group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 group-hover:text-orange-400 transition-colors">{m.label}</p>
                  <p className="text-3xl md:text-4xl font-display font-black text-brand-black leading-none tracking-tighter">{m.value}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── FINAL CTA BAR ── */}
      <section className="py-12 bg-brand-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-pure-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            Scale your ecosystem with Nx-Core™
          </p>
          <Link to="/contact">
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-10 py-5 bg-gradient-to-r from-orange-400 to-yellow-400 text-brand-black text-xs font-black rounded-2xl uppercase tracking-widest shadow-xl shadow-orange-400/20"
            >
               Initiate Discussion
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
