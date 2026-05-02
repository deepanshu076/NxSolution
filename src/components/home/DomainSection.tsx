import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { domains } from "../../constants/domains";

const CARD_WIDTH = 200; // px (width of each mobile card)
const CARD_GAP = 12;    // px (gap between cards)
const ITEM_STRIDE = CARD_WIDTH + CARD_GAP;

const getTagsForDomain = (id: string) => {
  const domain = domains.find(d => d.id === id);
  return domain ? domain.subdomains : ["Smart", "Integrated", "Monitored"];
};

export default function DomainSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const scrollXRef = useRef(0);
  const dirRef = useRef(1);
  const isInteractingRef = useRef(false);

  // Mobile auto-scroll with active image sync
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateActive = (scrollLeft: number) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const fraction = Math.max(0, Math.min(1, scrollLeft / maxScroll));
      const idx = Math.round(fraction * (domains.length - 1));
      setActiveIndex(prev => prev !== idx ? idx : prev);
    };

    const onInteractStart = () => { isInteractingRef.current = true; };
    const onInteractEnd = () => {
      isInteractingRef.current = false;
      scrollXRef.current = el.scrollLeft;
    };
    const onScroll = () => {
      if (isInteractingRef.current) {
        scrollXRef.current = el.scrollLeft;
        updateActive(el.scrollLeft);
      }
    };

    el.addEventListener("touchstart", onInteractStart, { passive: true });
    el.addEventListener("touchend", onInteractEnd);
    el.addEventListener("mousedown", onInteractStart);
    el.addEventListener("mouseup", onInteractEnd);
    el.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      if (window.innerWidth < 768 && !isInteractingRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        scrollXRef.current += 0.6 * dirRef.current;

        if (scrollXRef.current <= 0) {
          scrollXRef.current = 0;
          dirRef.current = 1;
        } else if (scrollXRef.current >= maxScroll) {
          scrollXRef.current = maxScroll;
          dirRef.current = -1;
        }

        el.scrollLeft = scrollXRef.current;
        updateActive(scrollXRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("touchstart", onInteractStart);
      el.removeEventListener("touchend", onInteractEnd);
      el.removeEventListener("mousedown", onInteractStart);
      el.removeEventListener("mouseup", onInteractEnd);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
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

        {/* ── MOBILE: Featured image + horizontal slider ── */}
        <div className="block md:hidden">
          {/* Active domain hero image */}
          <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-4 shadow-xl">
            {domains.map((domain, i) => (
              <div
                key={domain.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: activeIndex === i ? 1 : 0 }}
              >
                <img
                  src={domain.image}
                  alt={domain.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-display font-bold text-white drop-shadow-md">
                    {domain.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {getTagsForDomain(domain.id).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-2 py-0.5 rounded-full font-medium text-white/90 border border-white/20 backdrop-blur-md"
                        style={{ backgroundColor: `${domain.color}40` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Dot indicators */}
            <div className="absolute top-3 right-3 flex gap-1">
              {domains.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === i ? 16 : 6,
                    height: 6,
                    backgroundColor: activeIndex === i ? "#EA580C" : "rgba(255,255,255,0.4)"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Horizontal scrolling card strip */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {domains.map((domain, i) => (
              <Link
                key={domain.id}
                to={`/domains/${domain.id}`}
                onClick={() => setActiveIndex(i)}
                className="flex-shrink-0 rounded-xl overflow-hidden relative shadow-md"
                style={{ width: CARD_WIDTH, height: 110 }}
              >
                <img
                  src={domain.image}
                  alt={domain.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
                {/* Active border highlight */}
                <div
                  className="absolute inset-0 rounded-xl border-2 transition-all duration-300"
                  style={{ borderColor: activeIndex === i ? "#EA580C" : "transparent" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white text-[11px] font-bold leading-tight line-clamp-2">
                    {domain.name}
                  </p>
                </div>
              </Link>
            ))}

            {/* View All card */}
            <Link
              to="/domains"
              className="flex-shrink-0 rounded-xl overflow-hidden relative shadow-md bg-brand-black border border-gray-700 flex flex-col items-center justify-center"
              style={{ width: CARD_WIDTH, height: 110 }}
            >
              <ArrowRight className="text-white mb-1" size={20} />
              <p className="text-white text-[11px] font-bold text-center px-2">View All</p>
              <p className="text-gray-400 text-[9px] text-center mt-0.5">{domains.length}+ industries</p>
            </Link>
          </div>
        </div>

        {/* ── DESKTOP: Original grid ── */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {domains.slice(0, 7).map((domain) => (
            <Link
              key={domain.id}
              to={`/domains/${domain.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-[300px] lg:h-[320px] block"
            >
              <img
                src={domain.image}
                alt={domain.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                style={{ backgroundColor: domain.color }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-white drop-shadow-md">
                    {domain.name}
                  </h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                    <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-4">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {getTagsForDomain(domain.id).slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-full font-medium text-white/90 border border-white/20 backdrop-blur-md"
                            style={{ backgroundColor: `${domain.color}30` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm text-brand-black shadow-lg"
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
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-[300px] lg:h-[320px] bg-brand-black flex flex-col items-center justify-center text-center p-6 border border-gray-800 block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
            <div className="relative z-10 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md border border-white/20">
                <ArrowRight className="text-white w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">View All Domains</h3>
              <p className="text-gray-400 text-sm">Explore our solutions across {domains.length}+ industries</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
