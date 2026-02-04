import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { MasonryGrid } from "./MasonryGrid";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ArrowRight, ChevronRight, Wind, Camera, Grid } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop", // Original Hunter
  "https://images.unsplash.com/photo-1605218427368-35b0f4967ef9?q=80&w=2670&auto=format&fit=crop", // Foggy Lake
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"  // Moody Water
];

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1558550275-6e06c1df7203?q=80&w=800&auto=format&fit=crop", // Dog in water
    "https://images.unsplash.com/photo-1615255675841-83025219e83b?q=80&w=800&auto=format&fit=crop", // Mallard close up
    "https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=800&auto=format&fit=crop", // Call in hand
    "https://images.unsplash.com/photo-1627443689254-4f934f5aa0d8?q=80&w=800&auto=format&fit=crop", // Hunting boat
    "https://images.unsplash.com/photo-1598948485421-26c7d242944a?q=80&w=800&auto=format&fit=crop", // Decoys
    "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?q=80&w=800&auto=format&fit=crop", // Morning fog
    "https://images.unsplash.com/photo-1620023030368-b7c4d57c2a26?q=80&w=800&auto=format&fit=crop", // Lanyard
    "https://images.unsplash.com/photo-1505231649931-e405a7695393?q=80&w=800&auto=format&fit=crop", // Field hunting
    "https://images.unsplash.com/photo-1597845110517-575003e67f2b?q=80&w=800&auto=format&fit=crop", // Black lab
    "https://images.unsplash.com/photo-1457139621581-298d19263887?q=80&w=800&auto=format&fit=crop", // Sunset silhouette
];

const PRODUCTS = [
  {
    id: 1,
    title: "The Reaper's Toll",
    price: 149.99,
    category: "Duck",
    imageUrl: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&q=80&w=1000", 
    audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
  },
  {
    id: 2,
    title: "Frostbite Series",
    price: 189.99,
    category: "Goose",
    imageUrl: "https://images.unsplash.com/photo-1599596486026-6a7cb74cb06c?auto=format&fit=crop&q=80&w=1000",
    audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
  },
  {
    id: 3,
    title: "Sub-Zero Gauge",
    price: 129.99,
    category: "Sub-Gauge",
    imageUrl: "https://images.unsplash.com/photo-1620023030368-b7c4d57c2a26?auto=format&fit=crop&q=80&w=1000",
    audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
  },
  {
    id: 4,
    title: "Black Obsidian",
    price: 199.99,
    category: "Duck",
    imageUrl: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=1000",
    audioUrl: "https://www.soundjay.com/nature/sounds/duck-quack-1.mp3"
  }
] as const;

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const loadTimer = setTimeout(() => {
        setIsLoading(false);
    }, 2000);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => {
        clearInterval(timer);
        clearTimeout(loadTimer);
    }
  }, []);

  return (
    <div className="bg-obsidian text-mist font-inter min-h-screen selection:bg-ice-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 backdrop-blur-xl bg-obsidian/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center shadow-lg shadow-ice-500/20">
                     <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="font-display text-2xl font-bold text-white tracking-tight">
                    Cold Front
                </span>
            </div>

            <div className="hidden md:flex items-center gap-12 font-medium text-sm tracking-wide text-mist">
                <a href="#lineup" className="hover:text-ice-400 transition-colors">Shop</a>
                <a href="#" className="hover:text-ice-400 transition-colors">About</a>
                <a href="#" className="hover:text-ice-400 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-white hover:text-ice-400 transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10">
                    <ShoppingCart size={20} />
                </button>
            </div>
        </div>
      </nav>

      {/* HERO SECTION - Slideshow Background */}
      <main className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/10 to-obsidian z-20 pointer-events-none" />
             <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply z-20 pointer-events-none" />
             
             <AnimatePresence mode="popLayout">
               <motion.img 
                  key={currentSlide}
                  src={HERO_IMAGES[currentSlide]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  alt="Hunting Background" 
               />
             </AnimatePresence>
        </div>

        {/* Hero Text */}
        <div className="relative z-30 text-center px-4 max-w-5xl mx-auto translate-y-[-5%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             {/* Subtitle */}
             <h2 className="text-ice-400 tracking-[0.4em] uppercase text-sm md:text-lg font-bold font-inter mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                HUNT THE FRONT
             </h2>
             
             {/* Headline */}
             <h1 
               className="text-7xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tight leading-[0.9] text-transparent bg-clip-text animate-radar bg-[length:200%_auto] mb-8 drop-shadow-2xl"
               style={{
                 backgroundImage: "linear-gradient(90deg, #ffffff 0%, #3b82f6 25%, #06b6d4 50%, #3b82f6 75%, #ffffff 100%)",
               }}
             >
               Cold Front Calls
             </h1>

             {/* Description */}
             <p className="text-mist max-w-2xl mx-auto mb-10 text-lg md:text-xl font-normal leading-relaxed drop-shadow-md">
                Precision-engineered acrylics for the dedicated waterfowler. 
                Experience the atmosphere-cutting sound that brings them into the spread.
             </p>

             {/* CTA */}
             <div className="relative inline-flex group cursor-pointer">
                {/* Back Glow Layer */}
                <div className="absolute transition-all duration-500 opacity-60 -inset-1 bg-gradient-to-r from-ice-500 via-ice-300 to-ice-600 rounded-full blur-lg group-hover:opacity-100 group-hover:blur-xl group-hover:duration-200"></div>
                
                {/* Button Itself */}
                <button 
                   className="relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-obsidian-light/90 border border-white/10 rounded-full font-display uppercase tracking-widest hover:bg-black hover:border-ice-500/50 hover:scale-[1.02]"
                >
                   Shop Now
                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-ice-400" />
                </button>
             </div>

          </motion.div>
        </div>
      </main>

      {/* CATEGORY BREAKOUT */}
      <section className="max-w-7xl mx-auto px-6 py-12 -mt-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Duck Category */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1526543465360-15339d33261a?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Duck Calls"
                />
                <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-4xl font-display font-bold text-white uppercase italic tracking-tighter">Duck Calls</h3>
                    <div className="h-1 w-0 bg-ice-500 group-hover:w-full transition-all duration-300 mt-2" />
                </div>
            </motion.div>

            {/* Goose Category */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1599596486026-6a7cb74cb06c?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Goose Calls"
                />
                <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-4xl font-display font-bold text-white uppercase italic tracking-tighter">Goose Calls</h3>
                    <div className="h-1 w-0 bg-ice-500 group-hover:w-full transition-all duration-300 mt-2" />
                </div>
            </motion.div>

            {/* Sub-Gauge Category */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1622345091871-24876b66e138?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Sub-Gauge"
                />
                <div className="absolute bottom-8 left-8 z-20">
                    <h3 className="text-4xl font-display font-bold text-white uppercase italic tracking-tighter">Sub-Gauge</h3>
                    <div className="h-1 w-0 bg-ice-500 group-hover:w-full transition-all duration-300 mt-2" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTED PRODUCT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Side */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
            >
                <div className="relative rounded-3xl overflow-hidden aspect-square border border-white/5 bg-obsidian-light shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&q=80&w=1000"
                        alt="The Reaper's Toll"
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    />
                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6 bg-ice-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        Best Seller
                    </div>
                    {/* Scanner overlay */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 text-left"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Wind size={20} className="text-ice-400" />
                    <span className="text-ice-400 font-bold uppercase tracking-widest text-sm">Signature Series</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6 uppercase leading-tight">
                    The Reaper's<br/>Toll
                </h2>
                
                <p className="text-mist text-lg leading-relaxed mb-8">
                    The Reaper's Toll was designed to be compact in size but massive in sound. 
                    With a full range of volume and tones, this small batch call talks duck like no other. 
                    Easy to use, proudly made in the USA from premium hand-turned acrylic. 
                    A custom call from start to finish. Designed, tuned, and tested for the harvest.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-10 py-4 bg-ice-600 hover:bg-ice-500 text-white font-bold text-lg rounded-full shadow-lg shadow-ice-600/20 transition-all uppercase tracking-wider flex items-center justify-center gap-2 group">
                        Shop Now
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-10 py-4 border border-white/10 hover:bg-white/5 text-white font-bold text-lg rounded-full transition-all uppercase tracking-wider">
                        Listen to Demo
                    </button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* THE LINEUP GRID */}
      <section id="lineup" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">The Lineup</h2>
                <p className="text-mist mt-2 text-lg">Precision instruments for every hunt.</p>
            </div>
            
            {/* Pill Filters */}
            <div className="bg-white/5 p-1.5 rounded-full flex gap-1 backdrop-blur-md border border-white/5">
                {['All', 'Duck', 'Goose', 'Sub'].map((filter) => (
                    <button key={filter} className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${filter === 'All' ? 'bg-ice-600 text-white shadow-lg shadow-ice-900/20' : 'text-mist hover:text-white hover:bg-white/5'}`}>
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
             Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
             ))
          ) : (
            PRODUCTS.map((product) => (
                <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                imageUrl={product.imageUrl}
                audioUrl={product.audioUrl}
                />
            ))
          )}
        </div>
      </section>

      {/* BRAGGING RIGHTS - MASONRY GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
         <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Camera className="text-ice-500" size={24} />
                    <span className="text-ice-500 font-bold uppercase tracking-widest text-sm">Community Gallery</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Bragging Rights</h2>
                <p className="text-mist mt-2 text-lg">Field reports from the Cold Front family.</p>
            </div>
            
            {/* Action Tab/Button */}
            <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full transition-all uppercase tracking-wider text-sm flex items-center gap-2 group backdrop-blur-md">
                <Grid size={16} className="text-ice-400" />
                View Full Gallery
                <ArrowRight size={16} className="text-ice-400 group-hover:translate-x-1 transition-transform ml-1"/>
            </button>
         </div>

         <MasonryGrid className="columns-1 sm:columns-2 lg:columns-3 gap-6" gap={4}>
            {GALLERY_IMAGES.map((img, i) => (
               <div key={i} className="relative group rounded-xl overflow-hidden mb-4 bg-obsidian-light border border-white/5 shadow-xl">
                   <div className="absolute inset-0 z-20 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   
                   <img 
                      src={img} 
                      alt={`Gallery Image ${i + 1}`} 
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   
                   {/* Hover Overlay Icon */}
                   <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-ice-600/20 backdrop-blur-md flex items-center justify-center text-ice-400 border border-ice-500/30">
                              <Camera size={14} />
                          </div>
                          <span className="text-white text-xs font-bold uppercase tracking-wider font-teko">@coldfrontcalls</span>
                      </div>
                   </div>
               </div>
            ))}
         </MasonryGrid>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 bg-obsidian-light py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="font-display text-2xl font-bold text-white">Cold Front Calls</span>
              <div className="text-mist text-sm">© 2024 Cold Front Calls. All rights reserved.</div>
          </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);