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
         <section className="relative py-12 md:py-20 bg-brand-black overflow-hidden flex items-center justify-center">
            {/* Background Stripes */}
            <div className="absolute inset-0 opacity-[0.03] flex gap-px pointer-events-none">
               {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-pure-white" />
               ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
               <div className="max-w-2xl flex flex-col items-center">

                  {/* Minimalist Breadcrumb Badge (Scaled Down) */}
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-accent-gold font-medium text-[10px] md:text-xs tracking-wider mb-5 border border-accent-gold/10 bg-accent-gold/5 backdrop-blur-md">
                     {domainName} <span className="opacity-50">›</span> {subdomainName}
                  </div>

                  {/* Balanced Headline (Scaled Down) */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-pure-white mb-4 leading-tight text-balance tracking-tight">
                     Smart systems for <br className="hidden sm:block" />
                     <span className="text-accent-gold">{subdomainName} operations</span>
                  </h1>

                  {/* Clean Paragraph (Scaled Down) */}
                  <p className="text-pure-white/70 text-sm md:text-base font-normal mb-8 leading-relaxed text-balance max-w-xl">
                     Enhance visibility, control, and efficiency across {subdomainName} environments with intelligent automation and integrated sensors.
                  </p>

                  {/* Refined Buttons (Scaled Down) */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
                     <button className="w-full sm:w-auto px-6 py-3 bg-brand-walnut text-pure-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-brand-walnut/90 shadow-md shadow-brand-walnut/10 hover:-translate-y-0.5">
                        Explore Solutions
                     </button>
                     <button className="w-full sm:w-auto px-6 py-3 border border-pure-white/20 text-pure-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-white/5 hover:border-pure-white/40 backdrop-blur-sm">
                        View Live Demo
                     </button>
                  </div>

               </div>
            </div>
         </section>

         {/* ── SOLUTION EXPERIENCE (Video + List) ── */}
         <section className="py-10 md:py-14 bg-pure-white overflow-hidden">
            <div className="container mx-auto px-6">

               {/* Header (Tighter Margins) */}
               <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
                  <span className="text-[10px] font-bold text-brand-walnut tracking-[.3em] uppercase mb-1 block">
                     Solutions
                  </span>
                  <h2 className="text-xl md:text-2xl font-display font-bold text-slate-blue mb-2 leading-tight">
                     Experience our smart solutions
                  </h2>
                  <p className="text-slate-blue/50 text-xs md:text-sm">
                     Select a solution below to see it in action.
                  </p>
               </div>

               {/* Video Mockup (Compact Scale & Padding) */}
               <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl md:rounded-[2rem] bg-brand-black overflow-hidden border-4 md:border-[6px] border-light-cream shadow-xl mb-6 md:mb-8 flex flex-col justify-end group">
                  <div className="absolute inset-0 grid-bg opacity-10" />

                  {/* Centered Play Button (Scaled Down) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <button className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-accent-gold bg-accent-gold/10 text-accent-gold flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                        <Play size={24} className="ml-1 md:w-6 md:h-6" />
                     </button>
                  </div>

                  {/* Video Inner Content (Reduced Padding) */}
                  <div className="relative z-10 p-5 md:p-8 bg-gradient-to-t from-brand-black/95 to-transparent flex flex-col sm:flex-row justify-between sm:items-end gap-3 md:gap-4">
                     <div>
                        <h3 className="text-lg md:text-xl font-display font-bold text-pure-white mb-1">
                           {solutions[activeSol]?.name}
                        </h3>
                        <p className="text-pure-white/50 text-[11px] md:text-xs">
                           Real-world walkthrough · Implementation scenario
                        </p>
                     </div>
                     <div className="self-start sm:self-auto px-4 py-1.5 bg-brand-walnut/70 border border-accent-gold text-accent-gold text-[9px] md:text-[10px] font-bold uppercase rounded-full tracking-wider">
                        Live Demo
                     </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                     <motion.div
                        layoutId="track"
                        className="h-full bg-accent-gold"
                        style={{ width: "35%" }}
                     />
                  </div>
               </div>

               {/* Scrollable Solution Cards (Scaled & Balanced) */}
               <div className="max-w-4xl mx-auto">
                  <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                     {solutions.map((sol, i) => (
                        <button
                           key={sol.id}
                           onClick={() => setActiveSol(i)}
                           className={`flex flex-col items-start gap-3 p-4 md:p-5 rounded-2xl min-w-[150px] md:min-w-[170px] border transition-all snap-start ${activeSol === i
                              ? "bg-light-cream border-brand-walnut/40 walnut-glow shadow-sm"
                              : "bg-pure-white border-cool-gray/30 hover:border-cool-gray"
                              }`}
                        >
                           <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center ${activeSol === i
                                 ? "bg-brand-walnut text-pure-white"
                                 : "bg-slate-blue/5 text-slate-blue/40"
                                 }`}
                           >
                              <Layers size={16} />
                           </div>
                           <span className="text-[13px] md:text-sm font-bold text-left text-slate-blue leading-tight">
                              {sol.name}
                           </span>
                        </button>
                     ))}
                  </div>
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
