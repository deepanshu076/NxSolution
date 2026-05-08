import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Linkedin, Twitter, MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="pt-16 pb-12 overflow-hidden relative bg-nx-navy"
      style={{
        background:
          "linear-gradient(180deg, var(--nx-navy) 0%, var(--nx-navy-hover) 100%)",
        color: "black",
      }}
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none grid-bg" />

      {/* Subtle top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* ── Brand column ── */}
          <div className="flex flex-col items-start space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg"
                style={{ backgroundColor: "white" }}
              >
                <ShieldCheck size={24} style={{ color: "var(--nx-navy)" }} />
              </div>
              <span
                className="font-display font-black text-xl tracking-tight uppercase text-black"
              >
                NX-SOLUTIONS
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[240px] text-black">
              Transforming hidden daily operational challenges into smart automated ecosystems across India. Registered in Indore, MP.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Linkedin, Twitter, MessageSquare].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-white/20 text-black"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Expertise column ── */}
          <div className="flex flex-col items-start">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-black/50">
              Expertise
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Education & Campus", path: "/domains/education" },
                { label: "Manufacturing Units", path: "/domains/manufacturing" },
                { label: "Healthcare & Labs", path: "/domains/healthcare" },
                { label: "Corporate Offices", path: "/domains/corporate" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="transition-colors duration-200 text-black hover:text-nx-steel-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/domains"
                  className="text-[10px] font-black uppercase tracking-widest transition-colors duration-200 text-black hover:opacity-80"
                >
                  All 12+ Domains →
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Ecosystem column ── */}
          <div className="flex flex-col items-start">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-black/50">
              Ecosystem
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  to="/products"
                  className="transition-colors duration-200 text-black hover:text-nx-steel-light"
                >
                  Product Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Support column ── */}
          <div className="flex flex-col items-start lg:items-end lg:text-right">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-black/50">
              Contact
            </h4>
            <ul className="space-y-4 text-sm font-medium w-full">
              <li className="flex items-center gap-3 lg:justify-end">
                <Mail size={18} className="text-black shrink-0" />
                <span className="text-black font-semibold">hello@nxsolutions.in</span>
              </li>
              <li className="flex items-center gap-3 lg:justify-end">
                <Globe size={18} className="text-black shrink-0" />
                <span className="text-black font-semibold">www.nxsolutions.in</span>
              </li>
              <li className="flex items-start gap-3 lg:justify-end pt-5 border-t border-white/10 mt-2">
                <div className="flex flex-col items-start lg:items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-1">HQ:</span>
                  <span className="leading-relaxed text-black font-medium">
                    SGSITS Campus, Indore, <br />Madhya Pradesh 452003
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10"
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[.4em] text-black/60"
          >
            © {currentYear} NX-Solutions. All Rights Reserved.
          </p>
          <div
            className="flex space-x-8 text-[10px] font-bold uppercase tracking-[.2em]"
          >
            {["Privacy Policy", "Terms of Service", "System Status"].map((t) => (
              <Link
                key={t}
                to="#"
                className="text-black/60 transition-colors duration-200 hover:text-black"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
