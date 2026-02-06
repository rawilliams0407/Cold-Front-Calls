import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Waves, Wind, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "../ProductCard";
import { MasonryGrid } from "../MasonryGrid";
import { useCartStore } from "../stores/cartStore";
import { SEO } from "../components/SEO";

// Hero Slideshow Data
const HERO_SLIDES = [
    {
        image: "/hero-slideshow/01.jpg",
        headline: "Engineered for The Front",
        sub: "When the weather moves in, our calls stand out."
    },
    {
        image: "/hero-slideshow/02.jpg",
        headline: "Hand-Turned Performance",
        sub: "Every call is a unique masterpiece, tuned for the hunt."
    },
    {
        image: "/hero-slideshow/03.jpg",
        headline: "Built for The Hunt",
        sub: "Reliability in the toughest conditions. Period."
    }
];

export const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const addItem = useCartStore((state) => state.addItem);

    // Auto-advance slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    const categories = [
        { name: "Goose Calls", icon: <Waves />, path: "/shop?category=goose", desc: "Crisp, powerful, and authentic tones." },
        { name: "Duck Calls", icon: <Wind />, path: "/shop?category=duck", desc: "From feeding chuckles to long-range quacks." },
        { name: "Accessories", icon: <Shield />, path: "/shop?category=accessories", desc: "Lanyards, cases, and gear for the field." }
    ];

    return (
        <div className="bg-obsidian min-h-screen">
            <SEO 
                title="Home" 
                description="Cold Front Calls - Handcrafted premium custom duck and goose calls engineered for performance and reliability in the field."
            />
            
            {/* HERO SECTION - SLIDESHOW */}
            <section className="relative h-screen w-full overflow-hidden bg-obsidian">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-60"
                            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <motion.div
                        key={`content-${currentSlide}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="max-w-5xl"
                    >
                        <span className="text-stone-light uppercase tracking-[0.4em] text-sm font-bold mb-6 block radar-text">
                            Cold Front Moving In
                        </span>
                        <h1 className="text-7xl md:text-9xl font-display font-medium text-white leading-tight mb-8">
                            {HERO_SLIDES[currentSlide].headline.split(' ').map((word, i) => (
                                <span key={i} className={i === 2 ? "text-platinum font-bold" : ""}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-xl md:text-2xl text-stone-light font-body max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            {HERO_SLIDES[currentSlide].sub}
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link 
                                to="/shop" 
                                className="group px-12 py-5 bg-white text-obsidian font-bold text-sm uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center gap-3"
                            >
                                Shop the Front
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                to="/about" 
                                className="px-12 py-5 border border-white/20 text-white font-bold text-sm uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                Our Story
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Slideshow Controls */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
                    <button onClick={prevSlide} className="p-3 text-white/50 hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-3">
                        {HERO_SLIDES.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-12 bg-platinum' : 'w-2 bg-white/20'}`}
                            />
                        ))}
                    </div>
                    <button onClick={nextSlide} className="p-3 text-white/50 hover:text-white transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <Link 
                                key={i} 
                                to={cat.path}
                                className="category-card p-10 rounded-3xl group"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-platinum group-hover:text-obsidian transition-colors duration-500 text-platinum">
                                        {React.cloneElement(cat.icon as React.ReactElement, { size: 28 })}
                                    </div>
                                    <h3 className="text-3xl font-display font-medium text-white mb-4">{cat.name}</h3>
                                    <p className="text-stone-light text-lg mb-6 leading-relaxed">{cat.desc}</p>
                                    <span className="inline-flex items-center gap-3 text-platinum font-bold uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                                        Explorate
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* HIGHLIGHTED PRODUCT */}
            <section className="py-32 px-6 bg-obsidian-light/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="w-full md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square rounded-full border border-white/5 p-8"
                            >
                                <div className="absolute inset-0 animate-slow-morph bg-platinum/5 blur-3xl" />
                                <img 
                                    src="/products/saweet-16-enhanced.png" 
                                    alt="Saweet 16 Duck Call" 
                                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                />
                            </motion.div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Best Seller</span>
                            <h2 className="text-6xl md:text-7xl font-display font-medium text-white mb-8">The <span className="text-platinum italic">Saweet 16</span></h2>
                            <p className="text-xl text-stone-light leading-relaxed mb-10">
                                The most versatile duck call on your lanyard. Engineered with a unique tone channel that provides a raspy low-end for feeding chuckles, while maintaining enough volume to break the wind.
                            </p>
                            <div className="flex items-center gap-10 mb-10 border-y border-white/5 py-8">
                                <div>
                                    <p className="text-stone-light text-xs uppercase tracking-widest mb-1">Material</p>
                                    <p className="text-white font-medium">Clear Acrylic</p>
                                </div>
                                <div>
                                    <p className="text-stone-light text-xs uppercase tracking-widest mb-1">Reed</p>
                                    <p className="text-white font-medium">Double-Reed</p>
                                </div>
                                <div>
                                    <p className="text-stone-light text-xs uppercase tracking-widest mb-1">Sound Profile</p>
                                    <p className="text-white font-medium">Deep / Raspy</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => addItem({
                                    id: 1,
                                    name: "Saweet 16",
                                    price: 129.99,
                                    image: "/products/saweet-16-enhanced.png",
                                    category: "Duck"
                                })}
                                className="px-12 py-5 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all shadow-xl uppercase tracking-widest text-sm"
                            >
                                Add to Lanyard — $129.99
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* MASONRY GALLERY */}
            <section className="py-40 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Built for the <span className="text-platinum">Wild</span></h2>
                        <p className="text-stone-light text-xl max-w-2xl mx-auto">Our calls in their natural environment. Every photo from a hunt where a Cold Front moved in.</p>
                    </div>
                    
                    <MasonryGrid columns={4} gap={6} className="md:columns-1 lg:columns-3 xl:columns-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border border-white/5 group bg-obsidian-light">
                                <img 
                                    src={`/gallery/hunt-0${i}.jpg`} 
                                    alt="Duck hunt action" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />
                            </div>
                        ))}
                    </MasonryGrid>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-40 relative">
                <div className="absolute inset-0 bg-platinum/5 mix-blend-overlay" />
                <div className="relative z-10 text-center px-6">
                    <h2 className="text-7xl md:text-9xl font-display font-bold text-white mb-12">Join the Front</h2>
                    <Link to="/shop" className="inline-flex items-center gap-6 text-2xl md:text-4xl font-display text-platinum hover:text-white transition-colors group">
                        Browse the Full Collection
                        <ArrowRight size={48} className="group-hover:translate-x-4 transition-transform duration-500" />
                    </Link>
                </div>
            </section>
        </div>
    );
};
