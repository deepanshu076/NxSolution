import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShieldCheck,
  LayoutDashboard,
  LogIn,
  ArrowRight,
  Home,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/lib/AuthContext";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Palette - Using second navbar's color variables
const NAVY = "var(--nx-navy)";
const STEEL = "var(--nx-steel)";
const ICE = "var(--nx-ice)";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Domains", path: "/domains" },
  { name: "Projects", path: "/projects" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Admin", path: "/admin", adminOnly: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const segments = location.pathname.split("/").filter(Boolean);
  const isDeepPage = segments.length > 0;

  return (
    <header className="fixed top-0 inset-x-0 z-[100] transition-all duration-500">
      {/* ════ MAIN NAVBAR BAR ════ */}
      <div
        className={`transition-all duration-500 border-b ${scrolled
          ? "bg-nx-white shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-nx-steel/10"
          : "bg-nx-white border-nx-ice"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[64px]" : "h-[80px]"} gap-4 md:gap-8`}>
            {/* ── Logo ── */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 group">
                <div
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  style={{ backgroundColor: NAVY, boxShadow: `0 4px 14px rgba(0,4,35,0.30)` }}
                >
                  <ShieldCheck size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="block leading-none">
                  <span
                    className="block font-display font-extrabold text-[18px] sm:text-[22px] tracking-[-0.02em] transition-colors duration-300 uppercase"
                    style={{ color: NAVY }}
                  >
                    NX-SOLUTIONS
                  </span>
                  <span
                    className="block text-[9px] sm:text-[11px] font-black uppercase tracking-[0.28em] mt-[3px]"
                    style={{ color: STEEL }}
                  >
                    Smart Ecosystems
                  </span>
                </div>
              </Link>
            </div>

            {/* ── Center nav links ── */}
            <nav className="hidden lg:flex flex-grow items-center justify-center gap-2 xl:gap-4">
              {navLinks.map((link) => {
                if (link.adminOnly && user?.role !== "admin") return null;
                const isActive =
                  link.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] rounded-full transition-all duration-300 whitespace-nowrap group/nav"
                    style={{
                      color: isActive ? NAVY : STEEL,
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span
                      className="absolute inset-0 rounded-full opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: ICE }}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full z-20"
                        style={{ backgroundColor: NAVY }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right CTAs ── */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
              <div className="w-px h-6 bg-nx-steel/10" />
              {user ? (
                <>
                  {user.role !== "admin" ? (
                    <Link
                      to={dashboardPath}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-nx-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                      style={{ backgroundColor: NAVY, boxShadow: `0 10px 20px -8px rgba(0,28,61,0.4)` }}
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                  ) : null}
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 hover:bg-nx-ice hover:text-nx-navy"
                    style={{ color: STEEL }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:text-nx-navy"
                    style={{ color: STEEL }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/domains"
                    className="group relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest text-nx-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                    style={{ backgroundColor: NAVY, boxShadow: `0 12px 24px -10px rgba(0,28,61,0.5)` }}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    Get Started
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
              style={{ color: STEEL }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = ICE;
                (e.currentTarget as HTMLElement).style.color = NAVY;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = STEEL;
              }}
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

      {/* ════ BREADCRUMB (Deep Pages Only) ════ */}
      <AnimatePresence>
        {isDeepPage && !isOpen && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center px-6 py-2 border-b bg-nx-ice/50 border-nx-steel/10 backdrop-blur-sm"
          >
            <div className="container mx-auto flex items-center">
              <Link
                to="/"
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-nx-steel hover:text-nx-navy transition-colors"
              >
                <Home size={10} strokeWidth={2.5} />
                Home
              </Link>

              {segments.map((seg, i) => {
                const path = "/" + segments.slice(0, i + 1).join("/");
                const label = seg.replace(/-/g, " ");
                const last = i === segments.length - 1;
                return (
                  <div key={path} className="flex items-center">
                    <span className="mx-3 text-[10px] text-nx-steel-light">/</span>
                    {last ? (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-nx-navy flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-nx-navy" />
                        {label}
                      </span>
                    ) : (
                      <Link
                        to={path}
                        className="text-[10px] font-bold uppercase tracking-widest text-nx-steel hover:text-nx-navy transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="lg:hidden absolute top-full inset-x-0 bg-nx-white border-t border-nx-ice shadow-2xl z-[90]"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-2">
              {navLinks.map((l) => {
                if (l.adminOnly && user?.role !== "admin") return null;
                const isActive =
                  l.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(l.path);
                return (
                  <MobileNavLink key={l.name} to={l.path} label={l.name} active={isActive} onClick={() => setIsOpen(false)} />
                );
              })}

              <div className="mt-6 pt-6 border-t border-nx-ice flex flex-col gap-3">
                {user ? (
                  <>
                    {user.role !== "admin" && (
                      <Link
                        to={dashboardPath}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-3 py-4 rounded-2xl text-[13px] font-bold uppercase tracking-wider transition-all bg-nx-ice text-nx-navy active:scale-95"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl text-[13px] font-bold uppercase tracking-wider transition-all border border-nx-ice text-nx-steel active:scale-95"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl text-[13px] font-bold uppercase tracking-wider transition-all bg-nx-ice text-nx-steel active:scale-95"
                    >
                      <LogIn size={18} />
                      Login
                    </Link>
                    <Link
                      to="/domains"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl text-[13px] font-bold uppercase tracking-widest text-white transition-all active:scale-95"
                      style={{ backgroundColor: NAVY, boxShadow: `0 10px 20px -5px rgba(0,28,61,0.3)` }}
                    >
                      Get Started
                      <ArrowRight size={18} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavLink({
  to,
  label,
  active,
  onClick,
}: {
  to: string;
  label: string;
  active: boolean;
  onClick: () => void;
  key?: string;
}) {
  const NAVY = "var(--nx-navy)";
  const STEEL = "var(--nx-steel)";
  const ICE = "var(--nx-ice)";

  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative flex items-center justify-between px-6 py-4 rounded-2xl text-[15px] font-bold tracking-tight transition-all duration-200 active:scale-[0.97]"
      style={{
        color: active ? NAVY : STEEL,
        backgroundColor: active ? ICE : "transparent",
      }}
    >
      <div className="flex items-center gap-4">
        {active && (
          <motion.span
            layoutId="mobile-indicator"
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: NAVY }}
          />
        )}
        <span>{label}</span>
      </div>
      <ArrowRight size={16} className={`transition-transform duration-300 ${active ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`} />
    </Link>
  );
}