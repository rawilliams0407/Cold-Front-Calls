import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wind, Camera } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/ProductCard";
import { MasonryGrid } from "@/MasonryGrid";
import { useCartStore } from "@/stores/cartStore";
import { useNavigate, Link } from "react-router-dom";

import heroImages from "@/src/data/hero-images.json";
import productsData from "@/src/data/products.json";
import { Product } from "@/src/types/product";
import { SEO } from "@/components/SEO";

const HERO_IMAGES = heroImages;
const PRODUCTS = productsData as Product[];

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1558550275-6e06c1df7203?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615255675841-83025219e83b?q=80&w=800&auto=format&fit=crop",
    "/hero-slideshow/03.jpg",
    "https://images.unsplash.com/photo-1627443689254-4f934f5aa0d8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598948485421-26c7d242944a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620023030368-b7c4d57c2a26?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505231649931-e405a7695393?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1597845110517-575003e67f2b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1457139621581-298d19263887?q=80&w=800&auto=format&fit=crop",
];




export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [lineupFilter, setLineupFilter] = useState('All');

    const { addItem } = useCartStore();

    useEffect(() => {
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 8000);

        return () => {
            clearInterval(timer);
            clearTimeout(loadTimer);
        }
    }, []);

    const handleAddToCart = (product: typeof PRODUCTS[number]) => {
        addItem({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.imageUrl,
            category: product.category,
        });
    };

    return (
        <>
            <SEO
                title="Premium Custom Waterfowl Calls"
                description="Cold Front Calls - Handcrafted, premium custom duck and goose calls. Engineered for performance and built for the hunt. Join the Cold Front family today."
                keywords="duck calls, goose calls, custom waterfowl calls, hunting gear, handcrafted calls"
            />

            {/* HERO SECTION - Ken Burns & Editorial Layout */}
            <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Background Slideshow with Ken Burns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/20 to-obsidian z-20 pointer-events-none" />

                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={currentSlide}
                            src={HERO_IMAGES[currentSlide]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full object-cover z-10 animate-ken-burns will-change-transform"
                            alt="Hunting Background"
                        />
                    </AnimatePresence>
                </div>

                {/* Hero Text */}
                <div className="relative z-30 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="liquid-glass px-12 py-16 rounded-2xl border-white/5 backdrop-blur-2xl"
                    >
                        {/* Tagline */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-platinum/50"></div>
                            <h2 className="tracking-[0.2em] uppercase text-sm font-bold font-body text-ice-500">
                                Hunt the Front
                            </h2>
                            <div className="h-[1px] w-12 bg-platinum/50"></div>
                        </div>

                        {/* Headline */}
                        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight tracking-tight">
                            <span className="radar-text">Cold Front Calls</span>
                        </h1>

                        {/* Description */}
                        <p className="text-platinum-light max-w-2xl mx-auto mb-10 text-xl font-light leading-relaxed">
                            Engineered from my lathe to your lanyard for the waterfowlers that want a call made how you want it, not off the shelf that gives you award-winning sound quality and runnability with no shortcuts.
                        </p>

                        {/* CTA - Platinum Shimmer */}
                        <div className="relative inline-flex group cursor-pointer">
                            <Link to="/shop">
                                <button
                                    className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 text-base font-bold text-obsidian bg-platinum transition-all duration-500 rounded-full font-body uppercase tracking-widest hover:scale-[1.03] hover:bg-white shadow-[0_0_20px_rgba(228,228,231,0.3)]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Shop Collection
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent z-0" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* CATEGORY BREAKOUT - Bento / Cards */}
            <section className="max-w-7xl mx-auto px-6 py-24 -mt-32 relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Duck Category */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        onClick={() => navigate('/shop?category=Duck')}
                        className="category-card group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-ice-500/20 hover:border-frost-500 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-70" />
                        <img
                            src="/categories/series-01-duck.png"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            alt="Duck Calls"
                        />
                        <div className="absolute bottom-10 left-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="text-5xl font-display text-white">Duck</h3>
                            <div className="h-[1px] w-12 bg-white/30 mt-4 group-hover:w-full transition-all duration-700" />
                        </div>
                    </motion.div>

                    {/* Goose Category */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        onClick={() => navigate('/shop?category=Goose')}
                        className="category-card group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-ice-500/20 hover:border-frost-500 transition-all duration-500 md:-mt-12"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-70" />
                        <img
                            src="/categories/series-02-goose.png"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            alt="Goose Calls"
                        />
                        <div className="absolute bottom-10 left-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="text-5xl font-display text-white">Goose</h3>
                            <div className="h-[1px] w-12 bg-white/30 mt-4 group-hover:w-full transition-all duration-700" />
                        </div>
                    </motion.div>

                    {/* Sub-Gauge Category */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => navigate('/shop?category=Sub-Gauge')}
                        className="category-card group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-ice-500/20 hover:border-frost-500 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-70" />
                        <img
                            src="/categories/sub-gauge.png"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            alt="Sub-Gauge"
                        />
                        <div className="absolute bottom-10 left-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="text-5xl font-display text-white">Sub-Gauge</h3>
                            <div className="h-[1px] w-12 bg-white/30 mt-4 group-hover:w-full transition-all duration-700" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* HIGHLIGHTED PRODUCT - Editorial Style */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] box-border border border-white/5 shadow-2xl group">
                            <img
                                src="/products/saweet-16-enhanced.png"
                                alt="Saweet 16"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-all duration-700"
                            />
                            {/* Floating Badge */}
                            <div className="absolute top-8 left-8 bg-platinum text-obsidian px-5 py-2 rounded-full font-bold shadow-lg uppercase text-xs tracking-widest backdrop-blur-md">
                                Best Seller
                            </div>

                            {/* Inner Border/Frame Effect */}
                            <div className="absolute inset-4 border border-white/20 rounded-3xl pointer-events-none opacity-50" />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-1/2 text-left"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Wind size={18} className="text-platinum" />
                            <span className="text-platinum font-bold uppercase tracking-[0.2em] text-xs">Sub-Gauge</span>
                        </div>

                        <h2 className="text-6xl md:text-7xl font-display text-white mb-8 leading-none">
                            <span className="radar-text">Saweet 16</span>
                        </h2>

                        <p className="text-stone-light text-lg leading-relaxed mb-10 font-light border-l border-white/10 pl-6">
                            Smaller, lighter, and faster, just like your sub-gauge shotgun.
                            When you need to get on the birds in a hurry with speed and quickness but still have all the power you could ever need.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={() => navigate('/shop?category=Sub-Gauge')}
                                className="px-12 py-4 bg-platinum text-obsidian font-bold text-sm rounded-full shadow-[0_0_20px_rgba(228,228,231,0.2)] transition-all hover:bg-white uppercase tracking-widest flex items-center justify-center gap-3 group hover:-translate-y-1"
                            >
                                Shop Now
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-12 py-4 border border-white/20 hover:bg-white/5 text-white font-bold text-sm rounded-full transition-all uppercase tracking-widest flex items-center justify-center gap-2 hover:-translate-y-1">
                                <span className="w-2 h-2 rounded-full bg-ice-400 animate-pulse" />
                                Listen Demo
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* THE LINEUP GRID */}
            <section id="lineup" className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-display text-white mb-4">The Lineup</h2>
                        <p className="text-stone-light text-lg font-light">Precision instruments for every scenario.</p>
                    </div>

                    {/* Pill Filters - Clean & Minimal */}
                    <div className="bg-white/5 p-1 rounded-full flex gap-1 backdrop-blur-md border border-white/5">
                        {['All', 'Duck', 'Goose', 'Sub-Gauge'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setLineupFilter(filter)}
                                className={`px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${lineupFilter === filter
                                    ? 'bg-platinum text-obsidian shadow-lg'
                                    : 'text-stone-light hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter === 'Sub-Gauge' ? 'Sub' : filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : (
                        PRODUCTS
                            .filter(product => lineupFilter === 'All' || product.category.includes(lineupFilter))
                            .map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    imageUrl={product.imageUrl}
                                    audioUrl={product.audioUrl}
                                    onAddToCart={() => handleAddToCart(product)}
                                />
                            ))
                    )}
                </div>
            </section>

            {/* BRAGGING RIGHTS - MASONRY GRID */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 mb-24">
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="text-platinum font-bold uppercase tracking-[0.2em] text-xs mb-4">Community</span>
                    <h2 className="text-5xl md:text-6xl font-display text-white mb-6">Field Reports</h2>
                    <p className="text-stone-light max-w-2xl font-light">
                        Join the #ColdFrontFamily and share your harvest.
                    </p>
                </div>

                <MasonryGrid className="columns-1 sm:columns-2 lg:columns-3 gap-8" gap={8}>
                    {GALLERY_IMAGES.map((img, i) => (
                        <div key={i} className="relative group rounded-2xl overflow-hidden mb-8 border border-white/5 shadow-2xl">
                            <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <img
                                src={img}
                                alt={`Gallery Image ${i + 1}`}
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Instagram Icon Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                                    <Camera size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </MasonryGrid>
            </section>

        </>
    );
};
