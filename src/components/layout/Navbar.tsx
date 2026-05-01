import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Domains",   path: "/domains"   },
  { name: "Solutions", path: "/solutions" },
  { name: "Projects",  path: "/projects"  },
  { name: "Products",  path: "/products"  },
  { name: "About",     path: "/about"     },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Domains", path: "/domains" },
    { name: "Solutions", path: "/solutions" },
    { name: "Projects", path: "/projects" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-soft-white/95 backdrop-blur-xl h-20 shadow-lg border-b border-soft-taupe/20">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-brand-black rounded-xl flex items-center justify-center transition-all group-hover:bg-brand-walnut group-hover:rotate-6 shadow-xl">
            <ShieldCheck className="text-soft-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight leading-none text-brand-black">
              NX-SOLUTIONS
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[.3em] mt-1 text-brand-walnut">
              Smart Ecosystems
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${location.pathname === link.path
                ? "text-brand-walnut bg-warm-cream"
                : `text-brand-black/60 hover:text-brand-walnut hover:bg-warm-cream/50`
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="w-px h-6 bg-cool-gray/30 mx-4" />

          {user ? (
            <Link to="/dashboard" className="px-6 py-2.5 bg-brand-walnut text-soft-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-brand-walnut/20 hover:scale-105 active:scale-95 transition-all">
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-black hover:text-brand-walnut transition-colors">
                Login
              </Link>
              <Link to="/contact" className="px-6 py-2.5 bg-brand-black text-soft-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-walnut transition-all">
                Consultation
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-brand-black">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isDeepPage && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="lg:hidden bg-soft-white border-b border-soft-taupe/30 p-6 absolute top-full left-0 right-0 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-brand-black p-4 hover:bg-warm-cream rounded-xl transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-soft-taupe/30" />
              <Link to="/login" className="p-4 text-sm font-bold text-brand-walnut text-center">Member Login</Link>
              <Link to="/contact" className="bg-brand-black text-soft-white p-4 rounded-xl text-center font-bold" onClick={() => setIsOpen(false)}>Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
