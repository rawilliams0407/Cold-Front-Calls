import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { useCartStore } from "../stores/cartStore";

export const Navigation = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getItemCount, setCartOpen } = useCartStore();

    const isActive = (path: string) => location.pathname === path;
    const itemCount = getItemCount();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="fixed w-full z-50 top-6 pointer-events-none">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between liquid-glass rounded-full pointer-events-auto transition-all duration-300 hover:bg-obsidian/40 mx-4 md:mx-auto">
                <Link to="/" className="flex items-center gap-3">
                    <BrandLogo size="sm" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10 font-medium text-lg tracking-wide text-platinum">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`hover:text-white transition-colors relative group ${isActive(link.path) ? 'text-white' : ''}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-[1px] bg-platinum transition-all ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCartOpen(true)}
                        className="text-white hover:text-platinum-light transition-colors relative"
                    >
                        <ShoppingCart size={22} />
                        {itemCount > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-platinum text-obsidian rounded-full flex items-center justify-center text-xs font-bold">
                                {itemCount}
                            </div>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white hover:text-platinum-light transition-colors p-1"
                    >
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div className="fixed inset-0 z-40 md:hidden pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-24 left-4 right-4 liquid-glass rounded-3xl p-8 flex flex-col gap-6"
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`text-2xl font-semibold tracking-wide py-2 block border-b border-white/10 ${isActive(link.path) ? 'text-white' : 'text-platinum'}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};
