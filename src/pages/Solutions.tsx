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
                    className={`relative flex flex-col items-start justify-end p-6 rounded-[2rem] transition-all duration-500 min-w-[280px] md:min-w-[320px] h-48 overflow-hidden group outline-none snap-start
                      ${isActive
                        ? "shadow-2xl shadow-brand-walnut/30 scale-[1.02] border-2 border-brand-walnut"
                        : "bg-white border border-gray-200 hover:border-brand-walnut/30 hover:shadow-xl"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`p-3 rounded-2xl transition-all duration-500 ${isActive ? 'bg-white text-brand-walnut shadow-lg' : 'bg-white/10 text-white backdrop-blur-md'}`}>
                        <dom.icon size={22} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-1">Domain</span>
                        <span className="text-lg font-display font-bold text-white tracking-wide">
                          {dom.name}
                        </span>
                      </div>
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
        </div>
      </section>
    </div>
  );
}