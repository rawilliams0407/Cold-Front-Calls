import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const SuccessPage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
            <SEO title="Order Success" description="Your order has been placed successfully. Thank you for choosing Cold Front Calls." />
            
            {/* Animated Glow Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative z-10 max-w-2xl"
            >
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-10">
                    <CheckCircle className="text-emerald-500" size={48} />
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Order <span className="text-platinum">Confirmed</span></h1>
                <p className="text-stone-light text-xl mb-12 max-w-md mx-auto">
                    Thank you for your purchase. We're getting the lathe ready for your custom calls.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
                    <div className="bg-obsidian-light p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 text-platinum mb-4">
                            <Package size={20} />
                            <span className="text-xs uppercase tracking-widest font-bold">Order Number</span>
                        </div>
                        <p className="text-2xl text-white font-display">#CFC-{orderNumber}</p>
                    </div>
                    <div className="bg-obsidian-light p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 text-platinum mb-4">
                            <Calendar size={20} />
                            <span className="text-xs uppercase tracking-widest font-bold">Estimated Delivery</span>
                        </div>
                        <p className="text-2xl text-white font-display">2-3 Weeks</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-stone-light">
                        A confirmation email has been sent to your inbox. <br />
                        We'll notify you as soon as your order ships.
                    </p>
                    
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-3 px-10 py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm shadow-xl group"
                    >
                        Back to Home
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
