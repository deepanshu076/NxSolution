import { motion } from "motion/react";
import { 
  Building2, 
  Factory, 
  Stethoscope, 
  Briefcase, 
  ShoppingBag, 
  Truck, 
  Landmark, 
  Home as HomeIcon,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Search,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Layers,
  Monitor
} from "lucide-react";
import { Link } from "react-router-dom";

const domainProjects = [
  { id: "education", name: "Education", count: "14 projects", emoji: "🏫", color: "#1a1a18" },
  { id: "manufacturing", name: "Manufacturing", count: "9 projects", emoji: "🏭", color: "#1c1a18" },
  { id: "healthcare", name: "Healthcare", count: "11 projects", emoji: "🏥", color: "#181c1a" },
  { id: "corporate", name: "Corporate", count: "16 projects", emoji: "🏢", color: "#1a1c18" },
  { id: "retail", name: "Retail", count: "8 projects", emoji: "🏪", color: "#1c1818" },
  { id: "logistics", name: "Logistics", count: "7 projects", emoji: "🏗", color: "#181a1c" },
  { id: "government", name: "Government", count: "6 projects", emoji: "🏛", color: "#1a1818" },
  { id: "residential", name: "Residential", count: "5 projects", emoji: "🏘", color: "#181c1c" },
];

export default function Projects() {
  return (
    <div className="flex flex-col pt-20">
      {/* ── MOSAIC HERO SECTION ── */}
      <section className="relative min-h-[500px] bg-brand-black flex items-center overflow-hidden">
        {/* Mosaic Grid Background */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-[2px] opacity-20">
           {domainProjects.map((dom, i) => (
             <div key={i} className="relative group overflow-hidden bg-slate-blue/20">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-9xl group-hover:scale-110 transition-transform duration-700 select-none">
                  {dom.emoji}
                </div>
                <div className="absolute inset-0 bg-brand-black/40" />
             </div>
           ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism text-accent-gold font-bold text-xs uppercase tracking-widest mb-8 border border-accent-gold/20"
            >
              76+ Projects Delivered
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold text-pure-white mb-6 leading-tight"
            >
              Smart Systems Implemented Across <span className="text-accent-gold">Multiple Domains</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-pure-white/50 text-lg mb-10 max-w-xl"
            >
              Explore how our solutions are applied across industries to solve real operational challenges.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex gap-4"
            >
               <button className="px-10 py-4 bg-brand-walnut text-pure-white font-bold rounded-xl transition-all hover:bg-black border border-brand-walnut shadow-xl">Explore Domains</button>
               <button className="px-10 py-4 border border-pure-white/20 text-pure-white font-bold rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all">Talk to Expert</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FLOW STRIP ── */}
      <div className="bg-light-cream border-y border-cool-gray/30 py-4">
         <div className="container mx-auto px-6 overflow-x-auto flex items-center gap-4 scrollbar-hide">
            <div className="px-5 py-2.5 bg-pure-white border border-slate-blue rounded-xl text-slate-blue text-xs font-bold whitespace-nowrap shadow-sm">/projects</div>
            <ArrowRight size={14} className="text-cool-gray shrink-0" />
            <div className="px-5 py-2.5 bg-pure-white border border-cool-gray/30 rounded-xl text-cool-gray text-xs font-bold whitespace-nowrap opacity-60">/domains/:domain</div>
            <ArrowRight size={14} className="text-cool-gray shrink-0" />
            <div className="px-5 py-2.5 bg-pure-white border border-cool-gray/30 rounded-xl text-cool-gray text-xs font-bold whitespace-nowrap opacity-60">/:subdomain</div>
            <ArrowRight size={14} className="text-cool-gray shrink-0" />
            <div className="px-5 py-2.5 bg-pure-white border border-cool-gray/30 rounded-xl text-cool-gray text-xs font-bold whitespace-nowrap opacity-60">/:project</div>
         </div>
      </div>

      {/* ── OVERVIEW SECTION ── */}
      <section className="py-24 bg-pure-white">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <span className="text-[10px] font-bold text-brand-walnut tracking-[.2em] uppercase mb-4 block">System thinking</span>
              <h2 className="text-3xl font-display font-bold text-slate-blue mb-4">Real Implementations Across Diverse Environments</h2>
              <p className="text-slate-blue/40 text-sm max-w-xl mx-auto">Our projects demonstrate how intelligent systems are designed and deployed across different domains to improve efficiency and control.</p>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Projects delivered", value: "76+" },
                { label: "Domains covered", value: "8" },
                { label: "Solution types", value: "11" },
                { label: "Custom-built", value: "100%" }
              ].map((stat, i) => (
                <div key={i} className="bg-light-gray p-8 rounded-3xl border border-cool-gray/30 text-center flex flex-col justify-center">
                   <div className="text-4xl font-display font-bold text-slate-blue mb-2">{stat.value}</div>
                   <div className="text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest leading-relaxed px-4">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── DOMAIN BROWSER SECTION ── */}
      <section className="py-24 bg-light-cream border-t border-cool-gray/30">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <span className="text-xs font-bold text-brand-walnut uppercase tracking-widest block mb-1">Browse by domain</span>
              <h2 className="text-2xl font-display font-bold text-slate-blue">Explore Projects by Domain</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {domainProjects.map((dom, i) => (
                <Link 
                  key={dom.id}
                  to={`/domains/${dom.id}`}
                  className="group relative h-40 md:h-48 rounded-[2.5rem] overflow-hidden border border-cool-gray/30 bg-slate-blue transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                   {/* Background Image / Pattern Mockup */}
                   <div className="absolute inset-0 bg-slate-blue opacity-50">
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl group-hover:scale-110 transition-transform">
                        {dom.emoji}
                      </div>
                   </div>

                   <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/40 to-transparent" />
                   
                   {/* Arrow Indicator */}
                   <div className="absolute top-6 right-6 w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-accent-gold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <ArrowUpRight size={18} />
                   </div>

                   <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                      <h3 className="text-xl font-display font-bold text-pure-white mb-1 group-hover:text-accent-gold transition-colors">{dom.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-pure-white/40 uppercase tracking-widest">{dom.count}</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 bg-pure-white/10 rounded-full" />
                          <div className="w-1.5 h-2 bg-pure-white/10 rounded-full" />
                        </div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
           
           <div className="mt-8">
              <p className="text-slate-blue/30 italic text-[10px] font-medium tracking-wide">Click any domain card to explore specific project implementations within that sector.</p>
           </div>
        </div>
      </section>

      {/* ── WHY IT WORKS SECTION ── */}
      <section className="py-24 bg-pure-white border-b border-cool-gray/30">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <span className="text-xs font-bold text-brand-walnut uppercase tracking-widest block mb-1">Why it works</span>
              <h2 className="text-2xl font-display font-bold text-slate-blue">Real Impact Through Smart Implementation</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "Reduced manual effort", d: "Automated workflows replace repetitive tasks, cutting overhead significantly.", icon: Users },
                { t: "Improved visibility", d: "Live dashboards and monitoring give situational awareness at all times.", icon: Monitor },
                { t: "Faster decision-making", d: "Integrated analytics surface data for rapid operational responses.", icon: Activity },
                { t: "Resource optimization", d: "Energy, water, and personnel managed intelligently to eliminate waste.", icon: Zap }
              ].map((item, i) => (
                <div key={i} className="bg-light-gray/30 p-8 rounded-3xl border border-cool-gray/50 hover:bg-pure-white transition-all transform hover:-translate-y-1">
                   <div className="w-10 h-10 rounded-xl bg-slate-blue/5 flex items-center justify-center text-slate-blue/50 mb-6">
                      <item.icon size={20} />
                   </div>
                   <h4 className="font-bold text-slate-blue mb-3 text-sm leading-tight">{item.t}</h4>
                   <p className="text-slate-blue/50 text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-24 bg-brand-black overflow-hidden relative">
        <div className="absolute inset-0 dark-gradient opacity-40" />
        <div className="container mx-auto px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-pure-white mb-8 max-w-2xl mx-auto">Let's Build Smart Systems for Your Domain</h2>
           <p className="text-pure-white/40 text-lg mb-12 max-w-xl mx-auto">Tell us your operational challenges — we'll design the right solution.</p>
           <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 bg-accent-gold text-brand-black font-bold rounded-2xl transition-all hover:scale-105">Get Free Consultation</button>
              <button className="px-10 py-5 border border-pure-white/20 text-pure-white font-bold rounded-2xl transition-all hover:bg-white/5">Contact Support</button>
           </div>
        </div>
      </section>
    </div>
  );
}
