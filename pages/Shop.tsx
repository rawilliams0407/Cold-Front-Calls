import React, { useState } from "react";
import { ProductCard } from "../ProductCard";
import { motion } from "framer-motion";

const PRODUCTS = [
    {
        id: 1,
        title: "Saweet 16",
        price: 129.99,
        category: "Sub-Gauge",
        imageUrl: "/products/call-02.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 2,
        title: "Perfect Storm",
        price: 189.99,
        category: "Goose",
        imageUrl: "/products/call-01.jpg",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-2.mp3"
    },
    {
        id: 3,
        title: "Front Roller",
        price: 159.99,
        category: "Duck",
        imageUrl: "/products/call-03.webp",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-3.mp3"
    },
    {
        id: 4,
        title: "Cold Snap",
        price: 149.99,
        category: "Duck",
        imageUrl: "/products/call-04.jpg",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
    },
    {
        id: 5,
        title: "Blizzard Boss",
        price: 199.99,
        category: "Goose",
        imageUrl: "/products/call-01.jpg"
    },
    {
        id: 6,
        title: "Ice Breaker",
        price: 179.99,
        category: "Duck",
        imageUrl: "/products/call-02.png",
        audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-2.mp3"
    },
];

const CATEGORIES = ["All", "Duck", "Goose", "Sub-Gauge"];

export const Shop = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-obsidian">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold text-white text-center"
                    >
                        Shop All Calls
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-stone-light text-lg text-center mt-4 max-w-2xl mx-auto"
                    >
                        Premium hand-turned calls designed to cut through any weather condition
                    </motion.p>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-24 z-40 py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="liquid-glass rounded-full p-2 flex justify-center gap-2 max-w-lg mx-auto">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeCategory === category
                                        ? "bg-platinum text-obsidian"
                                        : "text-stone-light hover:text-white hover:bg-white/10"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    imageUrl={product.imageUrl}
                                    audioUrl={product.audioUrl}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-stone-light text-xl">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Need Help Choosing?
                    </h2>
                    <p className="text-stone-light text-lg mb-8">
                        Not sure which call is right for your hunting style? We're here to help.
                    </p>
                    <a 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
};
