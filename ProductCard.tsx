import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Volume2, Play, VolumeX } from "lucide-react";

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
      className="group relative w-full h-[450px] rounded-sm bg-carbon border border-white/10 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
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

        {/* Improved Audio Player Overlay */}
        {audioUrl && (
          <div 
            className="absolute bottom-0 left-0 w-full p-4 z-40 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-obsidian/90 backdrop-blur-md border border-white/10 rounded-md p-3 flex items-center gap-3 shadow-xl ring-1 ring-white/5">
                {/* Play/Pause Button */}
                <button
                  onClick={toggleAudio}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-ice-500 text-obsidian flex items-center justify-center hover:bg-ice-400 hover:scale-105 transition-all shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                </button>

                {/* Progress Bar */}
                <div className="flex-grow flex flex-col justify-center gap-1">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full">
                        <div 
                            className="h-full bg-ice-500 rounded-full transition-all duration-100" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Volume Controls */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={toggleMute} 
                        className="text-mist hover:text-white transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05" 
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-ice-500 hover:accent-ice-400"
                        aria-label="Volume"
                    />
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

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full h-[450px] rounded-sm bg-carbon border border-white/10 overflow-hidden flex flex-col relative animate-pulse">
      {/* Category Tag Placeholder */}
      <div className="absolute top-4 left-4 z-20">
        <div className="w-16 h-6 bg-white/10 rounded-sm" />
      </div>

      {/* Image Container Placeholder */}
      <div className="relative h-[70%] w-full bg-obsidian-light/50">
        {/* No content needed, just the background color */}
      </div>

      {/* Product Details Placeholder */}
      <div className="p-6 flex flex-col justify-between flex-grow relative bg-carbon border-t border-white/5">
        
        <div>
          {/* Title Line */}
          <div className="h-8 bg-white/10 rounded w-3/4 mb-3" />
          {/* Subtitle Line */}
          <div className="h-4 bg-white/5 rounded w-1/2" />
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          {/* Stock Status */}
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
             <div className="h-3 w-12 bg-white/5 rounded" />
          </div>
          {/* Price */}
          <div className="h-8 w-20 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
};
