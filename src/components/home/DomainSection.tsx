import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { domains } from "../../constants/domains";

export default function DomainSection() {
  const [paused, setPaused] = useState(false);

  // Duplicate domains for seamless infinite loop
  const doubled = [...domains, ...domains];

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-6 md:mb-12 max-w-4xl mx-auto">
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

      </div>

      {/* Full-width slider strip — no container padding */}
      <div className="relative w-full overflow-hidden pb-4 md:pb-8">

        <div
          className="flex w-max animate-marquee gap-3 md:gap-5 px-4"
          style={{ animationPlayState: paused ? "paused" : "running" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {doubled.map((domain, i) => (
            <Link
              key={`${domain.id}-${i}`}
              to={`/domains/${domain.id}`}
              className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[260px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] relative rounded-xl md:rounded-2xl overflow-hidden group flex-shrink-0 shadow-md hover:shadow-2xl transition-all duration-300 block"
            >
              <img
                src={domain.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={domain.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 z-10">
                <h4 className="font-display font-bold text-sm md:text-base leading-tight text-white group-hover:text-warm-gold-beige transition-colors">
                  {domain.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-4 md:mt-8">
        <Link
          to="/domains"
          className="inline-flex items-center gap-2 px-6 md:px-10 py-3 md:py-4 bg-brand-walnut text-soft-white font-bold rounded-xl transition-all hover:scale-105 shadow-xl shadow-brand-walnut/20 text-sm md:text-base"
        >
          View All Domains
          <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}
