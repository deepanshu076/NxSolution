import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react"; // or "framer-motion"
import { ChevronRight } from "lucide-react";

const problems = [
   { id: "01", title: "Entry & Exit Delays", subtitle: "Manual checks & queues", desc: "Long queues and manual gate checks slow down throughput, causing frustration and time loss across shifts.", image: "/images/smart access system.jpeg" },
   { id: "02", title: "Attendance Inaccuracy", subtitle: "Proxy & unreliable logs", desc: "Manual registers and proxy entries make attendance unreliable, leading to payroll errors and audit risks.", image: "/images/attendance system.jpeg" },
   { id: "03", title: "Unauthorized Access", subtitle: "Untracked entry risks", desc: "Lack of proper control allows untracked and unsafe movement, compromising the security of restricted zones.", image: "/images/smart access system.jpeg" },
   { id: "04", title: "Weak Surveillance", subtitle: "Reactive monitoring only", desc: "Incidents are often noticed only after they occur due to blind spots and lack of predictive surveillance.", image: "/images/survillance monitoring.jpeg" },
   { id: "05", title: "No Real-Time Visibility", subtitle: "Lag in operational data", desc: "Critical decisions are delayed because managers lack a live, integrated view of what is happening on the ground.", image: "/images/security intelligence.jpeg" },
   { id: "06", title: "Untracked Movement", subtitle: "Blind asset & people flow", desc: "No clear visibility of people, vehicles, or asset movement, leading to operational leakage and security gaps.", image: "/images/survillance monitoring.jpeg" },
   { id: "07", title: "Resource & Energy Waste", subtitle: "Uncontrolled consumption", desc: "Uncontrolled usage of water, electricity, and hardware increases operational costs and environmental impact.", image: "/images/energy optimization.jpeg" },
   { id: "08", title: "Disconnected Systems", subtitle: "Siloed tools confusion", desc: "Multiple tools without integration create confusion, data duplication, and extreme workflow inefficiency.", image: "/images/workflow automation.jpeg" },
   { id: "09", title: "Manual Processes", subtitle: "Error-prone dependencies", desc: "Heavy dependence on manual work leads to frequent human errors, delays, and lack of accountability.", image: "/images/workflow automation.jpeg" },
   { id: "10", title: "Poor Visitor Management", subtitle: "Chaotic guest tracking", desc: "Visitor entry and tracking are not streamlined, creating bottlenecks and security risks at the reception.", image: "/images/smart access system.jpeg" },
   { id: "11", title: "Lack of Central Control", subtitle: "No unified command", desc: "No single platform to monitor and manage operations across multiple sites or departments simultaneously.", image: "/images/security intelligence.jpeg" },
   { id: "12", title: "Delayed Issue Detection", subtitle: "Slow incident response", desc: "Problems are identified too late, increasing their impact and the cost of resolution exponentially.", image: "/images/security intelligence.jpeg" },
];

export default function OperationalChallenges() {
   const [activeProblem, setActiveProblem] = useState(0);
   const scrollRef = useRef(null);

   // Mobile Auto-Scroll Hook
   useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;

      let animationFrameId;
      let direction = 1;
      let speed = 0.5; // Smooth scroll speed
      let isInteracting = false;
      let exactScrollX = el.scrollLeft; // Track exact decimal value to prevent rounding bugs

      const updateActiveImage = (currentScroll) => {
         if (window.innerWidth >= 1024) return;
         const maxScroll = el.scrollWidth - el.clientWidth;
         if (maxScroll <= 0) return;

         // Calculate how far we've scrolled as a fraction (0 to 1)
         const scrollFraction = Math.max(0, Math.min(1, currentScroll / maxScroll));
         
         // Map fraction to a problem index
         const newIndex = Math.round(scrollFraction * (problems.length - 1));
         
         setActiveProblem(prev => prev !== newIndex ? newIndex : prev);
      };

      const handleInteractStart = () => (isInteracting = true);

      const handleInteractEnd = () => {
         isInteracting = false;
         // Re-sync exact value if user manually scrolled
         exactScrollX = el.scrollLeft;
      };

      const handleScroll = () => {
         if (isInteracting) {
            exactScrollX = el.scrollLeft;
            updateActiveImage(exactScrollX);
         }
      };

      el.addEventListener("touchstart", handleInteractStart, { passive: true });
      el.addEventListener("touchend", handleInteractEnd);
      el.addEventListener("mouseenter", handleInteractStart);
      el.addEventListener("mouseleave", handleInteractEnd);
      el.addEventListener("scroll", handleScroll, { passive: true });

      const autoScroll = () => {
         if (window.innerWidth < 1024 && !isInteracting) {
            exactScrollX += speed * direction;
            
            // Bounce back when reaching bounds
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (exactScrollX <= 0) {
               exactScrollX = 0;
               direction = 1;
            } else if (exactScrollX >= maxScroll) {
               exactScrollX = maxScroll;
               direction = -1;
            }

            el.scrollLeft = exactScrollX;
            updateActiveImage(exactScrollX);
         }
         animationFrameId = requestAnimationFrame(autoScroll);
      };

      animationFrameId = requestAnimationFrame(autoScroll);

      return () => {
         cancelAnimationFrame(animationFrameId);
         el.removeEventListener("touchstart", handleInteractStart);
         el.removeEventListener("touchend", handleInteractEnd);
         el.removeEventListener("mouseenter", handleInteractStart);
         el.removeEventListener("mouseleave", handleInteractEnd);
         el.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <section className="py-10 md:py-16 lg:py-20 bg-soft-white overflow-hidden">
         <div className="container mx-auto px-4 md:px-6 max-w-6xl w-full">
            <div className="text-center mb-6 md:mb-10 lg:mb-14 max-w-2xl mx-auto">
               <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold text-brand-black mb-2 md:mb-3">Operational Challenges</h2>
               <p className="text-charcoal/60 text-xs md:text-sm lg:text-lg">Friction points we eliminate through high-performance automation</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
               {/* Visual Section - Order 1 on mobile */}
               <div className="w-full lg:w-3/5 order-1 lg:order-2 flex justify-center items-center">
                  <div className="relative h-[320px] md:h-[500px] w-full rounded-[2.5rem] bg-brand-black overflow-hidden group/visual shadow-2xl border-6 md:border-8 border-soft-white">
                     <motion.div
                        key={activeProblem}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute inset-0"
                     >
                        <img
                           src={problems[activeProblem].image}
                           className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] group-hover/visual:scale-105"
                           alt={problems[activeProblem].title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                           <div className="space-y-2 md:space-y-4">
                              <div className="w-10 h-1 bg-brand-walnut rounded-full mb-3 md:mb-6" />
                              <h3 className="text-xl md:text-4xl font-display font-bold text-soft-white leading-tight">
                                 {problems[activeProblem].title}
                              </h3>

                              <div className="hidden lg:block max-h-0 opacity-0 group-hover/visual:max-h-[200px] group-hover/visual:opacity-100 transition-all duration-700 ease-[0.19,1,0.22,1] overflow-hidden">
                                 <p className="text-soft-white/80 text-sm md:text-lg leading-relaxed max-w-2xl pt-4">
                                    {problems[activeProblem].desc}
                                 </p>
                              </div>

                              <div className="pt-4 group-hover/visual:opacity-0 transition-opacity duration-300 hidden lg:block">
                                 <span className="text-[9px] font-bold uppercase tracking-[.4em] text-warm-gold-beige flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-walnut animate-pulse" />
                                    Hover for details
                                 </span>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>

               {/* List Section - Note: Removed "snap-x" and "snap-center" so the JS can scroll smoothly */}
               <div
                  ref={scrollRef}
                  className="w-full lg:w-2/5 order-2 lg:order-1 h-auto lg:h-[500px] overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden pr-0 lg:pr-4
               [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:block lg:[&::-webkit-scrollbar]:w-1.5
               [&::-webkit-scrollbar-track]:bg-black/5 [&::-webkit-scrollbar-track]:rounded-full
               [&::-webkit-scrollbar-thumb]:bg-brand-walnut/40 hover:[&::-webkit-scrollbar-thumb]:bg-brand-walnut [&::-webkit-scrollbar-thumb]:rounded-full transition-colors"
               >
                  <div className="flex flex-row lg:flex-col gap-3 min-w-max lg:min-w-0 pb-4 lg:pb-0">
                     {problems.map((prob, i) => (
                        <button
                           key={prob.id}
                           onMouseEnter={() => window.innerWidth > 1024 && setActiveProblem(i)}
                           onClick={() => setActiveProblem(i)}
                           className={`group relative px-5 py-4 lg:px-6 lg:py-5 rounded-2xl transition-all duration-500 border flex flex-col gap-0.5 text-left shrink-0 w-[240px] lg:w-full ${activeProblem === i
                              ? "bg-brand-walnut border-brand-walnut text-soft-white shadow-xl scale-[1.01] z-10"
                              : "bg-warm-cream/30 border-soft-taupe/20 text-brand-black hover:bg-warm-cream/50 hover:border-brand-walnut/30"
                              }`}
                        >
                           <div className={`text-[9px] uppercase tracking-[.2em] font-bold mb-0.5 transition-colors ${activeProblem === i ? "text-warm-gold-beige/60" : "text-brand-walnut/40"}`}>
                              Problem {prob.id}
                           </div>
                           <h4 className="font-display font-bold text-sm md:text-base leading-tight">
                              {prob.title}
                           </h4>
                           <p className={`text-[10px] font-medium transition-colors ${activeProblem === i ? "text-soft-white/60" : "text-charcoal/50"}`}>
                              {prob.subtitle}
                           </p>
                           <ChevronRight
                              size={14}
                              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-500 hidden lg:block ${activeProblem === i ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-100"
                                 }`}
                           />
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}