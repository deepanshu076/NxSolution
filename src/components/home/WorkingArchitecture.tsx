import React from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, Code2, Layout, Zap } from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Discover',
        subtitle: 'Understanding requirements',
        icon: Search,
        gradient: 'from-[#344E5C] to-[#2a3f4a]',
        shadow: 'shadow-slate-200',
        lightColor: 'bg-nx-ice/50'
    },
    {
        id: '02',
        title: 'Design',
        subtitle: 'Solution architecture',
        icon: PenTool,
        gradient: 'from-[#7C7C7C] to-[#344E5C]',
        shadow: 'shadow-slate-200',
        lightColor: 'bg-nx-ice/50'
    },
    {
        id: '03',
        title: 'Develop',
        subtitle: 'System building',
        icon: Code2,
        gradient: 'from-[#344E5C] to-[#7C7C7C]',
        shadow: 'shadow-slate-200',
        lightColor: 'bg-nx-ice/50'
    },
    {
        id: '04',
        title: 'Implement',
        subtitle: 'Deployment',
        icon: Layout,
        gradient: 'from-[#344E5C] to-[#CDE4F9]',
        shadow: 'shadow-slate-200',
        lightColor: 'bg-nx-ice/50'
    },
    {
        id: '05',
        title: 'Execute & Optimize',
        subtitle: 'Performance tracking',
        icon: Zap,
        gradient: 'from-[#344E5C] to-[#1a2e38]',
        shadow: 'shadow-slate-300',
        lightColor: 'bg-nx-ice/50'
    }
];

export default function WorkingArchitecture() {
    return (
        <section className="py-24 lg:py-40 bg-nx-white relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(52,78,92,0.03)_0,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="text-center mb-24 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white border border-nx-ice shadow-sm mb-6"
                    >
                        <span className="text-nx-navy font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">
                            Strategic Methodology
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-nx-navy mb-8"
                    >
                        How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-nx-navy to-nx-steel">Engineer Excellence</span>
                    </motion.h2>
                </div>

                {/* Process Flow */}
                <div className="relative">
                    {/* Animated S-Curve Path (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-40 -translate-y-1/2 pointer-events-none z-0">
                        <svg className="w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none">
                            <motion.path
                                d="M0 80 C 150 80, 150 20, 300 20 C 450 20, 450 140, 600 140 C 750 140, 750 20, 900 20 C 1050 20, 1050 80, 1200 80"
                                stroke="url(#gradient-path)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--nx-navy)" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="var(--nx-navy)" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="var(--nx-navy)" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col items-center ${index % 2 === 1 ? 'lg:mt-32' : 'lg:-mt-4'
                                    }`}
                            >
                                {/* 3D Floating Pill */}
                                <div className="group relative w-full max-w-[260px]">
                                    {/* Glass Background */}
                                    <div className={`absolute inset-0 bg-white/40 backdrop-blur-md rounded-[45px] border border-white transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${step.shadow} group-hover:shadow-nx-navy/20`} />

                                    <div className="relative p-10 flex flex-col items-center text-center">
                                        {/* Step Icon Container */}
                                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} shadow-lg flex items-center justify-center mb-8 transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500`}>
                                            <step.icon className="w-10 h-10 text-white" />

                                            {/* Step Number Floating Tag */}
                                            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-nx-navy text-xs font-black flex items-center justify-center shadow-md border border-nx-ice">
                                                {step.id}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-display font-bold text-nx-navy mb-3 tracking-tight">{step.title}</h3>

                                        <div className="h-px w-8 bg-nx-ice mb-4 group-hover:w-16 group-hover:bg-nx-navy transition-all duration-500" />

                                        <p className="text-xs font-black text-nx-navy uppercase tracking-[0.2em] opacity-80 mb-1">
                                            {step.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}