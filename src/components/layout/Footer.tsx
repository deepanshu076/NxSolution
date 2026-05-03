import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Activity, Linkedin, Twitter, MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-soft-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none grid-bg" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-brand-walnut rounded-xl flex items-center justify-center transition-all group-hover:rotate-6">
                 <ShieldCheck size={24} className="text-soft-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">NX-SOLUTIONS</span>
            </Link>
            <p className="text-soft-white/40 text-sm leading-relaxed max-w-xs">
              Transforming hidden daily operational challenges into smart automated ecosystems across India. Registered in Indore, MP.
            </p>
            <div className="flex space-x-4">
              {[Linkedin, Twitter, MessageSquare].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-soft-white/10 flex items-center justify-center hover:bg-soft-white/5 transition-all text-soft-white/40 hover:text-warm-gold-beige cursor-pointer">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[.3em] text-warm-gold-beige mb-8">Expertise</h4>
            <ul className="space-y-4 text-sm text-soft-white/40">
              <li><Link to="/domains/education" className="hover:text-soft-white transition-colors">Education & Campus</Link></li>
              <li><Link to="/domains/manufacturing" className="hover:text-soft-white transition-colors">Manufacturing Units</Link></li>
              <li><Link to="/domains/healthcare" className="hover:text-soft-white transition-colors">Healthcare & Labs</Link></li>
              <li><Link to="/domains/corporate" className="hover:text-soft-white transition-colors">Corporate Offices</Link></li>
              <li><Link to="/domains" className="text-brand-walnut font-bold uppercase tracking-widest text-[10px]">All 12+ Domains →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[.3em] text-warm-gold-beige mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-soft-white/40">
              <li><Link to="/products" className="hover:text-soft-white transition-colors">Product Hub</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[.3em] text-warm-gold-beige mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-soft-white/40">
              <li className="flex items-center space-x-3">
                 <Mail size={16} className="text-brand-walnut" />
                 <span>hello@nxsolutions.in</span>
              </li>
              <li className="flex items-center space-x-3">
                 <Globe size={16} className="text-brand-walnut" />
                 <span>www.nxsolutions.in</span>
              </li>
              <li className="flex items-start space-x-3 pt-4">
                 <span className="font-bold text-soft-white mt-1 shrink-0">HQ:</span>
                 <span className="leading-relaxed">SGSITS Campus, Indore, <br />Madhya Pradesh 452003</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-pure-white/20 uppercase tracking-[.4em]">
            © {currentYear} NX-Solutions. All Rights Reserved.
          </p>
          <div className="flex space-x-8 text-[10px] font-bold text-pure-white/20 uppercase tracking-[.2em]">
            <Link to="#" className="hover:text-pure-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-pure-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-pure-white transition-colors">System Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
