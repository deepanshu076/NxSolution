import { Code2, Monitor, Cpu, Database, Blocks, Terminal, Layers, Hexagon } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

const ICONS = [Code2, Monitor, Cpu, Database, Blocks, Terminal, Layers, Hexagon];

// 10 cols × 6 rows = 60 larger boxes
const COLS = 10;
const ROWS = 6;
const TOTAL = COLS * ROWS;

export default function HeroGrid() {
    const gridRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!gridRef.current) return;
            const r = gridRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - r.left);
            mouseY.set(e.clientY - r.top);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={gridRef}
            className="absolute inset-0 z-0 overflow-hidden"
            style={{
                maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 25%, transparent 100%)',
            }}
        >
            {/* Mouse-follow glow */}
            <motion.div
                className="absolute rounded-full pointer-events-none z-10"
                style={{
                    width: 500,
                    height: 500,
                    left: smoothX,
                    top: smoothY,
                    x: '-50%',
                    y: '-50%',
                    background: 'radial-gradient(circle, rgba(0,4,35,0.08) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }}
            />

            {/* Full-screen grid — 8×5 = 40 large cells */}
            <div
                className="absolute inset-0"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    gap: '8px',
                    padding: '8px',
                }}
            >
                {Array.from({ length: TOTAL }).map((_, i) => {
                    const hasIcon = i % 7 === 0;

                    const Icon = ICONS[i % ICONS.length];
                    const delay = (i % TOTAL) * 0.015;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                backgroundColor: 'rgba(205, 228, 249, 0.4)',
                                borderColor: 'var(--nx-ice-deep)',
                                scale: 1.05,
                                zIndex: 20,
                                boxShadow: '0 0 25px rgba(205, 228, 249, 0.6), inset 0 0 10px rgba(205, 228, 249, 0.3)',
                                transition: { duration: 0.1 }
                            }}
                            transition={{ delay, duration: 0.5, ease: 'easeOut' }}
                            className="flex items-center justify-center group/cell cursor-default rounded-[12px] border border-[#e5e5e5] bg-transparent transition-all duration-75"
                        >
                            {hasIcon && (
                                <Icon
                                    className="text-nx-navy/25 group-hover/cell:text-nx-navy group-hover/cell:scale-125 transition-all duration-500"
                                    style={{ width: 28, height: 28 }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}