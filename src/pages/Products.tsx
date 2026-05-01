import { motion } from "motion/react";
import { 
  Shield, 
  Monitor, 
  Activity, 
  Zap, 
  Settings, 
  BarChart3, 
  ArrowRight,
  Database,
  Cpu,
  Smartphone,
  Server,
  Cloud,
  Layers,
  ChevronRight,
  ArrowUpRight,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { 
    name: "Access Control Devices", 
    desc: "Biometric readers, RFID terminals, smart locks, and gate controllers for entry management.",
    icon: Shield 
  },
  { 
    name: "Surveillance Systems", 
    desc: "IP cameras, NVR/DVR units, and AI-powered video analytics for perimeter monitoring.",
    icon: Monitor 
  },
  { 
    name: "Sensors & IoT Devices", 
    desc: "Motion, temperature, occupancy, and environmental sensors for live data collection.",
    icon: Activity 
  },
  { 
    name: "Automation Controllers", 
    desc: "PLCs, relay modules, and edge computing units that trigger automated actions.",
    icon: Settings 
  },
  { 
    name: "Monitoring Dashboards", 
    desc: "Web and app-based control panels for real-time visibility, alerts, and reporting.",
    icon: BarChart3 
  },
  { 
    name: "Network Infrastructure", 
    desc: "Managed switches, PoE equipment, and structured cabling for reliable connectivity.",
    icon: Server 
  },
];

const domains = [
  { id: "education", name: "Education", icon: "🏫", sub: "Access · Attendance · Surveillance", color: "#1a1a18" },
  { id: "manufacturing", name: "Manufacturing", icon: "🏭", sub: "Sensors · Automation · Tracking", color: "#1c1a18" },
  { id: "healthcare", name: "Healthcare", icon: "🏥", sub: "Access · Energy · Monitoring", color: "#181c1a" },
  { id: "corporate", name: "Corporate", icon: "🏢", sub: "Access · Automation · Analytics", color: "#1a1c18" },
  { id: "retail", name: "Retail", icon: "🏪", sub: "Surveillance · IoT · Analytics", color: "#1c1818" },
  { id: "logistics", name: "Logistics", icon: "🏗", sub: "Tracking · Network · Automation", color: "#181a1c" },
];

export default function Products() {
  return (
    <div className="flex flex-col pt-20">
      {/* ── TECH HERO SECTION ── */}
      <section className="relative py-24 bg-brand-black overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        
        {/* Abstract Hardware Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <svg className="w-full h-full" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                 <pattern id="chipPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect x="10" y="10" width="30" height="30" rx="3" fill="none" stroke="white" strokeWidth="0.5" />
                    <line x1="40" y1="25" x2="60" y2="25" stroke="white" strokeWidth="0.5" />
                    <circle cx="70" cy="25" r="4" fill="none" stroke="white" strokeWidth="0.5" />
                 </pattern>
              </defs>
              <rect width="1000" height="500" fill="url(#chipPattern)" />
           </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism text-warm-gold-beige font-bold text-xs uppercase tracking-widest mb-8 border border-white/10">
                Hardware + Software · Integrated
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-soft-white mb-6 leading-[1.1] text-balance">
                Technology That Powers Our <span className="text-warm-gold-beige">Smart Solutions</span>
              </h1>
              <p className="text-soft-white/60 text-lg md:text-xl mb-10 leading-relaxed max-w-md">
                Our products are part of integrated smart systems designed to deliver reliable, scalable, and efficient operational outcomes.
              </p>
              <div className="flex flex-wrap gap-4">
                 <button className="px-10 py-5 bg-brand-walnut text-soft-white font-bold rounded-xl hover:bg-dark-coffee transition-all shadow-xl shadow-brand-walnut/20">Explore Solutions</button>
                 <button className="px-10 py-5 border border-soft-white/20 text-soft-white font-bold rounded-xl hover:bg-soft-white/5 backdrop-blur-sm transition-all">Talk to Expert</button>
              </div>
           </div>

           <div className="relative hidden lg:block">
              <div className="aspect-square bg-brand-walnut/10 rounded-[4rem] border-2 border-soft-white/5 p-16 relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 grid-bg opacity-10" />
                 <div className="relative z-10 grid grid-cols-2 gap-8 h-full">
                    <div className="bg-soft-white/5 rounded-3xl p-10 flex flex-col justify-between border border-white/10 hover:bg-soft-white/10 transition-colors">
                       <Cpu size={40} className="text-warm-gold-beige" />
                       <div className="h-2 w-16 bg-white/20 rounded-full" />
                    </div>
                    <div className="bg-brand-walnut rounded-3xl p-10 flex flex-col justify-between shadow-2xl scale-110">
                       <Layers size={40} className="text-soft-white" />
                       <div className="h-2 w-20 bg-brand-black/20 rounded-full" />
                    </div>
                    <div className="bg-soft-white/5 rounded-3xl p-10 flex flex-col justify-between border border-white/10 hover:bg-soft-white/10 transition-colors">
                       <Smartphone size={40} className="text-warm-gold-beige" />
                       <div className="h-2 w-16 bg-white/20 rounded-full" />
                    </div>
                    <div className="bg-soft-white/5 rounded-3xl p-10 flex flex-col justify-between border border-white/10 hover:bg-soft-white/10 transition-colors">
                       <Cloud size={40} className="text-warm-gold-beige" />
                       <div className="h-2 w-16 bg-white/20 rounded-full" />
                    </div>
                 </div>
              </div>
              {/* Float badge */}
              <div className="absolute -bottom-10 -left-10 glass-morphism p-8 rounded-3xl border border-white/10 shadow-2xl walnut-glow">
                 <div className="text-3xl font-display font-bold text-warm-gold-beige">Sync</div>
                 <div className="text-[10px] text-soft-white/40 font-bold uppercase tracking-[0.3em] mt-2">Systems Operational</div>
              </div>
           </div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section className="py-24 bg-soft-white border-b border-soft-taupe/30">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1">
                 <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase mb-4 block">Overview</span>
                 <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-black mb-6 leading-tight">Not Just Products — Complete Smart Systems</h2>
                 <p className="text-charcoal/60 text-lg leading-relaxed mb-8">
                   We combine hardware and software components to build intelligent systems tailored to real operational environments. Every component is selected and configured for the specific domain and use case.
                 </p>
                 <div className="flex flex-wrap gap-3">
                    {["Hardware", "Software", "IoT Devices", "Dashboards", "Sensors", "Controllers"].map(p => (
                      <span key={p} className="px-6 py-2 bg-warm-cream rounded-full text-brand-black/60 text-xs font-bold border border-soft-taupe/50">{p}</span>
                    ))}
                 </div>
              </div>
              <div className="flex-1 space-y-6">
                 {[
                   { l: "Deployment model", v: "Domain-first · Solution-specific · Fully integrated" },
                   { l: "Core principle", v: "No standalone products — every component is part of a system" }
                 ].map((item, i) => (
                   <div key={i} className="bg-warm-cream/30 p-10 rounded-[2.5rem] border border-soft-taupe/30">
                      <div className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest mb-3">{item.l}</div>
                      <div className="text-xl font-display font-bold text-brand-black leading-tight">{item.v}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── PRODUCTS BY DOMAIN SECTION ── */}
      <section className="py-24 bg-warm-cream/50">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase mb-1 block">Products by domain</span>
              <h2 className="text-3xl font-display font-bold text-brand-black">Deployed Across Different Domains</h2>
              <p className="text-brand-black/50 text-sm max-w-lg mt-4">Select a domain to explore how our technology components are deployed in that environment.</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((dom) => (
                <Link 
                   key={dom.id}
                   to={`/domains/${dom.id}`}
                   className="group relative h-64 rounded-[2.5rem] overflow-hidden border border-soft-taupe/30 bg-brand-black transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                >
                   {/* Mock Pattern Background */}
                   <div className="absolute inset-0 bg-brand-black">
                      <div className="absolute inset-0 grid-bg opacity-10" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[10rem] transition-transform duration-700 group-hover:scale-110">
                        {dom.icon}
                      </div>
                   </div>
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                   
                   <div className="absolute top-8 right-8 w-12 h-12 rounded-full glass-morphism flex items-center justify-center text-warm-gold-beige opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 shadow-xl">
                      <ArrowUpRight size={24} />
                   </div>

                   <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                      <div className="w-10 h-10 rounded-xl bg-soft-white/10 flex items-center justify-center text-soft-white/60 group-hover:text-warm-gold-beige transition-colors mb-4">
                         <Layers size={20} />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-soft-white mb-2">{dom.name}</h3>
                      <p className="text-soft-white/50 text-xs uppercase font-bold tracking-widest">{dom.sub}</p>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* ── CORE COMPONENTS SECTION ── */}
      <section className="py-24 bg-soft-white text-center">
        <div className="container mx-auto px-6">
           <div className="mb-20">
              <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase mb-1 block">Core components</span>
              <h2 className="text-4xl font-display font-bold text-brand-black">Core Technology Components</h2>
              <p className="text-brand-black/50 text-lg max-w-lg mx-auto mt-4">An awareness of what goes into a smart system — not a product catalog.</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] border border-soft-taupe/30 hover:border-brand-walnut transition-all text-left flex flex-col items-start group hover:bg-warm-cream/10">
                   <div className="w-16 h-16 rounded-2xl bg-warm-cream flex items-center justify-center text-brand-black mb-8 group-hover:bg-brand-walnut group-hover:text-soft-white transition-all shadow-md">
                      <cat.icon size={28} />
                   </div>
                   <h4 className="font-bold text-brand-black text-xl mb-4 leading-tight">{cat.name}</h4>
                   <p className="text-charcoal/50 text-sm leading-relaxed mb-10">{cat.desc}</p>
                   <div className="mt-auto w-10 h-1.5 bg-soft-taupe/30 rounded-full group-hover:bg-brand-walnut group-hover:w-24 transition-all" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── SYSTEM FLOW SECTION ── */}
      <section className="py-24 bg-warm-cream/30 relative overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="text-center mb-20 px-4">
              <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase mb-1 block">System thinking</span>
              <h2 className="text-4xl font-display font-bold text-brand-black">Integrated into Smart System Ecosystems</h2>
              <p className="text-charcoal/50 text-lg max-w-2xl mx-auto mt-6">Our products are not standalone — they work together as part of complete smart systems that automate operations.</p>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
              {[
                { t: "Product", d: "Hardware or component", icon: Cpu },
                { t: "System", d: "Components together", icon: Layers },
                { t: "Solution", d: "Outcome achieved", icon: CheckCircle2 },
                { t: "Domain", d: "Environment served", icon: Globe }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-6 w-full">
                   <div className="bg-soft-white p-10 rounded-[2.5rem] border border-soft-taupe/30 text-center w-full shadow-lg hover:shadow-xl transition-shadow">
                      <div className="w-14 h-14 rounded-2xl bg-brand-walnut/5 flex items-center justify-center text-brand-walnut mb-6 mx-auto">
                         <item.icon size={28} />
                      </div>
                      <h4 className="font-bold text-brand-black text-lg mb-2">{item.t}</h4>
                      <p className="text-charcoal/40 text-xs leading-relaxed px-4">{item.d}</p>
                   </div>
                   {i < 3 && <ArrowRight className="text-soft-taupe/50 rotate-90 md:rotate-0 hidden md:block" key={`arr-${i}`} size={32} />}
                </div>
              ))}
           </div>
           
           <div className="mt-20 text-center">
              <p className="text-charcoal/40 max-w-2xl mx-auto text-base leading-relaxed italic">
                "Every product is selected, configured, and deployed as part of a complete system — never in isolation. This is what makes our implementations reliable and scalable."
              </p>
           </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-32 bg-brand-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        <div className="container mx-auto px-6 relative z-10">
           <span className="text-xs font-bold text-soft-white/40 tracking-widest uppercase mb-4 block">Ready to build</span>
           <h2 className="text-4xl md:text-6xl font-display font-bold text-soft-white mb-10 max-w-3xl mx-auto leading-tight">Build a Complete Smart System for Your Operations</h2>
           <p className="text-soft-white/50 text-xl mb-16 max-w-2xl mx-auto leading-relaxed">Tell us your operational challenges — we'll design the right system around them.</p>
           <div className="flex flex-wrap justify-center gap-8">
              <Link to="/consultation" className="px-12 py-6 bg-brand-walnut text-soft-white font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl">Get Free Consultation</Link>
              <Link to="/solutions" className="px-12 py-6 border border-soft-white/10 text-soft-white font-bold rounded-2xl transition-all hover:bg-soft-white/5 backdrop-blur-md">Explore Solutions</Link>
           </div>
        </div>
      </section>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";
