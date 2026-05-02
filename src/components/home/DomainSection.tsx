import { Link } from "react-router-dom";
import { ArrowRight, Grid } from "lucide-react";
import { domains } from "../../constants/domains";

export default function DomainSection() {
  const displayDomains = domains.slice(0, 7); // Show first 7 domains

  return (
    <section className="py-12 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Domains
          </h2>
          <p className="text-gray-600 text-sm md:text-lg lg:text-xl font-medium max-w-2xl mx-auto">
            Industrial-grade intelligence tailored for specific operational environments.
          </p>
        </div>

        {/* MOBILE VIEW: Horizontal Swipeable Slider (Snap-X) */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4 -mx-4">
          {displayDomains.map((domain) => (
            <Link
              key={domain.id}
              to={`/domains/${domain.id}`}
              className="min-w-[280px] h-[360px] relative rounded-3xl overflow-hidden border border-gray-200 snap-center shadow-lg"
            >
              <div className="absolute inset-0">
                <img
                  src={domain.image}
                  className="w-full h-full object-cover"
                  alt={domain.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h4 className="font-display font-bold text-xl text-white mb-2">
                  {domain.name}
                </h4>
                <p className="text-white/70 text-xs line-clamp-3 mb-4">
                  {domain.description}
                </p>
                <div className="flex items-center gap-2 text-warm-gold-beige font-bold text-xs uppercase tracking-widest">
                  Explore <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}

          {/* View All Card for Mobile Slider */}
          <Link
            to="/domains"
            className="min-w-[280px] h-[360px] relative rounded-3xl overflow-hidden bg-brand-walnut snap-center shadow-lg flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <Grid className="text-white" size={32} />
            </div>
            <h4 className="text-2xl font-display font-bold text-white mb-2">View All</h4>
            <div className="mt-4 px-6 py-2 bg-white text-brand-walnut rounded-full font-bold text-sm">
              Explore All
            </div>
          </Link>
        </div>

        {/* DESKTOP VIEW: Grid of Cards with Hover Details */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDomains.map((domain) => (
            <Link
              key={domain.id}
              to={`/domains/${domain.id}`}
              className="relative h-[380px] rounded-2xl overflow-hidden border border-gray-200 group transition-all duration-500 hover:shadow-2xl hover:border-brand-walnut"
            >
              <div className="absolute inset-0">
                <img
                  src={domain.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={domain.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end min-h-[140px]">
                <h4 className="font-display font-bold text-xl leading-tight text-white group-hover:text-warm-gold-beige transition-colors duration-300">
                  {domain.name}
                </h4>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                  <div className="overflow-hidden">
                    <div className="pt-3 flex flex-col gap-3">
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                        {domain.description}
                      </p>
                      <div className="flex items-center gap-2 text-warm-gold-beige font-bold text-xs uppercase tracking-widest">
                        Explore <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* LAST CARD: View All Domains (Desktop) */}
          <Link
            to="/domains"
            className="relative h-[380px] rounded-2xl overflow-hidden bg-brand-walnut group transition-all duration-500 hover:shadow-2xl flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
              <Grid className="text-white" size={32} />
            </div>
            <h4 className="text-2xl font-display font-bold text-white mb-2">View All Domains</h4>
            <p className="text-white/60 text-sm mb-8">Discover our full portfolio.</p>
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white text-brand-walnut rounded-full font-bold text-sm">
              Browse All <ArrowRight size={14} />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
