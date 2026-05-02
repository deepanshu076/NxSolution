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
import { domains } from "../constants/domains";

const solutions = [
  { name: "Smart Access Systems", image: "/images/smart access system.jpeg", icon: <Fingerprint size={32} strokeWidth={1.5} /> },
  { name: "Attendance Systems", image: "/images/attendance system.jpeg", icon: <UserCheck size={32} strokeWidth={1.5} /> },
  { name: "Security Intel", image: "/images/security intelligence.jpeg", icon: <ShieldAlert size={32} strokeWidth={1.5} /> },
  { name: "Surveillance Monitoring", image: "/images/survillance monitoring.jpeg", icon: <Cctv size={32} strokeWidth={1.5} /> }, { name: "Facility Management", image: "/images/facility management.jpeg", icon: <Building size={32} strokeWidth={1.5} /> },
  { name: "Analytics Dashboard", image: "/images/analytics dashboard.jpeg", icon: <BarChart3 size={32} strokeWidth={1.5} /> }
];

export default function Domains() {
  return (
    <div className="flex flex-col pt-16 md:pt-20">
      {/* ── HERO SECTION ── */}
      <section className="relative py-12 md:py-16 lg:py-24 bg-brand-black text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex gap-px">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-1 bg-soft-white" />
          ))}
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-walnut opacity-10 rounded-xl rotate-45" />
        <div className="absolute -bottom-16 -left-8 w-32 h-32 bg-warm-gold-beige opacity-5 rounded-xl rotate-45" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-gold-beige/20 bg-warm-gold-beige/5 text-warm-gold-beige font-bold text-xs uppercase tracking-widest mb-6 text-center text-balance">
            Our Expertise
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-soft-white mb-4 max-w-2xl leading-tight text-balance">
            Domains We Power with <br className="hidden sm:block" /> <span className="text-warm-gold-beige">Smart Ecosystems</span>
          </h1>
          <p className="text-soft-white/60 text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-8 leading-relaxed text-balance">
            Intelligent systems tailored for different industries — solving real operational challenges across diverse environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link to="/solutions" className="px-6 py-3.5 bg-brand-walnut text-soft-white rounded-xl font-bold transition-all hover:bg-brand-black border border-brand-walnut shadow-xl w-full sm:w-auto text-center text-sm">
              Explore Solutions
            </Link>
            <button className="px-6 py-3.5 border border-soft-white/20 text-soft-white rounded-xl font-bold hover:bg-soft-white/5 backdrop-blur-sm transition-all w-full sm:w-auto text-center text-sm">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION (Reduced Size) ── */}
      <section className="py-10 md:py-14 bg-warm-cream/30 border-b border-soft-taupe/30">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-xs md:text-sm font-bold text-brand-walnut uppercase tracking-[0.2em] mb-3">
            Overview
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-4 text-balance text-brand-black leading-tight">
            Built for Diverse Operational Environments
          </h3>
          <p className="text-charcoal/70 text-sm md:text-base leading-relaxed mx-auto max-w-2xl text-balance">
            Every industry has unique workflows and risks. Our smart systems adapt to each environment — delivering better control, visibility, and efficiency where it counts.
          </p>
        </div>
      </section>

      {/* ── DOMAINS GRID ── */}
      <section className="py-12 md:py-16 bg-soft-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-10 md:mb-12 text-center">
            <span className="text-xs font-bold text-brand-walnut tracking-[0.3em] uppercase mb-3">Explore Domains</span>
            <div className="h-1 w-12 md:w-16 bg-brand-walnut/30 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 gap-y-8 md:gap-y-10">
            {domains.map((dom) => (
              <Link
                key={dom.id}
                to={`/domains/${dom.id}`}
                className="group block flex-col items-center text-center"
              >
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-warm-cream mb-3 border border-soft-taupe/10 transition-shadow group-hover:shadow-md relative">
                  <img
                    src={dom.image}
                    alt={dom.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold text-brand-black group-hover:text-brand-walnut transition-colors leading-snug px-1">
                  {dom.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS PREVIEW SLIDER (Smaller Cards) ── */}
      <section className="py-8 md:py-12 bg-warm-cream">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-5xl">

          {/* Section Header */}
          <div className="mb-8 md:mb-10">
            <span className="text-[10px] font-bold text-brand-walnut uppercase tracking-[0.3em] block mb-2.5 px-3 py-1 border border-brand-walnut/10 w-fit mx-auto rounded-full">
              Solutions
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-black leading-tight text-balance">
              Integrated Smart Solutions
            </h2>
          </div>

          {/* Grid Container: 
          Decreased minmax from 280px to 220px for smaller cards.
          Tightened the gap between cards.
        */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 md:gap-5">
            {solutions.map((sol, i) => (
              <div
                key={i}
                className="bg-soft-white rounded-xl border border-soft-taupe/30 transition-all duration-300 hover:border-brand-walnut group flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 h-full min-h-[200px] overflow-hidden cursor-pointer"
              >
                {/* Image Container - Reduced height */}
                <div className="w-full h-32 sm:h-36 relative overflow-hidden bg-brand-black/5 flex-shrink-0">
                  <img
                    src={sol.image || "/api/placeholder/400/300"}
                    alt={sol.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text & Icon Content Container - Reduced padding and text sizes */}
                <div className="p-4 md:p-5 flex flex-col items-center justify-center text-center flex-1">
                  <div className="text-brand-black/40 group-hover:text-brand-walnut transition-colors duration-300 mb-3 bg-warm-cream/50 p-2.5 rounded-full">
                    {sol.icon}
                  </div>
                  <h4 className="font-bold text-brand-black text-sm md:text-base leading-tight group-hover:text-brand-walnut transition-colors">
                    {sol.name}
                  </h4>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-soft-white">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-brand-black rounded-[2rem] p-8 sm:p-10 md:p-12 overflow-hidden text-center z-10 shadow-xl">

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-brand-walnut/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-warm-gold-beige/10 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-[10px] md:text-xs font-bold text-brand-walnut uppercase tracking-[0.3em] block mb-4 bg-brand-walnut/10 px-3 py-1.5 rounded-full border border-brand-walnut/20">
                Let's Collaborate
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-soft-white mb-4 leading-tight text-balance">
                Ready to Build a Smarter Ecosystem for Your Domain?
              </h2>

              <p className="text-soft-white/60 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed text-balance">
                Talk to our experts to discover tailored intelligent systems. Choose how you'd like to connect — we typically respond within 2 business hours.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/consultation"
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-walnut text-soft-white text-sm font-bold rounded-xl transition-all duration-300 hover:bg-soft-white hover:text-brand-black shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                  Get Free Consultation
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 border border-soft-white/20 text-soft-white text-sm font-bold rounded-xl transition-all duration-300 hover:bg-soft-white/10 hover:border-soft-white/40 flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}