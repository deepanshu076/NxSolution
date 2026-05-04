import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Zap, Globe, Users, Linkedin, ArrowUpRight, Shield, Activity, Brain } from 'lucide-react';
import PageHero from "../components/ui/PageHero";

const AboutDecorations = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden max-w-[1400px] mx-auto">
    <div className="absolute top-[18%] left-[8%] bg-nx-white border border-nx-steel/10 rounded-full px-4 py-2 text-[10px] font-bold text-nx-navy shadow-sm bg-opacity-90 backdrop-blur-sm hidden md:flex items-center gap-2">
      <Shield size={12} /> DETERMINISTIC
    </div>
    <div className="absolute top-[15%] right-[10%] bg-nx-white border border-nx-steel/10 rounded-full px-4 py-2 text-[10px] font-bold text-nx-navy shadow-sm bg-opacity-90 backdrop-blur-sm hidden md:flex items-center gap-2">
      <Activity size={12} /> HIGH PERFORMANCE
    </div>
    <div className="absolute bottom-[25%] left-[5%] bg-nx-white border border-nx-steel/10 rounded-full px-4 py-2 text-[10px] font-bold text-nx-navy shadow-sm bg-opacity-90 backdrop-blur-sm hidden md:flex items-center gap-2">
      <Brain size={12} /> AI INFRASTRUCTURE
    </div>
  </div>
);

const values = [
  {
    title: "First Principles",
    description: "We build from the ground up. No wrappers, no shortcuts — just deterministic, reliable systems.",
    icon: Target,
  },
  {
    title: "Speed as a Feature",
    description: "Sub-50ms response isn't a benchmark — it's our baseline. Every millisecond matters.",
    icon: Zap,
  },
  {
    title: "Open Ecosystem",
    description: "Our integration-first approach empowers anyone to build, extend, and scale on our platform.",
    icon: Globe,
  },
  {
    title: "Radical Ownership",
    description: "Every team member owns their domain end-to-end. Autonomy drives our best work.",
    icon: Users,
  },
];

const founders = [
  {
    name: "ABHISHEK YADAV",
    role: "FOUNDER & CEO",
    bio: "Visionary leader focused on the intersection of AI and autonomous facility management workflows. Abhishek drives the strategic roadmap and core engineering philosophy at NX-SOLUTIONS.",
    image: "/images/founder1.png",
  },
  {
    name: "ADITYA SHARMA",
    role: "CO-FOUNDER",
    bio: "Strategic architect driving the global scaling of NX-Solution's core intelligence infrastructure. Aditya specializes in deterministic system design and high-performance networks.",
    image: "/images/founder2.png",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-nx-white text-nx-navy overflow-hidden">

      {/* ── HERO ── */}
      <PageHero
        titleLine1="Engineering Uncompromising"
        titleLine2="Operational Intelligence"
        descriptionLine1="We build deterministic, production-grade smart facility infrastructure."
        descriptionLine2="No wrappers, no latency — just absolute reliability at scale."
        floatingElements={<AboutDecorations />}
      >
        <Link to="/contact" className="px-8 py-3.5 bg-nx-navy text-nx-white rounded-full font-bold transition-all hover:bg-nx-navy-hover hover:scale-105 shadow-lg text-sm whitespace-nowrap">
          Work With Us
        </Link>
        <Link to="/projects" className="px-8 py-3.5 border border-nx-navy/20 text-nx-navy rounded-full font-bold hover:bg-nx-navy/5 backdrop-blur-sm transition-all hover:scale-105 text-sm whitespace-nowrap">
          View Projects
        </Link>
      </PageHero>

      {/* ── CORE VALUES ── */}
      <section className="py-28 relative z-10 border-b border-nx-steel/10 bg-nx-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold tracking-tight text-nx-navy mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-nx-steel">The principles that drive our engineering and culture.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group p-10 rounded-3xl bg-nx-white border border-nx-steel/10 hover:border-nx-navy/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-nx-ice border border-nx-steel/10 text-nx-steel group-hover:bg-nx-navy group-hover:text-nx-white group-hover:border-nx-navy transition-all duration-300">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-nx-navy">{value.title}</h3>
                  <p className="text-nx-steel leading-relaxed text-lg">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="py-28 relative z-10 bg-nx-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nx-ice border border-nx-steel/10 text-nx-navy text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
              Leadership
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-nx-navy uppercase">
              Meet the <span className="text-nx-steel">Founders</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <div className="group relative h-full flex flex-col p-10 rounded-[2.5rem] bg-nx-ice/30 border border-nx-steel/10 hover:border-nx-navy/20 transition-all duration-500 shadow-sm hover:shadow-2xl">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-nx-navy/5 mb-8 relative border border-nx-steel/5">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-3xl font-display font-black mb-2 text-nx-navy uppercase tracking-tight">{founder.name}</h3>
                    <p className="text-nx-steel font-bold uppercase tracking-[0.2em] text-[10px] mb-6 flex items-center gap-2">
                      <span className="w-8 h-px bg-nx-steel/30"></span>
                      {founder.role}
                    </p>
                    <p className="text-nx-navy/70 leading-relaxed mb-8 flex-grow text-lg font-medium">{founder.bio}</p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-3 text-sm text-nx-navy/40 hover:text-nx-navy transition-all font-bold group/link uppercase tracking-widest"
                    >
                      <Linkedin className="w-5 h-5" />
                      Connect
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}