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
  { id: "education", name: "Education", icon: Building2, image: "/images/education-bg.png" },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, image: "/images/manufacturing-bg.png" },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, image: "/images/healthcare-bg.png" },
  { id: "corporate", name: "Corporate", icon: Briefcase, image: "/images/corporate-bg.png" },
  { id: "retail", name: "Retail", icon: ShoppingBag, image: "/images/retail-bg.png" },
  { id: "logistics", name: "Logistics", icon: Truck, image: "/images/logistics-bg.png" },
  { id: "government", name: "Government", icon: Landmark, image: "/images/government-bg.png" },
  { id: "residential", name: "Residential", icon: HomeIcon, image: "/images/residential-bg.png" },
];

const solutionsData = {
  education: [
    { name: "Smart Access Systems", desc: "Automated entry and verification control for campuses.", icon: Shield, image: "/images/smart access system.jpeg" },
    { name: "Attendance Systems", desc: "Real-time presence tracking and reporting.", icon: Users, image: "/images/attendance system.jpeg" },
    { name: "Surveillance Systems", desc: "24/7 monitoring with intelligent safety alerts.", icon: Activity, image: "/images/survillance monitoring.jpeg" },
    { name: "Library Management", desc: "Automated lending and digital asset tracking.", icon: Database, image: "/images/library-management.png" },
    { name: "Transport Tracking", desc: "Campus fleet and vehicle location monitoring.", icon: Truck, image: "/images/transport-tracking.png" },
    { name: "Facility Management", desc: "Maintenance upkeep and space utilization analytics.", icon: Settings, image: "/images/facility-management.png" }
  ],
  manufacturing: [
    { name: "Movement Tracking", desc: "Real-time tracking of assets and floor personnel.", icon: Users, image: "/images/movement-tracking.png" },
    { name: "Energy Optimization", desc: "Smart consumption and predictive load management.", icon: Zap, image: "/images/energy optimization.jpeg" },
    { name: "Water Management", desc: "Usage monitoring and leakage detection systems.", icon: Droplets, image: "/images/water-management.png" },
    { name: "Security Intelligence", desc: "Advanced threat detection for industrial sites.", icon: Activity, image: "/images/security intelligence.jpeg" },
    { name: "Workflow Automation", desc: "Process digitization and task routing systems.", icon: Settings, image: "/images/workflow automation.jpeg" },
    { name: "Inventory Management", desc: "Smart tracking of raw materials and finished goods.", icon: Database, image: "/images/inventory-management.png" }
  ],
  healthcare: [
    { name: "Secure Zone Control", desc: "Role-based access for restricted medical areas.", icon: Shield, image: "/images/secure-zone.png" },
    { name: "Patient Monitoring", desc: "Integrated smart sensors for real-time awareness.", icon: Activity, image: "/images/patient-monitoring.png" },
    { name: "Staff Attendance", desc: "Contactless presence tracking for varied shifts.", icon: Users, image: "/images/attendance system.jpeg" },
    { name: "Asset Management", desc: "Tracking critical equipment and samples.", icon: Database, image: "/images/inventory-management.png" },
    { name: "Hygiene Automation", desc: "Automated washroom and sanitation monitoring.", icon: Droplets, image: "/images/hygiene-automation.png" },
    { name: "Energy Optimization", desc: "Intelligent lighting and HVAC control for labs.", icon: Zap, image: "/images/energy optimization.jpeg" }
  ],
};

export default function Solutions() {
  const [activeDomain, setActiveDomain] = useState("education");

  const activeSolutions = solutionsData[activeDomain as keyof typeof solutionsData] || solutionsData.education;

  return (
    <div className="flex flex-col pt-24 min-h-screen bg-gray-50">
      {/* ── HERO SECTION ── */}
      <section className="relative py-20 md:py-32 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 opacity-10 grid-bg" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[clamp(32px,6vw,72px)] font-display font-bold text-soft-white mb-8 leading-[1.1]">
              Integrated Smart Solutions for <span className="text-warm-gold-beige">Modern Operations</span>
            </h1>
            <p className="text-soft-white/50 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Intelligent systems designed to simplify operations, improve control, and optimize performance across industries.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DOMAIN SELECTOR ── */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-brand-walnut tracking-[0.3em] uppercase block mb-4">Solutions by domain</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-black leading-tight">Integrated Smart Solutions</h2>
          </div>

          <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 mb-16 overflow-x-auto pb-6 scrollbar-hide px-2 -mx-2">
            {domainList.map((dom) => {
              const isActive = activeDomain === dom.id;
              return (
                <button
                  key={dom.id}
                  onMouseEnter={() => setActiveDomain(dom.id)}
                  className={`relative flex flex-col items-start justify-end p-6 rounded-3xl transition-all duration-500 min-w-[260px] lg:min-w-0 h-44 overflow-hidden group outline-none
                      ${isActive
                      ? "shadow-2xl shadow-brand-walnut/20 scale-[1.02] border-2 border-brand-walnut"
                      : "bg-white border border-gray-200 hover:border-brand-walnut/30 hover:shadow-xl hover:-translate-y-1"
                    }`}
                >
                  {/* Background Image with Overlays */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={dom.image}
                      alt={dom.name}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                    />
                    <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-brand-walnut/40' : 'bg-black/20 group-hover:bg-black/40'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-all duration-500 ${isActive ? 'bg-white text-brand-walnut shadow-lg' : 'bg-white/10 text-white backdrop-blur-md'}`}>
                      <dom.icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                      {dom.name}
                    </span>
                  </div>

                  {/* Active Indicator Pin */}
                  {isActive && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Solutions Grid */}
          <div className="bg-white rounded-[3rem] border border-gray-200 overflow-hidden shadow-2xl p-8 md:p-16">
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-brand-black mb-4 capitalize">
                {activeDomain} Solutions
              </h3>
              <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto font-medium">
                Industrial-grade components integrated into tailored ecosystems for {activeDomain} environments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              <AnimatePresence mode="wait">
                {activeSolutions.map((sol, i) => (
                  <motion.div
                    key={`${activeDomain}-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative h-[340px] md:h-[400px] rounded-[2.5rem] overflow-hidden border border-gray-100 group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:border-brand-walnut hover:-translate-y-2"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      {sol.image ? (
                        <img
                          src={sol.image}
                          alt={sol.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                          <sol.icon size={48} className="text-gray-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    </div>

                    {/* Content Area */}
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white group-hover:bg-brand-walnut transition-colors">
                          <sol.icon size={20} />
                        </div>
                        <h4 className="font-display font-bold text-xl text-white group-hover:text-warm-gold-beige transition-colors">
                          {sol.name}
                        </h4>
                      </div>

                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-white/70 text-sm leading-relaxed pt-2">
                            {sol.desc}
                          </p>
                          <div className="mt-6 flex items-center gap-2 text-warm-gold-beige font-bold text-xs uppercase tracking-[0.2em]">
                            Explore Solution <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 bg-brand-walnut relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grid-bg" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-display font-bold text-soft-white mb-8 max-w-3xl mx-auto leading-tight">Ready to optimize your operations?</h2>
          <p className="text-soft-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">Let's design a smart ecosystem tailored to your unique environment.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-12 py-5 bg-white text-brand-walnut font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl">Get Started Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
