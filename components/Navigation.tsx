import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export const Navigation = () => {
    const location = useLocation();
    
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <nav className="fixed w-full z-50 top-6 pointer-events-none">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between liquid-glass rounded-full pointer-events-auto transition-all duration-300 hover:bg-obsidian/40">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-platinum-light to-platinum-dark flex items-center justify-center shadow-[0_0_15px_rgba(228,228,231,0.3)]">
                        <span className="text-obsidian font-bold font-display text-lg pt-0.5">C</span>
                    </div>
                    <span className="font-display text-xl font-bold text-white tracking-wide">
                        Cold Front
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide text-platinum-dark">
                    <Link 
                        to="/shop" 
                        className={`hover:text-white transition-colors relative group ${isActive('/shop') ? 'text-white' : ''}`}
                    >
                        Shop
                        <span className={`absolute -bottom-1 left-0 h-[1px] bg-platinum transition-all ${isActive('/shop') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                    <Link 
                        to="/about" 
                        className={`hover:text-white transition-colors relative group ${isActive('/about') ? 'text-white' : ''}`}
                    >
                        About
                        <span className={`absolute -bottom-1 left-0 h-[1px] bg-platinum transition-all ${isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                    <Link 
                        to="/contact" 
                        className={`hover:text-white transition-colors relative group ${isActive('/contact') ? 'text-white' : ''}`}
                    >
                        Contact
                        <span className={`absolute -bottom-1 left-0 h-[1px] bg-platinum transition-all ${isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-white hover:text-platinum-light transition-colors relative">
                        <ShoppingCart size={20} />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-ice-400 rounded-full animate-pulse"></div>
                    </button>
                </div>
            </div>
        </nav>
    );
};
