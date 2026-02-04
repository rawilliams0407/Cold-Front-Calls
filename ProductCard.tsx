import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Pause, Volume2 } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  audioUrl?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  category,
  imageUrl,
  audioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: "0px 10px 30px -10px rgba(14, 165, 233, 0.3)" 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative w-full h-[450px] rounded-sm bg-carbon border border-white/10 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 text-sm font-bold tracking-wider text-obsidian bg-ice-500 uppercase rounded-sm font-teko shadow-lg shadow-ice-500/20">
          {category}
        </span>
      </div>

      {/* Image Container - Visual Heavy */}
      <div className="relative h-[70%] w-full bg-obsidian-highlight overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-60"
        />
        
        {/* Subtle Background Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent opacity-80" />

        {/* --- WEATHER FRONT SCANNER FX --- */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
            
            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-[3px] border-l-[3px] border-ice-500 rounded-tl-lg shadow-[0_0_10px_#0ea5e9]" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-[3px] border-r-[3px] border-ice-500 rounded-tr-lg shadow-[0_0_10px_#0ea5e9]" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-[3px] border-l-[3px] border-ice-500 rounded-bl-lg shadow-[0_0_10px_#0ea5e9]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-[3px] border-r-[3px] border-ice-500 rounded-br-lg shadow-[0_0_10px_#0ea5e9]" />

            {/* Scanning Weather Front Line */}
            <div className="absolute left-0 w-full h-[2px] bg-ice-400 shadow-[0_0_20px_2px_#0ea5e9] animate-scan-vertical z-30">
                {/* Trailing Gradient for "Storm Front" look */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ice-500/0 via-ice-500/10 to-ice-500/30 -translate-y-full" />
            </div>

            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-ice-500/50">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-ice-500/50" />
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-ice-500/50" />
            </div>
        </div>

        {/* Audio Overlay Button */}
        {audioUrl && (
          <div className="absolute bottom-4 right-4 z-40 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={toggleAudio}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-obsidian/80 backdrop-blur-md border border-ice-500 text-ice-500 hover:bg-ice-500 hover:text-white transition-all duration-300 shadow-lg"
            >
              {isPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
            </button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col justify-between flex-grow relative bg-carbon border-t border-white/5">
        {/* Animated Top Border Line */}
        <div className="absolute top-0 left-0 w-0 h-[1px] bg-ice-500 group-hover:w-full transition-all duration-500" />
        
        <div>
          <h3 className="text-3xl font-teko text-white tracking-wide uppercase leading-none group-hover:text-ice-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 font-inter text-xs mt-2 uppercase tracking-widest">
            Premium Hand-Turned Acrylic
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-ice-500 shadow-[0_0_8px_#38bdf8] animate-pulse" />
             <span className="text-xs text-mist font-inter uppercase tracking-wider">In Stock</span>
          </div>
          <span className="text-2xl font-bold text-white font-teko tracking-widest">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};