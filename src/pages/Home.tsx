import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Settings, Eye, Activity, Shield, Zap } from "lucide-react";

import OperationalChallenges from "../components/home/OperationalChallenges";
import DomainSection from "../components/home/DomainSection";

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
    description: "Multi-layered entry control using AI facial recognition and secure encrypted RFID systems for total facility security.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    features: ["Biometric", "RFID", "Cloud Control"],
  },
  {
    name: "AI Attendance Engine",
    description: "Automated presence tracking that eliminates proxy attendance and manual logging across campuses and factories.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    features: ["Real-time", "Anti-proxy", "Insights"],
  },
  {
    name: "Movement Intelligence",
    description: "Track personnel and asset flow across large zones to optimize operational efficiency and security response times.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    features: ["Zone Tracking", "Heatmaps", "Flow Analytics"],
  },
  {
    name: "Energy Optimization",
    description: "Intelligent HVAC and lighting control systems that reduce utility costs by automatically adjusting to real-time occupancy.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    features: ["Eco-smart", "Cost Control", "Auto-adjust"],
  },
  {
    name: "Security Intelligence",
    description: "24/7 proactive monitoring that uses computer vision to detect anomalies and trigger instant security protocols.",
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
  { quote: "Entry queues dropped by 80% in the first month of deployment.", author: "Rajesh Kumar", role: "Principal, Delhi University" },
  { quote: "Real-time dashboards changed how we manage the factory floor.", author: "Priya Sharma", role: "Ops Head, AutoMech Ltd" },
  { quote: "Energy costs dropped 35% after the optimization system went live.", author: "Ankit Joshi", role: "Facility Manager, Nexus Corp" },
  { quote: "The security integration is seamless and highly reliable.", author: "Sneha Reddy", role: "CTO, TechPark India" },
  { quote: "Entry queues dropped by 80% in the first month of deployment.", author: "Rajesh Kumar", role: "Principal, Delhi University" },
  { quote: "Real-time dashboards changed how we manage the factory floor.", author: "Priya Sharma", role: "Ops Head, AutoMech Ltd" },
  { quote: "Energy costs dropped 35% after the optimization system went live.", author: "Ankit Joshi", role: "Facility Manager, Nexus Corp" },
  { quote: "The security integration is seamless and highly reliable.", author: "Sneha Reddy", role: "CTO, TechPark India" },
];

export default function Home() {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  return (
    <div className="flex flex-col">
      {/* ── HERO SECTION ── */}
      {/* Reduced min-heights and vertical padding */}
      <section className="relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[75vh] flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 bg-brand-black text-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 flex gap-px" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`hero-bg-${i}`} className="flex-1 bg-soft-white" />
          ))}
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-walnut opacity-10 rounded-xl rotate-45" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-8 w-32 h-32 bg-warm-gold-beige opacity-5 rounded-xl rotate-45" aria-hidden="true" />

        <div className="container mx-auto px-5 md:px-6 relative z-10 flex flex-col items-center">

          {/* Reduced bottom margin */}
          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-soft-white mb-4 md:mb-6 leading-tight">
            We Transform Traditional Operations&nbsp;to
            <span className="block mt-2 md:mt-3 lg:mt-4 text-warm-gold-beige">
              Smart Automated Ecosystems
            </span>
          </h1>

          {/* Reduced bottom margin */}
          <p className="text-soft-white/50 text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
            NX-Solutions transforms hidden daily operational challenges that go unnoticed but create major disruption across industries.
          </p>

          <div className="flex flex-row justify-center gap-2 sm:gap-3 w-full sm:w-auto px-1 sm:px-0">
            <Link
              to="/solutions"
              className="flex-1 sm:flex-none px-3 sm:px-5 md:px-8 py-2 md:py-2.5 bg-brand-walnut text-soft-white rounded-xl font-bold transition-all hover:bg-brand-black border border-brand-walnut shadow-xl text-center text-[13px] sm:text-sm md:text-base whitespace-nowrap"
            >
              Get Started
            </Link>
            <button className="flex-1 sm:flex-none px-3 sm:px-5 md:px-8 py-2 md:py-2.5 border border-soft-white/20 text-soft-white rounded-xl font-bold hover:bg-soft-white/5 backdrop-blur-sm text-center text-[13px] sm:text-sm md:text-base transition-colors whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── PARTNERS STRIP ── */}
      {/* Reduced py and gap spacing */}
      <section className="py-10 md:py-12 bg-[#111827] overflow-hidden">
        <div className="container mx-auto px-6 mb-6 md:mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-display font-medium italic text-white/90 mb-3 tracking-tight">
            Our Partners and Recognitions
          </h2>
          <div className="w-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" aria-hidden="true" />
        </div>

        <div className="relative group mt-6 md:mt-8">
          <div className="flex overflow-hidden relative">
            <style>{`
              @keyframes scrollDark {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .scroll-track-dark {
                display: flex;
                width: max-content;
                animation: scrollDark 35s linear infinite;
              }
            `}</style>
            {/* Reduced gap between partners */}
            <div className="scroll-track-dark gap-12 md:gap-24 items-center px-4">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={`partner-${i}-${partner.name}`}
                  className="flex items-center space-x-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group/p"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center font-black text-white/20 text-xl md:text-2xl group-hover/p:text-blue-400 group-hover/p:bg-white/10 transition-all">
                    {partner.name.charAt(0)}
                  </div>
                  <span className="font-display font-bold text-lg md:text-xl text-white/80 tracking-tight whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERATIONSAL & CHALLENGES SECTIONS ── */}
      <OperationalChallenges />

      {/* ── WORKING ARCHITECTURE ── */}
      {/* Considerably reduced overall section padding and staggering height */}
      <section className="py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-12 md:mb-16 relative z-10">
          <h4 className="text-[#2563EB] font-bold text-xs md:text-sm tracking-[0.3em] uppercase mb-3 opacity-70">Strategic Flow</h4>
          <h2 className="text-3xl md:text-4xl font-display font-black text-[#111827]">Working Architecture</h2>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="absolute top-[50%] left-0 w-full -translate-y-1/2 hidden lg:block pointer-events-none px-16" aria-hidden="true">
            <svg viewBox="0 0 1000 240" className="w-full h-auto opacity-30" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="10 6">
              <path d="M20 120 C 120 120, 120 200, 220 200 C 320 200, 320 40, 420 40 C 520 40, 520 180, 620 180 C 720 180, 720 60, 820 60 C 920 60, 920 120, 980 120" />
            </svg>
          </div>

          <div className="flex overflow-x-auto pb-8 gap-6 lg:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 scrollbar-hide snap-x scroll-px-6">
            {steps.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                // Reduced structural shifting heights (mt/mb)
                className={`flex flex-col items-center group relative shrink-0 w-[240px] md:w-[280px] lg:w-auto snap-center ${i % 2 === 0 ? "lg:mb-16 translate-y-2 lg:translate-y-6" : "lg:mt-16 -translate-y-2 lg:-translate-y-6"
                  }`}
              >
                {/* Reduced padding inside architecture cards */}
                <div className={`${item.color} pl-6 pr-4 py-3 rounded-2xl border border-white shadow-lg flex items-center justify-center gap-3 mb-4 md:mb-6 transition-all duration-500 group-hover:shadow-xl group-hover:scale-105 relative z-20`}>
                  <span className={`font-display font-black text-base md:text-lg ${item.text} tracking-tight`}>
                    {item.title}
                  </span>
                  <div className={`${item.text} bg-white/40 p-1.5 md:p-2 rounded-full`}>
                    <item.icon size={18} />
                  </div>

                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 border border-white hidden lg:block" aria-hidden="true" />
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300 border border-white hidden lg:block" aria-hidden="true" />
                </div>

                <div className="max-w-[200px] text-center px-3">
                  <p className="text-gray-500 font-bold text-xs md:text-sm leading-relaxed mb-3 group-hover:text-gray-800 transition-colors">
                    {item.desc}
                  </p>
                  <div className="w-8 h-0.5 bg-gray-200 mx-auto rounded-full group-hover:bg-blue-400 group-hover:w-12 transition-all" aria-hidden="true" />
                </div>

                <div className="absolute -top-3 -right-1 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-[9px] md:text-[10px] font-black text-slate-400 border border-slate-100 group-hover:text-blue-500 transition-colors z-30">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      {/* Reduced py and bottom pb */}
      <section className="py-8 md:py-12 lg:py-16 bg-soft-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-brand-black leading-tight max-w-3xl mx-auto">
              Trusted by Industry Leaders
            </h2>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-brand-black/70 leading-tight mt-1.5 md:mt-2">
              Trusted by Forward-Thinking Organizations
            </h3>
          </div>

          <div className="relative w-full overflow-hidden pb-4 md:pb-6 lg:pb-8">
            <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-soft-white to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-soft-white to-transparent z-10 pointer-events-none" aria-hidden="true" />

            {/* Reduced gap and py for cards */}
            <div
              className="flex w-max animate-marquee gap-3 md:gap-4 lg:gap-5 px-3 md:px-4 py-2 md:py-3"
              style={{ animationPlayState: isMarqueePaused ? "paused" : "running" }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={`testimonial-${i}`}
                  onMouseEnter={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  // Reduced overall widths and padding of cards
                  className="w-[260px] sm:w-[300px] md:w-[360px] lg:w-[400px] min-h-[140px] sm:min-h-[150px] p-4 md:p-6 rounded-2xl bg-white border border-soft-taupe/40 flex flex-col justify-between transition-all duration-300 hover:border-brand-walnut hover:shadow-xl hover:shadow-brand-walnut/20 hover:-translate-y-1.5 cursor-pointer flex-shrink-0"
                >
                  <div className="mb-2 md:mb-3">
                    <div className="flex gap-0.5 mb-1.5 md:mb-2 text-[#EF9F27] text-xs md:text-sm" aria-label="5 out of 5 stars">
                      {"★★★★★".split("").map((s, idx) => (
                        <span key={`star-${idx}`}>{s}</span>
                      ))}
                    </div>
                    <p className="text-brand-black/80 italic text-xs md:text-sm font-medium leading-relaxed">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-brand-black text-xs md:text-sm">{t.author}</div>
                    <div className="text-[9px] md:text-[10px] text-brand-black/50 uppercase tracking-[.2em] mt-0.5 font-extrabold">{t.role}</div>
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