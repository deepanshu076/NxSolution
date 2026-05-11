import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "@/src/constants/projects";
import PageHero from "@/src/components/ui/PageHero";
import {
  Play, ArrowRight, Target, Zap, Cpu, Layout, Settings, Share2,
  CheckCircle2, XCircle, Shield, BarChart3, Wifi, Lock, Activity,
  Clock, Users, Database, Layers, ChevronRight
} from "lucide-react";
import { useState, useRef } from "react";

/* ─── per-domain colour accent ─── */
const ACCENTS: Record<string, { border: string; glow: string; cls: string; dot: string }> = {
  education: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
  healthcare: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
  manufacturing: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
  corporate: { border: "var(--nx-steel)", glow: "rgba(71,85,105,.15)", cls: "text-nx-steel", dot: "bg-nx-steel" },
  retail: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
  logistics: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
  government: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
  residential: { border: "var(--nx-navy)", glow: "rgba(0,28,61,.15)", cls: "text-nx-navy", dot: "bg-nx-navy" },
};

/* ─── domain icons ─── */
const DOMAIN_ICONS: Record<string, React.ElementType> = {
  education: Layout,
  healthcare: Activity,
  manufacturing: Settings,
  corporate: Layers,
  retail: Share2,
  logistics: Database,
  government: Shield,
  residential: Users,
};

/* ─── project-specific subdomain cards ─── */
const SUBDOMAIN_CARDS: Record<string, { label: string; image: string }[]> = {
  "gate-automation": [
    { label: "Gate Entry", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
    { label: "Classrooms", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80" },
    { label: "Library", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80" },
    { label: "Labs", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" },
    { label: "Cafeteria", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    { label: "Parking", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80" },
  ],
  "smart-icu-hub": [
    { label: "ICU Ward", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
    { label: "OPD Zone", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
    { label: "Pharmacy", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80" },
    { label: "Nurse Station", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Reception", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Wards", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
  ],
  "eco-manufacturing": [
    { label: "Shop Floor", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
    { label: "Warehouse", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Control Room", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
    { label: "Loading Bay", image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=600&q=80" },
    { label: "Admin", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Quality Lab", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" },
  ],
  "logistics-distribution": [
    { label: "Inbound Dock", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Sorting Zone", image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=600&q=80" },
    { label: "Storage Racks", image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&q=80" },
    { label: "Dispatch Bay", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { label: "Fleet Yard", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80" },
    { label: "Control Hub", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
  ],
  "smart-campus": [
    { label: "Reception", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { label: "Workstations", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" },
    { label: "Conference", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80" },
    { label: "Server Room", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" },
    { label: "Cafeteria", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" },
    { label: "Parking", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80" },
  ],
  "retail-analytics": [
    { label: "Shop Floor", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
    { label: "Checkout", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" },
    { label: "Storage", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
    { label: "Entry Gate", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
    { label: "Display Zone", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
    { label: "Staff Area", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  ],
};

const SOFT_FEATURES = [
  { label: "Real-time Alerts", icon: Activity },
  { label: "Role Access", icon: Lock },
  { label: "Audit Logs", icon: Clock },
  { label: "Multi-site", icon: Layers },
  { label: "Analytics", icon: BarChart3 },
  { label: "Team Mgmt", icon: Users },
  { label: "Data Export", icon: Database },
  { label: "API Ready", icon: Wifi },
];

const CORE_PRODUCTS = [
  { name: "Node-S Sensors", sub: "Enterprise", icon: Cpu },
  { name: "IQ Dashboard", sub: "Enterprise", icon: Layout },
  { name: "Hub-Z Controller", sub: "Enterprise", icon: Settings },
  { name: "Comms-X Gateway", sub: "Enterprise", icon: Share2 },
  { name: "Edge AI Module", sub: "Pro", icon: Zap },
  { name: "Mesh Network", sub: "Pro", icon: Wifi },
  { name: "Secure Vault", sub: "Pro", icon: Shield },
  { name: "Analytics Core", sub: "Pro", icon: BarChart3 },
];

/* ─── target solutions per subdomain per project ─── */
const SUB_DOMAIN_SOLUTIONS: Record<string, Record<number, { label: string; image: string; videoUrl: string }[]>> = {
  "gate-automation": {
    0: [ // Gate Entry
      { label: "ANPR Gate System", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Boom Barrier Auto", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Guard AI Assist", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    1: [ // Classrooms
      { label: "Smart Attendance", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Room Occupancy", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Climate Control", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    2: [ // Library
      { label: "Entry Access", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Book Tracker RFID", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Silence Monitor", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    3: [ // Labs
      { label: "Equipment Log", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Hazard Alert System", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Access Control", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    4: [ // Cafeteria
      { label: "Queue Management", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Digital Menu Board", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Payment Kiosk", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    5: [ // Parking
      { label: "Slot Detection", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Entry-Exit Log", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "EV Charging Node", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
  },
  "smart-icu-hub": {
    0: [
      { label: "Vital Monitor Hub", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "AI Alert Engine", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Nurse Call System", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    1: [
      { label: "Patient Flow Mgmt", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Digital Token", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Doc Dashboard", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    2: [
      { label: "Stock Tracking", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Expiry Alerts", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { label: "Auto Dispensing", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    ],
    3: [{ label: "Smart Nurse Hub", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { label: "Alert Routing", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { label: "Shift Analytics", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
    4: [{ label: "Visitor Management", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { label: "Wayfinding Kiosk", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { label: "Queue Display", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
    5: [{ label: "Bed Monitoring", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { label: "Infection Control", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { label: "Staff Allocation", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }],
  },
};

// Generic fallback solutions for other projects
const FALLBACK_SOLUTIONS = [
  { label: "Smart Monitoring", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { label: "AI Analytics", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { label: "Access Control", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
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
    <div className="flex flex-col bg-nx-white">
      <style>{`
        .custom-scroll-${project.slug}::-webkit-scrollbar { width: 5px; }
        .custom-scroll-${project.slug}::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll-${project.slug}::-webkit-scrollbar-thumb { background: ${accent.border}; border-radius: 9999px; }
      `}</style>


      {/* ── 1. HERO ── */}
      <PageHero
        titleLine1={project.title}
        backgroundImage={project.image}
        descriptionLine1={project.overview.split(".")[0] + "."}
        topContent={
          <div className={`text-[11px] font-black uppercase tracking-[0.4em] ${accent.cls === 'text-nx-navy' ? 'text-nx-steel-light' : accent.cls}`}>
            {project.domainId} • {project.type}
          </div>
        }
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-4">
          {project.metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p className="font-display font-[800] text-3xl md:text-5xl text-white leading-none drop-shadow-md">{m.value}</p>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">{m.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-12 bg-nx-ice relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-black text-nx-navy uppercase tracking-tight">
              Sub-Domain <span className="text-nx-steel">Coverage</span>
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
                  className={`relative flex-shrink-0 w-[240px] h-[160px] rounded-[2rem] overflow-hidden snap-start cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-md border-2 ${isActive ? 'border-nx-navy' : 'border-transparent'}`}
                >
                  <img src={card.image} alt={card.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-nx-navy/90 via-nx-navy/20 to-transparent" />
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
          <section className="pb-20 bg-nx-ice relative z-10">
            <div className="container mx-auto px-6">

              {/* ── Unified frame wrapping both cards + video ── */}
              <div className="bg-nx-white/50 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-10 border border-nx-steel/10 shadow-sm">

                {/* Top: section title + solution cards */}
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-display font-black text-nx-navy uppercase tracking-tight">
                      Targeted <span className="text-nx-steel">Solutions</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-nx-steel-light mt-2">
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
                          className={`relative flex-shrink-0 w-[220px] h-[150px] rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-md border-2 ${isSolActive ? 'border-nx-navy opacity-100' : 'border-white/60 opacity-60'}`}
                        >
                          <img src={sol.image} alt={sol.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" />
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
                    className="relative w-full max-w-3xl mx-auto aspect-video rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-nx-navy/20"
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
                        <img src={activeSolution.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-nx-navy/80 to-transparent" />
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

      {/* ── 4. PROBLEM SECTION ── */}
      <section className="py-20 bg-nx-white">
        <div className="container mx-auto px-6">
          <div className="bg-nx-ice rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center border border-nx-steel/5">

            {/* Left: Image Container (White Box) - NOW MOVED TO RIGHT VISUALLY */}
            <div className="bg-nx-white rounded-[2rem] p-3 shadow-sm relative h-[380px] lg:h-[460px] w-full flex-shrink-0 lg:order-2 order-1">
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
                {/* Subtle tint overlay for "Problem" */}
                <div className="absolute inset-0 bg-nx-steel/10 mix-blend-multiply transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-nx-navy/80 via-nx-navy/20 to-transparent" />

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
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-nx-steel-light mb-3">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-nx-navy leading-tight">
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
                      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? "bg-nx-white shadow-xl border border-nx-navy/10 scale-[1.02] z-10" : "bg-nx-white/40 border border-nx-steel/10 hover:border-nx-navy/20"
                        }`}
                    >

                      <div className={`pl-2 transition-colors duration-300 ${isActive ? '' : 'opacity-80'}`}>
                        <h3 className="text-sm md:text-base font-bold text-nx-navy mb-1 leading-snug">
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

      {/* ── 5. SOLUTION SECTION ── */}
      <section className="py-10 pb-20 bg-nx-white">
        <div className="container mx-auto px-6">
          <div className="bg-nx-ice border border-nx-steel/5 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center shadow-sm">

            {/* Left: Image Container (White Box) */}
            <div className="bg-nx-white rounded-[2rem] p-3 shadow-sm relative h-[380px] lg:h-[460px] w-full flex-shrink-0 lg:order-1 order-2">
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
                <div className="absolute inset-0 bg-gradient-to-t from-nx-navy/80 via-nx-navy/20 to-transparent" />

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
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-nx-steel-light mb-3">The Solution</p>
                <h2 className="text-3xl md:text-4xl font-display font-black text-nx-navy leading-tight">
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
                      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? "bg-nx-white shadow-xl border border-nx-navy/10 scale-[1.02] z-10" : "bg-nx-white/40 border border-nx-steel/10 hover:border-nx-navy/20"
                        }`}
                    >

                      <div className={`pl-2 transition-colors duration-300 ${isActive ? '' : 'opacity-80'}`}>
                        <h3 className="text-sm md:text-base font-bold text-nx-navy mb-1 leading-snug">
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

      <section className="py-24 bg-nx-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-nx-navy/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-nx-steel/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-nx-steel-light mb-4">Hardware & Infrastructure</p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-nx-navy uppercase tracking-tight mb-16">
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
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative group cursor-pointer"
              >
                {/* Main Card */}
                <div className="h-full bg-nx-ice p-8 rounded-[2.5rem] border border-nx-steel/10 shadow-sm flex flex-col items-center transition-all duration-500">

                  {/* Icon Container with dynamic glow */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-nx-navy/10 rounded-2xl blur-lg opacity-0 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 rounded-2xl bg-nx-white border border-nx-steel/10 flex items-center justify-center shadow-sm transition-all duration-500">
                      <prod.icon size={22} className="text-nx-navy transition-transform duration-500" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-base font-black text-nx-navy leading-tight">{prod.name}</p>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-nx-steel-light" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-nx-steel/60">{prod.sub}</p>
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-nx-steel-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SOFT FEATURES — Large Icon Cards ── */}
      <section className="py-32 bg-nx-ice border-t border-nx-steel/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-nx-steel-light mb-4">Ecosystem Intelligence</p>
            <h2 className="text-3xl md:text-4xl font-display font-black text-nx-navy uppercase tracking-tight">
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
                <div className="h-full bg-nx-white p-6 rounded-3xl border border-nx-steel/10 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:shadow-xl group-hover:border-nx-navy/20">

                  {/* Big Icon with dynamic background */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 bg-nx-navy/5 rounded-2xl scale-0 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative w-14 h-14 rounded-2xl bg-nx-ice flex items-center justify-center transition-colors duration-500 group-hover:bg-nx-navy/10">
                      <feat.icon size={24} className="text-nx-steel/40 transition-colors duration-500 group-hover:text-nx-navy" strokeWidth={1.5} />
                    </div>
                  </div>

                  <span className="text-[10px] md:text-[11px] font-black text-nx-steel uppercase tracking-[0.15em] leading-tight">
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
      <section className="py-12 bg-nx-navy">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-nx-steel-light text-[10px] font-black uppercase tracking-[0.3em]">
            Scale your ecosystem with Nx-Core™
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-nx-white text-nx-navy text-[11px] font-bold rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-nx-ice transition-colors"
            >
              Initiate Discussion <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  );
}
