import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck, ChevronDown, Zap, Globe, Cpu, Network, BarChart, Lock, Users, Code } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null); // Track expanded mobile submenus
  const location = useLocation();
  const { user } = useAuth();
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setOpenMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mega menu and mobile menu on route change
  useEffect(() => {
    setOpenMegaMenu(null);
    setIsOpen(false);
    setExpandedMobile(null);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/", hasMegaMenu: false },
    { name: "Domains", path: "/domains", hasMegaMenu: true },
    { name: "Solutions", path: "/solutions", hasMegaMenu: true },
    { name: "Projects", path: "/projects", hasMegaMenu: true },
    { name: "Products", path: "/products", hasMegaMenu: false },
    { name: "About", path: "/about", hasMegaMenu: false },
  ];

  // Mega menu content for Domains
  const domainsMegaMenu = {
    title: "Explore Our Domains",
    description: "Cutting-edge technology domains powering the future",
    columns: [
      {
        title: "Core Infrastructure",
        items: [
          { name: "Cloud Computing", path: "/domains/cloud", icon: <Cpu size={16} />, description: "Scalable cloud solutions" },
          { name: "Edge Computing", path: "/domains/edge", icon: <Network size={16} />, description: "Low-latency processing" },
          { name: "Data Centers", path: "/domains/data-centers", icon: <Database size={16} />, description: "Enterprise infrastructure" },
        ]
      },
      {
        title: "Intelligent Systems",
        items: [
          { name: "Artificial Intelligence", path: "/domains/ai", icon: <Brain size={16} />, description: "Next-gen AI models" },
          { name: "Machine Learning", path: "/domains/ml", icon: <TrendingUp size={16} />, description: "Predictive analytics" },
          { name: "Computer Vision", path: "/domains/vision", icon: <Eye size={16} />, description: "Visual intelligence" },
        ]
      },
      {
        title: "Security & Privacy",
        items: [
          { name: "Cybersecurity", path: "/domains/security", icon: <Lock size={16} />, description: "Threat protection" },
          { name: "Blockchain", path: "/domains/blockchain", icon: <Link2 size={16} />, description: "Decentralized systems" },
          { name: "Identity Management", path: "/domains/identity", icon: <Users size={16} />, description: "Secure authentication" },
        ]
      }
    ]
  };

  // Mega menu content for Solutions
  const solutionsMegaMenu = {
    title: "Enterprise Solutions",
    description: "Comprehensive solutions tailored to your business needs",
    columns: [
      {
        title: "Industry Solutions",
        items: [
          { name: "FinTech", path: "/solutions/fintech", icon: <BarChart size={16} />, description: "Financial technology" },
          { name: "Healthcare", path: "/solutions/healthcare", icon: <Heart size={16} />, description: "Patient-centric platforms" },
          { name: "Manufacturing", path: "/solutions/manufacturing", icon: <Factory size={16} />, description: "Industry 4.0 readiness" },
        ]
      },
      {
        title: "Business Solutions",
        items: [
          { name: "Digital Transformation", path: "/solutions/digital-transformation", icon: <Zap size={16} />, description: "Future-proof your business" },
          { name: "Analytics & Insights", path: "/solutions/analytics", icon: <BarChart size={16} />, description: "Data-driven decisions" },
          { name: "Automation", path: "/solutions/automation", icon: <Settings size={16} />, description: "Streamlined workflows" },
        ]
      },
      {
        title: "Technical Solutions",
        items: [
          { name: "API Management", path: "/solutions/api", icon: <Code size={16} />, description: "Seamless integration" },
          { name: "DevOps", path: "/solutions/devops", icon: <GitBranch size={16} />, description: "CI/CD pipelines" },
          { name: "Cloud Migration", path: "/solutions/migration", icon: <Cloud size={16} />, description: "Scalable cloud adoption" },
        ]
      }
    ]
  };

  // Mega menu content for Projects
  const projectsMegaMenu = {
    title: "Featured Projects",
    description: "Innovative projects shaping tomorrow's technology",
    columns: [
      {
        title: "Active Initiatives",
        items: [
          { name: "Smart Cities", path: "/projects/smart-cities", icon: <Globe size={16} />, description: "Urban innovation" },
          { name: "Green Tech", path: "/projects/green-tech", icon: <Leaf size={16} />, description: "Sustainable solutions" },
          { name: "Space Tech", path: "/projects/space", icon: <Rocket size={16} />, description: "Exploration technologies" },
        ]
      },
      {
        title: "Research & Development",
        items: [
          { name: "Quantum Computing", path: "/projects/quantum", icon: <Atom size={16} />, description: "Next-gen computing" },
          { name: "Biotech", path: "/projects/biotech", icon: <Dna size={16} />, description: "Life sciences innovation" },
          { name: "Robotics", path: "/projects/robotics", icon: <Bot size={16} />, description: "Autonomous systems" },
        ]
      },
      {
        title: "Success Stories",
        items: [
          { name: "Case Studies", path: "/projects/case-studies", icon: <FileText size={16} />, description: "Real-world impact" },
          { name: "Open Source", path: "/projects/open-source", icon: <Github size={16} />, description: "Community-driven" },
          { name: "Innovation Lab", path: "/projects/lab", icon: <Flask size={16} />, description: "Experimental projects" },
        ]
      }
    ]
  };

  const getMegaMenuContent = (menuName: string) => {
    switch (menuName) {
      case "Domains": return domainsMegaMenu;
      case "Solutions": return solutionsMegaMenu;
      case "Projects": return projectsMegaMenu;
      default: return null;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-soft-white/95 backdrop-blur-xl shadow-lg border-b border-soft-taupe/20 ${scrolled ? 'h-16' : 'h-20'}`}>
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group z-50">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-brand-black rounded-xl flex items-center justify-center transition-all group-hover:bg-brand-walnut group-hover:rotate-6 shadow-xl shrink-0">
            <ShieldCheck className="text-soft-white" size={22} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg md:text-xl tracking-tight leading-none text-brand-black">
              NX-SOLUTIONS
            </span>
            <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[.3em] mt-1 text-brand-walnut">
              Smart Ecosystems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1" ref={megaMenuRef}>
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.hasMegaMenu ? (
                <>
                  <button
                    onClick={() => setOpenMegaMenu(openMegaMenu === link.name ? null : link.name)}
                    className={`px-4 xl:px-5 py-2 text-[11px] xl:text-xs font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-1 ${location.pathname.startsWith(link.path)
                      ? "text-brand-walnut bg-warm-cream"
                      : "text-brand-black/60 hover:text-brand-walnut hover:bg-warm-cream/50"
                      }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${openMegaMenu === link.name ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Desktop Mega Menu Dropdown */}
                  <AnimatePresence>
                    {openMegaMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        // Removed `relative` from parent wrapper so this centers perfectly relative to the viewport
                        className="absolute top-full left-0 right-0 mx-auto mt-1 w-[95vw] max-w-5xl bg-soft-white border border-soft-taupe/30 rounded-2xl shadow-2xl overflow-hidden z-50"
                      >
                        {(() => {
                          const menuContent = getMegaMenuContent(link.name);
                          if (!menuContent) return null;
                          return (
                            <div className="p-6 xl:p-8">
                              {/* Header */}
                              <div className="mb-6 pb-4 border-b border-soft-taupe/20">
                                <h3 className="text-xl font-display font-bold text-brand-black">{menuContent.title}</h3>
                                <p className="text-sm text-brand-black/60 mt-1">{menuContent.description}</p>
                              </div>

                              {/* Columns */}
                              <div className="grid grid-cols-3 gap-6 xl:gap-8">
                                {menuContent.columns.map((column, idx) => (
                                  <div key={idx}>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-walnut mb-4">
                                      {column.title}
                                    </h4>
                                    <ul className="space-y-4">
                                      {column.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>
                                          <Link
                                            to={item.path}
                                            onClick={() => setOpenMegaMenu(null)}
                                            className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-warm-cream/50 transition-all"
                                          >
                                            <div className="text-brand-walnut mt-0.5 shrink-0 bg-warm-cream p-1.5 rounded-md group-hover:bg-soft-white transition-colors">
                                              {item.icon}
                                            </div>
                                            <div>
                                              <div className="text-sm font-semibold text-brand-black group-hover:text-brand-walnut transition-colors">
                                                {item.name}
                                              </div>
                                              <div className="text-[11px] text-brand-black/50 mt-0.5 leading-snug">
                                                {item.description}
                                              </div>
                                            </div>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Footer Link */}
                              <div className="mt-8 pt-4 border-t border-soft-taupe/20">
                                <Link
                                  to={link.path}
                                  onClick={() => setOpenMegaMenu(null)}
                                  className="text-sm font-bold text-brand-walnut hover:text-brand-black transition-colors flex items-center gap-1 w-fit"
                                >
                                  Explore All {link.name}
                                  <ChevronDown size={14} className="-rotate-90" />
                                </Link>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`px-4 xl:px-5 py-2 text-[11px] xl:text-xs font-bold uppercase tracking-widest transition-all rounded-full flex items-center ${location.pathname === link.path
                    ? "text-brand-walnut bg-warm-cream"
                    : "text-brand-black/60 hover:text-brand-walnut hover:bg-warm-cream/50"
                    }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          <div className="w-px h-6 bg-brand-black/10 mx-2 xl:mx-4" />

          {user ? (
            <Link to="/dashboard" className="px-6 py-2.5 bg-brand-walnut text-soft-white rounded-xl font-bold text-[11px] xl:text-xs uppercase tracking-widest shadow-xl shadow-brand-walnut/20 hover:scale-105 active:scale-95 transition-all">
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center space-x-2 xl:space-x-3">
              <Link to="/login" className="px-4 xl:px-6 py-2.5 text-[11px] xl:text-xs font-bold uppercase tracking-widest text-brand-black hover:text-brand-walnut transition-colors">
                Login
              </Link>
              <Link to="/contact" className="px-4 xl:px-6 py-2.5 bg-brand-black text-soft-white rounded-xl font-bold text-[11px] xl:text-xs uppercase tracking-widest hover:bg-brand-walnut transition-all shadow-lg hover:shadow-brand-walnut/20">
                Consultation
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-brand-black z-50 bg-warm-cream/50 rounded-lg hover:bg-warm-cream transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile & Tablet Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "100vh" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed top-0 left-0 right-0 w-full bg-soft-white/95 backdrop-blur-xl pt-[80px] pb-6 px-4 md:px-8 overflow-y-auto shadow-2xl border-b border-soft-taupe/30 z-40 h-[100dvh]"
          >
            <div className="flex flex-col space-y-2 pb-24">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-brand-black/5 last:border-0 pb-2 mb-2">
                  {link.hasMegaMenu ? (
                    <div>
                      {/* Mobile Expandable Parent Trigger */}
                      <button
                        onClick={() => setExpandedMobile(expandedMobile === link.name ? null : link.name)}
                        className="w-full flex items-center justify-between py-3 px-2 text-base md:text-lg font-bold text-brand-black hover:text-brand-walnut transition-colors"
                      >
                        {link.name}
                        <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMobile === link.name ? 'rotate-180 text-brand-walnut' : 'text-brand-black/40'}`} />
                      </button>

                      {/* Mobile Sub-Links Container */}
                      <AnimatePresence>
                        {expandedMobile === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 pb-4 pt-1 space-y-5">
                              {getMegaMenuContent(link.name)?.columns.map((col, idx) => (
                                <div key={idx} className="space-y-2">
                                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-walnut mb-2 bg-warm-cream/50 inline-block px-2 py-1 rounded">
                                    {col.title}
                                  </div>
                                  <div className="flex flex-col space-y-1">
                                    {col.items.map((item, i) => (
                                      <Link
                                        key={i}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-2.5 px-2 rounded-lg text-sm font-medium text-brand-black/80 hover:bg-warm-cream hover:text-brand-walnut transition-all"
                                      >
                                        <span className="text-brand-black/40">{item.icon}</span>
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}

                              <Link
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block mt-4 py-2 px-2 text-sm font-bold text-brand-walnut flex items-center gap-1"
                              >
                                View All {link.name} <ArrowRight size={14} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    /* Standard Mobile Link */
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-2 text-base md:text-lg font-bold transition-colors ${location.pathname === link.path ? "text-brand-walnut" : "text-brand-black hover:text-brand-walnut"
                        }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Call-to-Actions */}
              <div className="pt-6 mt-2 space-y-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center bg-brand-walnut text-soft-white p-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-brand-walnut/20"
                  >
                    Go To Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center border-2 border-soft-taupe/30 text-brand-black p-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:border-brand-walnut hover:text-brand-walnut transition-colors"
                    >
                      Member Login
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center bg-brand-black text-soft-white p-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-walnut transition-colors shadow-xl"
                    >
                      Get Started Today
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Icons
const Database = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg>;
const Brain = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4a4 4 0 0 1 3.5 6A4 4 0 0 1 12 18a4 4 0 0 1-3.5-6A4 4 0 0 1 12 4z" /><path d="M12 12v8" /><path d="M12 4v2" /><path d="M8 8l-2 2" /><path d="M16 8l2 2" /><path d="M8 16l-2 2" /><path d="M16 16l2 2" /></svg>;
const TrendingUp = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const Eye = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const Link2 = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>;
const Heart = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const Factory = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20" /><path d="M5 20v-8h5v8" /><path d="M14 20v-6h5v6" /><path d="M9 12V7.5l2-1.5 2 1.5V12" /><path d="M19 12V9l-3-2-3 2v3" /></svg>;
const Settings = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.58l.07-.08z" /></svg>;
const GitBranch = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>;
const Cloud = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a3.5 3.5 0 0 1 0-7h.5A5.5 5.5 0 0 1 17 6.5a5.5 5.5 0 0 1 .5 11z" /><path d="M10 12H8a4 4 0 0 0 0 8h9.5" /></svg>;
const Leaf = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20" /><path d="M17 7c-1.5-2-4-3-6-3s-4.5 1-6 3" /><path d="M17 17c-1.5 2-4 3-6 3s-4.5-1-6-3" /></svg>;
const Rocket = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2" /><path d="M12 15v5a2 2 0 0 0 4 0v-5" /><path d="M7.5 6.5 9 8l-1.5 1.5" /><path d="M18 10V7.5c0-1.5-1-3-2.5-3.5L12 2 8.5 4C7 4.5 6 6 6 7.5V10c0 4 2 6 6 6s6-2 6-6z" /><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>;
const Atom = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2" /><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" /></svg>;
const Dna = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 3c-2 0-4 1-5 3-1 2-1 5 0 8s3 6 5 7c2 1 4 0 5-2 1-2 1-5 0-8s-3-6-5-7z" /><path d="M9.5 3c2 0 4 1 5 3 1 2 1 5 0 8s-3 6-5 7c-2 1-4 0-5-2-1-2-1-5 0-8s3-6 5-7z" /><path d="M12 12s-2-2-2-5 2-3 2-3" /><path d="M12 12s2 2 2 5-2 3-2 3" /></svg>;
const Bot = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="16" r="1" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /><circle cx="8" cy="13" r="1" /><circle cx="16" cy="13" r="1" /><path d="M9 4h6" /><path d="M8 21v-4" /><path d="M16 21v-4" /></svg>;
const FileText = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
const Github = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>;
const Flask = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3h6" /><path d="M12 3v8.5a3 3 0 0 0 .82 2.07L18 19.5a2 2 0 0 1-1.41 3.41H7.41A2 2 0 0 1 6 19.5l5.18-5.93A3 3 0 0 0 12 11.5V3z" /></svg>;
const ArrowRight = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;