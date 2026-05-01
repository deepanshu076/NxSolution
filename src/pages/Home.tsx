import {
  ArrowRight,
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
  Monitor,
  Hourglass,
  ClipboardList,
  ShieldAlert,
  Cctv,
  BatteryWarning
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { domains } from "../constants/domains";
import OperationalChallenges from "../components/home/OperationalChallenges";

const getTagsForDomain = (id: string) => {
  const domain = domains.find(d => d.id === id);
  return domain ? domain.subdomains : ["Smart", "Integrated", "Monitored"];
};

export default function Home() {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  return (
    <div className="flex flex-col">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-10 md:py-20 lg:py-24 bg-brand-black text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex gap-px">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-1 bg-soft-white" />
          ))}
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-walnut opacity-10 rounded-xl rotate-45" />
        <div className="absolute -bottom-16 -left-8 w-32 h-32 bg-warm-gold-beige opacity-5 rounded-xl rotate-45" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-6 py-1 md:py-2 rounded-full border border-warm-gold-beige/20 bg-warm-gold-beige/5 text-warm-gold-beige font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 md:mb-8">
            Smart Integrated Solutions
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-soft-white mb-3 md:mb-6 max-w-2xl leading-tight">
            We Transform Traditional Operations to <br className="hidden sm:block" /> <span className="text-warm-gold-beige">Smart Automated Ecosystems</span>
          </h1>
          <p className="text-soft-white/50 text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed px-2">
            NX-Solutions transforms hidden daily operational challenges that go unnoticed but create major disruption across industries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link to="/solutions" className="px-5 md:px-8 py-2.5 md:py-3 bg-brand-walnut text-soft-white rounded-xl font-bold transition-all hover:bg-brand-black border border-brand-walnut shadow-xl text-center text-sm md:text-base">Get Started</Link>
            <button className="px-5 md:px-8 py-2.5 md:py-3 border border-soft-white/20 text-soft-white rounded-xl font-bold hover:bg-soft-white/5 backdrop-blur-sm text-sm md:text-base">Learn More</button>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section className="py-8 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6 leading-tight">
              A rich portfolio of empowering and enabling solutions
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              We design intelligent systems that transform modern operations across diverse environments.
              From entry and attendance to security and tracking, we unify disconnected processes into
              a seamless, structured workflow.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOMAINS SECTION ── */}
      <section className="py-8 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
              Domains
            </h2>
            <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
              Industries We Power with Smart Solutions
            </h3>
            <p className="text-gray-600 text-xs md:text-sm lg:text-base max-w-2xl mx-auto">
              Comprehensive monitoring and operational solutions tailored to each industry's unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {domains.slice(0, 7).map((domain) => (
              <Link
                key={domain.id}
                to={`/domains/${domain.id}`}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-[240px] md:h-[300px] lg:h-[320px] block"
              >
                {/* Background Image */}
                <img
                  src={domain.image}
                  alt={domain.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Color overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: domain.color }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white drop-shadow-md">
                      {domain.name}
                    </h3>

                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-3 md:gap-4">
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                          {getTagsForDomain(domain.id).slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 rounded-full font-medium text-white/90 border border-white/20 backdrop-blur-md"
                              style={{ backgroundColor: `${domain.color}30` }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div
                          className="w-full py-2 md:py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm text-brand-black shadow-lg"
                          style={{ backgroundColor: domain.color }}
                        >
                          Explore {domain.name}
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* View All Card */}
            <Link
              to="/domains"
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-[240px] md:h-[300px] lg:h-[320px] bg-brand-black flex flex-col items-center justify-center text-center p-4 md:p-6 border border-gray-800 block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
              <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 md:mb-4 backdrop-blur-md border border-white/20">
                  <ArrowRight className="text-white w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="text-lg md:text-2xl font-display font-bold text-white mb-1 md:mb-2">
                  View All Domains
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Explore our solutions across {domains.length}+ industries
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── OPERATIONAL CHALLENGE SECTION ── */}
      <OperationalChallenges />

      {/* ── SOLUTIONS SECTION ── */}
      <section className="py-8 md:py-16 lg:py-20 bg-brand-black text-soft-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-2 md:mb-6 text-balance text-white">
              Smart Industrial Solutions
            </h2>
            <p className="text-soft-white/60 text-sm md:text-base lg:text-xl font-medium">
              Purpose-built technology components integrated into operational ecosystems.
            </p>
          </div>

          <div className="flex gap-3 md:gap-5 lg:gap-6 overflow-x-auto pb-4 md:pb-10 lg:pb-12 px-2 md:px-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { name: "Smart Access Systems", image: "/images/smart access system.jpeg" },
              { name: "Attendance Systems", image: "/images/attendance system.jpeg" },
              { name: "Security Intelligence", image: "/images/security intelligence.jpeg" },
              { name: "Surveillance Monitoring", image: "/images/survillance monitoring.jpeg" },
              { name: "Energy Optimization", image: "/images/energy optimization.jpeg" },
              { name: "Workflow Automation", image: "/images/workflow automation.jpeg" }
            ].map((sol, i) => (
              <div
                key={i}
                className="min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[300px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] xl:h-[340px] relative rounded-xl md:rounded-2xl overflow-hidden border border-soft-white/10 group transition-all hover:border-brand-walnut snap-center shadow-xl flex-shrink-0"
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
                <div className="absolute bottom-3 md:bottom-5 lg:bottom-6 left-3 md:left-5 lg:left-6 right-3 md:right-5 lg:right-6 z-10">
                  <h4 className="font-display font-bold text-sm md:text-base lg:text-xl leading-tight text-soft-white group-hover:text-warm-gold-beige transition-colors">
                    {sol.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-8 md:py-16 lg:py-20 bg-soft-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-12 lg:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black leading-tight max-w-3xl mx-auto">Trusted by Industry Leaders</h2>
            <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-brand-black/70 leading-tight mt-1.5 md:mt-3">Trusted by Forward-Thinking Organizations</h3>
          </div>

          <div className="relative w-full overflow-hidden pb-4 md:pb-10 lg:pb-12">
            <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-soft-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-soft-white to-transparent z-10 pointer-events-none" />

            <div
              className="flex w-max animate-marquee gap-3 md:gap-5 lg:gap-6 px-2 md:px-4 py-3 md:py-4"
              style={{ animationPlayState: isMarqueePaused ? "paused" : "running" }}
            >
              {[
                { quote: "Entry queues dropped by 80% in the first month of deployment.", author: "Rajesh Kumar", role: "Principal, Delhi University" },
                { quote: "Real-time dashboards changed how we manage the factory floor.", author: "Priya Sharma", role: "Ops Head, AutoMech Ltd" },
                { quote: "Energy costs dropped 35% after the optimization system went live.", author: "Ankit Joshi", role: "Facility Manager, Nexus Corp" },
                { quote: "The security integration is seamless and highly reliable.", author: "Sneha Reddy", role: "CTO, TechPark India" },
                { quote: "Entry queues dropped by 80% in the first month of deployment.", author: "Rajesh Kumar", role: "Principal, Delhi University" },
                { quote: "Real-time dashboards changed how we manage the factory floor.", author: "Priya Sharma", role: "Ops Head, AutoMech Ltd" },
                { quote: "Energy costs dropped 35% after the optimization system went live.", author: "Ankit Joshi", role: "Facility Manager, Nexus Corp" },
                { quote: "The security integration is seamless and highly reliable.", author: "Sneha Reddy", role: "CTO, TechPark India" }
              ].map((t, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setIsMarqueePaused(true)}
                  onMouseLeave={() => setIsMarqueePaused(false)}
                  className="min-w-[240px] sm:min-w-[300px] md:min-w-[380px] lg:min-w-[440px] p-4 md:p-7 lg:p-10 rounded-2xl md:rounded-3xl bg-white border border-soft-taupe/40 flex flex-col justify-between transition-all duration-300 hover:border-brand-walnut hover:shadow-2xl hover:shadow-brand-walnut/20 hover:-translate-y-2 cursor-pointer aspect-video md:aspect-[21/9]"
                >
                  <div className="mb-2 md:mb-6">
                    <div className="flex gap-0.5 mb-2 md:mb-4 text-[#EF9F27] text-xs md:text-base lg:text-lg">{"★★★★★".split("").map((s, idx) => <span key={idx}>{s}</span>)}</div>
                    <p className="text-brand-black/80 italic text-xs md:text-sm lg:text-base font-medium leading-relaxed">"{t.quote}"</p>
                  </div>
                  <div>
                    <div className="font-bold text-brand-black text-xs md:text-sm lg:text-base">{t.author}</div>
                    <div className="text-[9px] md:text-[10px] text-brand-black/50 uppercase tracking-[.3em] mt-0.5 md:mt-1 font-extrabold">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT-STEP CTA ── */}
      <section className="py-10 md:py-16 lg:py-20 bg-warm-cream relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black mb-3 md:mb-6">Ready to Smarten Your Space?</h2>
          <p className="text-charcoal/50 text-sm md:text-base lg:text-xl max-w-xl mx-auto mb-6 md:mb-10 lg:mb-12">Join 250+ organizations leveraging NX-Solutions to drive operational excellence.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
            <Link to="/contact" className="px-6 md:px-10 py-3 md:py-5 bg-brand-walnut text-soft-white font-bold rounded-xl md:rounded-2xl transition-all hover:scale-105 shadow-xl shadow-brand-walnut/20 text-center text-sm md:text-base">Get Started Today</Link>
            <Link to="/enquiry" className="px-6 md:px-10 py-3 md:py-5 bg-soft-white border border-soft-taupe text-brand-black font-bold rounded-xl md:rounded-2xl transition-all hover:bg-brand-walnut hover:text-soft-white hover:border-brand-walnut hover:scale-105 text-center text-sm md:text-base">Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}