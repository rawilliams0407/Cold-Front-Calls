import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Volume2, Play, VolumeX, ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  audioUrl?: string;
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  imageUrl,
  audioUrl,
  onAddToCart,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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
      className="product-card-hover group relative w-full h-[550px] rounded-2xl bg-obsidian-light border border-ice-500/20 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-obsidian bg-platinum uppercase rounded-full font-body shadow-lg">
          {category}
        </span>
      </div>

      {/* Image Container - Visual Heavy */}
      <div className="relative h-[75%] w-full bg-obsidian-highlight overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-80"
        />

        {/* Subtle Background Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-light via-transparent to-transparent opacity-80" />

        {/* --- WEATHER FRONT SCANNER FX (Refined) --- */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {/* Center Crosshair - Minimal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full scale-110 group-hover:scale-100 transition-transform duration-700" />
        </div>

        {/* Improved Audio Player Overlay */}
        {audioUrl && (
          <div
            className="absolute bottom-6 left-6 right-6 z-40 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="liquid-glass rounded-full p-2 flex items-center gap-3 shadow-xl">
              {/* Play/Pause Button */}
              <button
                onClick={toggleAudio}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-platinum text-obsidian flex items-center justify-center hover:bg-white hover:scale-105 transition-all shadow-lg"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>

              {/* Progress Bar */}
              <div className="flex-grow flex flex-col justify-center gap-1 pr-2">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full">
                  <div
                    className="h-full bg-platinum rounded-full transition-all duration-100 shadow-[0_0_10px_white]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col justify-between flex-grow relative bg-obsidian-light border-t border-white/5">

        <div>
          <h3 className="text-3xl font-display font-medium text-white tracking-tight leading-none group-hover:text-platinum transition-colors">
            {title}
          </h3>
          <p className="text-stone-light font-body text-xs mt-3 uppercase tracking-widest opacity-80">
            Premium Hand-Turned Acrylic
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-xs text-stone-light font-body uppercase tracking-wider">In Stock</span>
          </div>
          <span className="text-xl font-bold text-platinum font-body tracking-wide">
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="mt-4 w-full py-3 bg-platinum/10 hover:bg-platinum text-platinum hover:text-obsidian font-bold text-sm rounded-full transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 border border-platinum/30 hover:border-transparent hover:shadow-[0_0_20px_rgba(228,228,231,0.2)]"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full h-[550px] rounded-2xl bg-obsidian-light border border-ice-500/10 overflow-hidden flex flex-col relative animate-pulse">
      {/* Category Tag Placeholder */}
      <div className="absolute top-4 left-4 z-20">
        <div className="w-16 h-6 bg-white/10 rounded-full" />
      </div>

      {/* Image Container Placeholder */}
      <div className="relative h-[75%] w-full bg-obsidian-highlight/50">
      </div>

      {/* Product Details Placeholder */}
      <div className="p-6 flex flex-col justify-between flex-grow relative bg-obsidian-light border-t border-white/5">

        <div>
          {/* Title Line */}
          <div className="h-8 bg-white/10 rounded w-3/4 mb-3" />
          {/* Subtitle Line */}
          <div className="h-4 bg-white/5 rounded w-1/2" />
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <div className="h-3 w-12 bg-white/5 rounded" />
          </div>
          {/* Price */}
          <div className="h-6 w-16 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
};
