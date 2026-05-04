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
import PageHero from "../components/ui/PageHero";


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
    <div className="flex flex-col pt-20">
      {/* ── HERO SECTION ── */}
      <PageHero
        titleLine1="Smart Systems"
        titleLine2="Across Domains"
        descriptionLine1="Explore how our solutions are applied across industries to solve"
        descriptionLine2="real operational challenges."
      >
        <button className="px-8 py-3.5 bg-nx-navy text-white font-bold rounded-full transition-all hover:bg-nx-navy-hover hover:scale-105 shadow-lg text-sm whitespace-nowrap">Explore Domains</button>
        <button className="px-8 py-3.5 border border-nx-navy/20 text-nx-navy font-bold rounded-full hover:bg-nx-navy/5 backdrop-blur-sm transition-all hover:scale-105 text-sm whitespace-nowrap">Talk to Expert</button>
      </PageHero>

      {/* ── PROJECTS FILTER & SEARCH ── */}
      <section className="py-12 bg-nx-ice/30 border-b border-nx-steel/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Tabs */}
          <div className="bg-nx-white p-1.5 rounded-2xl flex items-center gap-1 border border-nx-steel/5 shadow-sm overflow-x-auto max-w-full scrollbar-hide">
            {["All Projects", "Complete Projects", "Ongoing Projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? "bg-nx-navy text-nx-white shadow-lg shadow-nx-navy/20" : "text-nx-navy/40 hover:text-nx-navy"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />
          </div>
        </div>
      </section>

      {/* ── PROJECTS GRID ── */}
      <section className="py-16 bg-pure-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.map((project, i) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className="group block">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer shadow-xl"
                >
                  {/* Background Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:scale-110 transition-transform duration-500">
                      <project.icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-wider">
                          {project.category}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-wider">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${project.status === "COMPLETED" ? "bg-green-500/80" : "bg-blue-600/80"} backdrop-blur-md`}>
                      {project.status}
                    </div>
                  </div>

                  {/* Corner Arrow */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight size={16} />
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
      <section className="py-32 bg-nx-ice border-t border-nx-steel/5">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-black text-nx-navy mb-12 max-w-4xl mx-auto uppercase tracking-tighter leading-[0.9]"
          >
            Have a Vision <br /> <span className="text-nx-steel/40">For Your Space?</span>
          </motion.h2>
          <Link to="/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-nx-navy text-nx-white text-xs font-black rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-nx-navy/30 uppercase tracking-[0.2em] group">
            Initiate Project Discussion
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
