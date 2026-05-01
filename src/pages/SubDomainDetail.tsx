import { motion, AnimatePresence } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { domains } from "../constants/domains";
import { 
  Play, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Activity,
  Layers,
  Monitor,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRightCircle,
  Database
} from "lucide-react";
import { useState } from "react";

const solutions = [
  { id: "S01", name: "Smart Occupancy Tracking", stats: { acc: "94%", refresh: "Live", saving: "40%", setup: "2 days" } },
  { id: "S02", name: "Entry Monitoring System", stats: { acc: "99%", refresh: "Real-time", saving: "25%", setup: "3 days" } },
  { id: "S03", name: "Resource Tracking", stats: { acc: "92%", refresh: "Batch", saving: "30%", setup: "5 days" } },
  { id: "S04", name: "Silent Zone Control", stats: { acc: "96%", refresh: "Live", saving: "15%", setup: "1 day" } },
  { id: "S05", name: "Usage Analytics", stats: { acc: "100%", refresh: "Daily", saving: "50%", setup: "Inst." } },
];

export default function SubDomainDetail() {
  const { domain, subdomain } = useParams();
  const [activeSol, setActiveSol] = useState(0);

  const domainData = domains.find(d => d.id === domain);
  const domainName = domainData?.name || (domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "Domain");

  // Since subdomain is a hyphenated string, let's format it for display
  const subdomainName = domainData?.subdomains.find(sd => 
    sd.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === subdomain
  ) || (subdomain ? subdomain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Sub-Domain");

  return (
    <div className="flex flex-col pt-20">
      {/* ── HERO ── */}
      <section className="relative py-24 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex gap-px">
          {Array.from({ length: 10 }).map((_, i) => <div key={i} className="flex-1 bg-pure-white" />)}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism text-accent-gold font-bold text-[10px] uppercase tracking-widest mb-8">
                 {domainName} › {subdomainName}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-pure-white mb-6 leading-tight">
                 Smart systems for <span className="text-accent-gold">{subdomainName} operations</span>
              </h1>
              <p className="text-pure-white/50 text-lg mb-10 leading-relaxed">
                 Enhance visibility, control, and efficiency across {subdomainName} environments with intelligent automation and integrated sensors.
              </p>
              <div className="flex flex-wrap gap-4">
                 <button className="px-8 py-3.5 bg-brand-walnut text-pure-white font-bold rounded-xl transition-all hover:scale-105 shadow-2xl shadow-brand-walnut/20">Explore Solutions</button>
                 <button className="px-8 py-3.5 border border-pure-white/20 text-pure-white font-bold rounded-xl hover:bg-white/5 backdrop-blur-sm">View Live Demo</button>
              </div>
           </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-24 bg-light-cream border-y border-cool-gray/30 shadow-inner">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <span className="text-[10px] font-bold text-brand-walnut tracking-[.3em] uppercase mb-4 block">Overview</span>
                 <h2 className="text-3xl font-display font-bold text-slate-blue mb-8">{subdomainName.toUpperCase()} operations, made intelligent</h2>
                 <p className="text-slate-blue/60 leading-relaxed text-lg mb-8">
                    {subdomainName} areas involve dynamic usage and unique compliance challenges. Our systems simplify monitoring, reducing manual effort while improving outcomes.
                 </p>
              </div>
              <div className="space-y-4">
                 {[
                   { t: "Real-time visibility", d: "Live occupancy and resource tracking", icon: Monitor },
                   { t: "Automated insights", d: "Usage analytics without manual counting", icon: Activity },
                   { t: "Controlled access", d: "Entry monitoring and zone management", icon: ShieldCheck }
                 ].map((pt, i) => (
                   <div key={i} className="bg-pure-white p-6 rounded-2xl border border-cool-gray/30 flex items-start gap-6 transition-all hover:border-brand-walnut group">
                      <div className="w-10 h-10 rounded-xl bg-slate-blue/5 border border-cool-gray/20 flex items-center justify-center text-brand-walnut group-hover:bg-brand-walnut group-hover:text-pure-white transition-all shrink-0">
                         <pt.icon size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-blue mb-1">{pt.t}</h4>
                         <p className="text-slate-blue/40 text-[11px] font-medium uppercase tracking-widest">{pt.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── SOLUTION EXPERIENCE (Video + List) ── */}
      <section className="py-24 bg-pure-white overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <span className="text-[10px] font-bold text-brand-walnut tracking-[.3em] uppercase mb-1">Solutions</span>
              <h2 className="text-3xl font-display font-bold text-slate-blue mb-4">Experience our smart solutions</h2>
              <p className="text-slate-blue/40 text-sm">Select a solution below to see it in action.</p>
           </div>

           {/* Video Mockup */}
           <div className="relative aspect-video rounded-[3rem] bg-brand-black overflow-hidden border-8 border-light-cream shadow-2xl mb-12 flex flex-col justify-end group">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="w-20 h-20 rounded-full border-2 border-accent-gold bg-accent-gold/10 text-accent-gold flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <Play size={32} className="ml-1" />
                 </button>
              </div>
              
              <div className="relative z-10 p-10 bg-gradient-to-t from-brand-black/90 to-transparent flex flex-col md:flex-row justify-between items-end gap-6">
                 <div>
                    <h3 className="text-2xl font-display font-bold text-pure-white mb-2">{solutions[activeSol].name}</h3>
                    <p className="text-pure-white/40 text-sm">Real-world walkthrough · Implementation scenario</p>
                 </div>
                 <div className="px-6 py-2 bg-brand-walnut/70 border border-accent-gold text-accent-gold text-[10px] font-bold uppercase rounded-full">Live Demo</div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                 <motion.div 
                    layoutId="track"
                    className="h-full bg-accent-gold" 
                    style={{ width: "35%" }}
                 />
              </div>
           </div>

           <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {solutions.map((sol, i) => (
                <button
                  key={sol.id}
                  onClick={() => setActiveSol(i)}
                  className={`flex flex-col items-start gap-4 p-8 rounded-3xl min-w-[200px] border transition-all ${activeSol === i ? "bg-light-cream border-brand-walnut/40 walnut-glow" : "bg-pure-white border-cool-gray/30 hover:border-cool-gray"}`}
                >
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSol === i ? "bg-brand-walnut text-pure-white" : "bg-slate-blue/5 text-slate-blue/30"}`}>
                      <Layers size={18} />
                   </div>
                   <span className="text-sm font-bold text-left">{sol.name}</span>
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* ── SOLUTION DETAILS & STATS ── */}
      <section className="py-24 bg-light-gray border-y border-cool-gray/30">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                 <div className="inline-block px-3 py-1 bg-brand-walnut text-pure-white text-[10px] font-bold uppercase tracking-widest rounded-md mb-6">Selected Solution</div>
                 <h3 className="text-3xl font-display font-bold text-slate-blue mb-6">{solutions[activeSol].name}</h3>
                 <p className="text-slate-blue/60 leading-relaxed text-lg mb-10">
                    Proprietary algorithms integrated with industrial hardware to provide reliable, real-time outcomes. No manual effort required.
                 </p>
                 
                 <div className="space-y-4">
                    {[
                      "End-to-end automation",
                      "Cloud-integrated reporting",
                      "Fail-safe architecture",
                      "Scalable infrastructure"
                    ].map(f => (
                      <div key={f} className="flex items-center gap-3">
                         <CheckCircle2 size={18} className="text-[#22c55e]" />
                         <span className="text-slate-blue text-sm font-medium">{f}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {[
                   { l: "Accuracy Rate", v: solutions[activeSol].stats.acc },
                   { l: "Data Refresh", v: solutions[activeSol].stats.refresh },
                   { l: "Manual Effort Saved", v: solutions[activeSol].stats.saving },
                   { l: "Setup Time", v: solutions[activeSol].stats.setup }
                 ].map((stat, i) => (
                   <div key={i} className="bg-pure-white p-10 rounded-[2.5rem] border border-cool-gray/50 text-center shadow-sm">
                      <div className="text-3xl font-display font-bold text-brand-walnut mb-2">{stat.v}</div>
                      <div className="text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest">{stat.l}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-24 bg-pure-white">
        <div className="container mx-auto px-6">
           <div className="mb-12 text-center">
              <span className="text-[10px] font-bold text-brand-walnut tracking-[.3em] uppercase mb-1">Impact</span>
              <h2 className="text-3xl font-display font-bold text-slate-blue">The operational difference</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-light-gray/50 border border-cool-gray/30 p-10 rounded-[3rem] relative">
                 <div className="flex items-center gap-4 mb-10">
                    <span className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-[.2em]">Before</span>
                    <div className="h-px bg-cool-gray/30 flex-grow" />
                 </div>
                 <div className="space-y-6">
                    {[
                      "Manual data logging causing delays",
                      "Reactive-only problem detection",
                      "Operational blind spots on campus",
                      "No longitudinal usage analytics"
                    ].map(t => (
                      <div key={t} className="flex gap-4">
                         <XCircle size={18} className="text-red-400 mt-1 shrink-0" />
                         <p className="text-sm text-slate-blue/60 leading-tight">{t}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-brand-black border border-white/5 p-10 rounded-[3rem] relative text-pure-white">
                 <div className="flex items-center gap-4 mb-10">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[.2em]">After</span>
                    <div className="h-px bg-white/10 flex-grow" />
                 </div>
                 <div className="space-y-6">
                    {[
                      "Fully automated live dashboards",
                      "Intelligent predictive alerts",
                      "100% visibility of all zones",
                      "Data-driven space optimization"
                    ].map(t => (
                      <div key={t} className="flex gap-4">
                         <ShieldCheck size={18} className="text-accent-gold mt-1 shrink-0" />
                         <p className="text-sm text-white/70 leading-tight">{t}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── PROJECT CTA ── */}
      <section className="py-24 bg-light-cream border-t border-cool-gray/30">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-display font-bold text-slate-blue mb-4">See this solution in action</h2>
           <p className="text-slate-blue/40 text-sm max-w-lg mx-auto mb-16 italic">Explore real implementations or walk through a custom demo scenario.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { l: "Real Project", t: "Delhi Public Library", route: "/domains/education/library/delhi-lib", icon: Database },
                { l: "Demo Scenario", t: "University Hub Setup", route: "/domains/education/library/uni-demo", icon: Monitor }
              ].map((proj, i) => (
                <Link 
                  key={i} 
                  to={proj.route}
                  className="bg-pure-white p-10 rounded-[2.5rem] border border-cool-gray/30 hover:border-brand-walnut transition-all text-left flex items-center justify-between group"
                >
                   <div>
                      <span className="text-[10px] font-bold text-accent-gold uppercase tracking-[.2em] mb-2 block">{proj.l}</span>
                      <h4 className="text-xl font-bold text-slate-blue">{proj.t}</h4>
                      <p className="text-[9px] text-slate-blue/20 uppercase tracking-widest mt-2">{proj.route}</p>
                   </div>
                   <ArrowRightCircle size={32} className="text-slate-blue/10 group-hover:text-brand-walnut transition-all transform group-hover:translate-x-2" />
                </Link>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
