import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/src/lib/AuthContext";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  User, 
  Smartphone, 
  Building2, 
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import { motion } from "motion/react";

export default function Signup() {
  const [formData, setBaseFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    company: ""
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup then login
    await login(formData.email, formData.password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-pure-white pt-20 pb-0">
      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex md:w-1/2 bg-brand-black relative p-16 flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        
        {/* Animated Visual */}
        <div className="absolute inset-0 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 400 600">
              <motion.circle 
                 cx="200" cy="300" r="100" 
                 stroke="var(--color-accent-sky)" strokeWidth="0.5" fill="none"
                 animate={{ r: [100, 120, 100], opacity: [0.2, 0.4, 0.2] }}
                 transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.circle 
                 cx="200" cy="300" r="150" 
                 stroke="var(--color-accent-sky)" strokeWidth="0.5" fill="none"
                 animate={{ r: [150, 130, 150], opacity: [0.1, 0.3, 0.1] }}
                 transition={{ duration: 6, repeat: Infinity }}
              />
           </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />

        <div className="relative z-10 max-w-sm">
           <div className="text-accent-teal text-[10px] font-bold tracking-[.3em] uppercase mb-4 px-4 py-1.5 rounded-full glass-morphism w-fit border border-accent-teal/20">
              Join the Platform
           </div>
           <h1 className="text-4xl font-display font-bold text-pure-white mb-4 leading-tight">
              Create your account in 60 seconds
           </h1>
           <p className="text-pure-white/40 text-sm leading-relaxed">
              Get access to enquiries, quotes, and project tracking.
           </p>
           
           <div className="mt-12 space-y-4">
              {["Industry Insights", "Live Project Status", "Priority Support"].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-pure-white/60">
                   <CheckCircle2 size={16} className="text-accent-teal" />
                   <span>{f}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-slate-blue mb-2">Create account</h2>
            <p className="text-slate-blue/40 text-sm">Already have one? <Link to="/login" className="text-brand-walnut font-bold hover:underline">Login instead</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Full name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Your name"
                      className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                      value={formData.name}
                      onChange={(e) => setBaseFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <User size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                  </div>
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Mobile</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="+91 XXXXX"
                      className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                      value={formData.mobile}
                      onChange={(e) => setBaseFormData({ ...formData, mobile: e.target.value })}
                      required
                    />
                    <Smartphone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20" />
                  </div>
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Email address</label>
               <div className="relative">
                 <input 
                   type="email" 
                   placeholder="you@example.com"
                   className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                   value={formData.email}
                   onChange={(e) => setBaseFormData({ ...formData, email: e.target.value })}
                   required
                 />
                 <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20" />
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Password</label>
               <div className="relative">
                 <input 
                   type="password" 
                   placeholder="Min. 8 characters"
                   className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                   value={formData.password}
                   onChange={(e) => setBaseFormData({ ...formData, password: e.target.value })}
                   required
                 />
                 <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20" />
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Company name <span className="lowercase font-normal opacity-60">(optional)</span></label>
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Your company..."
                   className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                   value={formData.company}
                   onChange={(e) => setBaseFormData({ ...formData, company: e.target.value })}
                 />
                 <Building2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20" />
               </div>
            </div>

            <div className="pt-6">
               <button 
                type="submit" 
                className="w-full py-4 bg-slate-blue text-pure-white rounded-2xl font-bold transition-all hover:bg-brand-black shadow-xl shadow-slate-blue/10 flex items-center justify-center gap-2"
               >
                Create account & verify OTP <ArrowRight size={18} />
               </button>
               <p className="mt-4 text-[10px] text-slate-blue/30 text-center font-medium leading-relaxed">
                  Signup → OTP verify → auto login → redirect back to your request
               </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
