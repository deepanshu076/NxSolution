import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Settings, Eye, Activity, Shield } from "lucide-react";
import { Search, PenTool, Code2, Layout, Zap, MessageSquare, Check, Menu, Plus } from "lucide-react";


import OperationalChallenges from "../components/home/OperationalChallenges";
import DomainSection from "../components/home/DomainSection";
import PageHero from "../components/ui/PageHero";

// --- Static Data Definitions ---
const partners = [
  { name: "GPAI Gamechangers", category: "Award 2023" },
  { name: "NVIDIA", category: "Inception Program" },
  { name: "Google Cloud", category: "Partner" },
  { name: "AWS Activate", category: "Partner" },
  { name: "Nasscom Deeptech", category: "Ecosystem" },
  { name: "DPIIT", category: "Startup India" },
  { name: "AngelList", category: "Venture" },
];

const solutions = [
  {
    name: "Smart Access Systems",
    description:
      "Multi-layered entry control using AI facial recognition and secure encrypted RFID systems for total facility security.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    features: ["Biometric", "RFID", "Cloud Control"],
  },
  {
    name: "AI Attendance Engine",
    description:
      "Automated presence tracking that eliminates proxy attendance and manual logging across campuses and factories.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    features: ["Real-time", "Anti-proxy", "Insights"],
  },
  {
    name: "Movement Intelligence",
    description:
      "Track personnel and asset flow across large zones to optimize operational efficiency and security response times.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    features: ["Zone Tracking", "Heatmaps", "Flow Analytics"],
  },
  {
    name: "Energy Optimization",
    description:
      "Intelligent HVAC and lighting control systems that reduce utility costs by automatically adjusting to real-time occupancy.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    features: ["Eco-smart", "Cost Control", "Auto-adjust"],
  },
  {
    name: "Security Intelligence",
    description:
      "24/7 proactive monitoring that uses computer vision to detect anomalies and trigger instant security protocols.",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=800&q=80",
    features: ["Proactive", "AI Vision", "Instant Alert"],
  },
];

const steps = [
  {
    title: "Integration",
    desc: "Seamlessly connect IoT sensors and hardware to your existing infrastructure.",
    color: "bg-blue-50",
    text: "text-blue-600",
    icon: Settings,
  },
  {
    title: "Monitoring",
    desc: "24/7 real-time tracking of assets, personnel, and environmental metrics.",
    color: "bg-emerald-50",
    text: "text-emerald-600",
    icon: Eye,
  },
  {
    title: "Analysis",
    desc: "AI-driven analytics process the raw data to identify anomalies and trends.",
    color: "bg-purple-50",
    text: "text-purple-600",
    icon: Activity,
  },
  {
    title: "Security",
    desc: "Automated protocols trigger instantly to secure restricted zones.",
    color: "bg-red-50",
    text: "text-red-600",
    icon: Shield,
  },
  {
    title: "Optimization",
    desc: "Continuous machine learning improves operational system efficiency.",
    color: "bg-amber-50",
    text: "text-amber-600",
    icon: Zap,
  },
];

const testimonials = [
  {
    quote: "Entry queues dropped by 80% in the first month of deployment.",
    author: "Rajesh Kumar",
    role: "Principal, Delhi University",
  },
  {
    quote: "Real-time dashboards changed how we manage the factory floor.",
    author: "Priya Sharma",
    role: "Ops Head, AutoMech Ltd",
  },
  {
    quote: "Energy costs dropped 35% after the optimization system went live.",
    author: "Ankit Joshi",
    role: "Facility Manager, Nexus Corp",
  },
  {
    quote: "The security integration is seamless and highly reliable.",
    author: "Sneha Reddy",
    role: "CTO, TechPark India",
  },
  {
    quote: "Entry queues dropped by 80% in the first month of deployment.",
    author: "Rajesh Kumar",
    role: "Principal, Delhi University",
  },
  {
    quote: "Real-time dashboards changed how we manage the factory floor.",
    author: "Priya Sharma",
    role: "Ops Head, AutoMech Ltd",
  },
  {
    quote: "Energy costs dropped 35% after the optimization system went live.",
    author: "Ankit Joshi",
    role: "Facility Manager, Nexus Corp",
  },
  {
    quote: "The security integration is seamless and highly reliable.",
    author: "Sneha Reddy",
    role: "CTO, TechPark India",
  },
];

const HeroDecorations = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden max-w-[1400px] mx-auto">
    {/* Floating Label Chips */}
    <div className="absolute top-[15%] left-[5%] xl:left-[10%] bg-nx-white border border-[#e0e0e0] rounded-full px-3.5 py-1.5 text-xs text-[#333] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-opacity-90 backdrop-blur-sm hidden md:block">
      Autonomous AI
    </div>
    <div className="absolute top-[12%] right-[5%] xl:right-[15%] bg-nx-white border border-[#e0e0e0] rounded-full px-3.5 py-1.5 text-xs text-[#333] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-opacity-90 backdrop-blur-sm hidden md:block">
      Workflow
    </div>
    <div className="absolute top-[50%] right-[3%] xl:right-[8%] bg-nx-white border border-[#e0e0e0] rounded-full px-3.5 py-1.5 text-xs text-[#333] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-opacity-90 backdrop-blur-sm hidden md:block">
      Autonomous AI
    </div>
    <div className="absolute bottom-[25%] right-[5%] xl:right-[12%] bg-nx-white border border-[#e0e0e0] rounded-full px-3.5 py-1.5 text-xs text-[#333] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-opacity-90 backdrop-blur-sm hidden md:block">
      AI Workflow
    </div>
    <div className="absolute bottom-[15%] left-[10%] xl:left-[18%] bg-nx-white border border-[#e0e0e0] rounded-full px-3.5 py-1.5 text-xs text-[#333] shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-opacity-90 backdrop-blur-sm hidden md:block">
      Autonomous AI
    </div>

    {/* Avatar Cards (Hidden for now) */}
    {/* 
    <div className="absolute top-[18%] left-[30%] w-24 h-24 rounded-2xl overflow-hidden shadow-xl hidden lg:block">
      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
    </div>
    <div className="absolute bottom-[25%] left-[22%] w-20 h-20 rounded-2xl overflow-hidden shadow-xl hidden lg:block">
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
    </div>
    <div className="absolute bottom-[12%] right-[32%] w-24 h-24 rounded-2xl overflow-hidden shadow-xl hidden lg:block">
      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" />
    </div>
    */}

    {/* Small Icon Badges */}
    <div className="absolute top-[40%] left-[3%] xl:left-[8%] w-10 h-10 bg-nx-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#2ecc71] hidden sm:flex">
      <MessageSquare size={20} strokeWidth={2} />
    </div>
    <div className="absolute bottom-[40%] left-[6%] xl:left-[12%] w-10 h-10 bg-nx-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#95a5a6] hidden sm:flex">
      <Check size={20} strokeWidth={2} />
    </div>
    <div className="absolute bottom-[10%] left-[4%] xl:left-[8%] w-10 h-10 bg-[#f8f9fa] border border-[#e0e0e0] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#34495e] hidden sm:flex">
      <Menu size={20} strokeWidth={2} />
    </div>
    <div className="absolute top-[25%] right-[8%] xl:right-[15%] w-10 h-10 bg-[#eafaf1] rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#27ae60] hidden sm:flex">
      <Plus size={20} strokeWidth={2} />
    </div>
    <div className="absolute bottom-[35%] right-[5%] xl:right-[10%] w-10 h-10 bg-nx-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#7f8c8d] hidden sm:flex">
      <Zap size={20} strokeWidth={2} />
    </div>
  </div>
);

export default function Home() {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  return (
    <div className="flex flex-col overflow-x-hidden w-full">

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <PageHero
        titleLine1="We Transform Traditional Operations"
        titleLine2="to Smart Automated Ecosystems"
        descriptionLine1="NX-Solutions transforms hidden daily operational challenges that go"
        descriptionLine2="unnoticed but create major disruption across industries."
        floatingElements={<HeroDecorations />}
      >
        <Link
          to="/solutions"
          className="px-8 py-3.5 bg-[var(--nx-navy)] text-white rounded-full font-bold transition-all hover:bg-black hover:scale-105 shadow-lg text-center text-base whitespace-nowrap"
        >
          Get Started
        </Link>
      </PageHero>

      {/* ───────────────────────── PARTNERS STRIP ───────────────────────── */}
      <section className="py-8 md:py-14 lg:py-16 bg-[#111827] overflow-hidden w-full border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-10 text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-medium italic text-white/90 mb-3 tracking-tight">
            Our Partners and Recognitions
          </h2>
          <div
            className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto"
            aria-hidden="true"
          />
        </div>

        <div className="relative">
          <div className="flex overflow-hidden relative w-full mask-edges-partners">
            <style>{`
              @keyframes scrollDark {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .scroll-track-dark {
                display: flex;
                width: max-content;
                animation: scrollDark 40s linear infinite;
              }
              .mask-edges-partners {
                -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
                mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
              }
            `}</style>
            <div className="scroll-track-dark gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center px-4 hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={`partner-${i}-${partner.name}`}
                  className="flex items-center space-x-2.5 md:space-x-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default group/p shrink-0"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-white/20 text-lg sm:text-xl md:text-2xl group-hover/p:text-blue-400 group-hover/p:bg-white/10 transition-colors shadow-sm">
                    {partner.name.charAt(0)}
                  </div>
                  <span className="font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white/80 tracking-tight whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── OPERATIONAL & DOMAIN SECTIONS ───────────────────── */}
      <OperationalChallenges />

      {/* ─────────────────────── WORKING ARCHITECTURE ─────────────────────── */}
      <section className="py-14 md:py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center mb-10 md:mb-16 relative z-10">
          <h4 className="text-[#2563EB] font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
            Strategic Flow
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#111827]">
            Working Architecture
          </h2>
        </div>

        <div className="container mx-auto max-w-7xl relative px-0 sm:px-2">
          {/* Connector line — desktop only */}
          <div
            className="absolute top-[50%] left-0 w-full -translate-y-1/2 hidden lg:block pointer-events-none px-16"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1000 240"
              className="w-full h-auto opacity-30"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeDasharray="10 6"
            >
              <path d="M20 120 C 120 120, 120 200, 220 200 C 320 200, 320 40, 420 40 C 520 40, 520 180, 620 180 C 720 180, 720 60, 820 60 C 920 60, 920 120, 980 120" />
            </svg>
          </div>

          {/* Cards — horizontal scroll on mobile/tablet, 5-col grid on desktop */}
          <div
            className={[
              /* mobile / tablet: horizontal scroll list */
              "flex overflow-x-auto pb-8 px-4 gap-4",
              "snap-x snap-mandatory scroll-px-4",
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
              /* desktop: regular grid, no scroll */
              "md:gap-5 md:px-6",
              "lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 lg:px-6 lg:gap-4",
            ].join(" ")}
          >
            {steps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={[
                  "flex flex-col items-center group relative",
                  /* fixed width on mobile/tablet, full-width slot on desktop */
                  "shrink-0 w-[230px] sm:w-[260px] md:w-[280px] lg:w-auto",
                  "snap-center",
                  /* alternating vertical offset on desktop only */
                  i % 2 === 0
                    ? "lg:mb-20 lg:translate-y-4"
                    : "lg:mt-20 lg:-translate-y-4",
                ].join(" ")}
              >
                {/* Card pill */}
                <div
                  className={`${item.color} w-full lg:w-auto pl-4 pr-3 py-3.5 md:pl-5 md:pr-4 md:py-3 rounded-2xl border border-white/80 shadow-lg flex items-center justify-between lg:justify-center gap-2.5 mb-4 md:mb-6 transition-all duration-300 group-hover:shadow-xl lg:group-hover:scale-105 relative z-20`}
                >
                  <span
                    className={`font-display font-black text-sm md:text-base lg:text-lg ${item.text} tracking-tight`}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`${item.text} bg-white/60 shadow-sm p-1.5 md:p-2 rounded-full shrink-0`}
                  >
                    <item.icon size={16} strokeWidth={2.5} className="md:hidden" />
                    <item.icon size={18} strokeWidth={2.5} className="hidden md:block" />
                  </div>

                  {/* Desktop connector dots */}
                  <div
                    className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 border-[2px] border-white hidden lg:block"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 border-[2px] border-white hidden lg:block"
                    aria-hidden="true"
                  />
                </div>

                {/* Description */}
                <div className="w-full lg:max-w-[200px] text-center px-1.5 sm:px-2">
                  <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed mb-3 group-hover:text-gray-800 transition-colors">
                    {item.desc}
                  </p>
                  <div
                    className="w-7 h-1 bg-gray-200 mx-auto rounded-full group-hover:bg-blue-400 lg:group-hover:w-12 transition-all duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Step number badge */}
                <div className="absolute -top-3 -right-1.5 md:-top-3.5 md:-right-2.5 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[9px] md:text-[10px] lg:text-[11px] font-black text-slate-400 border border-slate-50 group-hover:text-blue-500 group-hover:shadow-lg transition-all z-30">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */}
      <section className="py-10 md:py-20 lg:py-24 bg-soft-white overflow-hidden w-full">
        <div className="container mx-auto px-4 md:px-6">

          {/* Section header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-brand-black leading-tight max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-brand-black/60 leading-tight mt-2 md:mt-3">
              Powering operations for forward-thinking organizations
            </p>
          </div>

          <div className="relative w-full overflow-hidden pb-2 md:pb-6">
            {/* Edge fade masks */}
            <div
              className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-28 lg:w-32 bg-gradient-to-r from-soft-white to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-28 lg:w-32 bg-gradient-to-l from-soft-white to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            <style>{`
              @keyframes testimonialScroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-testimonial-marquee {
                display: flex;
                width: max-content;
                animation: testimonialScroll 50s linear infinite;
              }
            `}</style>

            <div
              className="animate-testimonial-marquee gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-4 py-2 md:py-4"
              style={{ animationPlayState: isMarqueePaused ? "paused" : "running" }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={`testimonial-${i}`}
                  onMouseEnter={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  onTouchStart={() => setIsMarqueePaused(true)}
                  onTouchEnd={() => setIsMarqueePaused(false)}
                  className="w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] xl:w-[420px] shrink-0 p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[1.5rem] bg-white border border-soft-taupe/30 flex flex-col justify-between transition-all duration-300 hover:border-brand-walnut/50 hover:shadow-xl hover:-translate-y-1 cursor-default shadow-sm touch-manipulation"
                >
                  <div className="mb-3 md:mb-5">
                    <div
                      className="flex gap-0.5 mb-2 md:mb-3 text-[#EF9F27] text-[10px] sm:text-xs md:text-sm"
                      aria-label="5 out of 5 stars"
                    >
                      {"★★★★★".split("").map((s, idx) => (
                        <span key={`star-${idx}`}>{s}</span>
                      ))}
                    </div>
                    <p className="text-brand-black/80 italic text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>
                  <div className="pt-3 md:pt-4 border-t border-soft-taupe/10">
                    <div className="font-bold text-brand-black text-[11px] sm:text-xs md:text-sm">
                      {t.author}
                    </div>
                    <div className="text-[9px] sm:text-[9px] md:text-[10px] text-brand-black/50 uppercase tracking-[.15em] mt-0.5 md:mt-1 font-bold">
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
