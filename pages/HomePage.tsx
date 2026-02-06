import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight, ChevronRight, Wind, Camera, Plus } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/ProductCard";
import { MasonryGrid } from "@/MasonryGrid";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { CartSidebar } from "@/components/CartSidebar";
import { UpsellModal } from "@/components/UpsellModal";
import { useNavigate, Link } from "react-router-dom";

import heroImages from "@/src/data/hero-images.json";

const HERO_IMAGES = heroImages;

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1558550275-6e06c1df7203?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615255675841-83025219e83b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1627443689254-4f934f5aa0d8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598948485421-26c7d242944a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620023030368-b7c4d57c2a26?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505231649931-e405a7695393?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1597845110517-575003e67f2b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1457139621581-298d19263887?q=80&w=800&auto=format&fit=crop",
];

const PRODUCTS = [
    {
        id: 1,
        title: "Saweet 16",
        price: 129.99,
        category: "Sub-Gauge",
        imageUrl: "/products/saweet-16-enhanced.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 2,
        title: "Perfect Storm",
        price: 189.99,
        category: "Goose",
        imageUrl: "/products/perfect-storm-enhanced.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 3,
        title: "Mile High",
        price: 189.99,
        category: "Goose",
        imageUrl: "/products/mile-high-enhanced.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 4,
        title: "Down Draft",
        price: 149.99,
        category: "Duck",
        imageUrl: "/products/call-04.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 5,
        title: "Alberta Clipper",
        price: 189.99,
        category: "Goose",
        imageUrl: "/products/call-05.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 6,
        title: "Eclipse",
        price: 199.99,
        category: "Goose",
        imageUrl: "/products/eclipse.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    }
] as const;

// Default upsell products (can be replaced with Sanity data)
const UPSELL_PRODUCTS = {
    duck: {
        id: 4,
        name: "Down Draft",
        price: 149.99,
        image: "/products/call-04.png",
        category: "Duck"
    },
    goose: {
        id: 2,
        name: "Perfect Storm",
        price: 189.99,
        image: "/products/call-01.jpg",
        category: "Goose"
    }
};

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUpsellOpen, setIsUpsellOpen] = useState(false);
    const [upsellCategory, setUpsellCategory] = useState<'duck' | 'goose' | null>(null);

    const { addItem, getItemCount, checkUpsellOpportunity } = useCartStore();

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

    const handleCheckout = () => {
        const upsell = checkUpsellOpportunity();
        if (upsell) {
            setUpsellCategory(upsell);
            setIsUpsellOpen(true);
            setIsCartOpen(false);
        } else {
            navigate('/checkout');
        }
    };

    const handleUpsellAccept = () => {
        setIsUpsellOpen(false);
        navigate('/checkout');
    };

    const handleUpsellDecline = () => {
        setIsUpsellOpen(false);
        navigate('/checkout');
    };

    const itemCount = getItemCount();

    return (
        <div className="bg-obsidian text-stone-light font-body min-h-screen selection:bg-platinum-light selection:text-obsidian">
            {/* Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckout}
            />

            {/* Upsell Modal */}
            <UpsellModal
                isOpen={isUpsellOpen}
                onClose={() => setIsUpsellOpen(false)}
                onAccept={handleUpsellAccept}
                onDecline={handleUpsellDecline}
                suggestedCategory={upsellCategory || 'goose'}
                upsellProduct={upsellCategory ? UPSELL_PRODUCTS[upsellCategory] : null}
            />

            {/* Navigation - Liquid Floating Pill */}
            <nav className="fixed w-full z-50 top-6 pointer-events-none">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between liquid-glass rounded-full pointer-events-auto transition-all duration-300 hover:bg-obsidian/40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-platinum-light to-platinum-dark flex items-center justify-center shadow-[0_0_15px_rgba(228,228,231,0.3)]">
                            <span className="text-obsidian font-bold font-display text-lg pt-0.5">C</span>
                        </div>
                        <span className="font-display text-xl font-bold text-white tracking-wide">
                            Cold Front
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide text-platinum-dark">
                        <Link to="/shop" className="hover:text-white transition-colors relative group">
                            Shop
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-platinum transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/about" className="hover:text-white transition-colors relative group">
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-platinum transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/contact" className="hover:text-white transition-colors relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-platinum transition-all group-hover:w-full"></span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-white hover:text-platinum-light transition-colors relative"
                        >
                            <ShoppingCart size={20} />
                            {itemCount > 0 && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-platinum text-obsidian rounded-full flex items-center justify-center text-xs font-bold">
                                    {itemCount}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

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
                            <span className="text-white">Cold </span>
                            <span className="front-animate">Front</span>
                            <span className="text-white"> Calls</span>
                        </h1>

                        {/* Description */}
                        <p className="text-stone-light max-w-xl mx-auto mb-10 text-lg font-light leading-relaxed">
                            Premium acrylic calls turned for the dedicated waterfowler.
                            Cutting through the wind with atmosphere-shattering tone.
                        </p>

                        {/* CTA - Platinum Shimmer */}
                        <div className="relative inline-flex group cursor-pointer">
                            <a href="#lineup">
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
                            </a>
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
                        className="category-card group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-ice-500/20 hover:border-frost-500 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-70" />
                        <img
                            src="/categories/series-01-duck.png"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            alt="Duck Calls"
                        />
                        <div className="absolute bottom-10 left-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="text-platinum text-xs uppercase tracking-[0.2em] mb-2 block font-bold">Series 01</span>
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
                        className="category-card group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-ice-500/20 hover:border-frost-500 transition-all duration-500 md:-mt-12"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-70" />
                        <img
                            src="/categories/series-02-goose.png"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            alt="Goose Calls"
                        />
                        <div className="absolute bottom-10 left-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="text-platinum text-xs uppercase tracking-[0.2em] mb-2 block font-bold">Series 02</span>
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
                        className="category-card group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl border border-ice-500/20 hover:border-frost-500 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-70" />
                        <img
                            src="/categories/sub-gauge.png"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                            alt="Sub-Gauge"
                        />
                        <div className="absolute bottom-10 left-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                            <span className="text-platinum text-xs uppercase tracking-[0.2em] mb-2 block font-bold">Series 03</span>
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
                                src="https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&q=80&w=1000"
                                alt="The Reaper's Toll"
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
                            <span className="text-platinum font-bold uppercase tracking-[0.2em] text-xs">Signature Series</span>
                        </div>

                        <h2 className="text-6xl md:text-7xl font-display text-white mb-8 leading-none">
                            Reaper's<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-platinum-light to-platinum-dark">Toll</span>
                        </h2>

                        <p className="text-stone-light text-lg leading-relaxed mb-10 font-light border-l border-white/10 pl-6">
                            Constructed for those who demand absolute precision.
                            The Reaper's Toll delivers a full spectrum of tone, from the highest hail call to the lowest feeding chuckle.
                            Hand-polished acrylic meets competition-grade tuning.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="px-12 py-4 bg-platinum text-obsidian font-bold text-sm rounded-full shadow-[0_0_20px_rgba(228,228,231,0.2)] transition-all hover:bg-white uppercase tracking-widest flex items-center justify-center gap-3 group hover:-translate-y-1">
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
                        {['All', 'Duck', 'Goose', 'Sub'].map((filter) => (
                            <button key={filter} className={`px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${filter === 'All' ? 'bg-platinum text-obsidian shadow-lg' : 'text-stone-light hover:text-white hover:bg-white/5'}`}>
                                {filter}
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
                        PRODUCTS.map((product) => (
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

            {/* Footer - Clean & Minimal */}
            <footer className="border-t border-white/5 bg-obsidian-light/50 backdrop-blur-md py-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-platinum-light to-platinum-dark flex items-center justify-center">
                            <span className="text-obsidian font-bold font-display text-lg pt-0.5">C</span>
                        </div>
                        <span className="font-display text-2xl font-bold text-white tracking-wide">
                            Cold Front
                        </span>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-stone-light">
                        <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
                        <Link to="/about" className="hover:text-white transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>

                    <div className="text-stone-light text-xs tracking-wide">© 2024 Cold Front Calls. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};
