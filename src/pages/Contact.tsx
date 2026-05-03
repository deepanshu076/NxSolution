import { motion } from "motion/react";
import { 
  Mail, 
  Smartphone, 
  MapPin, 
  MessageSquare, 
  ChevronRight, 
  Clock, 
  Activity,
  Shield,
  Zap,
  Briefcase,
  Play,
  User,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="flex flex-col pt-16 lg:pt-20 bg-soft-white selection:bg-brand-walnut/30">
      {/* ── HERO ── */}
      <section className="relative py-16 sm:py-20 bg-brand-black overflow-hidden flex items-center">
        {/* Decorative Background Elements from Home.tsx */}
        <div className="absolute inset-0 opacity-10 flex gap-px" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`hero-bg-${i}`} className="flex-1 bg-soft-white" />
          ))}
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-walnut opacity-10 rounded-xl rotate-45" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-8 w-32 h-32 bg-warm-gold-beige opacity-5 rounded-xl rotate-45" aria-hidden="true" />
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-white/5 backdrop-blur-sm text-warm-gold-beige font-bold text-[10px] uppercase tracking-widest mb-6 border border-soft-white/10">
                 Contact NX-Solutions
               </div>
               <h1 className="text-3xl md:text-5xl font-display font-bold text-soft-white mb-6 leading-tight">
                 Let's <span className="text-warm-gold-beige italic">Connect</span> & Build Something Smart
               </h1>
               <p className="text-soft-white/50 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                 Tell us your requirement and we'll guide you to the right solution — enquiry, quote, demo, or custom project.
               </p>
               <div className="flex gap-4">
                  <Link to="/enquiry" className="px-6 py-2.5 bg-brand-walnut text-soft-white font-bold rounded-xl transition-all hover:bg-brand-black border border-brand-walnut shadow-xl text-sm">Send Enquiry</Link>
                  <Link to="/get-quote" className="px-6 py-2.5 border border-soft-white/20 text-soft-white font-bold rounded-xl hover:bg-soft-white/5 text-sm">Get Quote</Link>
               </div>
            </div>

            <div className="bg-soft-white/5 backdrop-blur-md border border-soft-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageSquare size={100} className="text-warm-gold-beige" />
               </div>
               <div className="relative z-10">
                  <h3 className="text-soft-white/40 text-[9px] uppercase font-bold tracking-[.3em] mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                     {[
                       { t: "General Enquiry", s: "/enquiry" },
                       { t: "Get Quote", s: "/get-quote" },
                       { t: "Book Demo", s: "/book-demo" },
                       { t: "Consultation", s: "/consultation" },
                       { t: "Custom Solution", s: "/enquiry" }
                     ].map((item, i) => (
                       <Link 
                         key={i} 
                         to={item.s}
                         className="flex items-center justify-between p-3.5 bg-soft-white/5 border border-soft-white/5 rounded-xl hover:bg-soft-white/10 transition-all group/item"
                       >
                          <div className="flex items-center gap-3">
                             <div className="w-7 h-7 rounded-lg bg-soft-white/10 flex items-center justify-center text-warm-gold-beige">
                                <ChevronRight size={14} className="group-hover/item:translate-x-1 transition-transform" />
                             </div>
                             <span className="text-xs font-bold text-soft-white/80">{item.t}</span>
                          </div>
                          <div className="text-[9px] font-mono text-soft-white/20 group-hover:text-soft-white/40 transition-colors">{item.s}</div>
                       </Link>
                     ))}
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* ── OPTIONS GRID ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6">
           <div className="mb-10 sm:mb-12">
              <span className="text-[10px] font-bold text-brand-walnut uppercase tracking-[0.2em] block mb-1 opacity-70">How can we help?</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-black">Communication Channels</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "General Enquiry", d: "Ask about solutions, products, services or get general info.", route: "/enquiry", icon: Mail },
                { t: "Get a Quote", d: "Share requirements for a detailed proposal and pricing.", route: "/get-quote", icon: Briefcase, featured: true },
                { t: "Book a Demo", d: "Schedule a live walkthrough — online or on-site.", route: "/book-demo", icon: Play }
              ].map((opt, i) => (
                <div key={i} className={`p-8 rounded-2xl border transition-all flex flex-col items-start h-full ${opt.featured ? "bg-brand-walnut/5 border-brand-walnut/20 shadow-lg shadow-brand-walnut/5" : "bg-white border-soft-taupe/20 hover:border-brand-walnut/30 shadow-sm"}`}>
                   {opt.featured && <span className="inline-block px-2.5 py-0.5 bg-brand-walnut text-soft-white text-[9px] font-bold uppercase rounded-full mb-6">Recommended</span>}
                   <div className="w-10 h-10 rounded-xl bg-brand-walnut/10 flex items-center justify-center text-brand-walnut mb-6">
                      <opt.icon size={20} />
                   </div>
                   <h3 className="text-lg font-display font-bold text-brand-black mb-3">{opt.t}</h3>
                   <p className="text-brand-black/50 text-sm leading-relaxed mb-8 flex-grow">{opt.d}</p>
                   <Link to={opt.route} className={`w-full py-3 rounded-xl font-bold text-xs text-center transition-all ${opt.featured ? "bg-brand-walnut text-soft-white shadow-xl shadow-brand-walnut/20" : "bg-soft-white text-brand-black border border-soft-taupe/20 hover:bg-brand-walnut hover:text-soft-white hover:border-brand-walnut"}`}>
                      {opt.t.split(" ")[0]} Now
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── DIRECT CONTACT + MAP ── */}
      <section className="py-16 sm:py-20 bg-soft-white border-y border-soft-taupe/10">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              <div>
                 <div className="mb-10">
                    <span className="text-[10px] font-bold text-brand-walnut tracking-[0.2em] uppercase mb-1 block opacity-70">Direct Reach</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-black">Connect with our team directly</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Smartphone, t: "Phone", v: "+91 99999 XXXXX", s: "Mon–Sat 9am–7pm" },
                      { icon: MessageSquare, t: "WhatsApp", v: "+91 99999 XXXXX", s: "Quick response" },
                      { icon: Mail, t: "Email", v: "hello@nxsolutions.in", s: "Support & Sales" },
                      { icon: MapPin, t: "Office", v: "Indore, Madhya Pradesh", s: "NX-Solutions HQ" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-5 rounded-2xl border border-soft-taupe/20 flex items-center gap-4 group hover:border-brand-walnut transition-all cursor-pointer">
                         <div className="w-10 h-10 rounded-xl bg-brand-walnut/5 flex items-center justify-center text-brand-walnut group-hover:bg-brand-walnut group-hover:text-soft-white transition-all">
                            <item.icon size={18} />
                         </div>
                         <div>
                            <div className="text-[9px] font-bold text-brand-black/30 uppercase tracking-widest">{item.t}</div>
                            <div className="text-[13px] font-bold text-brand-black">{item.v}</div>
                            <div className="text-[11px] text-brand-black/40 mt-0.5">{item.s}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-3xl p-3 border border-soft-taupe/20 shadow-xl h-full flex flex-col">
                 <div className="bg-brand-walnut/5 rounded-[2rem] flex-grow flex items-center justify-center p-12 min-h-[300px] relative overflow-hidden">
                    {/* Decorative columns like Hero */}
                    <div className="absolute inset-0 opacity-5 flex gap-px" aria-hidden="true">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={`map-bg-${i}`} className="flex-1 bg-brand-walnut" />
                      ))}
                    </div>
                    <div className="relative z-10 text-center">
                       <MapPin size={40} className="text-brand-walnut/20 mx-auto mb-4" />
                       <p className="text-brand-walnut/40 text-[10px] font-bold uppercase tracking-widest">Interactive Map Placeholder</p>
                       <span className="text-[9px] text-brand-walnut/20">Indore, India</span>
                    </div>
                 </div>
                 <div className="p-6 flex items-center justify-between">
                    <div>
                       <h4 className="font-bold text-brand-black text-sm">Visit Our Office</h4>
                       <p className="text-[11px] text-brand-black/40 mt-1">SGSITS, Indore, MP 452003</p>
                    </div>
                    <button className="p-2.5 bg-brand-black text-soft-white rounded-xl hover:bg-brand-walnut transition-colors">
                       <ExternalLink size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── QUICK MESSAGE FORM ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6">
           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              <div className="lg:w-1/2">
                 <span className="text-[10px] font-bold text-brand-walnut tracking-[0.2em] uppercase mb-1 block opacity-70">Quick Drop</span>
                 <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-black mb-6">Send us a direct message</h2>
                 <p className="text-brand-black/50 text-sm mb-8 leading-relaxed max-w-md">
                    For general questions or simple queries. For detailed technical requests, please use our <Link to="/enquiry" className="text-brand-walnut font-bold underline underline-offset-4">General Enquiry</Link> form.
                 </p>
                 
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                       <span className="text-xs text-brand-black/60 font-medium">Response within 2 hours</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                       <span className="text-xs text-brand-black/60 font-medium">Verified support staff</span>
                    </div>
                 </div>
              </div>

              <div className="flex-1 w-full bg-soft-white p-8 md:p-10 rounded-3xl border border-soft-taupe/20 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-5">
                    <MessageSquare size={100} className="text-brand-black" />
                 </div>
                 <form className="relative z-10 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div>
                          <label className="block text-[9px] font-bold text-brand-black/40 uppercase tracking-widest mb-1.5 px-1">Full Name</label>
                          <input type="text" placeholder="Your name" className="w-full px-5 py-3.5 bg-white border border-soft-taupe/30 rounded-xl outline-none focus:border-brand-walnut transition-all text-sm" />
                       </div>
                       <div>
                          <label className="block text-[9px] font-bold text-brand-black/40 uppercase tracking-widest mb-1.5 px-1">Mobile</label>
                          <input type="text" placeholder="+91 XXXXX" className="w-full px-5 py-3.5 bg-white border border-soft-taupe/30 rounded-xl outline-none focus:border-brand-walnut transition-all text-sm" />
                       </div>
                    </div>
                    <div>
                       <label className="block text-[9px] font-bold text-brand-black/40 uppercase tracking-widest mb-1.5 px-1">Message</label>
                       <textarea rows={3} placeholder="How can we help?" className="w-full px-5 py-3.5 bg-white border border-soft-taupe/30 rounded-xl outline-none focus:border-brand-walnut transition-all text-sm resize-none"></textarea>
                    </div>
                    <button className="w-full py-3.5 bg-brand-black text-soft-white font-bold rounded-xl hover:bg-brand-walnut transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-black/5 text-sm">
                       Submit Message <ArrowRight size={16} />
                    </button>
                 </form>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
