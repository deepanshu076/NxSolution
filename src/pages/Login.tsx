import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/src/lib/AuthContext";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  ChevronLeft,
  Circle
} from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOTP, setIsOTP] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    await login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-pure-white pt-20 pb-0">
      {/* ── LEFT PANEL: BRANDING / GRAPHIC ── */}
      <div className="hidden md:flex md:w-1/2 bg-brand-black relative p-16 flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 opacity-20 grid-bg" />
        
        {/* Tech Visual Element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="grid grid-cols-2 gap-4 opacity-10 scale-150">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-40 h-24 bg-white/20 rounded-xl" />
              ))}
           </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />

        <div className="relative z-10 max-w-sm">
           <div className="text-accent-teal text-[10px] font-bold tracking-[.3em] uppercase mb-4 px-4 py-1.5 rounded-full glass-morphism w-fit border border-accent-teal/20">
              Smart Admin System
           </div>
           <h1 className="text-4xl font-display font-bold text-pure-white mb-4 leading-tight">
              Smart control starts here
           </h1>
           <p className="text-pure-white/40 text-sm leading-relaxed">
              Manage everything from one place — domains, leads, projects & more.
           </p>
        </div>
      </div>

      {/* ── RIGHT PANEL: FORMS ── */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-slate-blue mb-2">Login to continue</h2>
            <p className="text-slate-blue/40 text-sm">Access your dashboard and continue your request.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
               <div>
                  <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Mobile number or email</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter mobile or email..."
                      className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20">
                       <Mail size={18} />
                    </div>
                  </div>
               </div>

               {!isOTP && (
                 <div>
                    <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-6 py-4 bg-light-gray rounded-2xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-blue/20">
                         <Lock size={18} />
                      </div>
                    </div>
                 </div>
               )}
            </div>

            <div className="flex items-center justify-between px-1">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded-md border-2 border-cool-gray flex items-center justify-center group-hover:border-brand-walnut transition-colors">
                     <div className="w-2 h-2 bg-brand-walnut rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-slate-blue/60 font-medium">Remember me</span>
               </label>
               <button type="button" className="text-xs text-brand-walnut font-bold hover:underline">Forgot Password?</button>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-slate-blue text-pure-white rounded-2xl font-bold transition-all hover:bg-brand-black shadow-xl shadow-slate-blue/10 flex items-center justify-center gap-2"
            >
              Login <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-10 flex items-center gap-4 text-[10px] font-bold text-slate-blue/20 uppercase tracking-widest">
             <div className="flex-1 h-px bg-cool-gray/30" />
             <span>or continue with</span>
             <div className="flex-1 h-px bg-cool-gray/30" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button 
              onClick={() => setIsOTP(!isOTP)}
              className="flex items-center justify-center gap-3 py-3.5 bg-pure-white border border-cool-gray/50 rounded-2xl text-slate-blue text-xs font-bold hover:bg-light-cream transition-all"
             >
                <Smartphone size={16} className="text-brand-walnut" />
                {isOTP ? "Use Password" : "OTP Login"}
             </button>
             <button className="flex items-center justify-center gap-3 py-3.5 bg-pure-white border border-cool-gray/50 rounded-2xl text-slate-blue text-xs font-bold hover:bg-light-cream transition-all">
                <Globe size={16} className="text-accent-royal" />
                Google
             </button>
          </div>

          <div className="mt-12 text-center text-sm">
             <span className="text-slate-blue/40">New user? </span>
             <Link to="/signup" className="text-brand-walnut font-bold hover:underline">Create account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
