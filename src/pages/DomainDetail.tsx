import { motion } from "motion/react";
import { useParams, Link } from "react-router-dom";
import {
   Building2,
   ArrowRight,
   ArrowUpRight,
} from "lucide-react";
import { domains } from "../constants/domains";

export default function DomainDetail() {
   const { domain } = useParams();

   const currentDomain = domains.find(d => d.id === domain);
   const formattedDomain = currentDomain ? currentDomain.name : (domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "Enterprise");

   const getImageForSubdomain = (title: string, index: number) => {
      const t = title.toLowerCase();
      // Entry / Gate
      if (t.includes('gate') || t.includes('entry') || t.includes('entrance') || t.includes('access')) {
         return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"; // Modern building entrance
      }
      // Reception / Lobby
      if (t.includes('reception') || t.includes('help desk') || t.includes('front desk') || t.includes('lobby') || t.includes('waiting')) {
         return "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80";
      }
      // Admin / Office / Cabins
      if (t.includes('admin') || t.includes('office') || t.includes('management') || t.includes('hr') || t.includes('cabin')) {
         return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";
      }
      // Classrooms
      if (t.includes('class') || t.includes('lecture')) {
         return "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80";
      }
      // Labs
      if (t.includes('lab') || t.includes('computer')) {
         return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80";
      }
      // Library
      if (t.includes('library') || t.includes('study')) {
         return "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80";
      }
      // Auditorium / Conference / Meeting
      if (t.includes('auditorium') || t.includes('seminar') || t.includes('conference') || t.includes('meeting') || t.includes('hall')) {
         return "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80";
      }
      // Cafeteria / Dining / Kitchen
      if (t.includes('canteen') || t.includes('cafeteria') || t.includes('dining') || t.includes('pantry') || t.includes('kitchen') || t.includes('break')) {
         return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80";
      }
      // Parking / Transport
      if (t.includes('parking') || t.includes('transport') || t.includes('vehicle')) {
         return "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80";
      }
      // Accommodations / Rooms
      if (t.includes('hostel') || t.includes('room') || t.includes('flat') || t.includes('unit') || t.includes('resident')) {
         return "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80";
      }
      // IT / Open Workspaces / Collaboration
      if (t.includes('workstation') || t.includes('pod') || t.includes('collaboration') || t.includes('team') || t.includes('open work')) {
         return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80";
      }
      // Server / Control / Security
      if (t.includes('server') || t.includes('it room') || t.includes('network') || t.includes('control') || t.includes('security') || t.includes('guard')) {
         return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
      }
      // Recreation / Gym
      if (t.includes('gym') || t.includes('fitness') || t.includes('pool') || t.includes('club') || t.includes('activity')) {
         return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80";
      }
      // Outdoors / Garden
      if (t.includes('garden') || t.includes('open space') || t.includes('play') || t.includes('perimeter')) {
         return "https://images.unsplash.com/photo-1584485592882-7ea9e1a3bc86?w=800&q=80";
      }
      // Corridors / Stairs / Lifts
      if (t.includes('corridor') || t.includes('stair') || t.includes('lift') || t.includes('common')) {
         return "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80";
      }
      // Storage / Maintenance / Logistics
      if (t.includes('storage') || t.includes('inventory') || t.includes('material') || t.includes('utility') || t.includes('maintenance')) {
         return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80";
      }
      
      // Fallback pattern
      const fallbackImages = [
         "https://images.unsplash.com/photo-1497215844834-3151b1fba50d?w=800&q=80",
         "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
         "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
      ];
      return fallbackImages[index % fallbackImages.length];
   };

   const dynamicSubDomains = currentDomain?.subdomains || ["General Operations", "Control Room", "Security Area", "Staff Management"];
   const subDomains = dynamicSubDomains.map((sd, i) => ({
      title: sd,
      route: sd.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      image: getImageForSubdomain(sd, i)
   }));

   return (
      <div className="flex flex-col pt-20">
         {/* ── HERO ── */}
         <section className="relative min-h-[500px] lg:min-h-[70vh] flex items-center justify-center bg-brand-black overflow-hidden pt-16 pb-20">
            {/* ── BACKGROUND LAYER ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-sky/15 via-brand-black to-brand-black" />

            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none blur-sm text-accent-sky">
               <Building2 size={400} strokeWidth={1} />
            </div>

            {/* ── CONTENT LAYER ── */}
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

               {/* Headline (Scaled Down) */}
               <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-pure-white mb-4 md:mb-8 leading-tight text-balance max-w-4xl tracking-tight">
                  Smart Systems for <br className="hidden sm:block" />
                  <span className="block mt-2 md:mt-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-sky to-blue-400">
                     {formattedDomain} Operations
                  </span>
               </h1>

               {/* Supporting Subheadline (Scaled Down) */}
               <p className="text-pure-white/60 text-sm md:text-base max-w-xl mb-8 leading-relaxed text-balance">
                  Deploy intelligent automation, real-time analytics, and secure access systems tailored specifically for your operational environment.
               </p>

               {/* CTAs (Scaled Down) */}
               <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
                  <button className="px-6 py-3.5 text-sm bg-accent-sky text-brand-black font-bold rounded-xl shadow-lg shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-sky-500/25 flex items-center justify-center gap-2 group w-full sm:w-auto">
                     Explore Sub-Domains
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-6 py-3.5 text-sm border border-pure-white/20 text-pure-white font-bold rounded-xl hover:bg-pure-white/5 hover:border-pure-white/40 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto">
                     Talk to Expert
                  </button>
               </div>
            </div>

            {/* ── SCROLL INDICATOR ── */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
               <span className="text-[9px] font-bold text-pure-white/40 uppercase tracking-[0.2em]">Discover</span>
               <div className="w-[1px] h-8 bg-pure-white/20 relative overflow-hidden">
                  <div className="w-full h-1/2 bg-pure-white/60 animate-[scrolldown_1.5s_ease-in-out_infinite]" />
               </div>
            </div>
         </section>


         {/* ── SUB-DOMAINS GRID ── */}
         <section className="py-24 bg-pure-white">
            <div className="w-full max-w-[90rem] mx-auto px-6 lg:px-12">
               <div className="text-center mb-16 px-4">
                  <span className="text-xs font-bold text-brand-walnut uppercase tracking-[.2em] mb-4 block">Areas of Implementation</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-black mb-4">Specific Sub-Domains</h2>
                  <div className="w-16 h-1 bg-brand-walnut mx-auto rounded-full" />
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {subDomains.map((sd, i) => (
                     <Link
                        key={i}
                        to={`/domains/${domain}/${sd.route}`}
                        className="group relative h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-brand-black border border-cool-gray/30 flex flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-walnut/50"
                     >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                           <img
                              src={sd.image}
                              alt={sd.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                           />
                           {/* Overlays */}
                           <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/40 transition-colors duration-500" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-4 sm:p-5 w-full flex justify-between items-end">
                           <div className="flex-1 pr-3">
                              <h4 className="text-sm md:text-base font-bold text-pure-white leading-tight mb-1 md:mb-1.5 group-hover:text-warm-gold-beige transition-colors">
                                 {sd.title}
                              </h4>
                              <p className="text-[8px] md:text-[9px] font-bold text-pure-white/60 uppercase tracking-widest line-clamp-1">
                                 IMPLEMENTATION ZONE
                              </p>
                           </div>
                           
                           {/* Square Button Icon */}
                           <div className="w-8 h-8 rounded-lg bg-pure-white/10 backdrop-blur-sm border border-pure-white/20 flex items-center justify-center text-pure-white shrink-0 group-hover:bg-brand-walnut group-hover:border-brand-walnut transition-all duration-300">
                              <ArrowUpRight size={16} />
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>



         {/* ── CTA ── */}
         <section className="py-24 bg-brand-black relative">
            <div className="container mx-auto px-6 text-center z-10 relative">
               <h2 className="text-3xl md:text-5xl font-display font-bold text-pure-white mb-8">Start Your {domain?.toUpperCase()} Transformation</h2>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link to="/consultation" className="px-10 py-5 bg-brand-walnut text-pure-white font-bold rounded-2xl transition-all hover:scale-105">Get Free Consultation</Link>
                  <Link to="/contact" className="px-10 py-5 border border-pure-white/20 text-pure-white font-bold rounded-2xl transition-all hover:bg-white/5">Contact Support</Link>
               </div>
            </div>
         </section>
      </div>
   );
}


