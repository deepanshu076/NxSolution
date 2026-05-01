import { motion } from "motion/react";
import { 
  Building2, 
  ChevronRight, 
  Send, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Activity,
  User,
  Mail,
  Smartphone,
  Briefcase,
  Layers,
  MapPin,
  CircleDollarSign
} from "lucide-react";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function EnquiryForm() {
  const location = useLocation();
  const isQuote = location.pathname.includes("quote");
  const isConsultation = location.pathname.includes("consultation");
  
  const title = isQuote ? "Get a Quote" : isConsultation ? "Expert Consultation" : "General Enquiry";
  const sub = isQuote ? "Share requirements for a detailed proposal." : isConsultation ? "Talk to specialists about operational challenges." : "Ask about solutions, products or services.";
  const route = location.pathname;

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray p-8 pt-28">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-pure-white p-12 rounded-[2.5rem] border-2 border-[#4ade80] text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-[#dcfce7] rounded-full flex items-center justify-center text-[#16a34a] mx-auto mb-8">
             <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-blue mb-4">Submission received!</h2>
          <p className="text-slate-blue/60 text-sm mb-10 leading-relaxed">
            Our team will review your requirement and reach out within 2 business hours. You can track this in your dashboard.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <Link to="/dashboard" className="px-6 py-3.5 bg-slate-blue text-pure-white rounded-xl font-bold text-xs hover:bg-brand-black transition-all">Dashboard</Link>
             <Link to="/" className="px-6 py-3.5 bg-light-cream text-slate-blue rounded-xl font-bold text-xs border border-cool-gray/50 hover:bg-white transition-all">Go Home</Link>
          </div>
          <button className="w-full mt-4 py-3.5 bg-[#22c55e] text-pure-white rounded-xl font-bold text-xs">WhatsApp Status</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Progress Flow (Visual) */}
        <div className="flex items-center justify-center gap-12 mb-16 overflow-x-auto scrollbar-hide py-4">
           {[
             { step: 1, label: "Form filled", active: true },
             { step: 2, label: "Validation", active: false },
             { step: 3, label: "Stored in DB", active: false },
             { step: 4, label: "Notifications", active: false },
             { step: 5, label: "CRM Entry", active: false }
           ].map((s, i) => (
             <div key={i} className="flex items-center gap-4 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${s.active ? "bg-slate-blue text-pure-white" : "bg-pure-white text-slate-blue/20"}`}>
                   {s.step}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${s.active ? "text-slate-blue" : "text-slate-blue/20"}`}>{s.label}</span>
                {i < 4 && <ChevronRight size={14} className="text-slate-blue/10 ml-4" />}
             </div>
           ))}
        </div>

        <div className="bg-pure-white rounded-[2.5rem] border border-cool-gray/30 overflow-hidden shadow-2xl flex flex-col md:flex-row">
           {/* Form Info Panel */}
           <div className="md:w-72 bg-brand-black p-10 text-pure-white flex flex-col justify-between overflow-hidden relative">
              <div className="absolute inset-0 grid-bg opacity-10" />
              <div className="relative z-10">
                 <div className="font-mono text-accent-sky text-[10px] mb-4 tracking-widest">{route}</div>
                 <h2 className="text-2xl font-display font-bold mb-3">{title}</h2>
                 <p className="text-pure-white/40 text-sm leading-relaxed mb-10">{sub}</p>
                 
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-pure-white/10 flex items-center justify-center text-accent-sky">
                          <Clock size={16} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-pure-white/60">2hr Response</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-pure-white/10 flex items-center justify-center text-accent-teal">
                          <Layers size={16} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-pure-white/60">Expert Analysis</span>
                    </div>
                 </div>
              </div>
              
              <div className="relative z-10 mt-12">
                 <div className="px-4 py-2 rounded-lg bg-accent-sky/10 border border-accent-sky/20 text-accent-sky text-[10px] font-bold uppercase tracking-widest text-center">
                    Authenticated Request
                 </div>
              </div>
           </div>

           {/* Actual Form */}
           <div className="flex-1 p-10 md:p-16">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6 md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="text-xs font-bold text-brand-walnut uppercase tracking-[.2em]">Contact Details</div>
                       <div className="flex-1 h-px bg-cool-gray/30" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Full Name *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                        required
                      />
                      <User size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Company Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="e.g. Acme Industries"
                        className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                      />
                      <Building2 size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Mobile number *</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                        required
                      />
                      <Smartphone size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Email address</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="name@company.com"
                        className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                      />
                      <Mail size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                    </div>
                 </div>

                 <div className="space-y-6 md:col-span-2 mt-4">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="text-xs font-bold text-brand-walnut uppercase tracking-[.2em]">Requirement Details</div>
                       <div className="flex-1 h-px bg-cool-gray/30" />
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Industry *</label>
                    <select className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm appearance-none">
                       <option>Select Industry →</option>
                       <option>Education</option>
                       <option>Manufacturing</option>
                       <option>Healthcare</option>
                       <option>Corporate</option>
                    </select>
                 </div>

                 {isQuote ? (
                   <div>
                      <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Budget Range</label>
                      <select className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm appearance-none">
                         <option>Select Budget →</option>
                         <option>₹1L – 5L</option>
                         <option>₹5L – 20L</option>
                         <option>₹20L – 1Cr</option>
                         <option>Custom Enterprise</option>
                      </select>
                   </div>
                 ) : (
                   <div>
                      <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Requirement Type *</label>
                      <select className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm appearance-none">
                         <option>Project-based</option>
                         <option>Solution Implementation</option>
                         <option>Product Purchase</option>
                         <option>Support & Service</option>
                      </select>
                   </div>
                 )}

                 {isQuote && (
                   <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Location *</label>
                        <div className="relative">
                          <input type="text" placeholder="City, State" className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut outline-none transition-all text-sm" />
                          <MapPin size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Urgency</label>
                        <select className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 outline-none text-sm appearance-none">
                           <option>Immediate / Next 15 days</option>
                           <option>1 – 3 Months</option>
                           <option>Planning Phase</option>
                        </select>
                      </div>
                   </div>
                 )}

                 <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Detailed Message *</label>
                    <textarea 
                      placeholder="Describe your requirement or challenge in detail..."
                      rows={4}
                      className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm resize-none"
                      required
                    ></textarea>
                 </div>

                 <div className="md:col-span-2 pt-6">
                    <button 
                      type="submit"
                      className="w-full md:w-fit px-12 py-4 bg-slate-blue text-pure-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-black transition-all shadow-xl shadow-slate-blue/10"
                    >
                       Submit {title} <Send size={18} />
                    </button>
                    <p className="mt-4 text-[10px] text-slate-blue/30 font-medium text-center md:text-left">
                       Data → Admin: <span className="text-brand-walnut font-bold uppercase">{title.split(" ")[title.split(" ").length - 1]} Tab</span>
                    </p>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
