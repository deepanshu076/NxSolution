import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "@/src/constants/projects";
import {
  Play, ArrowRight, Target, Zap, Cpu, Layout, Settings, Share2,
  CheckCircle2, XCircle, Shield, BarChart3, Wifi, Lock, Activity,
  Clock, Users, Database, Layers, ChevronRight
} from "lucide-react";
import { useState, useRef } from "react";

/* ─── per-domain colour accent ─── */
const ACCENTS: Record<string, { border: string; glow: string; cls: string; dot: string }> = {
  education:     { border: "#F97316", glow: "rgba(249,115,22,.25)", cls: "text-orange-500",  dot: "bg-orange-400" },
  healthcare:    { border: "#22D3EE", glow: "rgba(34,211,238,.20)", cls: "text-cyan-400",    dot: "bg-cyan-400"   },
  manufacturing: { border: "#A3E635", glow: "rgba(163,230,53,.20)", cls: "text-lime-400",    dot: "bg-lime-400"   },
  corporate:     { border: "#818CF8", glow: "rgba(129,140,248,.20)", cls: "text-indigo-400", dot: "bg-indigo-400" },
  retail:        { border: "#FB923C", glow: "rgba(251,146,60,.20)", cls: "text-orange-400",  dot: "bg-orange-400" },
  logistics:     { border: "#34D399", glow: "rgba(52,211,153,.20)", cls: "text-emerald-400", dot: "bg-emerald-400"},
  government:    { border: "#60A5FA", glow: "rgba(96,165,250,.20)", cls: "text-blue-400",    dot: "bg-blue-400"   },
  residential:   { border: "#F472B6", glow: "rgba(244,114,182,.20)", cls: "text-pink-400",   dot: "bg-pink-400"   },
};

/* ─── domain icons ─── */
const DOMAIN_ICONS: Record<string, React.ElementType> = {
  education:     Layout,
  healthcare:    Activity,
  manufacturing: Settings,
  corporate:     Layers,
  retail:        Share2,
  logistics:     Database,
  government:    Shield,
  residential:   Users,
};

/* ─── project-specific subdomain cards ─── */
const SUBDOMAIN_CARDS: Record<string, { label: string; image: string }[]> = {
  "gate-automation": [
    { label: "Gate Entry",  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
    { label: "Classrooms", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80" },
    { label: "Library",    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80" },
    { label: "Labs",       image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" },
    { label: "Cafeteria",  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    { label: "Parking",    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80" },
  ],
  "smart-icu-hub": [
    { label: "ICU Ward",      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
    { label: "OPD Zone",      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
    { label: "Pharmacy",      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80" },
    { label: "Nurse Station", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Reception",     image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Wards",         image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
  ],
  "eco-manufacturing": [
    { label: "Shop Floor",   image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
    { label: "Warehouse",    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Control Room", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
    { label: "Loading Bay",  image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=600&q=80" },
    { label: "Admin",        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Quality Lab",  image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" },
  ],
  "logistics-distribution": [
    { label: "Inbound Dock",  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Sorting Zone",  image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=600&q=80" },
    { label: "Storage Racks", image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&q=80" },
    { label: "Dispatch Bay",  image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { label: "Fleet Yard",    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80" },
    { label: "Control Hub",   image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
  ],
  "smart-campus": [
    { label: "Reception",   image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Workstations",image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" },
    { label: "Conference",  image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80" },
    { label: "Server Room", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
    { label: "Cafeteria",   image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    { label: "Parking",     image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80" },
  ],
  "retail-analytics": [
    { label: "Shop Floor",  image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { label: "Checkout",    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" },
    { label: "Storage",     image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Entry Gate",  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
    { label: "Display Zone",image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
    { label: "Staff Area",  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  ],
};

const SOFT_FEATURES = [
  { label: "Real-time Alerts",  icon: Activity },
  { label: "Role Access",       icon: Lock },
  { label: "Audit Logs",        icon: Clock },
  { label: "Multi-site",        icon: Layers },
  { label: "Analytics",         icon: BarChart3 },
  { label: "Team Mgmt",         icon: Users },
  { label: "Data Export",       icon: Database },
  { label: "API Ready",         icon: Wifi },
];

const CORE_PRODUCTS = [
  { name: "Node-S Sensors",   sub: "Enterprise", icon: Cpu },
  { name: "IQ Dashboard",     sub: "Enterprise", icon: Layout },
  { name: "Hub-Z Controller", sub: "Enterprise", icon: Settings },
  { name: "Comms-X Gateway",  sub: "Enterprise", icon: Share2 },
  { name: "Edge AI Module",   sub: "Pro",        icon: Zap },
  { name: "Mesh Network",     sub: "Pro",        icon: Wifi },
  { name: "Secure Vault",     sub: "Pro",        icon: Shield },
  { name: "Analytics Core",   sub: "Pro",        icon: BarChart3 },
];

/* ─── target solutions per subdomain per project ─── */
const SUB_DOMAIN_SOLUTIONS: Record<string, Record<number, { label: string; image: string; videoUrl: string }[]>> = {
  "gate-automation": {
    0: [ // Gate Entry
      { label: "ANPR Gate System",    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Boom Barrier Auto",   image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Guard AI Assist",     image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    1: [ // Classrooms
      { label: "Smart Attendance",    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Room Occupancy",      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Climate Control",     image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    2: [ // Library
      { label: "Entry Access",        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Book Tracker RFID",   image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Silence Monitor",     image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    3: [ // Labs
      { label: "Equipment Log",       image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Hazard Alert System", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Access Control",      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    4: [ // Cafeteria
      { label: "Queue Management",    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Digital Menu Board",  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Payment Kiosk",       image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    5: [ // Parking
      { label: "Slot Detection",      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Entry-Exit Log",      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "EV Charging Node",    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  "smart-icu-hub": {
    0: [
      { label: "Vital Monitor Hub",   image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "AI Alert Engine",     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Nurse Call System",   image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    1: [
      { label: "Patient Flow Mgmt",   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Digital Token",       image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Doc Dashboard",       image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    2: [
      { label: "Stock Tracking",      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Expiry Alerts",       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Auto Dispensing",     image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    3: [{ label: "Smart Nurse Hub",   image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { label: "Alert Routing",     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { label: "Shift Analytics",   image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
    4: [{ label: "Visitor Management",image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { label: "Wayfinding Kiosk",  image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { label: "Queue Display",     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
    5: [{ label: "Bed Monitoring",    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { label: "Infection Control", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { label: "Staff Allocation",  image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
  },
};

// Generic fallback solutions for other projects
const FALLBACK_SOLUTIONS = [
  { label: "Smart Monitoring",  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { label: "AI Analytics",      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { label: "Access Control",    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export default function ProjectDetail() {

  const { slug, project: legacySlug } = useParams();
  const currentSlug = slug || legacySlug;
  const project = projectsData.find((p) => p.slug === currentSlug);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSol, setActiveSol] = useState(0);
  const [activeSubDomain, setActiveSubDomain] = useState(0);
  const [activeSolCard, setActiveSolCard] = useState(0);
  const [activeReq, setActiveReq] = useState(0);
  const [activeImp, setActiveImp] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);

  if (!project) return <Navigate to="/projects" />;

  const accent = ACCENTS[project.domainId] ?? ACCENTS["corporate"];
  const subCards = SUBDOMAIN_CARDS[project.slug] ?? SUBDOMAIN_CARDS["gate-automation"];
  const DomainIcon = DOMAIN_ICONS[project.domainId] ?? Cpu;

  const formatListText = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 4) return { title: text, subtitle: '' };
    return {
      title: words.slice(0, 3).join(' '),
      subtitle: words.slice(3).join(' ')
    };
  };

  return (
    <div className="flex flex-col pt-20 bg-pure-white">
      <style>{`
        .custom-scroll-${project.slug}::-webkit-scrollbar { width: 5px; }
        .custom-scroll-${project.slug}::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll-${project.slug}::-webkit-scrollbar-thumb { background: ${accent.border}; border-radius: 9999px; }
      `}</style>


      {/* ── 1. HERO ── */}
      <section className="relative min-h-[480px] bg-[#0B1221] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
        <img src={project.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/70 to-transparent" />
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`text-[10px] font-black uppercase tracking-[0.4em] mb-5 ${accent.cls}`}
          >
            {project.domainId} • {project.type}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            {project.overview.split(".")[0]}.
          </motion.p>
          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <p className="font-display font-black text-2xl md:text-3xl text-white leading-none">{m.value}</p>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FB] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-display font-black text-brand-black uppercase tracking-tight" style={{ color: accent.border }}>
              Sub-Domain <span className="text-brand-black">Coverage</span>
            </h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x justify-start">
            {subCards.map((card, i) => {
              const isActive = activeSubDomain === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => { setActiveSubDomain(i); setActiveSolCard(0); setIsPlaying(false); }}
                  className="relative flex-shrink-0 w-[220px] h-[155px] rounded-[1.75rem] overflow-hidden snap-start cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: isActive ? `3px solid ${accent.border}` : "3px solid transparent",
                    boxShadow: isActive ? `0 0 28px ${accent.glow}` : "0 4px 20px rgba(0,0,0,0.10)",
                  }}
                >
                  <img src={card.image} alt={card.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0">
                      <DomainIcon size={16} className="text-white" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-white/55 text-[8px] font-black uppercase tracking-[0.25em] mb-0.5">Sub-Domain</p>
                      <p className="text-white font-black text-sm leading-tight">{card.label}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. TARGET SOLUTIONS + VIDEO (driven by active subdomain) ── */}
      {(() => {
        const solutions = (SUB_DOMAIN_SOLUTIONS[project.slug]?.[activeSubDomain]) ?? FALLBACK_SOLUTIONS;
        const activeSolution = solutions[activeSolCard] ?? solutions[0];
        return (
          <section className="pb-20 bg-[#F8F9FB] relative z-10">
            <div className="container mx-auto px-6">

              {/* ── Unified grey frame wrapping both cards + video ── */}
              <div className="bg-[#E8EAED] rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-10 border border-slate-200/60 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05)]">

                {/* Top: section title + solution cards */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-display font-black text-[#1A1F2B] uppercase tracking-tight">
                      Targeted <span style={{ color: accent.border }}>Solutions</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mt-1">
                      Focused on {subCards[activeSubDomain]?.label}
                    </p>
                  </div>

                  {/* Solution cards row */}
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {solutions.map((sol, i) => {
                      const isSolActive = activeSolCard === i;
                      return (
                        <motion.div
                          key={`${activeSubDomain}-${i}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => {
                            setActiveSolCard(i);
                            setIsPlaying(false);
                            setTimeout(() => videoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
                          }}
                          className="relative flex-shrink-0 w-[220px] h-[150px] rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                          style={{
                            border: isSolActive ? `3px solid ${accent.border}` : "3px solid rgba(255,255,255,0.6)",
                            boxShadow: isSolActive ? `0 0 24px ${accent.glow}` : "0 4px 16px rgba(0,0,0,0.08)",
                            opacity: isSolActive ? 1 : 0.6,
                          }}
                        >
                          <img src={sol.image} alt={sol.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0">
                              <Zap size={13} className="text-white" strokeWidth={1.8} />
                            </div>
                            <div>
                              <p className="text-white/55 text-[8px] font-black uppercase tracking-[0.25em] mb-0.5">Solution</p>
                              <p className="text-white font-black text-sm leading-tight">{sol.label}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom: Video player */}
                <div ref={videoRef}>
                  <motion.div
                    key={`${activeSubDomain}-${activeSolCard}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative w-full max-w-3xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-2xl group"
                    style={{ border: `4px solid ${accent.border}`, boxShadow: `0 0 60px ${accent.glow}` }}
                  >
                    {isPlaying ? (
                      <iframe
                        src={`${activeSolution.videoUrl}&autoplay=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img src={activeSolution.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/80 to-transparent" />
                        <button onClick={() => setIsPlaying(true)} className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110" style={{ background: accent.border }}>
                            <Play size={26} fill="white" className="text-white ml-1" />
                          </div>
                        </button>
                        <div className="absolute bottom-6 left-6">
                          <p className="text-white/50 text-[9px] font-black uppercase tracking-widest mb-1">Now Showing</p>
                          <p className="text-white font-black text-base">{activeSolution.label}</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

              </div>{/* end grey frame */}

            </div>
          </section>
        );
      })()}

      {/* ── 4. PROBLEM SECTION: Content Left, Image Right inside Grey Frame ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#F4F5F7] rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center shadow-[inset_0_2px_12px_rgba(0,0,0,0.02)]">
            
            {/* Left: Image Container (White Box) - NOW MOVED TO RIGHT VISUALLY */}
            <div className="bg-white rounded-[2rem] p-3 shadow-sm relative h-[380px] lg:h-[460px] w-full flex-shrink-0 lg:order-2 order-1">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={activeReq}
                    src={FALLBACK_SOLUTIONS[activeReq % FALLBACK_SOLUTIONS.length].image}
                    alt="Challenge"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Subtle red tint overlay for "Problem" */}
                <div className="absolute inset-0 bg-[#E5484D]/10 mix-blend-multiply transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/80 via-[#0B1221]/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 border border-white/20">
                  <p className="text-white text-xs font-black uppercase tracking-widest mb-1">Impact Area</p>
                  <p className="text-white/95 text-sm font-medium leading-tight">
                    {project.requirements[activeReq]}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Title & Scrollable Cards - NOW MOVED TO LEFT VISUALLY */}
            <div className="flex flex-col h-full justify-center lg:order-1 order-2">
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-secondary mb-3">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-[#1A1F2B] leading-tight">
                  Operational Challenges
                </h2>
              </div>
              
              {/* Scrollable list without scrollbar line */}
              <div className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide max-h-[320px] lg:max-h-[380px]">
                {project.requirements.map((req, i) => {
                  const isActive = activeReq === i;
                  const { title, subtitle } = formatListText(req);
                  return (
                    <motion.div
                      key={i}
                      onClick={() => setActiveReq(i)}
                      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isActive ? "bg-[#FDF2F8] shadow-lg border border-[#FBCFE8] scale-105 z-10" : "bg-white shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300"
                      }`}
                    >
                      
                      <div className={`pl-2 transition-colors duration-300 ${isActive ? '' : 'opacity-80'}`}>
                        <h3 className="text-sm md:text-base font-bold text-[#1A1F2B] mb-1 leading-snug">
                          {title}
                        </h3>
                        {subtitle && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. SOLUTION SECTION: Image Left, List Right inside Grey Frame ── */}
      <section className="py-10 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#F8F9FB] border border-slate-100 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center shadow-[inset_0_2px_12px_rgba(0,0,0,0.02)]">
            
            {/* Left: Image Container (White Box) */}
            <div className="bg-white rounded-[2rem] p-3 shadow-sm relative h-[380px] lg:h-[460px] w-full flex-shrink-0 lg:order-1 order-2">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={activeImp}
                    src={FALLBACK_SOLUTIONS[(activeImp + 1) % FALLBACK_SOLUTIONS.length].image}
                    alt="Solution"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Subtle accent tint overlay for "Solution" */}
                <div className="absolute inset-0 opacity-15 mix-blend-multiply transition-colors duration-500" style={{ backgroundColor: accent.border }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/80 via-[#0B1221]/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 border border-white/20">
                  <p className="text-white/80 text-[9px] font-black uppercase tracking-[0.3em] mb-1">Architecture</p>
                  <p className="text-white font-medium text-sm leading-tight">
                    {project.implementation[activeImp]}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right: Title & Scrollable Cards */}
            <div className="flex flex-col h-full justify-center lg:order-2 order-1">
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-secondary mb-3">The Solution</p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-[#1A1F2B] leading-tight">
                  Solution Architecture
                </h2>
              </div>
              
              {/* Scrollable list without scrollbar line */}
              <div className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide max-h-[320px] lg:max-h-[380px]">
                {project.implementation.map((imp, i) => {
                  const isActive = activeImp === i;
                  const { title, subtitle } = formatListText(imp);
                  return (
                    <motion.div
                      key={i}
                      onClick={() => setActiveImp(i)}
                      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isActive ? "bg-[#FDF2F8] shadow-lg border border-[#FBCFE8] scale-105 z-10" : "bg-white shadow-sm border border-slate-200/60 hover:shadow-md hover:border-slate-300"
                      }`}
                    >
                      
                      <div className={`pl-2 transition-colors duration-300 ${isActive ? '' : 'opacity-80'}`}>
                        <h3 className="text-sm md:text-base font-bold text-[#1A1F2B] mb-1 leading-snug">
                          {title}
                        </h3>
                        {subtitle && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#E3F2E1]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E3F2E1]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-4">Hardware & Infrastructure</p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-brand-black uppercase tracking-tight mb-16">
            Core Products Leveraged
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {CORE_PRODUCTS.map((prod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative group cursor-pointer"
              >
                {/* Main Card */}
                <div className="h-full bg-gradient-to-br from-white to-[#E3F2E1] p-8 rounded-[2.5rem] border border-[#E3F2E1] shadow-[0_10px_30px_-10px_rgba(227,242,225,0.5)] flex flex-col items-center transition-all duration-500 group-hover:shadow-[0_25px_50px_-12px_rgba(227,242,225,0.8)] group-hover:border-[#C5E1C1]">
                  
                  {/* Icon Container with dynamic glow */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#C5E1C1] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 rounded-2xl bg-white border border-[#E3F2E1] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-500">
                      <prod.icon size={22} className="text-[#4F774F] transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p className="text-base font-black text-[#2D442D] leading-tight">{prod.name}</p>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#C5E1C1]" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4F774F]/60">{prod.sub}</p>
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#C5E1C1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SOFT FEATURES — Large Icon Cards ── */}
      <section className="py-32 bg-[#F8F9FB] border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-4">Ecosystem Intelligence</p>
            <h2 className="text-3xl md:text-4xl font-display font-black text-brand-black uppercase tracking-tight">
              Integrated Soft Features
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {SOFT_FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                transition={{ delay: i * 0.04 }}
                className="group relative"
              >
                {/* Feature Card */}
                <div className="h-full bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:shadow-xl group-hover:border-brand-walnut/20">
                  
                  {/* Big Icon with dynamic background */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 bg-brand-walnut/5 rounded-2xl scale-0 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center transition-colors duration-500 group-hover:bg-brand-walnut/10">
                      <feat.icon size={24} className="text-slate-400 transition-colors duration-500 group-hover:text-brand-walnut" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <span className="text-[10px] md:text-[11px] font-black text-slate-600 uppercase tracking-[0.15em] leading-tight">
                    {feat.label}
                  </span>

                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-brand-walnut/5 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="py-12 bg-brand-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
            Scale your ecosystem with Nx-Core™
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 text-brand-black text-xs font-black rounded-2xl uppercase tracking-widest shadow-xl flex items-center gap-2"
              style={{ background: accent.border }}
            >
              Initiate Discussion <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  );
}
