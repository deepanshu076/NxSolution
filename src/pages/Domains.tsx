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
import { useEffect, useState } from "react";
import { domains } from "../constants/domains";
import type { Domain } from "@/src/types";
import { listDomains } from "@/src/services/domains.service";

const solutions = [
  {
    name: "Smart Access Systems",
    image: "/images/smart access system.jpeg",
    description: "Multi-layered entry control using AI facial recognition and secure encrypted RFID systems for total facility security.",
    features: ["Biometric", "RFID", "Cloud Control"],
    icon: <Fingerprint size={32} strokeWidth={1.5} />
  },
  {
    name: "Attendance Systems",
    image: "/images/attendance system.jpeg",
    description: "Automated presence tracking that eliminates proxy attendance and manual logging across campuses and factories.",
    features: ["Real-time", "Anti-proxy", "Insights"],
    icon: <UserCheck size={32} strokeWidth={1.5} />
  },
  {
    name: "Security Intel",
    image: "/images/security intelligence.jpeg",
    description: "24/7 proactive monitoring that uses computer vision to detect anomalies and trigger instant security protocols.",
    features: ["Proactive", "AI Vision", "Instant Alert"],
    icon: <ShieldAlert size={32} strokeWidth={1.5} />
  },
  {
    name: "Surveillance Monitoring",
    image: "/images/survillance monitoring.jpeg",
    description: "Industrial-grade monitoring integrated with AI to detect incidents before they escalate.",
    features: ["4K Monitoring", "Motion Alert", "NVR Storage"],
    icon: <Cctv size={32} strokeWidth={1.5} />
  },
  {
    name: "Facility Management",
    image: "/images/facility management.png",
    description: "Automated space and resource management for large institutional and corporate campuses.",
    features: ["Resource Mgmt", "Space Analytics", "Maintenance"],
    icon: <Building size={32} strokeWidth={1.5} />
  },
  {
    name: "Analytics Dashboard",
    image: "/images/Analytics Dashboard.png",
    description: "Centralized data hub providing actionable insights into every aspect of your operations.",
    features: ["Live Stats", "Report Engine", "API Access"],
    icon: <BarChart3 size={32} strokeWidth={1.5} />
  }
];

export default function Domains() {
  const [domainRows, setDomainRows] = useState<Domain[]>([]);
  const [isLoadingDomains, setIsLoadingDomains] = useState(true);

  useEffect(() => {
    const loadDomains = async () => {
      try {
        setIsLoadingDomains(true);
        const rows = await listDomains(true);
        setDomainRows(rows);
      } catch (error) {
        console.error("[Domains] Failed to load domains", error);
      } finally {
        setIsLoadingDomains(false);
      }
    };
    void loadDomains();
  }, []);

  const dbDomains = domainRows.map((domain, index) => ({
    id: domain.slug,
    name: domain.name,
    image:
      domain.image_url ||
      `https://images.unsplash.com/photo-1497215844834-3151b1fba50d?w=800&q=80&sig=${index}`,
  }));

  const domainMap = new Map<string, { id: string; name: string; image: string }>();
  for (const item of domains) domainMap.set(item.id, item);
  for (const item of dbDomains) domainMap.set(item.id, item);
  const uiDomains = Array.from(domainMap.values());

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



      {/* ── DOMAINS GRID ── */}
      <section className="py-12 md:py-16 bg-soft-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-10 md:mb-12 text-center">
            <span className="text-xs font-bold text-brand-walnut tracking-[0.3em] uppercase mb-3">Explore Domains</span>
            <div className="h-1 w-12 md:w-16 bg-brand-walnut/30 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 gap-y-8 md:gap-y-10">
            {(isLoadingDomains ? domains : uiDomains).map((dom) => (
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




    </div>
  );
}
