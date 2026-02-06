import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../ProductCard";
import { useCartStore } from "../stores/cartStore";
import { SEO } from "../components/SEO";
import productsData from "../src/data/products.json";
import { StructuredData } from "../components/StructuredData";

export const Shop = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category');
    
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || "All");
    const [searchQuery, setSearchQuery] = useState("");
    const addItem = useCartStore((state) => state.addItem);

    const categories = ["All", "Duck", "Goose", "Sub-Gauge", "Accessories"];

    const filteredProducts = useMemo(() => {
        return productsData.filter(product => {
            const matchesCategory = selectedCategory === "All" || 
                product.category.toLowerCase().includes(selectedCategory.toLowerCase());
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Structured Data for Products
    const productListData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": productsData.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.title,
                "image": `https://coldfrontcalls.com${product.imageUrl}`,
                "description": `Premium ${product.category} call.`,
                "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            }
        }))
    };

    return (
        <div className="pt-32 pb-40 min-h-screen">
            <SEO 
                title="Shop Custom Calls" 
                description="Browse our collection of premium, hand-turned duck and goose calls. Every call is tuned for maximum performance."
            />
            <StructuredData data={productListData} />
            
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">The <span className="text-platinum font-display">Locker</span></h1>
                        <p className="text-stone-light text-xl">Hand-picked, hand-turned, hand-tuned.</p>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="sticky top-28 z-40 mb-20">
                    <div className="liquid-glass rounded-full p-2 flex flex-col md:flex-row items-center gap-4 shadow-2xl">
                        {/* Category Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-2 w-full md:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                        selectedCategory === cat 
                                        ? "bg-platinum text-obsidian shadow-lg" 
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="flex-1 w-full md:w-auto relative group pr-4 pl-4 md:pl-0">
                            <Search className="absolute left-8 md:left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-platinum transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search our calls..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 rounded-full py-4 pl-14 pr-6 text-white text-sm outline-none border border-white/5 focus:border-white/20 transition-all font-body uppercase tracking-wider"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-10 flex items-center justify-between px-2">
                    <p className="text-stone-light uppercase tracking-widest text-xs font-bold">
                        Showing <span className="text-platinum">{filteredProducts.length}</span> Results
                    </p>
                    <div className="flex items-center gap-2 text-platinum font-bold uppercase tracking-widest text-xs">
                        <SlidersHorizontal size={14} />
                        Filter & Sort
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProductCard 
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                    imageUrl={product.imageUrl}
                                    audioUrl={product.audioUrl}
                                    onAddToCart={() => addItem({
                                        id: product.id,
                                        name: product.title,
                                        price: product.price,
                                        image: product.imageUrl,
                                        category: product.category
                                    })}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center"
                    >
                        <ShoppingBag size={64} className="mx-auto text-white/10 mb-8" />
                        <h3 className="text-3xl font-display text-white mb-4">No calls found</h3>
                        <p className="text-stone-light text-xl">Try broadening your search or choosing another category.</p>
                        <button 
                            onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                            className="mt-8 px-10 py-4 border border-white/10 rounded-full text-white hover:bg-white/5"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
