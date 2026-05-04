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
    <header className="sticky top-0 inset-x-0 z-[100] transition-all duration-500">
      {/* ════ MAIN NAVBAR BAR ════ */}
      <div
        className={`transition-all duration-500 border-b ${scrolled
          ? "bg-nx-white/98 backdrop-blur-2xl shadow-[0_4px_20px_-8px_rgba(0,4,35,0.10)] border-nx-steel/20"
          : "bg-nx-white/92 backdrop-blur-xl border-nx-ice"
          }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-[72px] gap-4 md:gap-8">
            {/* ── Logo ── */}
            <div className="flex-shrink-0 min-w-fit">
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
            <nav className="hidden lg:flex flex-grow items-center justify-center gap-1 xl:gap-2">
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
                    className="relative px-3 xl:px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] rounded-full transition-all duration-300 whitespace-nowrap"
                    style={{
                      color: isActive ? NAVY : STEEL,
                      backgroundColor: isActive ? ICE : "transparent",
                    }}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full"
                        style={{ backgroundColor: NAVY }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right CTAs ── */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5 flex-shrink-0 min-w-fit">
              <div className="w-px h-5 bg-nx-steel/20 mr-1" />
              {user ? (
                <>
                  {user.role !== "admin" ? (
                    <Link
                      to={dashboardPath}
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-nx-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                      style={{ backgroundColor: NAVY, boxShadow: `0 8px 20px -6px rgba(0,4,35,0.4)` }}
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                  ) : null}
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200"
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
                    <LogOut size={13} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-nx-navy"
                    style={{ color: STEEL }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/contact"
                    className="group relative overflow-hidden flex items-center gap-2 px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-nx-white transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: NAVY, boxShadow: `0 8px 20px -6px rgba(0,4,35,0.4)` }}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                    />
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    Get Started
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

      {/* ════ BREADCRUMB ════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center px-6 py-1.5 border-b"
            style={{ backgroundColor: "var(--nx-ice)", borderColor: "var(--nx-steel-light)" }}
          >
            <Link
              to="/"
              className="group flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-150"
              style={{ color: STEEL }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = NAVY}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = STEEL}
            >
              <Home size={9} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              Home
            </Link>

            {segments.map((seg, i) => {
              const path = "/" + segments.slice(0, i + 1).join("/");
              const label = seg.replace(/-/g, " ");
              const last = i === segments.length - 1;
              return (
                <div key={path} className="flex items-center gap-0">
                  <span className="mx-2 text-[10px] font-light select-none" style={{ color: "var(--nx-steel-light)" }}>/</span>
                  {last ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: NAVY }}>
                      <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: NAVY }} />
                      {label}
                    </span>
                  ) : (
                    <Link
                      to={path}
                      className="text-[10px] font-semibold uppercase tracking-widest transition-colors duration-150"
                      style={{ color: STEEL }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = NAVY}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = STEEL}
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
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: "var(--nx-white)", borderColor: "var(--nx-steel-light)" }}
          >
            <div className="container mx-auto px-6 py-3 flex flex-col gap-0.5">
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

              <div className="flex gap-3 mt-4 pt-4 border-t" style={{ borderColor: ICE }}>
                {user ? (
                  <>
                    {user.role !== "admin" ? (
                      <Link
                        to={dashboardPath}
                        onClick={() => setIsOpen(false)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-colors"
                        style={{ color: NAVY, backgroundColor: ICE }}
                      >
                        <LayoutDashboard size={13} /> Dashboard
                      </Link>
                    ) : null}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-colors"
                      style={{ color: STEEL, backgroundColor: ICE }}
                    >
                      <LogOut size={13} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-colors"
                      style={{ color: STEEL, backgroundColor: ICE }}
                    >
                      <LogIn size={13} /> Login
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wide text-white transition-colors"
                      style={{ backgroundColor: NAVY, boxShadow: `0 4px 12px rgba(0,4,35,0.25)` }}
                    >
                      <ArrowRight size={13} /> Get Started
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
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold tracking-wide transition-all duration-150"
      style={{
        color: active ? NAVY : STEEL,
        backgroundColor: active ? ICE : "transparent",
      }}
    >
      {active && (
        <motion.span
          layoutId="mobile-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
          style={{ backgroundColor: NAVY }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className={active ? "ml-2" : ""}>{label}</span>
    </Link>
  );
}