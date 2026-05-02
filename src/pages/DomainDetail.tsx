import { motion } from "motion/react";
import { useState } from "react";
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
   const [activeTab, setActiveTab] = useState<"real" | "demo">("real");
   const [carouselIdx, setCarouselIdx] = useState(0);

   const realProjects = [
      { id: "r1", title: "Smart Campus Integration", label: "University of Excellence", route: "/domains/education/library/delhi-lib", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80" },
      { id: "r2", title: "Delhi Public Library System", label: "Government Initiative", route: "/domains/education/library/delhi-lib", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80" },
      { id: "r3", title: "Automated Attendance Network", label: "Corporate Campus", route: "/domains/education/library/delhi-lib", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
   ];

   const demoProjects = [
      { id: "d1", title: "University Hub Setup", label: "Demo Environment", route: "/domains/education/library/uni-demo", image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80" },
      { id: "d2", title: "Smart Warehouse Blueprint", label: "Logistics Demo", route: "/domains/education/library/uni-demo", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" },
      { id: "d3", title: "Healthcare Monitoring Plan", label: "Hospital Demo", route: "/domains/education/library/uni-demo", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" },
   ];

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
      { title: "Reception / Help Desk", route: "help" },
      { title: "Faculty Cabins / Staff Room", route: "staff" },
      { title: "Accounts Office", route: "account" },
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

         {/* ── PROJECTS SHOWCASE (Tabbed Carousel) ── */}
         <section className="py-16 md:py-24 bg-light-cream border-t border-cool-gray/30">
            <div className="container mx-auto px-6">

               {/* Tabs */}
               <div className="flex justify-center mb-10 md:mb-14">
                  <div className="inline-flex bg-pure-white rounded-full p-1.5 border border-cool-gray/30 shadow-sm">
                     <button
                        onClick={() => { setActiveTab("real"); setCarouselIdx(0); }}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === "real"
                           ? "bg-brand-walnut text-pure-white shadow-md"
                           : "text-slate-blue/50 hover:text-slate-blue"
                           }`}
                     >
                        <CheckCircle2 size={14} /> Real Projects
                     </button>
                     <button
                        onClick={() => { setActiveTab("demo"); setCarouselIdx(0); }}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === "demo"
                           ? "bg-brand-walnut text-pure-white shadow-md"
                           : "text-slate-blue/50 hover:text-slate-blue"
                           }`}
                     >
                        <Zap size={14} /> Demo Projects
                     </button>
                  </div>
               </div>

               {/* Carousel */}
               <div className="relative max-w-5xl mx-auto">
                  {/* Left Arrow */}
                  <button
                     onClick={() => setCarouselIdx(Math.max(0, carouselIdx - 1))}
                     className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-pure-white border border-cool-gray/30 shadow-lg flex items-center justify-center text-slate-blue/40 hover:text-brand-walnut hover:border-brand-walnut/30 transition-all"
                  >
                     <ChevronRight size={20} className="rotate-180" />
                  </button>

                  {/* Right Arrow */}
                  <button
                     onClick={() => setCarouselIdx(Math.min((activeTab === "real" ? realProjects : demoProjects).length - 1, carouselIdx + 1))}
                     className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-pure-white border border-cool-gray/30 shadow-lg flex items-center justify-center text-slate-blue/40 hover:text-brand-walnut hover:border-brand-walnut/30 transition-all"
                  >
                     <ChevronRight size={20} />
                  </button>

                  {/* Cards Row */}
                  <div className="overflow-hidden rounded-3xl">
                     <motion.div
                        className="flex gap-6"
                        animate={{ x: `-${carouselIdx * 52}%` }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                     >
                        {(activeTab === "real" ? realProjects : demoProjects).map((proj) => (
                           <Link
                              key={proj.id}
                              to={proj.route}
                              className="flex-shrink-0 w-[48%] md:w-[48%] group"
                           >
                              <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden bg-brand-black border border-cool-gray/20 shadow-lg">
                                 <img
                                    src={proj.image}
                                    alt={proj.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />
                                 <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-lg md:text-xl font-display font-bold text-pure-white mb-1 group-hover:text-accent-gold transition-colors">
                                       {proj.title}
                                    </h3>
                                    <span className="text-[10px] font-bold text-pure-white/40 uppercase tracking-[.2em]">
                                       {proj.label}
                                    </span>
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </motion.div>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                     {(activeTab === "real" ? realProjects : demoProjects).map((_, i) => (
                        <button
                           key={i}
                           onClick={() => setCarouselIdx(i)}
                           className={`w-2 h-2 rounded-full transition-all duration-300 ${carouselIdx === i ? "bg-brand-walnut w-6" : "bg-cool-gray/30 hover:bg-cool-gray/60"}`}
                        />
                      ))}
                   </div>
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
         <section className="bg-light-gray overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
               <div className="flex flex-col items-center text-center w-full max-w-6xl mx-auto">
                  <span className="text-[10px] font-bold text-brand-walnut uppercase tracking-[.2em] mb-3 block">
                     Ecosystem
                  </span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-slate-blue mb-10 md:mb-12">
                     Smart Systems for {domain?.toUpperCase()}
                  </h2>

                  {/* Grid: Tighter gaps and fixed column count for mobile to prevent massive cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                     {[
                        { t: "Smart Access", image: "/images/smart access system.jpeg" },
                        { t: "Attendance", image: "/images/attendance system.jpeg" },
                        { t: "Surveillance", image: "/images/survillance monitoring.jpeg" },
                        { t: "Intelligence", image: "/images/security intelligence.jpeg" },
                        { t: "Tracking", image: "/images/tracking system.jpeg" },
                        { t: "Facility", image: "/images/facility management.jpeg" },
                        { t: "Energy", image: "/images/energy optimization.jpeg" },
                        { t: "Analytics", image: "/images/analytics system.jpeg" }
                     ].map((s, i) => (
                        <div
                           key={i}
                           className="relative aspect-[4/3] sm:aspect-[4/3] bg-pure-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                           {/* Background Image Container */}
                           <div className="absolute inset-0">
                              <img
                                 src={s.image}
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                 alt={s.t}
                              />
                              {/* Overlays for depth and readability */}
                              <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/10 transition-colors" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                           </div>

                           {/* Content: Title overlaid on image */}
                           <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col justify-end">
                              <h4 className="font-bold text-soft-white text-[10px] md:text-xs lg:text-sm uppercase tracking-wider text-balance group-hover:text-warm-gold-beige transition-colors">
                                 {s.t}
                              </h4>
                           </div>

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


