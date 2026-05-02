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
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const domainList = [
  { id: "education", name: "Education", icon: Landmark, image: "/images/education_domain_bg.png" },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, image: "/images/manufacturing_domain_bg.png" },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, image: "/images/healthcare_domain_bg.png" },
  { id: "corporate", name: "Corporate", icon: Briefcase, image: "/images/corporate_domain_bg.png" },
  { id: "retail", name: "Retail", icon: ShoppingBag, image: "/images/retail_domain_bg.png" },
  { id: "logistics", name: "Logistics", icon: Truck, image: "/images/logistics_domain_bg.png" },
  { id: "government", name: "Government", icon: Landmark, image: "/images/government_domain_bg.png" },
  { id: "residential", name: "Residential", icon: HomeIcon, image: "/images/residential_domain_bg.png" },
];

const solutionsData: Record<string, any[]> = {
  education: [
    { name: "Smart Campus Access", desc: "AI-powered entry for students and authorized staff.", icon: Shield, image: "/images/secure-zone.png" },
    { name: "Attendance System", desc: "Facial recognition and biometric presence tracking.", icon: Users, image: "/images/attendance system.jpeg" },
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
  logistics: [
    { name: "Fleet Tracking", desc: "Real-time GPS monitoring of delivery vehicles.", icon: Truck, image: "/images/fleet-tracking.png" },
    { name: "Warehouse Management", desc: "Smart inventory and storage optimization.", icon: Database, image: "/images/warehouse-management.png" },
    { name: "Route Optimization", desc: "AI-powered delivery route planning.", icon: Network, image: "/images/route-optimization.png" },
    { name: "Cold Chain Monitoring", desc: "Temperature tracking for sensitive goods.", icon: Droplets, image: "/images/cold-chain.png" },
    { name: "Last Mile Delivery", desc: "Real-time tracking and proof of delivery.", icon: Activity, image: "/images/last-mile.png" },
    { name: "Security Systems", desc: "Cargo and facility monitoring solutions.", icon: Shield, image: "/images/logistics-security.png" }
  ],
};

export default function Solutions() {
  const [activeDomain, setActiveDomain] = useState("education");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(`[data-domain="${activeDomain}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeDomain]);

  const activeSolutions = solutionsData[activeDomain as keyof typeof solutionsData] || solutionsData.education;

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-black via-transparent to-brand-black opacity-80" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                Integrated Smart Solutions for <span className="text-brand-walnut">Modern Operations</span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-medium">
                Intelligent systems designed to simplify operations, improve control, and optimize performance across industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DOMAIN SELECTOR ── */}
      <section className="py-10 md:py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">

          {/* Section Header */}
          <div className="mb-10 md:mb-14 text-center max-w-2xl mx-auto">
            <span className="text-[10px] md:text-xs font-bold text-brand-walnut tracking-[0.3em] uppercase block mb-3">
              Solutions by domain
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-black leading-tight">
              Integrated Smart Solutions
            </h2>
          </div>

          <div className="relative mb-16 group/slider">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-10 px-2 -mx-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {domainList.map((dom) => {
                const isActive = activeDomain === dom.id;
                return (
                  <button
                    key={dom.id}
                    data-domain={dom.id}
                    onClick={() => setActiveDomain(dom.id)}
                    className={`relative flex flex-col items-start justify-end p-6 rounded-[2rem] transition-all duration-500 min-w-[280px] md:min-w-[320px] h-48 overflow-hidden group outline-none snap-center
                        ${isActive
                        ? "shadow-2xl shadow-brand-walnut/30 scale-[1.02] border-2 border-brand-walnut"
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
                      <div className={`p-3 rounded-2xl transition-all duration-500 ${isActive ? 'bg-white text-brand-walnut shadow-lg' : 'bg-white/10 text-white backdrop-blur-md'}`}>
                        <dom.icon size={24} strokeWidth={2.5} />
                      </div>
                      <span className="text-base font-bold uppercase tracking-[0.15em] text-white">
                        {dom.name}
                      </span>
                    </div>

                    {/* Active Indicator Pin */}
                    {isActive && (
                      <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solutions Grid Area */}
          <div className="bg-white rounded-[3rem] border border-gray-200 overflow-hidden shadow-2xl p-8 md:p-12 lg:p-16">

            <div className="text-center mb-12 md:mb-16">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-brand-black mb-4 capitalize">
                {activeDomain} Solutions
              </h3>
              <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
    </div>
      </section >

    {/* ── CTA SECTION ── */ }
    < section className = "py-24 bg-brand-walnut relative overflow-hidden" >
        <div className="absolute inset-0 opacity-10 grid-bg" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-display font-bold text-soft-white mb-8 max-w-3xl mx-auto leading-tight">Ready to optimize your operations?</h2>
          <p className="text-soft-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">Let's design a smart ecosystem tailored to your unique environment.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-12 py-5 bg-white text-brand-walnut font-bold rounded-2xl transition-all hover:scale-105 shadow-2xl">Get Started Now</Link>
          </div>
        </div>
      </section >
    </div >
  );
}