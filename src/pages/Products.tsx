import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
   Zap,
   Cpu,
   Smartphone,
   Cloud,
   Layers,
   ArrowUpRight,
   CheckCircle2,
   Lock,
   Users,
   Camera,
   Brain,
   Car,
   Package,
   BarChart3,
   Shield,
   Wifi,
   Bot,
} from "lucide-react";
import { Link } from "react-router-dom";

// ── DATA DEFINITIONS ──

const productsData = {
   // Access & Entry
   access: [
      { type: "hardware", name: "Biometric Access Control Devices", desc: "High-precision fingerprint & hand geometry entry.", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=600&q=80", category: ["security", "ai", "automation"] },
      { type: "hardware", name: "Face Recognition Terminals", desc: "Contactless AI detection with anti-spoofing.", image: "https://images.unsplash.com/photo-1593583853246-8e503375862f?w=600&q=80", category: ["security", "ai", "automation"] },
      { type: "hardware", name: "RFID Card Readers", desc: "Long-range and encrypted frequency readers.", image: "https://images.unsplash.com/photo-1624397648248-9a98f7f01e53?w=600&q=80", category: ["security", "automation"] },
      { type: "hardware", name: "Smart Turnstile Gates", desc: "Industrial-grade tripod and flap barriers.", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&q=80", category: ["security", "automation"] },
      { type: "hardware", name: "Boom Barrier Systems", desc: "Automated vehicle entry with high-speed motor.", image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600&q=80", category: ["security", "automation"] },
      { type: "hardware", name: "Smart Door Locks", desc: "Cloud-connected locks for granular room access.", image: "https://images.unsplash.com/photo-1631541909061-71e349d1f3b3?w=600&q=80", category: ["security", "automation"] },
      { type: "solution", name: "QR Code Access Systems", desc: "Mobile-first temporary access for visitors.", image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80", category: ["saas", "analytics"] },
      { type: "solution", name: "Cloud Access Controller", desc: "Manage all entry points from a single web dashboard.", image: "https://images.unsplash.com/photo-1558494949-ef010ca68a9c?w=600&q=80", category: ["cloud", "saas"] },
   ],
   // Attendance
   attendance: [
      { type: "hardware", name: "Biometric Attendance Machines", desc: "Fast reporting and shift management integration.", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=600&q=80", category: ["security", "automation"] },
      { type: "hardware", name: "Face Recognition Attendance Systems", desc: "Group detection for classroom and office entries.", image: "https://images.unsplash.com/photo-1593583853246-8e503375862f?w=600&q=80", category: ["ai", "automation"] },
      { type: "solution", name: "Mobile Attendance Apps (GPS-based)", desc: "Geofencing based presence tracking for remote teams.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80", category: ["saas", "cloud", "analytics"] },
      { type: "hardware", name: "Smart Attendance Kiosks", desc: "Self-service kiosks for staff and visitors.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80", category: ["automation"] },
      { type: "solution", name: "Payroll Integration Suite", desc: "Automatically sync attendance logs with accounting software.", image: "https://images.unsplash.com/photo-1454165833267-0e6988448a3e?w=600&q=80", category: ["cloud", "analytics"] },
   ],
   // Surveillance
   surveillance: [
      { type: "hardware", name: "AI CCTV Cameras", desc: "On-edge processing for object and face detection.", image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=600&q=80", category: ["security", "ai", "analytics"] },
      { type: "hardware", name: "IP Surveillance Cameras", desc: "4K resolution with night vision and PoE support.", image: "https://images.unsplash.com/photo-1551817958-d143ea6f0df5?w=600&q=80", category: ["security"] },
      { type: "hardware", name: "PTZ Cameras (Pan-Tilt-Zoom)", desc: "Remote controlled tracking cameras.", image: "https://images.unsplash.com/photo-1559828589-72de70ca3738?w=600&q=80", category: ["security", "automation"] },
      { type: "solution", name: "Video Management Systems (VMS)", desc: "Centralized control software for all feeds.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80", category: ["saas", "cloud"] },
      { type: "hardware", name: "Network Video Recorders (NVR)", desc: "High-capacity server storage for surveillance.", image: "https://images.unsplash.com/photo-1558494949-ef010ca68a9c?w=600&q=80", category: ["security"] },
      { type: "solution", name: "Smart Surveillance Analytics", desc: "AI analytics for perimeter security and breach detection.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", category: ["ai", "analytics"] },
   ],
   // Security Intel
   intelligence: [
      { type: "solution", name: "AI-Based Monitoring Systems", desc: "Predictive analytics for anomaly detection.", image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&q=80", category: ["ai", "analytics", "security"] },
      { type: "hardware", name: "Intrusion Detection Systems", desc: "Vibration and perimeter breach sensors.", image: "https://images.unsplash.com/photo-1558494949-ef010ca68a9c?w=600&q=80", category: ["security"] },
      { type: "solution", name: "Smart Alarm Systems", desc: "Multi-zone alerts with app notifications.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", category: ["security", "automation"] },
      { type: "hardware", name: "Panic Button Devices", desc: "Instant emergency triggering for security staff.", image: "https://images.unsplash.com/photo-1517077304055-6e89a382830f?w=600&q=80", category: ["security"] },
      { type: "hardware", name: "Emergency Alert Systems", desc: "Visual and audio mass notification units.", image: "https://images.unsplash.com/photo-1454165833267-0e6988448a3e?w=600&q=80", category: ["security"] },
   ],
   // Parking
   parking: [
      { type: "hardware", name: "Automated Boom Barriers", desc: "High-speed Entry/Exit vehicle hurdles.", image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=600&q=80", category: ["automation"] },
      { type: "hardware", name: "RFID Vehicle Access Tags", desc: "Windshield tags for seamless gate entry.", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80", category: ["security", "automation"] },
      { type: "hardware", name: "Smart Parking Sensors", desc: "Ultrasonic sensors for slot occupancy.", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80", category: ["automation", "analytics"] },
      { type: "solution", name: "Parking Guidance Systems", desc: "Directional LED systems for vacant slot finding.", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80", category: ["saas", "analytics"] },
      { type: "solution", name: "License Plate Recognition (ANPR) Systems", desc: "AI cameras for automated logging.", image: "https://images.unsplash.com/photo-1557597774-9d2739f05a76?w=600&q=80", category: ["ai", "security", "analytics"] },
   ],
   // Assets
   assets: [
      { type: "hardware", name: "RFID Asset Tracking Tags", desc: "Metal-mount and flexible tags for equipment.", image: "https://images.unsplash.com/photo-1586528116311-ad8619bc9141?w=600&q=80", category: ["automation"] },
      { type: "hardware", name: "GPS Tracking Devices", desc: "Real-time location for transit and fleet.", image: "https://images.unsplash.com/photo-1533035353112-9c42c2627402?w=600&q=80", category: ["automation", "analytics"] },
      { type: "hardware", name: "BLE Tracking Beacons", desc: "Indoor positioning and proximity triggers.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", category: ["automation"] },
      { type: "solution", name: "Smart Inventory Tracking Systems", desc: "Live stock monitoring and automated audits.", image: "https://images.unsplash.com/photo-1586528116311-ad8619bc9141?w=600&q=80", category: ["cloud", "analytics"] },
   ],
};

// Flatten all products for initial display
const allProducts = Object.values(productsData).flat();

// Category configuration
const categories = [
   { id: "all", label: "All Products", icon: Layers },
   { id: "ai", label: "AI", icon: Brain },
   { id: "automation", label: "Automation", icon: Bot },
   { id: "saas", label: "SaaS", icon: Cloud },
   { id: "analytics", label: "Analytics", icon: BarChart3 },
   { id: "security", label: "Security", icon: Shield },
   { id: "cloud", label: "Cloud", icon: Wifi },
];

function ProductCard({ prod, i }: { prod: any; i: number; key?: string | number }) {
   const isHardware = prod.type === 'hardware';

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.95 }}
         transition={{ duration: 0.3, delay: i * 0.05 }}
         className="group bg-white rounded-xl border border-soft-taupe/10 overflow-hidden hover:shadow-xl hover:border-brand-walnut/20 transition-all cursor-pointer"
      >
         {/* Image Container - More Compact */}
         <div className="aspect-[16/9] overflow-hidden relative">
            <img
               src={prod.image}
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               alt={prod.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Type Badge */}
            <div className="absolute top-3 left-3">
               <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider backdrop-blur-md ${isHardware
                  ? "bg-brand-black/80 text-soft-white border border-soft-white/20"
                  : "bg-warm-gold-beige/90 text-brand-black border border-brand-black/10"
                  }`}>
                  {isHardware ? "Hardware" : "Solution"}
               </div>
            </div>
         </div>

         {/* Content - More Compact */}
         <div className="p-4">
            <h4 className="text-sm font-bold text-brand-black mb-1.5 leading-tight group-hover:text-brand-walnut transition-colors line-clamp-2">
               {prod.name}
            </h4>
            <p className="text-brand-black/50 text-[11px] leading-relaxed mb-3 line-clamp-2">
               {prod.desc}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-soft-taupe/10">
               <div className="flex items-center gap-1">
                  {isHardware ? (
                     <Cpu size={10} className="text-brand-black/30" />
                  ) : (
                     <Cloud size={10} className="text-brand-black/30" />
                  )}
                  <span className="text-[8px] font-bold text-brand-black/30 uppercase tracking-wider">
                     {isHardware ? "Edge Device" : "Cloud Ready"}
                  </span>
               </div>
               <div className="w-6 h-6 rounded-full border border-soft-taupe/20 flex items-center justify-center text-brand-black/30 group-hover:bg-brand-walnut group-hover:text-soft-white group-hover:border-brand-walnut transition-all">
                  <ArrowUpRight size={10} />
               </div>
            </div>
         </div>
      </motion.div>
   );
}

export default function Products() {
   const [activeCategory, setActiveCategory] = useState("all");

   // Filter products based on selected category
   const filteredProducts = useMemo(() => {
      if (activeCategory === "all") {
         return allProducts;
      }
      return allProducts.filter(product =>
         product.category && product.category.includes(activeCategory)
      );
   }, [activeCategory]);

   return (
      <div className="flex flex-col pt-16 bg-soft-white">
         {/* ── COMPACT HERO SECTION ── */}
         <section className="relative bg-brand-black text-center overflow-hidden py-12">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5 flex gap-px" aria-hidden="true">
               {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`hero-bg-${i}`} className="flex-1 bg-soft-white" />
               ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
               >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-white/5 backdrop-blur-sm text-warm-gold-beige font-bold text-[9px] uppercase tracking-wider mb-4 border border-soft-white/10">
                     Hardware + Software · Integrated
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-soft-white mb-3 leading-tight">
                     Technology That Powers Our{" "}
                     <span className="text-warm-gold-beige">Smart Solutions</span>
                  </h1>

                  <p className="text-soft-white/50 text-sm max-w-xl mx-auto">
                     Our products are part of integrated smart systems designed to deliver reliable, scalable, and efficient operational outcomes.
                  </p>
               </motion.div>
            </div>
         </section>

         {/* ── PRODUCTS SECTION WITH CATEGORY FILTERS ── */}
         <section className="py-8 bg-soft-white">
            <div className="container mx-auto px-6">

               {/* Category Filter Cards - Horizontal Scroll on Mobile */}
               <div className="mb-8 overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 md:gap-3 justify-start md:justify-center min-w-max">
                     {categories.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.id;
                        return (
                           <button
                              key={category.id}
                              onClick={() => setActiveCategory(category.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all whitespace-nowrap ${isActive
                                 ? "bg-brand-walnut text-soft-white shadow-md scale-105"
                                 : "bg-white text-brand-black/60 hover:bg-white/80 hover:text-brand-black border border-soft-taupe/20"
                                 }`}
                           >
                              <Icon size={14} />
                              {category.label}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Results Count */}
               <div className="mb-6 text-center">
                  <p className="text-brand-black/40 text-xs">
                     Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
               </div>

               {/* Products Grid - More Compact */}
               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeCategory}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                  >
                     {filteredProducts.map((prod, i) => (
                        <ProductCard key={`${prod.name}-${i}`} prod={prod} i={i} />
                     ))}
                  </motion.div>
               </AnimatePresence>

               {/* Empty State */}
               {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                     <div className="text-brand-black/20 text-6xl mb-4">🔍</div>
                     <p className="text-brand-black/40 text-sm">No products found in this category</p>
                  </div>
               )}
            </div>
         </section>

         {/* ── COMPACT CTA STRIP ── */}
         <section className="py-16 bg-brand-black text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 flex gap-px" aria-hidden="true">
               {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`cta-bg-${i}`} className="flex-1 bg-soft-white" />
               ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
               <span className="text-[9px] font-bold text-soft-white/40 tracking-[0.3em] uppercase mb-3 block">
                  Ready to build
               </span>
               <h2 className="text-2xl md:text-3xl font-display font-bold text-soft-white mb-4 max-w-3xl mx-auto leading-tight">
                  Build a Complete Smart System for Your Operations
               </h2>
               <p className="text-soft-white/50 text-sm mb-8 max-w-2xl mx-auto">
                  Tell us your operational challenges — we'll design the right system around them.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                     to="/consultation"
                     className="px-6 py-2.5 bg-brand-walnut text-soft-white font-bold rounded-lg transition-all hover:bg-brand-black border border-brand-walnut shadow-lg text-sm"
                  >
                     Get Free Consultation
                  </Link>
                  <Link
                     to="/solutions"
                     className="px-6 py-2.5 border border-soft-white/20 text-soft-white font-bold rounded-lg hover:bg-soft-white/5 backdrop-blur-sm transition-colors text-sm"
                  >
                     Explore Solutions
                  </Link>
               </div>
            </div>
         </section>
      </div>
   );
}