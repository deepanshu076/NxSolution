import { motion } from "motion/react";
import { CheckCircle2, Award, Shield, Target, Lightbulb, Users, Info } from "lucide-react";

const approachSteps = [
  { step: "01", title: "Understand", desc: "We dive deep into your operational processes and pain points." },
  { step: "02", title: "Design", desc: "Our architects craft a bespoke integrated system for your needs." },
  { step: "03", title: "Deploy", desc: "Seamless implementation with zero downtime expectations." },
  { step: "04", title: "Optimize", desc: "Continuous monitoring and AI-driven performance tuning." },
];

export default function About() {
  return (
    <div className="flex flex-col pt-20">
      {/* §1 About Hero */}
      <section className="py-24 bg-light-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-blue mb-8 leading-tight">
                Building Smarter Systems for <span className="text-brand-walnut">Modern Operations.</span>
              </h1>
              <p className="text-lg text-slate-blue/70 mb-10 leading-relaxed">
                NX-Solutions isn't just a hardware vendor—we are a system solution partner. We believe that technology should be an invisible engine driving tangible outcomes.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-walnut/10 flex items-center justify-center text-brand-walnut"><Target size={24} /></div>
                  <div><div className="text-2xl font-bold">50+</div><div className="text-sm text-slate-blue/60">Projects</div></div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-walnut/10 flex items-center justify-center text-brand-walnut"><Award size={24} /></div>
                  <div><div className="text-2xl font-bold">12+</div><div className="text-sm text-slate-blue/60">Industries</div></div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-walnut/10 flex items-center justify-center text-brand-walnut"><Users size={24} /></div>
                  <div><div className="text-2xl font-bold">98%</div><div className="text-sm text-slate-blue/60">Satisfaction</div></div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-walnut/10 flex items-center justify-center text-brand-walnut"><Shield size={24} /></div>
                  <div><div className="text-2xl font-bold">24/7</div><div className="text-sm text-slate-blue/60">Monitoring</div></div>
               </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-square bg-slate-blue rounded-[3rem] overflow-hidden rotate-3 shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Office" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-brand-walnut/30 mix-blend-multiply" />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-pure-white p-8 rounded-3xl shadow-2xl border border-cool-gray/20 max-w-[240px]">
                <div className="text-brand-walnut italic font-display text-lg mb-2">"Technology is the invisible bridge to efficiency."</div>
                <div className="font-bold text-slate-blue">— NX Philosophy</div>
             </div>
          </div>
        </div>
      </section>

      {/* §2 Who We Are */}
      <section className="py-24 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-blue mb-8">Not a hardware vendor — a system solution partner.</h2>
              <p className="text-slate-blue/70 mb-6 leading-relaxed">
                Founded in 2026, NX-Solutions was born from a simple realization: systems are often disjointed. Clients buy cameras from one vendor, sensors from another, and software from a third. The result is a fragmented ecosystem that is difficult to manage and impossible to optimize.
              </p>
              <p className="text-slate-blue/70 leading-relaxed">
                We changed that by creating a "Single-Silo" philosophy where every component is designed to work together from day one.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Unified Stack", icon: Lightbulb },
                { title: "Domain Expertise", icon: Info },
                { title: "AI-Ready Data", icon: Shield },
                { title: "User-Centric Design", icon: Users }
              ].map((trait, i) => (
                <div key={i} className="bg-light-cream p-6 rounded-2xl border border-brand-walnut/5">
                  <trait.icon size={28} className="text-brand-walnut mb-4" />
                  <h4 className="font-display font-bold text-slate-blue">{trait.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §4 Our Approach */}
      <section className="py-24 bg-brand-black text-pure-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4 italic text-brand-walnut">Our Methodology</h2>
              <p className="text-pure-white/60">A 4-step process to transform your operational environment.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {approachSteps.map((item) => (
                <div key={item.step} className="relative group p-8 bg-white/5 rounded-[3rem] border border-white/5 hover:bg-brand-walnut/10 transition-colors">
                   <div className="text-5xl font-display font-bold text-brand-walnut/20 mb-8">{item.step}</div>
                   <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                   <p className="text-pure-white/60">{item.desc}</p>
                   <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="text-brand-walnut" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* §5 Mission Statement */}
      <section className="py-32 bg-pure-white text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-brand-walnut)_0%,_transparent_70%)]" />
         </div>
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <span className="text-brand-walnut font-bold uppercase tracking-widest text-sm mb-8 block font-mono">Mission Statement</span>
            <blockquote className="text-4xl md:text-5xl font-display font-bold text-slate-blue leading-tight mb-12 italic">
               "Operations Should Be Intelligent, <br className="hidden md:block" /> Not Manual."
            </blockquote>
         </div>
      </section>
    </div>
  );
}
