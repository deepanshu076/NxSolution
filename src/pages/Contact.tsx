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
import PageHero from "../components/ui/PageHero";

export default function Contact() {
   return (
      <div className="flex flex-col bg-nx-white selection:bg-nx-navy/30 overflow-hidden">
         {/* ── HERO ── */}
         <PageHero
            titleLine1="Let's Connect & Build"
            titleLine2="Something Smart"
            descriptionLine1="Tell us your requirement and we'll guide you to the right"
            descriptionLine2="solution — enquiry, quote, demo, or custom project."
         >
            <Link to="/enquiry" className="px-8 py-3.5 bg-nx-navy text-nx-white font-bold rounded-full transition-all hover:scale-105 shadow-lg text-sm whitespace-nowrap text-center">Send Enquiry</Link>
            <Link to="/get-quote" className="px-8 py-3.5 border border-nx-navy/20 text-nx-navy font-bold rounded-full hover:bg-nx-navy/5 text-sm whitespace-nowrap text-center transition-all hover:scale-105">Get Quote</Link>
         </PageHero>

         {/* ── OPTIONS GRID ── */}
         <section className="py-24 bg-nx-ice">
            <div className="container mx-auto px-6">
               <div className="mb-16 text-center lg:text-left">
                  <span className="text-[10px] font-bold text-nx-navy/60 uppercase tracking-[0.4em] block mb-4">How can we help?</span>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-nx-navy uppercase tracking-tight">Communication Channels</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { t: "General Enquiry", d: "Ask about solutions, products, services or get general info.", route: "/enquiry", icon: Mail },
                     { t: "Get a Quote", d: "Share requirements for a detailed proposal and pricing.", route: "/get-quote", icon: Briefcase, featured: true },
                     { t: "Book a Demo", d: "Schedule a live walkthrough — online or on-site.", route: "/book-demo", icon: Play }
                  ].map((opt, i) => (
                     <div key={i} className={`p-10 rounded-[2.5rem] border transition-all flex flex-col items-start h-full ${opt.featured ? "bg-nx-navy text-nx-white border-nx-navy shadow-2xl shadow-nx-navy/20 -translate-y-2" : "bg-nx-white border-nx-steel/10 hover:border-nx-navy/30 shadow-sm"}`}>
                        {opt.featured && <span className="inline-block px-3 py-1 bg-nx-white/10 text-nx-white text-[9px] font-bold uppercase tracking-widest rounded-full mb-8 border border-nx-white/20">Recommended</span>}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${opt.featured ? "bg-nx-white/10 text-nx-white" : "bg-nx-ice text-nx-navy shadow-sm"}`}>
                           <opt.icon size={26} />
                        </div>
                        <h3 className={`text-xl font-display font-black mb-4 uppercase tracking-tight ${opt.featured ? "text-nx-white" : "text-nx-navy"}`}>{opt.t}</h3>
                        <p className={`text-sm leading-relaxed mb-10 flex-grow font-medium ${opt.featured ? "text-nx-white/70" : "text-nx-steel"}`}>{opt.d}</p>
                        <Link to={opt.route} className={`w-full py-4 rounded-xl font-bold text-xs text-center transition-all uppercase tracking-widest ${opt.featured ? "bg-nx-white text-nx-navy shadow-xl" : "bg-nx-navy text-nx-white hover:bg-nx-steel"}`}>
                           {opt.t.split(" ")[0]} Now
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── DIRECT CONTACT ── */}
         <section className="py-24 bg-nx-navy text-nx-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="container mx-auto px-6 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                     <div className="mb-12">
                        <span className="text-[10px] font-bold text-nx-ice/60 tracking-[0.4em] uppercase mb-4 block">Direct Reach</span>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-nx-white uppercase tracking-tight">Connect with us</h2>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                           { icon: Smartphone, t: "Phone", v: "+91 99999 XXXXX", s: "Mon–Sat 9am–7pm" },
                           { icon: MessageSquare, t: "WhatsApp", v: "+91 99999 XXXXX", s: "Quick response" },
                           { icon: Mail, t: "Email", v: "hello@nxsolutions.in", s: "Support & Sales" },
                           { icon: MapPin, t: "Office", v: "Indore, Madhya Pradesh", s: "NX-Solutions HQ" }
                        ].map((item, i) => (
                           <div key={i} className="bg-nx-white/5 p-6 rounded-2xl border border-nx-white/10 flex items-center gap-5 group hover:border-nx-ice transition-all cursor-pointer hover:bg-nx-white/10">
                              <div className="w-12 h-12 rounded-xl bg-nx-white/10 flex items-center justify-center text-nx-white group-hover:bg-nx-white group-hover:text-nx-navy transition-all shadow-sm">
                                 <item.icon size={20} />
                              </div>
                              <div>
                                 <div className="text-[9px] font-bold text-nx-white/30 uppercase tracking-[0.2em] mb-1">{item.t}</div>
                                 <div className="text-[14px] font-bold text-nx-white uppercase tracking-wide">{item.v}</div>
                                 <div className="text-[11px] font-medium text-nx-white/40 mt-1">{item.s}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-nx-white/5 rounded-[2.5rem] p-4 border border-nx-white/10 shadow-2xl h-full flex flex-col">
                     <div className="bg-nx-white/5 rounded-[2rem] flex-grow flex items-center justify-center p-16 min-h-[320px] relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--nx-white)_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <div className="relative z-10 text-center">
                           <div className="w-20 h-20 rounded-full bg-nx-white/5 border border-nx-white/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                              <MapPin size={32} className="text-nx-ice/40" />
                           </div>
                           <p className="text-nx-white font-bold text-xs uppercase tracking-[0.3em] mb-2">Indore, India</p>
                           <span className="text-[10px] text-nx-white/30 font-medium uppercase tracking-widest">NX-Solutions HQ</span>
                        </div>
                     </div>
                     <div className="p-8 flex items-center justify-between">
                        <div>
                           <h4 className="font-bold text-nx-white text-sm uppercase tracking-wide">Visit Our Office</h4>
                           <p className="text-[11px] font-medium text-nx-white/40 mt-1 uppercase tracking-widest">SGSITS, INDORE, MP 452003</p>
                        </div>
                        <button className="w-12 h-12 flex items-center justify-center bg-nx-white text-nx-navy rounded-xl hover:bg-nx-ice hover:scale-105 transition-all shadow-lg">
                           <ExternalLink size={20} />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ── QUICK MESSAGE FORM ── */}
         <section className="py-24 bg-nx-white">
            <div className="container mx-auto px-6">
               <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                  <div className="lg:w-2/5">
                     <span className="text-[10px] font-bold text-nx-navy/60 tracking-[0.4em] uppercase mb-4 block">Quick Drop</span>
                     <h2 className="text-3xl md:text-5xl font-display font-black text-nx-navy mb-8 uppercase tracking-tight leading-tight">Send us a direct message</h2>
                     <p className="text-nx-steel text-sm md:text-base mb-10 leading-relaxed font-medium">
                        For general questions or simple queries. For detailed technical requests, please use our <Link to="/enquiry" className="text-nx-navy font-black underline underline-offset-8 decoration-nx-navy/20 hover:decoration-nx-navy transition-all uppercase text-xs tracking-widest ml-1">General Enquiry</Link>
                     </p>

                     <div className="space-y-5">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-nx-navy animate-pulse" />
                           <span className="text-xs text-nx-navy font-bold uppercase tracking-widest">Response within 2 hours</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-nx-navy/30" />
                           <span className="text-xs text-nx-navy font-bold uppercase tracking-widest">Verified support staff</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 w-full bg-nx-ice rounded-[3rem] p-10 md:p-14 border border-nx-steel/10 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-5">
                        <MessageSquare size={160} className="text-nx-navy" />
                     </div>
                     <form className="relative z-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="relative">
                              <label className="block text-[9px] font-bold text-nx-navy/40 uppercase tracking-[0.3em] mb-3 px-1">Full Name</label>
                              <input type="text" placeholder="YOUR NAME" className="w-full px-6 py-4 bg-nx-white border border-nx-steel/10 rounded-2xl outline-none focus:border-nx-navy focus:ring-4 focus:ring-nx-navy/5 transition-all text-xs font-bold uppercase tracking-widest" />
                           </div>
                           <div className="relative">
                              <label className="block text-[9px] font-bold text-nx-navy/40 uppercase tracking-[0.3em] mb-3 px-1">Mobile</label>
                              <input type="text" placeholder="+91 XXXXX" className="w-full px-6 py-4 bg-nx-white border border-nx-steel/10 rounded-2xl outline-none focus:border-nx-navy focus:ring-4 focus:ring-nx-navy/5 transition-all text-xs font-bold uppercase tracking-widest" />
                           </div>
                        </div>
                        <div className="relative">
                           <label className="block text-[9px] font-bold text-nx-navy/40 uppercase tracking-[0.3em] mb-3 px-1">Message</label>
                           <textarea rows={4} placeholder="HOW CAN WE HELP?" className="w-full px-6 py-5 bg-nx-white border border-nx-steel/10 rounded-2xl outline-none focus:border-nx-navy focus:ring-4 focus:ring-nx-navy/5 transition-all text-xs font-bold uppercase tracking-widest resize-none"></textarea>
                        </div>
                        <button className="w-full py-5 bg-nx-navy text-nx-white font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-nx-navy/20 uppercase tracking-[0.2em] text-xs">
                           Submit Message <ArrowRight size={18} />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}