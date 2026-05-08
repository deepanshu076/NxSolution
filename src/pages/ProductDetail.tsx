import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Play, Shield, Clock, Users, Lock, Zap, Camera, Package, ArrowRight } from "lucide-react";
import PageHero from "@/src/components/ui/PageHero";

// ── PRODUCT DATABASE ──
const productDatabase: Record<string, {
    name: string;
    category: string;
    type: string;
    desc: string;
    tagline: string;
    image: string;
    views: { label: string; image: string; caption: string }[];
    videoUrl: string;
    videoDuration: string;
    videoChapters: string[];
    features: { title: string; desc: string; icon: any; color: string }[];
}> = {
    "biometric-access-control-devices": {
        name: "Biometric Access Control Devices",
        category: "Security · Hardware",
        type: "Hardware",
        desc: "High-precision fingerprint & hand geometry entry. Built for enterprise — tamper-proof, offline-capable, and deployable in under an hour.",
        tagline: "Enterprise-grade identity verification",
        image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=1400&q=80",
        views: [
            { label: "Front", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&q=80", caption: "Fingerprint Reader Panel" },
            { label: "Side", image: "https://images.unsplash.com/photo-1586528116311-ad8619bc9141?w=800&q=80", caption: "Interface & Port Layout" },
            { label: "Mount", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", caption: "Wall Mount Installation" },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "3:42",
        videoChapters: ["Installation", "User Enrollment", "Anti-Spoofing", "Offline Mode", "Integration"],
        features: [
            { title: "Multi-Modal Biometrics", desc: "Fingerprint, hand geometry & vein pattern — all in one device.", icon: Users, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Tamper Detection", desc: "Hardware intrusion alarm with remote data wipe on breach.", icon: Lock, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Offline Operation", desc: "Fully functional without network. Auto-syncs on reconnect.", icon: Clock, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "IP65 Weatherproofing", desc: "Outdoor-rated. Works from -20°C to +60°C in any conditions.", icon: Shield, color: "bg-nx-navy/5 text-nx-navy" },
        ]
    },
    "face-recognition-terminals": {
        name: "Face Recognition Terminals",
        category: "AI · Security",
        type: "Hardware",
        desc: "Contactless AI-powered detection with real-time anti-spoofing. Identifies in under 500ms with liveness verification.",
        tagline: "Contactless identity at machine speed",
        image: "https://images.unsplash.com/photo-1593583853246-8e503375862f?w=1400&q=80",
        views: [
            { label: "Front", image: "https://images.unsplash.com/photo-1593583853246-8e503375862f?w=800&q=80", caption: "AI Camera & Display" },
            { label: "Side", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&q=80", caption: "Profile & Depth Sensor" },
            { label: "Mount", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", caption: "Turnstile Integration" },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "4:10",
        videoChapters: ["Setup", "Face Enrollment", "Liveness Check", "Crowd Mode", "SDK Integration"],
        features: [
            { title: "3D Depth Sensing", desc: "IR structured light defeats photograph & video spoof attempts.", icon: Camera, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Group Detection", desc: "Identifies up to 20 faces per frame in classroom environments.", icon: Users, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Sub-500ms Match", desc: "Response time under half a second even in low-light conditions.", icon: Zap, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Mask Compatible", desc: "Recognizes identity with face mask partially obstructing view.", icon: Shield, color: "bg-nx-navy/5 text-nx-navy" },
        ]
    },
    "rfid-card-readers": {
        name: "RFID Card Readers",
        category: "Security · Automation",
        type: "Hardware",
        desc: "Long-range and encrypted frequency readers supporting Mifare, HID, and EM formats. Industrial grade, zero configuration.",
        tagline: "Encrypted entry for every credential format",
        image: "https://images.unsplash.com/photo-1624397648248-9a98f7f01e53?w=1400&q=80",
        views: [
            { label: "Front", image: "https://images.unsplash.com/photo-1624397648248-9a98f7f01e53?w=800&q=80", caption: "Reader Head & LED Status" },
            { label: "Side", image: "https://images.unsplash.com/photo-1558494949-ef010ca68a9c?w=800&q=80", caption: "Wiegand Port & Housing" },
            { label: "Mount", image: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&q=80", caption: "Door Frame Installation" },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "2:55",
        videoChapters: ["Unboxing", "Wiring", "Card Programming", "Zone Config", "Dashboard"],
        features: [
            { title: "Multi-Protocol", desc: "Reads Mifare Classic, DESFire EV2, HID, EM4100 cards & fobs.", icon: Zap, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Long Range", desc: "Passive reads up to 15cm; active UHF models reach 3 metres.", icon: Shield, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Encrypted Wiegand", desc: "OSDP v2 secure channel prevents signal cloning on the wire.", icon: Lock, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "IP65 Rating", desc: "Outdoor weatherproof with -25 to 70°C operating range.", icon: Clock, color: "bg-nx-navy/5 text-nx-navy" },
        ]
    },
};

const buildFallbackProduct = (slug: string) => {
    const name = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
        name,
        category: "Hardware · Security",
        type: "Hardware",
        desc: `Enterprise-grade ${name.toLowerCase()} built for intelligent facility management and seamless integration with the NX ecosystem.`,
        tagline: "Intelligent hardware for smart operations",
        image: "https://images.unsplash.com/photo-1558494949-ef010ca68a9c?w=1400&q=80",
        views: [
            { label: "Front", image: "https://images.unsplash.com/photo-1558494949-ef010ca68a9c?w=800&q=80", caption: "Front Panel" },
            { label: "Side", image: "https://images.unsplash.com/photo-1586528116311-ad8619bc9141?w=800&q=80", caption: "Side Profile" },
            { label: "Mount", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", caption: "Wall Mount" },
        ],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        videoDuration: "3:00",
        videoChapters: ["Overview", "Installation", "Configuration", "Integration", "Support"],
        features: [
            { title: "Industrial Grade", desc: "Built to last in demanding facility environments with minimal maintenance.", icon: Shield, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Cloud Connected", desc: "Real-time data sync to the NX cloud dashboard from any location.", icon: Zap, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Offline Ready", desc: "Continues working during network outages and syncs when reconnected.", icon: Clock, color: "bg-nx-navy/5 text-nx-navy" },
            { title: "Plug & Play", desc: "Deploys in under an hour with no specialist technical skills required.", icon: Package, color: "bg-nx-navy/5 text-nx-navy" },
        ]
    };
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const slug = id || "";

    const product = productDatabase[slug] || buildFallbackProduct(slug);

    const [activeView, setActiveView] = useState(0);
    const [activeChapter, setActiveChapter] = useState(product.videoChapters[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="flex flex-col bg-nx-white overflow-hidden">

            {/* ── HERO ── */}
            <PageHero
                titleLine1={product.name}
                descriptionLine1={product.desc}
            >
                <button className="px-10 py-4 bg-black text-white text-xs font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/20 uppercase tracking-widest">
                    Request Demo
                </button>
                <button className="px-10 py-4 bg-white text-black text-xs font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl uppercase tracking-widest">
                    Download Datasheet
                </button>
            </PageHero>

            {/* ── PRODUCT VIEWS ── */}
            <section className="py-24 bg-[#fcfcfc] border-t border-nx-ice">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="mb-16 text-center">
                        <h4 className="text-nx-navy/30 font-bold text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4">Perspective</h4>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-nx-navy uppercase tracking-tight">
                            Product <span className="text-nx-steel">Views</span>
                        </h2>
                        <p className="text-nx-steel font-bold uppercase tracking-[0.2em] text-[10px] mt-4">Every angle. Every detail.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {product.views.map((view, i) => (
                            <motion.div
                                key={view.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-nx-navy shadow-2xl border border-nx-navy/10"
                            >
                                <img
                                    src={view.image}
                                    alt={view.label}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                <div className="absolute bottom-8 left-8 right-8 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shrink-0">
                                        <Zap className="w-5 h-5 text-white fill-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.3em] mb-1">Perspective</span>
                                        <h3 className="text-white text-xl sm:text-2xl font-display font-black uppercase tracking-tight leading-none">
                                            {view.label}
                                        </h3>
                                    </div>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <Camera className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VIDEO SECTION ── */}
            <section className="py-24 bg-nx-ice">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="mb-12 text-center mx-auto">
                        <h4 className="text-nx-navy/60 font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3">Product Walkthrough</h4>
                        <h2 className="text-3xl md:text-4xl font-display font-black text-nx-navy mb-3 uppercase">See it in action</h2>
                        <p className="text-nx-navy/50 text-sm md:text-base max-w-xl mx-auto font-medium">
                            Watch how it installs, enrolls users, and handles edge cases in real environments.
                        </p>
                    </div>

                    <div
                        className="relative rounded-[32px] overflow-hidden bg-nx-navy aspect-video flex items-center justify-center group cursor-pointer shadow-2xl mb-12 border-[6px] border-nx-white"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? (
                            <iframe
                                src={`${product.videoUrl}?autoplay=1`}
                                title={product.name}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-nx-navy/80 via-transparent to-transparent" />

                                <div className="relative z-10 flex flex-col items-center gap-5">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-20 h-20 rounded-full bg-nx-white flex items-center justify-center text-nx-navy shadow-2xl"
                                    >
                                        <Play fill="currentColor" size={32} className="ml-1" />
                                    </motion.div>
                                    <div className="text-center">
                                        <div className="text-nx-white font-bold text-sm mb-1.5 tracking-wide uppercase">Product Demo — {product.videoDuration}</div>
                                        <div className="text-nx-white/40 text-[10px] uppercase font-bold tracking-[0.25em]">NX-Solutions · {product.category.split('·')[0].trim()} Series</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {product.videoChapters.map((chapter) => (
                            <button
                                key={chapter}
                                onClick={() => setActiveChapter(chapter)}
                                className={`px-6 py-3 rounded-full text-xs font-bold transition-all border ${activeChapter === chapter
                                    ? "bg-nx-navy text-nx-white border-nx-navy shadow-sm"
                                    : "bg-nx-white border-nx-steel/10 text-nx-navy/40 hover:border-nx-navy/30 hover:text-nx-navy"
                                    }`}
                            >
                                {chapter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-24 bg-nx-white">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="mb-14 text-center">
                        <h4 className="text-nx-navy/60 font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3">Features</h4>
                        <h2 className="text-3xl md:text-4xl font-display font-black text-nx-navy uppercase">What sets it apart</h2>
                    </div>
                    <div className="bg-nx-ice/30 rounded-[32px] p-8 md:p-12 border border-nx-steel/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {product.features.map((feat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                    className="p-8 rounded-2xl bg-nx-white border border-nx-steel/5 flex gap-6 items-start hover:shadow-xl transition-all hover:-translate-y-1 group"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${feat.color} flex items-center justify-center shrink-0 shadow-sm border border-nx-navy/5`}>
                                        <feat.icon size={26} />
                                    </div>
                                    <div>
                                        <h3 className="text-base md:text-lg font-bold text-nx-navy mb-2 uppercase">{feat.title}</h3>
                                        <p className="text-nx-steel text-sm leading-relaxed font-medium">{feat.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA FOOTER ── */}
            <section className="py-24 bg-nx-ice relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--nx-navy)_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
                    <span className="text-[10px] font-bold text-nx-navy/40 tracking-[0.3em] uppercase block mb-5">Ready to deploy</span>
                    <h2 className="text-3xl md:text-5xl font-display font-black text-nx-navy mb-6 leading-tight uppercase">
                        Tell us your operational<br />challenges
                    </h2>
                    <p className="text-nx-navy/60 text-sm md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
                        We'll design the right system around them.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-10 py-5 bg-nx-navy text-nx-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-nx-navy/20 uppercase tracking-wider">
                            Get Free Consultation
                        </button>
                        <Link
                            to="/solutions"
                            className="px-10 py-5 border border-nx-navy/20 text-nx-navy rounded-2xl font-bold hover:bg-nx-navy/5 transition-all inline-flex items-center justify-center gap-2 uppercase tracking-wider"
                        >
                            Explore Solutions <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
