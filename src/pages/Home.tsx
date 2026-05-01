import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Globe,
  Shield,
  Zap,
  BarChart3,
  Users,
  Settings,
  AlertCircle,
  Clock,
  TrendingDown,
  Activity,
  CheckCircle2,
  Play,
  ArrowUpRight,
  Monitor
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const domains = [
  { id: "education", name: "Education", sub: "Campus · Library · Labs", color: "#B5D4F4", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" },
  { id: "manufacturing", name: "Manufacturing", sub: "Factory · Plant · Unit", color: "#C0DD97", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" },
  { id: "healthcare", name: "Healthcare", sub: "Hospital · Clinic · Lab", color: "#F7C1C1", image: "https://images.unsplash.com/photo-1586773860418-d3b3a998ddd6?w=800&q=80" },
  { id: "corporate", name: "Corporate", sub: "Office · HQ · Enterprise", color: "#CECBF6", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: "retail", name: "Retail", sub: "Store · Mall · Chain", color: "#FAC775", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80" },
  { id: "logistics", name: "Logistics", sub: "Warehouse · Fleet · Hub", color: "#9FE1CB", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" },
  { id: "government", name: "Government", sub: "Civic · Municipal · Public", color: "#D3D1C7", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" },
  { id: "residential", name: "Residential", sub: "Society · Housing · Gated", color: "#F4C0D1", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" },
];

const problems = [
  { id: "01", title: "Entry & Exit Delays", desc: "Long queues and manual gate checks slow down throughput, causing frustration and time loss across shifts, classes, and visitor flows.", icon: Clock, tag: "Access", color: "red" },
  { id: "02", title: "Attendance Gaps", desc: "Manual registers miss absentees, create audit failures, and leave no reliable trail for compliance or payroll processing.", icon: Users, tag: "Attendance", color: "orange" },
  { id: "03", title: "Unauthorized Access", desc: "Weak perimeter controls allow unauthorized personnel into restricted zones, creating safety and compliance risks.", icon: Shield, tag: "Security", color: "red" },
  { id: "04", title: "Weak Surveillance", desc: "Blind spots and reactive-only monitoring leave critical incidents undetected until after damage is done.", icon: Activity, tag: "Surveillance", color: "slate" },
  { id: "05", title: "Energy Waste", desc: "Unmonitored systems consume energy 24/7 regardless of occupancy, inflating operational costs significantly.", icon: Zap, tag: "Energy", color: "orange" },
];

const getTagsForDomain = (id: string) => {
  const domain = domains.find(d => d.id === id);
  return domain ? domain.sub.split(' · ') : [];
};

export default function Home() {
  const [activeProblem, setActiveProblem] = useState(0);

  return (
    <div className="flex flex-col">
      {/* ── HERO SECTION ── */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-brand-black text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex gap-px">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-1 bg-soft-white" />
          ))}
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-walnut opacity-10 rounded-xl rotate-45" />
        <div className="absolute -bottom-16 -left-8 w-32 h-32 bg-warm-gold-beige opacity-5 rounded-xl rotate-45" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-warm-gold-beige/20 bg-warm-gold-beige/5 text-warm-gold-beige font-bold text-xs uppercase tracking-widest mb-6 md:mb-8">
            Smart Integrated Solutions
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-soft-white mb-4 md:mb-6 max-w-2xl leading-tight">
            We Transform Traditional Operations to <br className="hidden sm:block" /> <span className="text-warm-gold-beige">Smart Automated Ecosystems</span>
          </h1>
          <p className="text-soft-white/50 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
            NX-Solutions transforms hidden daily operational challenges that go unnoticed but create major disruption across industries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/solutions" className="px-6 md:px-8 py-3 bg-brand-walnut text-soft-white rounded-xl font-bold transition-all hover:bg-brand-black border border-brand-walnut shadow-xl text-center">Get Started</Link>
            <button className="px-6 md:px-8 py-3 border border-soft-white/20 text-soft-white rounded-xl font-bold hover:bg-soft-white/5 backdrop-blur-sm">Learn More</button>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section className="py-10 md:py-12 lg:py-14 bg-soft-white border-b border-soft-taupe/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-brand-black text-center mb-6 md:mb-8 text-opacity-80">
              Overview
            </h2>
            <div className="max-w-4xl mx-auto text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-brand-black/90 leading-tight mb-3 md:mb-4">
                A rich portfolio of empowering and enabling solutions
              </h3>
              <div className="grid grid-cols-1 gap-4 text-charcoal/70 text-sm md:text-base leading-relaxed">
                <p>
                  We design intelligent systems that transform modern operations across diverse environments.
                  From entry and attendance to security and tracking, we unify disconnected processes into
                  a seamless, structured workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOMAINS SECTION ── */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Domains
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
              Industries We Power with Smart Solutions
            </h3>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
              Comprehensive monitoring and operational solutions tailored to each industry's unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-40 md:h-44 lg:h-48 overflow-hidden">
                  <img
                    src={domain.image}
                    alt={domain.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-40 transition-opacity duration-300 group-hover:opacity-30"
                    style={{ backgroundColor: domain.color }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-4 md:p-5">
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                    {getTagsForDomain(domain.id).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 md:py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: `${domain.color}30`,
                          color: '#374151'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/domains/${domain.id}`}
                    className="mt-2 w-full py-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
                    style={{
                      backgroundColor: domain.color,
                      color: '#1f2937'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.85';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    {domain.name}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 lg:mt-12 text-center">
            <Link
              to="/domains"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg text-sm md:text-base"
            >
              View All Domains
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OPERATIONAL CHALLENGE SECTION ── */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-12 lg:mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black mb-3 md:mb-4">Challenges faced by industries</h2>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
              Operational Challenges
            </h3>
            <p className="text-charcoal/60 text-base md:text-lg lg:text-xl">Common friction points we eliminate across diverse industries</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-start lg:items-stretch">
            {/* List Section */}
            <div className="w-full lg:order-1 lg:w-[55%] overflow-x-auto lg:overflow-visible scrollbar-hide snap-x">
              <div className="flex lg:flex-col gap-3 md:gap-4 w-full px-4 lg:px-0">
                {problems.map((prob, i) => (
                  <button
                    key={prob.id}
                    onClick={() => setActiveProblem(i)}
                    className={`group relative px-4 md:px-5 lg:px-6 py-4 md:py-5 rounded-2xl transition-all duration-300 border flex items-center gap-4 lg:gap-6 snap-center shrink-0 lg:shrink-0 w-[280px] sm:w-[320px] lg:w-full ${activeProblem === i
                      ? "bg-brand-walnut border-brand-walnut text-soft-white shadow-xl lg:scale-[1.02] z-10"
                      : "bg-warm-cream/30 border-soft-taupe/20 text-brand-black hover:bg-warm-cream/50 hover:border-brand-walnut/30"
                      }`}
                  >
                    <div className="flex-1 relative z-10 text-left">
                      <h4 className="font-bold text-sm md:text-base lg:text-lg whitespace-normal leading-snug">
                        {prob.title}
                      </h4>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`transition-all duration-300 relative z-10 hidden lg:block ${activeProblem === i ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Section */}
            <div className="w-full lg:order-2 lg:w-[45%] px-4 lg:px-0">
              <div className="relative h-[280px] md:h-[380px] lg:h-[450px] w-full rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] bg-brand-walnut/5 p-6 md:p-8 lg:p-12 border border-brand-walnut/10 shadow-inner overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                <motion.div
                  key={activeProblem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 w-full flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-brand-walnut flex items-center justify-center text-soft-white mb-4 md:mb-6 lg:mb-8 shadow-xl shadow-brand-walnut/20">
                    {(() => {
                      const Icon = problems[activeProblem].icon;
                      return <Icon size={28} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />;
                    })()}
                  </div>

                  <div className="max-w-xl">
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-display font-bold text-brand-black mb-2 md:mb-3 lg:mb-4">
                      {problems[activeProblem].title}
                    </h3>
                    <p className="text-charcoal/70 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                      {problems[activeProblem].desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS SECTION ── */}
      <section className="py-12 md:py-16 lg:py-20 bg-brand-black text-soft-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6 text-balance text-white">
              Smart Industrial Solutions
            </h2>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-6 text-balance text-white">
              Smart System Solutions
            </h3>
            <p className="text-soft-white/60 text-base md:text-lg lg:text-xl font-medium px-4">
              Purpose-built technology components integrated into operational ecosystems.
            </p>
          </div>

          <div className="flex gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-8 md:pb-10 lg:pb-12 px-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { name: "Smart Access Systems", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80" },
              { name: "Attendance Systems", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80" },
              { name: "Security Intelligence", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" },
              { name: "Surveillance Monitoring", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80" },
              { name: "Energy Optimization", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" },
              { name: "Workflow Automation", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" }
            ].map((sol, i) => (
              <div
                key={i}
                className="min-w-[220px] sm:min-w-[240px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[300px] h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[340px] relative rounded-xl md:rounded-2xl overflow-hidden border border-soft-white/10 group transition-all hover:border-brand-walnut snap-center shadow-xl flex-shrink-0"
              >
                <div className="absolute inset-0">
                  <img
                    src={sol.image}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={sol.name}
                  />
                  <div className="absolute inset-0 bg-brand-black/60 group-hover:bg-brand-black/40 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-4 md:bottom-5 lg:bottom-6 left-4 md:left-5 lg:left-6 right-4 md:right-5 lg:right-6 z-10">
                  <h4 className="font-display font-bold text-base md:text-lg lg:text-xl leading-tight text-soft-white group-hover:text-warm-gold-beige transition-colors">
                    {sol.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-12 md:py-16 lg:py-20 bg-soft-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-12 lg:mb-14 px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black leading-tight max-w-3xl mx-auto">Trusted by Industry Leaders</h2>
            <h3 className="text-lg md:text-xl font-bold text-brand-black/90 leading-tight mt-2 md:mt-3">Trusted by Forward-Thinking Organizations</h3>
          </div>

          <div className="flex gap-5 md:gap-6 overflow-x-auto pb-8 md:pb-10 lg:pb-12 px-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { quote: "Entry queues dropped by 80% in the first month of deployment.", author: "Rajesh Kumar", role: "Principal, Delhi University" },
              { quote: "Real-time dashboards changed how we manage the factory floor.", author: "Priya Sharma", role: "Ops Head, AutoMech Ltd" },
              { quote: "Energy costs dropped 35% after the optimization system went live.", author: "Ankit Joshi", role: "Facility Manager, Nexus Corp" },
              { quote: "The security integration is seamless and highly reliable.", author: "Sneha Reddy", role: "CTO, TechPark India" }
            ].map((t, i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[440px] p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-warm-cream/20 border border-soft-taupe/30 flex flex-col justify-between snap-center group hover:bg-soft-white transition-all hover:shadow-lg hover:shadow-brand-black/5 aspect-video md:aspect-[21/9]">
                <div className="mb-4 md:mb-6">
                  <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4 text-[#EF9F27] text-sm md:text-base lg:text-lg">{"★★★★★".split("").map((s, idx) => <span key={idx}>{s}</span>)}</div>
                  <p className="text-brand-black/80 italic text-sm md:text-base lg:text-lg font-medium leading-relaxed">"{t.quote}"</p>
                </div>
                <div>
                  <div className="font-bold text-brand-black text-sm md:text-base lg:text-lg">{t.author}</div>
                  <div className="text-[10px] text-brand-black/40 uppercase tracking-[.3em] mt-1 font-extrabold">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT-STEP CTA ── */}
      <section className="py-14 md:py-16 lg:py-20 bg-warm-cream relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black mb-4 md:mb-6">Ready to Smarten Your Space?</h2>
          <p className="text-charcoal/50 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-8 md:mb-10 lg:mb-12">Join 250+ organizations leveraging NX-Solutions to drive operational excellence.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Link to="/contact" className="px-8 md:px-10 py-3.5 md:py-5 bg-brand-walnut text-soft-white font-bold rounded-xl md:rounded-2xl transition-all hover:scale-105 shadow-xl shadow-brand-walnut/20 text-center text-sm md:text-base">Get Started Today</Link>
            <Link to="/enquiry" className="px-8 md:px-10 py-3.5 md:py-5 bg-soft-white border border-soft-taupe text-brand-black font-bold rounded-xl md:rounded-2xl transition-all hover:bg-brand-walnut hover:text-soft-white hover:border-brand-walnut hover:scale-105 text-center text-sm md:text-base">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}