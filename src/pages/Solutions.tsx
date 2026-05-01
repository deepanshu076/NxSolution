import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Factory, 
  Stethoscope, 
  Briefcase, 
  ShoppingBag, 
  Truck, 
  Landmark, 
  Home as HomeIcon,
  Shield,
  Users,
  Activity,
  Monitor,
  Zap,
  Settings,
  BarChart3,
  ChevronRight,
  ArrowRight,
  PlusCircle,
  Database,
  Droplets,
  HardHat,
  Network
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const domainList = [
  { id: "education", name: "Education", icon: Building2 },
  { id: "manufacturing", name: "Manufacturing", icon: Factory },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope },
  { id: "corporate", name: "Corporate", icon: Briefcase },
  { id: "retail", name: "Retail", icon: ShoppingBag },
  { id: "logistics", name: "Logistics", icon: Truck },
  { id: "government", name: "Government", icon: Landmark },
  { id: "residential", name: "Residential", icon: HomeIcon },
];

const solutionsData = {
  education: [
    { name: "Smart Access Systems", desc: "Automated entry and verification control for campuses.", icon: Shield },
    { name: "Attendance Systems", desc: "Real-time presence tracking and reporting.", icon: Users },
    { name: "Surveillance Systems", desc: "24/7 monitoring with intelligent safety alerts.", icon: Activity },
    { name: "Library Management", desc: "Automated lending and digital asset tracking.", icon: Database },
    { name: "Transport Tracking", desc: "Campus fleet and vehicle location monitoring.", icon: Truck },
    { name: "Facility Management", desc: "Maintenance upkeep and space utilization analytics.", icon: Settings }
  ],
  manufacturing: [
    { name: "Movement Tracking", desc: "Real-time tracking of assets and floor personnel.", icon: Users },
    { name: "Energy Optimization", desc: "Smart consumption and predictive load management.", icon: Zap },
    { name: "Water Management", desc: "Usage monitoring and leakage detection systems.", icon: Droplets },
    { name: "Security Intelligence", desc: "Advanced threat detection for industrial sites.", icon: Activity },
    { name: "Workflow Automation", desc: "Process digitization and task routing systems.", icon: Settings },
    { name: "Inventory Management", desc: "Smart tracking of raw materials and finished goods.", icon: Database }
  ],
  healthcare: [
    { name: "Secure Zone Control", desc: "Role-based access for restricted medical areas.", icon: Shield },
    { name: "Patient Monitoring", desc: "Integrated smart sensors for real-time awareness.", icon: Activity },
    { name: "Staff Attendance", desc: "Contactless presence tracking for varied shifts.", icon: Users },
    { name: "Asset Management", desc: "Tracking critical equipment and samples.", icon: Database },
    { name: "Hygience Automation", desc: "Automated washroom and sanitation monitoring.", icon: Droplets },
    { name: "Energy Optimization", desc: "Intelligent lighting and HVAC control for labs.", icon: Zap }
  ],
  // Fallback for others to keep code small for demo
};

export default function Solutions() {
  const [activeDomain, setActiveDomain] = useState("education");

  const activeSolutions = solutionsData[activeDomain as keyof typeof solutionsData] || solutionsData.education;

  return (
    <div className="flex flex-col pt-20">
      {/* ── HERO SECTION ── */}
      <section className="relative py-24 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 opacity-10 grid-bg" />
        
        {/* Abstract Tech Visual */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                 <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-warm-gold-beige)" />
                    <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
              </defs>
              <g stroke="url(#lineGrad)" strokeWidth="0.5" fill="none">
                 <circle cx="200" cy="200" r="150" />
                 <circle cx="200" cy="200" r="100" />
                 <circle cx="200" cy="200" r="50" />
                 <line x1="200" y1="50" x2="200" y2="350" />
                 <line x1="50" y1="200" x2="350" y2="200" />
              </g>
           </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
           <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism text-warm-gold-beige font-bold text-xs uppercase tracking-widest mb-8">
                Smart Systems · Operations
              </div>
           <h1 className="text-[clamp(32px,6vw,72px)] font-display font-bold text-soft-white mb-8 leading-[1.1] text-balance">
                Integrated Smart Solutions for <span className="text-warm-gold-beige">Modern Operations</span>
              </h1>
              <p className="text-soft-white/50 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                Intelligent systems designed to simplify operations, improve control, and optimize performance across industries.
              </p>
              <div className="flex justify-center gap-4">
                 <button className="px-10 py-4 bg-brand-walnut text-soft-white font-bold rounded-xl hover:bg-dark-coffee transition-all shadow-xl shadow-brand-walnut/20">Explore Domains</button>
                 <button className="px-10 py-4 border border-soft-white/20 text-soft-white font-bold rounded-xl hover:bg-soft-white/5 backdrop-blur-sm transition-all">Talk to Expert</button>
              </div>
           </div>
        </div>
      </section>

      {/* ── INTERACTIVE DOMAIN SELECTOR ── */}
      <section className="py-24 bg-warm-cream border-b border-soft-taupe/30">
        <div className="container mx-auto px-6">
           <div className="mb-16 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-brand-walnut tracking-[0.3em] uppercase block mb-4 px-4 py-2 border border-brand-walnut/10 w-fit mx-auto rounded-full">Solutions by domain</span>
              <h2 className="text-[clamp(28px,4vw,48px)] font-display font-bold text-brand-black leading-tight">Integrated Smart Solutions</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
              {domainList.map((dom) => (
                <button
                  key={dom.id}
                  onClick={() => setActiveDomain(dom.id)}
                  className={`flex flex-col items-center justify-center gap-3 p-5 md:p-6 rounded-2xl border transition-all min-w-[120px] md:min-w-0 ${activeDomain === dom.id ? "bg-soft-white border-brand-walnut walnut-glow scale-105" : "bg-warm-cream border-soft-taupe/50 text-brand-black/40 hover:bg-soft-white"}`}
                >
                   <dom.icon size={24} className={activeDomain === dom.id ? "text-brand-walnut" : ""} />
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${activeDomain === dom.id ? "text-brand-black" : ""}`}>{dom.name}</span>
                </button>
              ))}
           </div>

           <div className="bg-soft-white rounded-[2.5rem] border border-soft-taupe/50 overflow-hidden shadow-2xl p-8 md:p-12">
              <div className="text-center mb-12">
                 <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-black mb-3">Solutions for {activeDomain.charAt(0).toUpperCase() + activeDomain.slice(1)}</h3>
                 <p className="text-charcoal/50 text-base max-w-2xl mx-auto">Industrial-grade components integrated into tailored ecosystems.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 <AnimatePresence mode="wait">
                    {activeSolutions.map((sol, i) => (
                      <motion.div
                        key={`${activeDomain}-${i}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-soft-white rounded-[2rem] p-8 md:p-10 border border-soft-taupe/30 hover:border-brand-walnut transition-all group flex flex-col justify-center text-center min-h-[180px] shadow-sm hover:shadow-md"
                      >
                         <h4 className="font-bold text-brand-black text-lg md:text-xl mb-4 group-hover:text-brand-walnut transition-colors">{sol.name}</h4>
                         <p className="text-charcoal/50 text-xs md:text-sm leading-relaxed">{sol.desc}</p>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </section>

      {/* ── FULL ECOSYSTEM SECTION ── */}
      <section className="py-24 bg-soft-white">
        <div className="container mx-auto px-6">
           <div className="flex flex-col items-center mb-16 text-center">
              <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase block mb-1">Full capability</span>
              <h2 className="text-3xl font-display font-bold text-brand-black">Our Complete Solution Ecosystem</h2>
              <p className="text-brand-black/40 text-sm max-w-lg mt-4">Every system is purpose-built and deployable across multiple environments.</p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { n: "01", t: "Smart Access Systems" },
                { n: "02", t: "Attendance & Presence Systems" },
                { n: "03", t: "Security Intelligence Systems" },
                { n: "04", t: "Surveillance & Monitoring" },
                { n: "05", t: "Movement Tracking" },
                { n: "06", t: "Energy Optimization" },
                { n: "07", t: "Water Management" },
                { n: "08", t: "Facility Management" },
                { n: "09", t: "Workflow Automation" },
                { n: "10", t: "Analytics & Decision" },
                { n: "11", t: "Custom Ecosystems" }
              ].map((item, i) => (
                <div key={i} className="bg-warm-cream/30 border border-soft-taupe/30 p-10 rounded-[2rem] hover:border-brand-walnut transition-all flex flex-col justify-between min-h-[160px] group">
                   <span className="text-warm-gold-beige font-display font-bold text-sm tracking-widest">{item.n}</span>
                   <h4 className="font-bold text-brand-black text-lg md:text-xl leading-tight mt-6 group-hover:text-brand-walnut transition-colors">{item.t}</h4>
                   <div className="h-1 w-12 bg-warm-gold-beige mt-8 rounded-full transition-all group-hover:w-20" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── PROBLEMS SECTION ── */}
      <section className="py-24 bg-warm-cream">
        <div className="container mx-auto px-6 text-center">
           <div className="mb-16">
              <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase block mb-1">Problems we solve</span>
              <h2 className="text-3xl font-display font-bold text-brand-black">Operational Challenges We Solve</h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "Manual operations", d: "Repetitive tasks consuming time and increasing error rates." },
                { t: "Lack of visibility", d: "No real-time insight into what's happening on the ground." },
                { t: "Security gaps", d: "Uncontrolled access and unmonitored entry points." },
                { t: "Delayed decisions", d: "Fragmented data slowing down critical operational choices." },
                { t: "Resource wastage", d: "Energy and water going unmanaged across facilities." },
                { t: "Inefficient workflows", d: "Disconnected processes causing redundancy and delays." }
              ].map((prob, i) => (
                <div key={i} className="bg-soft-white p-8 rounded-3xl border border-soft-taupe/50 text-left">
                   <div className="w-10 h-10 rounded-xl bg-brand-walnut/5 border border-soft-taupe/30 flex items-center justify-center text-brand-black/40 mb-6">
                      <ChevronRight size={20} />
                   </div>
                   <h4 className="font-bold text-brand-black mb-2">{prob.t}</h4>
                   <p className="text-charcoal/50 text-xs leading-relaxed">{prob.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 bg-brand-walnut relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grid-bg" />
        <div className="container mx-auto px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-soft-white mb-8 max-w-2xl mx-auto leading-tight">Let's Build the Right Smart Solution for Your Operations</h2>
           <p className="text-soft-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed">Tell us your requirements — we'll design a system tailored to your environment.</p>
           <div className="flex flex-wrap justify-center gap-6">
              <Link to="/consultation" className="px-10 py-5 bg-soft-white text-brand-black font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl">Get Free Consultation</Link>
              <Link to="/contact" className="px-10 py-5 border border-soft-white/30 text-soft-white font-bold rounded-2xl transition-all hover:bg-soft-white/10">Contact Support</Link>
           </div>
        </div>
      </section>
    </div>
  );
}
