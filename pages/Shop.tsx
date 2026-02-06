import React, { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

import productsData from "../src/data/products.json";
import { Product } from "../src/types/product";

const PRODUCTS = productsData as Product[];

type FilterCategory = 'All' | 'Duck' | 'Goose' | 'Sub-Gauge';

export const Shop = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
    const { addItem } = useCartStore();

    useEffect(() => {
        if (categoryParam) {
            const formattedParam = categoryParam === 'Sub' ? 'Sub-Gauge' : categoryParam;
            if (['All', 'Duck', 'Goose', 'Sub-Gauge'].includes(formattedParam)) {
                setActiveFilter(formattedParam as FilterCategory);
            }
        }
    }, [categoryParam]);

    const filteredProducts = activeFilter === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category.includes(activeFilter));

    const handleAddToCart = (product: Product) => {
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
            {/* Hero Banner */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian z-10" />
                    <img
                        src="/hero-slideshow/01.jpg"
                        className="w-full h-full object-cover opacity-30"
                        alt="Shop Background"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className="tracking-[0.3em] uppercase text-sm font-bold text-platinum mb-4">
                            Premium Waterfowl Calls
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6">
                            The Collection
                        </h1>
                        <p className="text-stone-light text-lg max-w-2xl mx-auto font-light">
                            Engineered from my lathe to your lanyard for the waterfowlers that want a call made how you want it, not off the shelf that gives you award-winning sound quality and runnability with no shortcuts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Product Grid Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <p className="text-stone-light">
                        Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
                    </p>

                    <div className="bg-white/5 p-1 rounded-full flex gap-1 backdrop-blur-md border border-white/5">
                        {(['All', 'Duck', 'Goose', 'Sub-Gauge'] as FilterCategory[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-platinum text-obsidian shadow-lg'
                                    : 'text-stone-light hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    layout
                >
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            layout
                        >
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                imageUrl={product.imageUrl}
                                audioUrl={product.audioUrl}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-stone-light text-lg">No products found in this category.</p>
                    </div>
                )}
            </section>

            {/* Bottom CTA */}
            <section className="max-w-7xl mx-auto px-6 py-16 mb-12">
                <div className="liquid-glass rounded-3xl p-12 text-center">
                    <h3 className="text-3xl md:text-4xl font-display text-white mb-4">
                        Can't Find What You're Looking For?
                    </h3>
                    <p className="text-stone-light mb-8 max-w-xl mx-auto">
                        We offer custom builds and limited edition runs. Reach out to discuss your perfect call.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-10 py-4 bg-platinum text-obsidian font-bold text-sm rounded-full shadow-[0_0_20px_rgba(228,228,231,0.2)] transition-all hover:bg-white uppercase tracking-widest hover:-translate-y-1"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </>
    );
};
