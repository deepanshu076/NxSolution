import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck, LayoutDashboard, LogIn, ArrowRight, Home } from "lucide-react";
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

  useEffect(() => setIsOpen(false), [location.pathname]);

  const segments   = location.pathname.split("/").filter(Boolean);
  const isDeepPage = segments.length > 0;

  return (
    <header
      className="fixed inset-x-0 z-[100]"
      style={{ top: 0, margin: 0, padding: 0 }}
    >
      {/* ── Top walnut accent stripe ── */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#EA580C] to-transparent opacity-70" />
      {/* ════ MAIN NAVBAR BAR ════ */}
      <div
        className={`transition-all duration-500 border-b border-slate-200/50 ${
          scrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-xl"
        }`}
      >
        <div className="container mx-auto px-6" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="flex items-center justify-between h-[64px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-9 h-9 rounded-xl bg-[#EA580C] flex items-center justify-center shadow-lg shadow-[#EA580C]/30
                               transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#EA580C]/50 group-hover:shadow-xl">
                <ShieldCheck size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="hidden sm:block leading-none">
                <span className="block font-display font-extrabold text-[16px] tracking-[-0.02em] text-slate-900
                                 group-hover:text-[#EA580C] transition-colors duration-300">
                  NX-SOLUTIONS
                </span>
                <span className="block text-[8px] font-bold uppercase tracking-[0.28em] text-[#EA580C] mt-[3px]">
                  Smart Ecosystems
                </span>
              </div>
            </Link>

            {/* ── Center nav links ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-[#EA580C]"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#EA580C]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right CTAs ── */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-px h-5 bg-slate-200 mr-1" />
              {user ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] text-white
                             bg-[#EA580C] shadow-lg shadow-[#EA580C]/25
                             hover:bg-[#C2410C] hover:-translate-y-0.5 hover:shadow-[#EA580C]/40
                             active:translate-y-0 transition-all duration-200"
                >
                  <LayoutDashboard size={13} />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em]
                               text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                  >
                    <LogIn size={12} />
                    Login
                  </Link>
                  <Link
                    to="/contact"
                    className="group relative overflow-hidden flex items-center gap-1.5 px-5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em]
                               bg-[#EA580C] text-white shadow-lg shadow-[#EA580C]/25
                               hover:bg-[#C2410C] hover:-translate-y-0.5 hover:shadow-[#EA580C]/40
                               active:translate-y-0 transition-all duration-200"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500
                                     bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ════ BREADCRUMB — inline pill, zero gap from navbar ════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center px-6 py-1.5 bg-slate-50 border-b border-slate-200/50"
          >
            {/* Home */}
            <Link
              to="/"
              className="group flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-[#EA580C] transition-colors duration-150"
            >
              <Home size={9} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              Home
            </Link>

            {segments.map((seg, i) => {
              const path  = "/" + segments.slice(0, i + 1).join("/");
              const label = seg.replace(/-/g, " ");
              const last  = i === segments.length - 1;
              return (
                <div key={path} className="flex items-center gap-0">
                  {/* Separator slash */}
                  <span className="mx-2 text-slate-300 text-[10px] font-light select-none">/</span>

                  {last ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#EA580C]">
                      {/* Active dot */}
                      <span className="w-1 h-1 rounded-full bg-[#EA580C] inline-block" />
                      {label}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200"
          >
            <div className="container mx-auto px-6 py-3 flex flex-col gap-0.5">
              <MobileNavLink to="/" label="Home" active={location.pathname === "/"} onClick={() => setIsOpen(false)} />
              {navLinks.map((l) => (
                <MobileNavLink key={l.name} to={l.path} label={l.name} active={location.pathname.startsWith(l.path)} onClick={() => setIsOpen(false)} />
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wide text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <LogIn size={13} /> Login
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wide text-white bg-[#EA580C] hover:bg-[#C2410C] shadow-lg shadow-[#EA580C]/30 transition-colors"
                >
                  <ArrowRight size={13} /> Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function MobileNavLink({ to, label, active, onClick }: {
  to: string; label: string; active: boolean; onClick: () => void; key?: string;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold tracking-wide transition-all duration-150 ${
        active
          ? "text-[#EA580C] bg-[#EA580C]/10"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
      }`}
    >
      {active && (
        <motion.span
          layoutId="mobile-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#EA580C] rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className={active ? "ml-2" : ""}>{label}</span>
    </Link>
  );
}
