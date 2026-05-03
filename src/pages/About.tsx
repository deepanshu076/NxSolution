import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  Plus,
  Lightbulb,
  Layers,
  TrendingUp,
  CheckCircle2,
  Quote,
  ArrowRight,
  Mail,
} from "lucide-react";

// --- Data ---

const howWeThink = [
  {
    icon: <Lightbulb className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Problem-First Thinking",
    desc: "We begin by understanding real operational challenges before designing any solution.",
  },
  {
    icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />,
    title: "System-Based Approach",
    desc: "We don't build isolated tools — we design complete, connected systems.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Scalable Design",
    desc: "Our solutions are built to grow with changing environments and increasing demands.",
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Real-World Execution",
    desc: "Everything we design is practical, implementable, and tested in real scenarios.",
  },
];

const milestones = [
  {
    year: "Phase 01",
    title: "Foundation of NX-Solutions",
    desc: "Setting the core vision for operational intelligence.",
  },
  {
    year: "Phase 02",
    title: "First Smart System Deployment",
    desc: "Successful bridge between hardware and smart analytics.",
  },
  {
    year: "Phase 03",
    title: "Expansion Across Multiple Domains",
    desc: "Scaling solutions into Edu, Retail, and Manufacturing.",
  },
  {
    year: "Phase 04",
    title: "Integrated Framework Development",
    desc: "Launching our proprietary multi-silo management hub.",
  },
  {
    year: "Phase 05",
    title: "Scaling Multi-Domain Ecosystems",
    desc: "Empowering zero-latency campus ecosystems globally.",
  },
];

const team = [
  {
    name: "Aman Yadav",
    role: "Visionary & Founder",
    image: "https://images.unsplash.com/photo-1519085185758-24dd5173a700?w=800",
  },
  {
    name: "Sarah Khan",
    role: "Lead Systems Architect",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
  },
  {
    name: "Michael Chen",
    role: "AI Research Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
  },
];

const testimonials = [
  {
    quote:
      "NX-Solutions helped us streamline our operations with a structured system approach. The difference was immediately visible.",
    name: "Vikram Malhotra",
    company: "Industrial Tech Parks",
  },
  {
    quote:
      "Their focus on real-world execution meant the system actually worked in our complex environment, unlike off-the-shelf tools.",
    name: "Elena Rossi",
    company: "Global Retail Collective",
  },
];

// --- Page Component ---

export default function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-soft-white selection:bg-brand-walnut/30 overflow-x-hidden w-full">

      {/* ─────────────────────────── 1. HERO ─────────────────────────── */}
      <section className="relative min-h-[52vh] sm:min-h-[55vh] md:min-h-[60vh] flex flex-col items-center justify-center pt-20 pb-14 sm:pt-24 sm:pb-16 md:pt-28 md:pb-18 lg:pt-32 lg:pb-24 bg-brand-black px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Column grid bg */}
        <div className="absolute inset-0 opacity-10 flex gap-px pointer-events-none" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`hero-bg-${i}`} className="flex-1 bg-soft-white" />
          ))}
        </div>

        {/* Geometric accents */}
        <div className="absolute -top-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-brand-walnut opacity-10 rounded-xl rotate-45 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-12 -left-6 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-warm-gold-beige opacity-5 rounded-xl rotate-45 pointer-events-none" aria-hidden="true" />

        <div className="relative z-20 text-center max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-soft-white mb-4 sm:mb-5 md:mb-6 tracking-tight leading-[1.2]">
              Building Intelligent Systems{" "}
              <br className="hidden sm:block" />
              for{" "}
              <span className="text-warm-gold-beige">Real-World</span>{" "}
              Operations
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-soft-white/60 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              We design smart, connected systems that bring structure,
              visibility, and control to everyday operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────── 2. OUR PURPOSE ─────────────────────────── */}
      <section
        id="our-purpose"
        className="py-14 sm:py-18 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-soft-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] lg:tracking-[0.3em] text-brand-walnut mb-3 sm:mb-4 font-mono">
                Our Purpose
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black mb-5 sm:mb-6 leading-tight">
                To simplify complex operations and transform processes into
                structured intelligence.
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-brand-black/60 leading-relaxed mb-7 sm:mb-8 lg:mb-10">
                We believe that intelligence isn't just about data—it's about
                usability. Our purpose is to take scattered, manual processes
                and weave them into a unified system that actually works in
                real, demanding environments.
              </p>
              <div className="flex items-center gap-3 text-brand-black font-bold group cursor-pointer w-fit touch-manipulation">
                <span className="text-sm sm:text-base">Explore our philosophy</span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-soft-taupe/30 flex items-center justify-center group-hover:bg-brand-walnut group-hover:border-brand-walnut group-hover:text-soft-white transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </motion.div>

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2 max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full"
            >
              {/* Image frame */}
              <div className="aspect-[4/3] sm:aspect-square lg:aspect-[4/3] xl:aspect-square rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-xl border-4 sm:border-4 lg:border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                  alt="Team collaborating on a project"
                  className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Floating quote badge — hidden on small mobile, shown from sm up */}
              <div className="absolute -bottom-5 -left-5 sm:-bottom-8 sm:-left-8 lg:-bottom-10 lg:-left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-brand-walnut rounded-full items-center justify-center p-3 sm:p-5 lg:p-8 text-center text-soft-white font-display text-[10px] sm:text-sm lg:text-lg font-bold italic leading-tight hidden sm:flex shadow-xl">
                "Results over complexity"
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 3. HOW WE THINK ─────────────────────────── */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-28 bg-white border-y border-soft-taupe/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black mb-4 lg:mb-6">
              How We Think
            </h2>
            <div className="w-14 sm:w-16 lg:w-24 h-1 lg:h-1.5 bg-brand-walnut mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-8">
            {howWeThink.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-5 sm:p-7 lg:p-10 rounded-2xl lg:rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-brand-walnut/10 transition-all border border-soft-taupe/10 group flex flex-col h-full"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-brand-walnut/5 text-brand-walnut flex items-center justify-center mb-5 sm:mb-6 lg:mb-8 group-hover:bg-brand-walnut group-hover:text-soft-white transition-colors duration-300 shrink-0">
                  {item.icon}
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-brand-black mb-2 sm:mb-3 font-display">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm lg:text-base text-brand-black/60 leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 4. MILESTONES ─────────────────────────── */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-28 bg-soft-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] lg:tracking-[0.3em] text-brand-walnut mb-3 lg:mb-6 font-mono">
              Our Journey
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black">
              Pushing Boundaries
            </h3>
          </div>

          <div className="relative md:pt-12">
            {/* Vertical timeline line — mobile only */}
            <div
              className="absolute top-2 bottom-2 left-[7px] w-[2px] bg-soft-taupe/20 md:hidden"
              aria-hidden="true"
            />
            {/* Horizontal timeline line — md and up */}
            <div
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-soft-taupe/20 hidden md:block -translate-y-1/2"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 md:gap-4">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-7 sm:pl-8 md:pl-0 md:text-center"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-soft-white border-[3px] md:border-4 border-brand-walnut z-10 shadow-md transition-transform hover:scale-125 md:hover:scale-150 cursor-pointer" />

                  <div className="md:mt-10 lg:mt-12 md:mb-10 lg:mb-12">
                    <span className="text-brand-walnut font-mono font-bold text-xs sm:text-sm lg:text-base block mb-1">
                      {m.year}
                    </span>
                    <h5 className="text-sm sm:text-base md:text-base lg:text-xl font-bold text-brand-black mb-1.5 sm:mb-2 font-display leading-tight">
                      {m.title}
                    </h5>
                    <p className="text-brand-black/60 text-[11px] sm:text-xs lg:text-sm leading-relaxed max-w-[200px] md:mx-auto">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 5. OUR TEAM ─────────────────────────── */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-28 bg-brand-black px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-10 sm:mb-14 lg:mb-20">
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] lg:tracking-[0.3em] text-brand-walnut mb-3 sm:mb-4 font-mono">
              Our Team
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-soft-white mb-4 sm:mb-5 sm:mb-6">
              Thinkers. Builders. Solvers.
            </h3>
            <p className="text-soft-white/60 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              A focused team of thinkers, builders, and problem-solvers working
              towards creating smarter, more efficient operational systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                {/* Photo */}
                <div className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-[2rem] overflow-hidden mb-4 sm:mb-5 lg:mb-6 grayscale hover:grayscale-0 transition-all duration-500 relative border border-white/5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-soft-white mb-1 sm:mb-1.5 font-display">
                  {member.name}
                </h4>
                <p className="text-warm-gold-beige font-mono uppercase text-[9px] sm:text-[10px] sm:text-[11px] tracking-widest">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 6. TESTIMONIALS ─────────────────────────── */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-28 bg-soft-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-brand-black mb-10 sm:mb-14 lg:mb-20">
            Trusted Across Environments
          </h2>

          {/* Testimonial switcher */}
          <div className="relative min-h-[220px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[280px] flex items-center justify-center">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: activeTestimonial === idx ? 1 : 0,
                  scale: activeTestimonial === idx ? 1 : 0.95,
                  pointerEvents: activeTestimonial === idx ? "auto" : "none",
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4"
              >
                <div className="mb-4 sm:mb-5 lg:mb-8">
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-warm-gold-beige opacity-30 fill-warm-gold-beige mx-auto" />
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-brand-black/80 font-display italic leading-relaxed mb-6 sm:mb-8 lg:mb-12 max-w-3xl lg:max-w-4xl mx-auto">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-bold text-brand-black text-sm sm:text-base lg:text-lg">
                    {t.name}
                  </p>
                  <p className="text-brand-walnut font-mono text-[9px] sm:text-[10px] sm:text-xs uppercase tracking-widest mt-1 sm:mt-1.5">
                    {t.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2.5 sm:gap-3 lg:gap-4 mt-8 sm:mt-10 lg:mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 transition-all duration-300 rounded-full touch-manipulation ${activeTestimonial === i
                  ? "w-8 sm:w-10 lg:w-12 bg-brand-walnut"
                  : "w-2 sm:w-2.5 lg:w-3 bg-soft-taupe/30 hover:bg-soft-taupe/60"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 7. CTA ─────────────────────────── */}
      <section className="py-14 sm:py-18 md:py-20 lg:py-28 bg-brand-black px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Column grid bg */}
        <div className="absolute inset-0 opacity-10 flex gap-px pointer-events-none" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`cta-bg-${i}`} className="flex-1 bg-soft-white" />
          ))}
        </div>

        {/* Geometric accents */}
        <div className="absolute -top-8 -left-8 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-brand-walnut opacity-10 rounded-xl rotate-45 pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-8 -right-8 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-warm-gold-beige opacity-5 rounded-xl rotate-45 pointer-events-none" aria-hidden="true" />

        <div className="max-w-3xl lg:max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[9px] sm:text-[10px] font-bold text-soft-white/40 tracking-[0.2em] lg:tracking-[0.25em] uppercase mb-3 sm:mb-4 block">
              Ready to collaborate
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-soft-white mb-5 sm:mb-6 lg:mb-10 leading-tight">
              Let's Build{" "}
              <span className="text-warm-gold-beige">Smarter</span>{" "}
              <br className="hidden sm:block" /> Systems Together
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-soft-white/60 mb-8 sm:mb-10 lg:mb-16 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto font-sans">
              Tell us your requirements—we'll design a solution tailored to your
              environment.
            </p>

            {/* CTA buttons — stacked on mobile, inline from sm */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full max-w-xs sm:max-w-none mx-auto">
              <button className="px-6 py-3.5 lg:px-8 lg:py-4 bg-brand-walnut text-soft-white font-bold rounded-xl hover:bg-brand-black border border-brand-walnut hover:border-soft-white/20 shadow-lg shadow-brand-walnut/20 transition-all text-sm lg:text-base flex items-center justify-center gap-2 touch-manipulation active:scale-95 select-none">
                Get Consultation{" "}
                <Plus className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
              </button>
              <button className="px-6 py-3.5 lg:px-8 lg:py-4 bg-soft-white/5 text-soft-white border border-soft-white/20 font-bold rounded-xl hover:bg-soft-white/10 backdrop-blur-sm transition-all text-sm lg:text-base flex items-center justify-center gap-2 touch-manipulation active:scale-95 select-none">
                Contact Us{" "}
                <Mail className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
