import { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Factory,
  Stethoscope,
  Briefcase,
  ShoppingBag,
  Truck,
  Landmark,
  Home as HomeIcon,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Search,
  ChevronRight,
  ArrowUpRight,
  Activity,
  Layers,
  Monitor,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "@/src/components/ui/PageHero";


const domainProjects = [
  { id: "education", name: "Education", count: "14 projects", emoji: "🏫", color: "#1a1a18", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80" },
  { id: "manufacturing", name: "Manufacturing", count: "9 projects", emoji: "🏭", color: "#1c1a18", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" },
  { id: "healthcare", name: "Healthcare", count: "11 projects", emoji: "🏥", color: "#181c1a", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { id: "corporate", name: "Corporate", count: "16 projects", emoji: "🏢", color: "#1a1c18", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: "retail", name: "Retail", count: "8 projects", emoji: "🏪", color: "#1c1818", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" },
  { id: "logistics", name: "Logistics", count: "7 projects", emoji: "🏗", color: "#181a1c", image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=800&q=80" },
  { id: "government", name: "Government", count: "6 projects", emoji: "🏛", color: "#1a1818", image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&q=80" },
  { id: "residential", name: "Residential", count: "5 projects", emoji: "🏘", color: "#181c1c", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80" },
];

const allProjectsList = [
  {
    title: "Global University Gate Automation",
    slug: "gate-automation",
    category: "Education",
    status: "COMPLETED",
    deployment: "Security Deployment",
    year: "2026",
    image: "https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?w=800&q=80",
    icon: Shield
  },
  {
    title: "City General Smart ICU Hub",
    slug: "smart-icu-hub",
    category: "Healthcare",
    status: "COMPLETED",
    deployment: "ICU Deployment",
    year: "2025",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    icon: Stethoscope
  },
  {
    title: "Eco-Industrial Manufacturing Hub",
    slug: "eco-manufacturing",
    category: "Manufacturing",
    status: "ONGOING",
    deployment: "Sustainability Deployment",
    year: "2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    icon: Factory
  },
  {
    title: "Smart Logistics Distribution Center",
    slug: "logistics-distribution",
    category: "Logistics",
    status: "COMPLETED",
    deployment: "WMS Deployment",
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    icon: Truck
  },
  {
    title: "Enterprise HQ Smart Campus",
    slug: "smart-campus",
    category: "Corporate",
    status: "COMPLETED",
    deployment: "BMS Deployment",
    year: "2025",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    icon: Building2
  },
  {
    title: "Retail Vision Analytics Suite",
    slug: "retail-analytics",
    category: "Retail",
    status: "ONGOING",
    deployment: "Store Optimization",
    year: "2026",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    icon: ShoppingBag
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = allProjectsList.filter(project => {
    const matchesTab =
      activeTab === "All Projects" ||
      (activeTab === "Complete Projects" && project.status === "COMPLETED") ||
      (activeTab === "Ongoing Projects" && project.status === "ONGOING");

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col overflow-hidden bg-nx-white">
      {/* ── HERO SECTION ── */}
      <PageHero
        titleLine1="Smart Systems"
        titleLine2="Across Domains"
        backgroundImage="/images/retail-bg.png"
        descriptionLine1="Explore how our solutions are applied across industries to solve"
        descriptionLine2="real operational challenges."
      >
        <Link
          to="/domains"
          className="px-10 py-4 bg-black text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/20 text-[11px] uppercase tracking-widest whitespace-nowrap"
        >
          Explore Domains
        </Link>
        <Link
          to="/about"
          className="px-10 py-4 bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl text-[11px] uppercase tracking-widest whitespace-nowrap"
        >
          Talk to Expert
        </Link>
      </PageHero>

      {/* ── PROJECTS FILTER & SEARCH ── */}
      <section className="py-6 md:py-8 bg-nx-ice/30 border-b border-nx-steel/10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">

          {/* Tabs */}
          <div className="bg-nx-white p-1 rounded-xl flex items-center gap-1 border border-nx-steel/5 shadow-sm overflow-x-auto max-w-full w-full md:w-auto scrollbar-hide">
            {["All Projects", "Complete Projects", "Ongoing Projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-5 py-2 md:py-2.5 rounded-lg text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 md:flex-none text-center ${activeTab === tab
                    ? "bg-nx-navy text-nx-white shadow-md shadow-nx-navy/20"
                    : "text-nx-navy/40 hover:text-nx-navy"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-xs lg:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 md:w-[18px] md:h-[18px]" />
            <input
              type="text"
              placeholder="Search by title or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 md:py-2.5 pl-10 pr-4 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />
          </div>

        </div>
      </section>
      {/* ── PROJECTS GRID ── */}
      <section className="py-16 bg-pure-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 md:gap-10">
            {filteredProjects.map((project, i) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="group block transition-all duration-300 hover:-translate-y-2">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative aspect-[4/3] rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden cursor-pointer shadow-xl"
                >
                  {/* Background Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 transition-transform duration-500 shrink-0">
                      <project.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <h3 className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight truncate w-full">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                        <span className="text-white/50 text-[8px] sm:text-[10px] font-black uppercase tracking-wider truncate">
                          {project.category}
                        </span>
                        <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/30 shrink-0" />
                        <span className="text-white/50 text-[8px] sm:text-[10px] font-black uppercase tracking-wider shrink-0">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex items-center gap-2">
                    <div className={`px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-white ${project.status === "COMPLETED" ? "bg-green-500/80" : "bg-blue-600/80"} backdrop-blur-md`}>
                      {project.status}
                    </div>
                  </div>

                  {/* Corner Arrow - always visible or removed? User said "Remove the current hover effects", usually means the transition on hover. I'll make it always visible or removed if it was a hover-only effect. Actually, let's keep it visible but without the hover transition. */}
                  <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-40 transition-opacity duration-300">
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-slate-400 font-medium">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>



      {/* ── VISION CTA SECTION ── */}
      <section className="py-32 bg-black border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-black text-white mb-12 max-w-4xl mx-auto uppercase tracking-tighter leading-[0.9]"
          >
            Have a Vision <br /> <span className="text-white/40">For Your Space?</span>
          </motion.h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black text-xs font-black rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-200 shadow-2xl shadow-white/20 uppercase tracking-[0.2em] group"
          >
            Initiate Project Discussion
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
