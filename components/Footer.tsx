import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-obsidian-light/50 backdrop-blur-md py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <Link to="/" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-platinum-light to-platinum-dark flex items-center justify-center">
                        <span className="text-obsidian font-bold font-display text-lg pt-0.5">C</span>
                    </div>
                    <span className="font-display text-2xl font-bold text-white tracking-wide">
                        Cold Front
                    </span>
                </Link>

                <div className="flex items-center gap-8 text-sm text-stone-light">
                    <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                </div>

                <div className="text-stone-light text-xs tracking-wide">© 2024 Cold Front Calls. All rights reserved.</div>
            </div>
        </footer>
    );
};
