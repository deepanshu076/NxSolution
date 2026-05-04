import { motion } from "motion/react";
import React from "react";
import HeroGrid from "../home/HeroGrid";

interface PageHeroProps {
    titleLine1: string;
    titleLine2?: string;
    descriptionLine1: string;
    descriptionLine2?: string;
    topContent?: React.ReactNode;
    floatingElements?: React.ReactNode;
    children?: React.ReactNode;
}

export default function PageHero({
    titleLine1,
    titleLine2,
    descriptionLine1,
    descriptionLine2,
    topContent,
    floatingElements,
    children,
}: PageHeroProps) {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center pt-[64px] bg-[var(--nx-white)] text-center overflow-hidden w-full">
            {/* Animated Background Grid */}
            <HeroGrid />

            {/* Floating Elements (Background/Sides) */}
            {floatingElements && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    {floatingElements}
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto max-w-[1200px] relative z-20 flex flex-col items-center justify-center text-center w-full pointer-events-none">
                {topContent && (
                    <div className="mb-6 w-full flex justify-center pointer-events-auto">
                        {topContent}
                    </div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-[850px] mx-auto text-center font-display font-[800] text-[var(--nx-navy)] mb-4 leading-[1.2] tracking-tight pointer-events-auto"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                >
                    <span className="block">{titleLine1}</span>
                    {titleLine2 && (
                        <span className="block">{titleLine2}</span>
                    )}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-[var(--nx-steel)] text-base max-w-[650px] mx-auto mb-6 md:mb-8 leading-relaxed px-4 sm:px-0 text-balance pointer-events-auto"
                >
                    <span className="block">{descriptionLine1}</span>
                    {descriptionLine2 && <span className="block">{descriptionLine2}</span>}
                </motion.div>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-5 relative z-20 mt-10 pointer-events-auto"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
}