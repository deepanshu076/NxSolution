import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, Link } from "react-router-dom";
import { domains } from "../constants/domains";
import {
   Play,
   ChevronRight,
   ShieldCheck,
   ArrowRight,
   TrendingDown,
   Activity,
   Layers,
   Monitor,
   CheckCircle2,
   XCircle,
   Clock,
   ArrowRightCircle,
   Database,
   Zap,
   Lock,
   Users,
   Thermometer,
   ShieldAlert,
   Package,
   BarChart3,
   Cpu,
   Wifi,
   CircleDot
} from "lucide-react";

const solutions = [
   { 
      id: "S01", 
      name: "Smart Access Control", 
      desc: "Automated entry with real-time logging.", 
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?start=10",
      challenges: [
         { title: "Unauthorised Entry", desc: "Manual checkpoints fail to catch tailgating and badge cloning attempts.", icon: Lock, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" },
         { title: "No Audit Trail", desc: "Paper-based logs are incomplete, delayed, and impossible to query at scale.", icon: Clock, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" },
         { title: "Visitor Blind Spots", desc: "Guests move freely once inside with no real-time tracking or time-bound access.", icon: Users, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" }
      ],
      layers: [
         { title: "AI Vision Sentry", desc: "Automated detection of tailgating and unauthorised access in real time.", icon: ShieldCheck, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" },
         { title: "Digital Credentials", desc: "Encrypted mobile-based access passes issued dynamically for all personnel.", icon: Lock, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
         { title: "Biometric Integration", desc: "Optional facial or fingerprint verification layer for high-security zones.", icon: Users, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" }
      ]
   },
   { 
      id: "S02", 
      name: "Presence Analytics", 
      desc: "Know exactly who is in which zone.", 
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?start=30",
      challenges: [
         { title: "Zone Invisibility", desc: "No real-time data on occupancy leaves managers flying blind on utilization.", icon: TrendingDown, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
         { title: "Overcrowding", desc: "Peak-hour density in key zones creates safety and productivity risks.", icon: Users, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
         { title: "Wasted Space", desc: "Allocated desks and meeting rooms sit empty while teams scramble for space.", icon: Database, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" }
      ],
      layers: [
         { title: "Live Heat Mapping", desc: "Real-time zone density overlays rendered on your floor plan dashboard.", icon: Activity, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
         { title: "Capacity Alerts", desc: "Instant notifications when zones approach or exceed safe occupancy thresholds.", icon: TrendingDown, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
         { title: "Space Optimizer", desc: "AI-driven recommendations to reallocate underused areas for maximum ROI.", icon: BarChart3, image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" }
      ]
   },
   { 
      id: "S03", 
      name: "Environmental Control", 
      desc: "Smart lighting and climate management.", 
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?start=50",
      challenges: [
         { title: "Energy Waste", desc: "Lighting and HVAC run at full capacity in unoccupied areas, driving up costs.", icon: Zap, image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800" },
         { title: "Comfort Complaints", desc: "Static schedules fail to adapt to actual occupancy, causing discomfort.", icon: Thermometer, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
         { title: "No Automation", desc: "Manual override of building systems is slow, inconsistent and error-prone.", icon: Monitor, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" }
      ],
      layers: [
         { title: "Adaptive Climate Engine", desc: "HVAC and lighting auto-adjust based on live occupancy and time-of-day rules.", icon: Thermometer, image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800" },
         { title: "Smart Scheduling", desc: "Pre-programme environment profiles for recurring events and peak hours.", icon: Clock, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
         { title: "Energy Dashboard", desc: "Granular per-zone consumption tracking with automated efficiency reports.", icon: Zap, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" }
      ]
   },
   { 
      id: "S04", 
      name: "Safety Protocol Hub", 
      desc: "Emergency alerts and compliance tracking.", 
      image: "https://images.unsplash.com/photo-1584485592882-7ea9e1a3bc86?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?start=70",
      challenges: [
         { title: "Delayed Response", desc: "Incidents go undetected for critical minutes due to manual patrol gaps.", icon: ShieldAlert, image: "https://images.unsplash.com/photo-1584485592882-7ea9e1a3bc86?auto=format&fit=crop&q=80&w=800" },
         { title: "Compliance Gaps", desc: "Safety audits rely on self-reported data that is inconsistent and untimely.", icon: ShieldCheck, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" },
         { title: "Chaotic Evacuation", desc: "No real-time headcount during emergencies makes safe evacuation impossible.", icon: Users, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" }
      ],
      layers: [
         { title: "Instant Alert System", desc: "Automated incident broadcasts pushed simultaneously to all designated responders.", icon: ShieldAlert, image: "https://images.unsplash.com/photo-1584485592882-7ea9e1a3bc86?auto=format&fit=crop&q=80&w=800" },
         { title: "Compliance Tracker", desc: "Digital audit trails auto-generated from sensor events, eliminating manual logs.", icon: ShieldCheck, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" },
         { title: "Evacuation Roster", desc: "Live headcount per zone during emergencies, viewable from any device instantly.", icon: Users, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" }
      ]
   },
   { 
      id: "S05", 
      name: "Resource Tracking", 
      desc: "Track equipment and facility usage instantly.", 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?start=90",
      challenges: [
         { title: "Asset Loss", desc: "High-value equipment goes missing with no trail of movement or last location.", icon: Package, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
         { title: "Idle Inventory", desc: "Assets sit unused in one zone while requests go unfulfilled elsewhere.", icon: Database, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" },
         { title: "Manual Counts", desc: "Periodic physical inventory checks are time-consuming and highly inaccurate.", icon: BarChart3, image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800" }
      ],
      layers: [
         { title: "RFID Live Tracking", desc: "Every asset tagged and traceable on a live map with movement history logs.", icon: Package, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
         { title: "Smart Inventory", desc: "Automated stock-level alerts when assets fall below configured thresholds.", icon: Database, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" },
         { title: "Usage Analytics", desc: "Identify underutilised assets and reallocate intelligently across zones.", icon: BarChart3, image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800" }
      ]
   },
];

export default function SubDomainDetail() {
   const { domain, subdomain } = useParams();
   const [activeSolution, setActiveSolution] = useState(solutions[0]);
   const [isPlaying, setIsPlaying] = useState(false);
   const [activeChallenge, setActiveChallenge] = useState(0);
   const [activeLayer, setActiveLayer] = useState(0);
   const [activeTech, setActiveTech] = useState<number | null>(null);
   const videoRef = useRef<HTMLElement>(null);

   const domainData = domains.find(d => d.id === domain);
   const domainName = domainData?.name || (domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "Domain");

   const subdomainName = domainData?.subdomains?.find(sd =>
      sd.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === subdomain
   ) || (subdomain ? subdomain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Sub-Domain");

   const getImageForSubdomain = (title: string) => {
      const t = title.toLowerCase();
      // Added better handling for college/hostel and generic fallbacks
      if (t.includes('hostel') || t.includes('dormitory') || t.includes('resident')) return "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80";
      if (t.includes('college') || t.includes('university') || t.includes('campus')) return "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80";
      
      if (t.includes('gate') || t.includes('entry') || t.includes('entrance') || t.includes('access')) return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";
      if (t.includes('reception') || t.includes('help desk') || t.includes('front desk') || t.includes('lobby') || t.includes('waiting')) return "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80";
      if (t.includes('admin') || t.includes('office') || t.includes('management') || t.includes('hr') || t.includes('cabin')) return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80";
      if (t.includes('class') || t.includes('lecture')) return "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&q=80";
      if (t.includes('lab') || t.includes('computer')) return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80";
      if (t.includes('library') || t.includes('study')) return "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80";
      if (t.includes('auditorium') || t.includes('seminar') || t.includes('conference') || t.includes('meeting') || t.includes('hall')) return "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80";
      if (t.includes('canteen') || t.includes('cafeteria') || t.includes('dining') || t.includes('pantry') || t.includes('kitchen') || t.includes('break')) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80";
      if (t.includes('parking') || t.includes('transport') || t.includes('vehicle')) return "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80";
      if (t.includes('workstation') || t.includes('pod') || t.includes('collaboration') || t.includes('team') || t.includes('open work')) return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80";
      if (t.includes('server') || t.includes('it room') || t.includes('network') || t.includes('control') || t.includes('security') || t.includes('guard')) return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80";
      if (t.includes('gym') || t.includes('fitness') || t.includes('pool') || t.includes('club') || t.includes('activity')) return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80";
      if (t.includes('garden') || t.includes('open space') || t.includes('play') || t.includes('perimeter')) return "https://images.unsplash.com/photo-1584485592882-7ea9e1a3bc86?w=1200&q=80";
      if (t.includes('corridor') || t.includes('stair') || t.includes('lift') || t.includes('common')) return "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80";
      if (t.includes('storage') || t.includes('inventory') || t.includes('material') || t.includes('utility') || t.includes('maintenance')) return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80";
      
      // Default premium building image
      return "https://images.unsplash.com/photo-1497215844834-3151b1fba50d?w=1200&q=80";
   };

   const getSmartTitle = (title: string) => {
      let t = title;
      if (t.includes('/')) {
         const parts = t.split('/').map(p => p.trim());
         const singleWordPart = parts.find(p => !p.includes(' '));
         t = singleWordPart || parts[1] || parts[0];
      }
      const boringWords = /\b(Area|Room|Block|Office|Desk|Hall|Cabins|Cabin|Cell|Zone|Center|Space|Hub|Unit|Units|Flats|Lounge|Floor)\b/gi;
      t = t.replace(boringWords, '').trim();
      const words = t.split(' ').filter(w => w.length > 0);
      if (words.length > 1) {
         if (t.toLowerCase().includes('entry') || t.toLowerCase().includes('gate')) return 'ENTRY';
         if (t.toLowerCase().includes('admin')) return 'ADMIN';
         if (t.toLowerCase().includes('staff') || t.toLowerCase().includes('faculty')) return 'STAFF';
         if (t.toLowerCase().includes('computer') || t.toLowerCase().includes('lab')) return 'LABS';
         if (t.toLowerCase().includes('meeting') || t.toLowerCase().includes('conference')) return 'MEETINGS';
         if (t.toLowerCase().includes('parking') || t.toLowerCase().includes('transport')) return 'PARKING';
         return words.reduce((a, b) => a.length > b.length ? a : b);
      }
      return words[0] || t;
   };

   const heroImage = getImageForSubdomain(subdomainName);
   const smartTitle = getSmartTitle(subdomainName);

   return (
      <div className="flex flex-col pt-20">
         {/* ── HERO ── */}
         <section className="relative min-h-[400px] md:min-h-[500px] bg-brand-black overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
               <img 
                  src={heroImage} 
                  alt={smartTitle} 
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/80 to-brand-black" />
               <div className="absolute inset-0 bg-gradient-to-r from-accent-sky/10 to-transparent mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center py-12">
               <div className="max-w-3xl flex flex-col items-center">
                  <span className="text-[10px] md:text-xs font-bold text-accent-sky tracking-[.3em] uppercase mb-4 block">
                     Sub-Domain Excellence
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-pure-white mb-6 uppercase tracking-tight text-balance">
                     {smartTitle}
                  </h1>
                  <p className="text-pure-white/70 text-sm md:text-lg font-normal mb-8 leading-relaxed text-balance max-w-2xl">
                     Empowering the <span className="text-white font-medium">{subdomainName}</span> ecosystem with intelligent, responsive digital layers for superior operations.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
                     <button className="w-full sm:w-auto px-8 py-3.5 bg-brand-walnut text-pure-white text-sm font-bold rounded-xl transition-all duration-300 hover:bg-brand-walnut/90 shadow-lg shadow-brand-walnut/20 hover:-translate-y-0.5">
                        Explore Solutions
                     </button>
                     <button className="w-full sm:w-auto px-8 py-3.5 border border-pure-white/20 text-pure-white text-sm font-bold rounded-xl transition-all duration-300 hover:bg-white/5 hover:border-pure-white/40 backdrop-blur-sm">
                        View Live Demo
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* ── TARGETED SOLUTIONS ── */}
         <section className="py-24 bg-pure-white">
            <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12">
               <div className="mb-16 text-center flex flex-col items-center">
                  <h2 className="text-xl md:text-2xl font-display font-black text-brand-black uppercase tracking-wider mb-3 bg-gradient-to-b from-brand-black to-brand-black/60 bg-clip-text text-transparent">
                     Targeted Solutions
                  </h2>
                  <div className="w-8 h-0.5 bg-accent-sky" />
               </div>
               <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x">
                  {solutions.map((sol, i) => (
                     <div
                        key={sol.id || i}
                        onClick={() => {
                           setActiveSolution(sol);
                           setIsPlaying(false);
                           setActiveChallenge(0);
                           setActiveLayer(0);
                           videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className={`relative flex-shrink-0 w-72 md:w-80 bg-pure-white rounded-[1.5rem] p-6 shadow-[0_4px_24px_rgb(0,0,0,0.03)] border snap-start transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] cursor-pointer hover:-translate-y-1 overflow-hidden ${
                           activeSolution.id === sol.id 
                              ? 'border-blue-500 ring-2 ring-blue-500/20' 
                              : 'border-slate-100 hover:border-slate-200'
                        }`}
                     >
                        <div className="w-full h-32 rounded-xl bg-slate-100 mb-6 overflow-hidden">
                           <img 
                              src={sol.image} 
                              alt={sol.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                           />
                        </div>
                        <h3 className="text-lg font-black text-brand-black mb-2">{sol.name}</h3>
                        <p className="text-sm text-brand-black/60 leading-relaxed">
                           {sol.desc}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* ── VIDEO PROOF OF CONCEPT ── */}
         <section ref={videoRef} className="pb-24 bg-pure-white flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto px-6">
               <div className="relative w-full aspect-video bg-brand-black rounded-[2rem] shadow-2xl overflow-hidden flex flex-col justify-end group border-[6px] border-pure-white shadow-[0_20px_60px_rgb(0,0,0,0.15)]">
                  {isPlaying ? (
                     <iframe 
                        src={`${activeSolution.videoUrl}&autoplay=1`} 
                        title={activeSolution.name}
                        className="absolute inset-0 w-full h-full rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                     />
                  ) : (
                     <>
                        <img 
                           src={activeSolution.image} 
                           alt={activeSolution.name} 
                           className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent" />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                           <button 
                              onClick={() => setIsPlaying(true)}
                              className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-blue-600/30 z-20"
                           >
                              <Play size={28} className="ml-1 fill-white" />
                           </button>
                        </div>
                        <div className="relative z-10 p-6 md:p-8 pointer-events-none">
                           <h3 className="text-white font-black text-xl md:text-2xl mb-2">{activeSolution.name}</h3>
                           <p className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">{activeSolution.desc}</p>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </section>

         {/* ── THE CHALLENGES (MEDIUM GREY GRADIENT) ── */}
         <section className="py-12 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
               
               <div className="flex flex-col items-center text-center mb-8">
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-[0.1em] mb-2 text-brand-black">
                     The Challenges
                  </h2>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                  
                  {/* Left Column: Interactive List */}
                  <div className="flex flex-col gap-3">
                     {activeSolution.challenges.map((challenge, i) => {
                        const isActive = activeChallenge === i;
                        return (
                           <div 
                              key={i} 
                              onClick={() => setActiveChallenge(i)}
                              className={`cursor-pointer bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border transition-all duration-300 group ${
                                 isActive 
                                    ? 'border-accent-sky/40 shadow-[0_6px_24px_rgb(0,0,0,0.07)] bg-white' 
                                    : 'border-white/60 hover:shadow-[0_3px_16px_rgb(0,0,0,0.04)] hover:-translate-y-0.5'
                              }`}
                           >
                              <div className="flex items-center gap-3">
                                 <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                                    isActive ? 'bg-accent-sky/10 text-accent-sky' : 'bg-slate-100 text-slate-400 group-hover:bg-accent-sky/10 group-hover:text-accent-sky'
                                 }`}>
                                    <challenge.icon size={16} />
                                 </div>
                                 <div className="flex flex-col">
                                    <h4 className={`font-black text-sm md:text-base tracking-tight leading-tight transition-colors ${
                                       isActive ? 'text-brand-black' : 'text-brand-black/80 group-hover:text-brand-black'
                                    }`}>
                                       {challenge.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                                       {challenge.desc}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  {/* Right Column: Dynamic Image — stretches to match the list height */}
                  <div className="relative w-full min-h-[280px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/70 bg-slate-200">
                     <AnimatePresence mode="wait">
                        <motion.img
                           key={activeChallenge}
                           initial={{ opacity: 0, filter: "blur(8px)", scale: 1.05 }}
                           animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                           exit={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
                           transition={{ duration: 0.4, ease: "easeInOut" }}
                           src={activeSolution.challenges[activeChallenge].image}
                           alt={activeSolution.challenges[activeChallenge].title}
                           className="absolute inset-0 w-full h-full object-cover"
                        />
                     </AnimatePresence>
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent pointer-events-none" />
                     <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-black text-sm md:text-base drop-shadow-sm">
                           {activeSolution.challenges[activeChallenge].title}
                        </span>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* ── ENGINEERED INTELLIGENCE LAYER ── */}
         <section className="py-12 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

               <div className="flex flex-col items-center text-center mb-8">
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-[0.1em] mb-2 text-brand-black">
                     Engineered Intelligence Layer
                  </h2>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

                  {/* Left: Dynamic Image */}
                  <div className="relative w-full min-h-[280px] rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100 bg-slate-200">
                     <AnimatePresence mode="wait">
                        <motion.img
                           key={`${activeSolution.id}-layer-${activeLayer}`}
                           initial={{ opacity: 0, filter: "blur(8px)", scale: 1.05 }}
                           animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                           exit={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
                           transition={{ duration: 0.4, ease: "easeInOut" }}
                           src={activeSolution.layers[activeLayer].image}
                           alt={activeSolution.layers[activeLayer].title}
                           className="absolute inset-0 w-full h-full object-cover"
                        />
                     </AnimatePresence>
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-brand-black/10 to-transparent pointer-events-none" />
                     <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-black text-sm md:text-base drop-shadow-sm block">
                           {activeSolution.layers[activeLayer].title}
                        </span>
                        <span className="text-accent-sky font-bold text-[10px] uppercase tracking-widest">
                           Integrated Tech Layer
                        </span>
                     </div>
                  </div>

                  {/* Right: Interactive List */}
                  <div className="flex flex-col gap-3 justify-center">
                     {activeSolution.layers.map((layer, i) => {
                        const isActive = activeLayer === i;
                        return (
                           <div
                              key={i}
                              onClick={() => setActiveLayer(i)}
                              className={`cursor-pointer bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl border transition-all duration-300 group ${
                                 isActive
                                    ? 'border-accent-sky/40 shadow-[0_6px_24px_rgb(0,0,0,0.07)] bg-white'
                                    : 'border-slate-100 hover:shadow-[0_3px_16px_rgb(0,0,0,0.04)] hover:-translate-y-0.5'
                              }`}
                           >
                              <div className="flex items-center gap-3">
                                 <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                                    isActive ? 'bg-accent-sky/10 text-accent-sky' : 'bg-slate-100 text-slate-400 group-hover:bg-accent-sky/10 group-hover:text-accent-sky'
                                 }`}>
                                    <layer.icon size={16} />
                                 </div>
                                 <div className="flex flex-col">
                                    <h4 className={`font-black text-sm md:text-base tracking-tight leading-tight transition-colors ${
                                       isActive ? 'text-brand-black' : 'text-brand-black/80 group-hover:text-brand-black'
                                    }`}>
                                       {layer.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                                       {layer.desc}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>

               </div>
            </div>
         </section>
 
         {/* ── TECH STACK (COMPACT MATTE BROWN) ── */}
         <section className="py-20 bg-[#F5F2EE]">
            <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
               <div className="flex flex-col items-center text-center mb-12">
                  <span className="text-[9px] md:text-xs font-black text-[#8D6E63] uppercase tracking-[0.3em] mb-3">
                     Tech Stack
                  </span>
                  <h2 className="text-xl md:text-3xl font-display font-black text-brand-black uppercase tracking-tight">
                     Core Hardware & Software
                  </h2>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
                  {[
                     { name: "Node-S Sensors", icon: Cpu },
                     { name: "IQ Dashboard", icon: Monitor },
                     { name: "Hub-Z Controller", icon: Layers },
                     { name: "Comms-X Gateway", icon: Wifi }
                  ].map((tech, i) => (
                     <div 
                        key={i} 
                        className="bg-white border border-[#E0Dcd5] p-6 md:p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#8D6E63]/5 hover:-translate-y-1"
                     >
                        <div className="w-12 h-12 rounded-full bg-[#F9F7F5] shadow-sm flex items-center justify-center mb-6 border border-[#E0Dcd5]">
                           <tech.icon size={22} className="text-[#8D6E63]/60" />
                        </div>
                        <h4 className="text-sm md:text-base font-black text-brand-black mb-1">{tech.name}</h4>
                        <span className="text-[8px] font-black text-[#8D6E63] uppercase tracking-widest">
                           Enterprise
                        </span>
                     </div>
                  ))}
               </div>

               <div className="flex justify-center">
                  <button className="bg-brand-black text-white px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all hover:bg-slate-800 hover:shadow-2xl hover:shadow-black/20 group">
                     Consult with Solutions Architect
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         </section>
      </div>
   );
}
