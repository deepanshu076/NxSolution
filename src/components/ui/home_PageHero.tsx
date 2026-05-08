import { motion } from "motion/react";
import React from "react";

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
        <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] flex flex-col items-center justify-center pt-[var(--navbar-height)] text-center overflow-hidden w-full px-4 sm:px-6 lg:px-8">
            {/* Cinematic Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
                <source
                    src="/images/vidssave.com%20Demon%20Slayer_%20Kimetsu%20no%20Yaiba%20Infinity%20Castle%20_%20OFFICIAL%20HINDI%20TRAILER%201080P.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Subtle Contrast Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

            {/* Floating Elements (Background/Sides) */}
            {floatingElements && (
                <div className="absolute inset-0 pointer-events-none z-20">
                    {floatingElements}
                </div>
            )}

            {/* Content Container */}
            <div className="container mx-auto max-w-[1200px] relative z-30 flex flex-col items-center justify-center text-center w-full pointer-events-none py-10 sm:py-12 md:py-20">
                {topContent && (
                    <div className="mb-4 md:mb-6 w-full flex justify-center pointer-events-auto">
                        {topContent}
                    </div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="
    w-full
    max-w-[1400px]
    mx-auto
    text-center
    font-display
    font-[800]
    text-white
    mb-4 md:mb-6
    leading-[1]
    tracking-[-0.02em]
    pointer-events-auto
    drop-shadow-lg
    text-[30px]
    sm:text-[32px]
    md:text-[38px]
    lg:text-[42px]
    xl:text-[48px]
"                >
                    <span className="block">{titleLine1}</span>
                    {titleLine2 && (
                        <span className="block">{titleLine2}</span>
                    )}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-white/90 text-sm sm:text-base md:text-lg max-w-[90%] md:max-w-[700px] mx-auto mb-6 md:mb-8 leading-relaxed text-balance pointer-events-auto drop-shadow-md"
                >
                    <span className="block">{descriptionLine1}</span>
                    {descriptionLine2 && <span className="block">{descriptionLine2}</span>}
                </motion.div>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-5 relative z-30 mt-4 md:mt-8 pointer-events-auto w-full"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section >
    );
}