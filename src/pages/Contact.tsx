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
    <div className="flex flex-col pt-20">
      {/* ── HERO ── */}
      <section className="relative py-24 bg-brand-black overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-morphism text-accent-sky font-bold text-xs uppercase tracking-widest mb-8 border border-white/10">
                Contact NX-Solutions
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-pure-white mb-6 leading-tight">
                Let's <span className="text-accent-sky italic">Connect</span> & Build Something Smart
              </h1>
              <p className="text-pure-white/50 text-lg mb-10 leading-relaxed max-w-md">
                Tell us your requirement and we'll guide you to the right solution — enquiry, quote, demo, or custom project.
              </p>
              <div className="flex gap-4">
                 <Link to="/enquiry" className="px-8 py-3.5 bg-accent-sky text-brand-black font-bold rounded-xl hover:bg-white transition-all shadow-xl">Send Enquiry</Link>
                 <Link to="/get-quote" className="px-8 py-3.5 border border-pure-white/20 text-pure-white font-bold rounded-xl hover:bg-white/5">Get Quote</Link>
              </div>
           </div>

           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                 <MessageSquare size={120} className="text-accent-sky" />
              </div>
              <div className="relative z-10">
                 <h3 className="text-white/40 text-[10px] uppercase font-bold tracking-[.3em] mb-8">All Contact Routes</h3>
                 <div className="space-y-4">
                    {[
                      { t: "General Enquiry", s: "/enquiry", c: "blue" },
                      { t: "Get Quote", s: "/get-quote", c: "orange" },
                      { t: "Book Demo", s: "/book-demo", c: "teal" },
                      { t: "Consultation", s: "/consultation", c: "purple" },
                      { t: "Custom Solution", s: "/enquiry", c: "slate" }
                    ].map((item, i) => (
                      <Link 
                        key={i} 
                        to={item.s}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group/item"
                      >
                         <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg bg-pure-white/10 flex items-center justify-center text-accent-sky`}>
                               <ChevronRight size={16} className="group-hover/item:translate-x-1 transition-transform" />
                            </div>
                            <span className="text-sm font-bold text-white/80">{item.t}</span>
                         </div>
                         <div className="text-[10px] font-mono text-white/20">{item.s}</div>
                      </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── OPTIONS GRID ── */}
      <section className="py-24 bg-pure-white">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <span className="text-xs font-bold text-brand-walnut uppercase tracking-widest block mb-1">How can we help?</span>
              <h2 className="text-3xl font-display font-bold text-slate-blue">Communication Channels</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { t: "General Enquiry", d: "Ask about solutions, products, services or get general info.", route: "/enquiry", icon: Mail },
                { t: "Get a Quote", d: "Share requirements for a detailed proposal and pricing.", route: "/get-quote", icon: Briefcase, featured: true },
                { t: "Book a Demo", d: "Schedule a live walkthrough — online or on-site.", route: "/book-demo", icon: Play }
              ].map((opt, i) => (
                <div key={i} className={`p-10 rounded-[2.5rem] border transition-all flex flex-col items-start ${opt.featured ? "bg-light-cream border-brand-walnut/30 walnut-glow" : "bg-pure-white border-cool-gray/30 hover:border-brand-walnut/50"}`}>
                   {opt.featured && <span className="inline-block px-3 py-1 bg-brand-walnut text-pure-white text-[10px] font-bold uppercase rounded-md mb-6">Recommended</span>}
                   <div className="w-12 h-12 rounded-2xl bg-slate-blue/5 border border-cool-gray/20 flex items-center justify-center text-slate-blue mb-8">
                      <opt.icon size={24} />
                   </div>
                   <h3 className="text-xl font-display font-bold text-slate-blue mb-4">{opt.t}</h3>
                   <p className="text-slate-blue/50 text-sm leading-relaxed mb-10 flex-grow">{opt.d}</p>
                   <Link to={opt.route} className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all ${opt.featured ? "bg-brand-walnut text-pure-white shadow-xl shadow-brand-walnut/20" : "bg-light-gray text-slate-blue hover:bg-slate-blue hover:text-pure-white"}`}>
                      {opt.t.split(" ")[0]} Now
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── DIRECT CONTACT + MAP ── */}
      <section className="py-24 bg-light-gray border-y border-cool-gray/30">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                 <div className="mb-12">
                    <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase mb-1 block">Direct Reach</span>
                    <h2 className="text-3xl font-display font-bold text-slate-blue">Connect with our team directly</h2>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { icon: Smartphone, t: "Phone", v: "+91 99999 XXXXX", s: "Mon–Sat 9am–7pm", c: "text-blue-600" },
                      { icon: MessageSquare, t: "WhatsApp", v: "+91 99999 XXXXX", s: "Quick response", c: "text-green-600" },
                      { icon: Mail, t: "Email", v: "hello@nxsolutions.in", s: "Support & Sales", c: "text-accent-sky" },
                      { icon: MapPin, t: "Office", v: "Indore, Madhya Pradesh", s: "NX-Solutions HQ", c: "text-red-500" }
                    ].map((item, i) => (
                      <div key={i} className="bg-pure-white p-6 rounded-3xl border border-cool-gray/50 flex items-center gap-6 group hover:border-brand-walnut transition-all cursor-pointer">
                         <div className={`w-12 h-12 rounded-2xl bg-light-gray/50 flex items-center justify-center ${item.c} group-hover:scale-110 transition-transform`}>
                            <item.icon size={24} />
                         </div>
                         <div>
                            <div className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-widest">{item.t}</div>
                            <div className="text-sm font-bold text-slate-blue">{item.v}</div>
                            <div className="text-xs text-slate-blue/40 mt-0.5">{item.s}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-pure-white rounded-[3rem] p-4 border border-cool-gray/30 shadow-2xl h-full flex flex-col">
                 <div className="bg-light-cream rounded-[2.5rem] flex-grow flex items-center justify-center p-20 min-h-[400px] relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className="relative z-10 text-center">
                       <MapPin size={48} className="text-slate-blue/20 mx-auto mb-6" />
                       <p className="text-slate-blue/40 text-xs font-bold uppercase tracking-widest">Interactive Map Placeholder</p>
                       <span className="text-[10px] text-slate-blue/20">Indore, India</span>
                    </div>
                 </div>
                 <div className="p-8 flex items-center justify-between">
                    <div>
                       <h4 className="font-bold text-slate-blue">Visit Our Office</h4>
                       <p className="text-xs text-slate-blue/40 mt-1">SGSITS, Indore, MP 452003</p>
                    </div>
                    <button className="p-3 bg-slate-blue text-pure-white rounded-xl">
                       <ExternalLink size={20} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ── QUICK MESSAGE FORM ── */}
      <section className="py-24 bg-pure-white">
        <div className="container mx-auto px-6">
           <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                 <span className="text-xs font-bold text-brand-walnut tracking-widest uppercase mb-1 block">Quick Drop</span>
                 <h2 className="text-3xl font-display font-bold text-slate-blue mb-6">Send us a direct message</h2>
                 <p className="text-slate-blue/50 mb-10 leading-relaxed max-w-md">
                    For general questions or simple queries. For detailed technical requests, please use our <Link to="/enquiry" className="text-brand-walnut font-bold underline underline-offset-4">General Enquiry</Link> form.
                 </p>
                 
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                       <span className="text-sm text-slate-blue/60 font-medium">Response within 2 hours</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                       <span className="text-sm text-slate-blue/60 font-medium">Verified support staff</span>
                    </div>
                 </div>
              </div>

              <div className="flex-1 w-full bg-light-gray/30 p-10 md:p-12 rounded-[3rem] border border-cool-gray/50 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 text-slate-blue/5">
                    <MessageSquare size={120} />
                 </div>
                 <form className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Full Name</label>
                          <input type="text" placeholder="Your name" className="w-full px-6 py-4 bg-pure-white border border-cool-gray/30 rounded-2xl outline-none focus:border-slate-blue transition-all text-sm" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Mobile</label>
                          <input type="text" placeholder="+91 XXXXX" className="w-full px-6 py-4 bg-pure-white border border-cool-gray/30 rounded-2xl outline-none focus:border-slate-blue transition-all text-sm" />
                       </div>
                    </div>
                    <div>
                       <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Message</label>
                       <textarea rows={4} placeholder="How can we help?" className="w-full px-6 py-4 bg-pure-white border border-cool-gray/30 rounded-2xl outline-none focus:border-slate-blue transition-all text-sm resize-none"></textarea>
                    </div>
                    <button className="w-full py-4 bg-slate-blue text-pure-white font-bold rounded-2xl hover:bg-brand-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-blue/10">
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
