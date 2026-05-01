import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import {
   Building2,
   ChevronRight,
   ArrowRight,
   Shield,
   Users,
   Activity,
   Zap,
   Monitor,
   Settings,
   CheckCircle2,
   Clock,
   ArrowUpRight,
   Truck
} from "lucide-react";
import { domains } from "../constants/domains";

export default function DomainDetail() {
   const { domain } = useParams();

   const currentDomain = domains.find(d => d.id === domain);
   const formattedDomain = currentDomain ? currentDomain.name : (domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "Enterprise");

   const subDomains = [
      { title: "Main Gate / Entry Area", route: "entry" },
      { title: "Admin Block", route: "admin" },
      { title: "Classrooms", route: "classrooms" },
      { title: "Laboratories", route: "labs" },
      { title: "Library", route: "library" },
      { title: "Auditorium", route: "auditorium" },
      { title: "Canteen / Cafeteria", route: "canteen" },
      { title: "Parking Area", route: "parking" },
      { title: "Hostel Block", route: "hostel" },
   ];

   return (
      <div className="flex flex-col pt-20">
         {/* ── HERO ── */}
         <section className="relative min-h-[500px] lg:min-h-[70vh] flex items-center justify-center bg-brand-black overflow-hidden pt-16 pb-20">
            {/* ── BACKGROUND LAYER ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-sky/15 via-brand-black to-brand-black" />

            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none blur-sm text-accent-sky">
               <Building2 size={400} strokeWidth={1} />
            </div>

            {/* ── CONTENT LAYER ── */}
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

               {/* Animated Badge */}
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-sky/20 bg-accent-sky/5 text-accent-sky text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-sky animate-pulse" />
                  Domain · {domain?.toUpperCase() || "OVERVIEW"}
               </div>

               {/* Headline (Scaled Down) */}
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pure-white mb-5 leading-[1.15] text-balance max-w-4xl tracking-tight">
                  Smart Systems for <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-sky to-blue-400">
                     {formattedDomain} Operations
                  </span>
               </h1>

               {/* Supporting Subheadline (Scaled Down) */}
               <p className="text-pure-white/60 text-sm md:text-base max-w-xl mb-8 leading-relaxed text-balance">
                  Deploy intelligent automation, real-time analytics, and secure access systems tailored specifically for your operational environment.
               </p>

               {/* CTAs (Scaled Down) */}
               <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                  <button className="px-6 py-3.5 text-sm bg-accent-sky text-brand-black font-bold rounded-xl shadow-lg shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-sky-500/25 flex items-center justify-center gap-2 group w-full sm:w-auto">
                     Explore Sub-Domains
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-6 py-3.5 text-sm border border-pure-white/20 text-pure-white font-bold rounded-xl hover:bg-pure-white/5 hover:border-pure-white/40 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                     Talk to Expert
                  </button>
               </div>
            </div>

            {/* ── SCROLL INDICATOR ── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
               <span className="text-[9px] font-bold text-pure-white/40 uppercase tracking-[0.2em]">Discover</span>
               <div className="w-[1px] h-8 bg-pure-white/20 relative overflow-hidden">
                  <div className="w-full h-1/2 bg-pure-white/60 animate-[scrolldown_1.5s_ease-in-out_infinite]" />
               </div>
            </div>
         </section>

         {/* ── OVERVIEW ── */}
         <section className="py-16 md:py-24 bg-light-gray">
            <div className="container mx-auto px-6 max-w-3xl flex flex-col items-center text-center">

               {/* Centered Decorative Line */}
               <div className="w-16 h-1 rounded-full bg-brand-walnut mb-6 md:mb-8" />

               {/* Heading */}
               <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-blue mb-6 leading-tight text-balance">
                  End-to-end smart infrastructure <br className="hidden sm:block" />
                  for {domain} environments
               </h2>

               {/* Paragraph */}
               <p className="text-slate-blue/60 text-base md:text-lg leading-relaxed mb-10 text-balance">
                  We refine every touchpoint of your {domain} facility. From automated entry points to intelligent energy systems, our solutions create a synchronized ecosystem.
               </p>

               {/* Centered Features List */}
               <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
                  {["Integrated access solutions", "Real-time presence analytics", "Proactive facility alerts"].map((pt, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal shrink-0">
                           <CheckCircle2 size={14} strokeWidth={2.5} />
                        </div>

                        <span className="text-sm md:text-base font-semibold tracking-wide text-slate-blue/90 leading-relaxed">
                           {pt}
                        </span>
                     </div>
                  ))}
               </div>

            </div>
         </section>

         {/* ── SUB-DOMAINS GRID ── */}
         <section className="py-24 bg-pure-white">
            <div className="container mx-auto px-6">
               <div className="text-center mb-16 px-4">
                  <span className="text-xs font-bold text-brand-walnut uppercase tracking-[.2em] mb-4 block">Areas of Implementation</span>
                  <h2 className="text-3xl font-display font-bold text-slate-blue mb-4">Specific Sub-Domains</h2>
                  <div className="w-20 h-1 bg-slate-blue/10 mx-auto" />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subDomains.map((sd, i) => (
                     <Link
                        key={i}
                        to={`/domains/${domain}/${sd.route}`}
                        className="group relative h-48 rounded-[2.5rem] overflow-hidden bg-light-cream border border-cool-gray/30 p-8 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-2xl"
                     >
                        <div className="absolute inset-0 grid-bg opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-light-cream via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex justify-between items-start w-full">
                           <div className="w-10 h-10 rounded-xl bg-slate-blue/5 flex items-center justify-center text-slate-blue/40 group-hover:bg-brand-walnut group-hover:text-pure-white transition-all">
                              <Monitor size={20} />
                           </div>
                           <div className="w-8 h-8 rounded-full bg-pure-white border border-cool-gray/30 flex items-center justify-center text-slate-blue/20 group-hover:text-brand-walnut transition-colors">
                              <ArrowUpRight size={18} />
                           </div>
                        </div>

                        <div className="relative z-10">
                           <h4 className="text-lg font-bold text-slate-blue">{sd.title}</h4>
                           <p className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-widest mt-1">/domains/{domain}/{sd.route}</p>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>

         {/* ── SOLUTIONS SECTION ── */}
         <section className="py-24 bg-light-gray">
            <div className="container mx-auto px-6">
               <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-brand-walnut uppercase tracking-[.2em] mb-4 block">Ecosystem</span>
                  <h2 className="text-3xl font-display font-bold text-slate-blue mb-16">Smart Systems for {domain?.toUpperCase()}</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                     {[
                        { t: "Smart Access", icon: Shield },
                        { t: "Attendance", icon: Users },
                        { t: "Surveillance", icon: Activity },
                        { t: "Intelligence", icon: Zap },
                        { t: "Tracking", icon: Truck },
                        { t: "Facility", icon: Settings },
                        { t: "Energy", icon: Zap },
                        { t: "Analytics", icon: Monitor }
                     ].map((s, i) => (
                        <div key={i} className="bg-pure-white p-8 rounded-3xl border border-cool-gray/30 hover:border-brand-walnut transition-all group">
                           <div className="w-10 h-10 rounded-xl bg-slate-blue/5 flex items-center justify-center text-accent-sky mx-auto mb-4 group-hover:bg-accent-sky group-hover:text-brand-black transition-all">
                              <s.icon size={20} />
                           </div>
                           <h4 className="font-bold text-slate-blue text-xs uppercase tracking-widest">{s.t}</h4>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ── CTA ── */}
         <section className="py-24 bg-brand-black relative">
            <div className="container mx-auto px-6 text-center z-10 relative">
               <h2 className="text-3xl md:text-5xl font-display font-bold text-pure-white mb-8">Start Your {domain?.toUpperCase()} Transformation</h2>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link to="/consultation" className="px-10 py-5 bg-brand-walnut text-pure-white font-bold rounded-2xl transition-all hover:scale-105">Get Free Consultation</Link>
                  <Link to="/contact" className="px-10 py-5 border border-pure-white/20 text-pure-white font-bold rounded-2xl transition-all hover:bg-white/5">Contact Support</Link>
               </div>
            </div>
         </section>
      </div>
   );
}


