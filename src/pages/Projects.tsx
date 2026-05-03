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
      {/* ── MOSAIC HERO SECTION ── */}
      <section className="relative min-h-[500px] bg-brand-black flex items-center overflow-hidden">
        {/* Mosaic Grid Background */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-[2px] opacity-20">
           {domainProjects.map((dom, i) => (
             <div key={i} className="relative group overflow-hidden bg-slate-blue/20">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-9xl group-hover:scale-110 transition-transform duration-700 select-none">
                   {dom.emoji}
                </div>
                <div className="absolute inset-0 bg-brand-black/40" />
             </div>
           ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-3xl flex flex-col items-center">

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full text-3xl md:text-4xl lg:text-5xl font-display font-bold text-pure-white mb-6 leading-tight"
            >
              Smart Systems Implemented Across <span className="text-warm-gold-beige">Multiple Domains</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-pure-white/50 text-lg mb-10 max-w-xl mx-auto"
            >
              Explore how our solutions are applied across industries to solve real operational challenges.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex justify-center gap-4"
            >
               <button className="px-10 py-4 bg-brand-walnut text-pure-white font-bold rounded-xl transition-all hover:bg-black border border-brand-walnut shadow-xl">Explore Domains</button>
               <button className="px-10 py-4 border border-pure-white/20 text-pure-white font-bold rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all">Talk to Expert</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS FILTER & SEARCH ── */}
      <section className="py-12 bg-pure-white border-b border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Tabs */}
          <div className="bg-slate-50 p-1.5 rounded-[2rem] flex items-center gap-1 border border-slate-100 overflow-x-auto max-w-full no-scrollbar">
            {["All Projects", "Complete Projects", "Ongoing Projects"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-[11px] md:text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
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
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-orange-400 to-yellow-400">
        {/* Subtle Matte Finish Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dust.png')]" />
        
        {/* Soft Radial Glow for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-white/20 to-transparent opacity-30" />

        <div className="container mx-auto px-6 text-center relative z-10">
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black text-pure-white mb-12 max-w-4xl mx-auto uppercase tracking-tighter leading-[0.9]"
           >
              Have a Vision <br /> For Your Environment?
           </motion.h2>
           <div className="flex justify-center">
              <Link to="/contact">
                <motion.button 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   viewport={{ once: true }}
                   className="px-12 py-6 bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white text-sm md:text-base font-black rounded-2xl transition-all hover:shadow-[0_20px_60px_rgba(141,110,99,0.5)] shadow-2xl shadow-[#5D4037]/30 uppercase tracking-widest"
                >
                   Initiate Project Discussion
                </motion.button>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
