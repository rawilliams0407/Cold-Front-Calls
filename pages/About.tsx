import React from "react";
import { motion } from "framer-motion";
import { SEO } from "../components/SEO";

export const About = () => {
    return (
        <div className="pt-32 pb-20">
            <SEO 
                title="Our Story" 
                description="The history and passion behind Cold Front Calls - why we build the most reliable custom waterfowl calls in the industry."
            />
            
            <section className="max-w-7xl mx-auto px-6">
                <div className="relative h-[60vh] rounded-3xl overflow-hidden mb-20 group">
                    <img 
                        src="/about-hero.jpg" 
                        alt="The craft of building custom duck calls" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[20s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-display font-bold text-white mb-6"
                        >
                            Crafted for <br />the <span className="text-platinum">Front Line</span>
                        </motion.h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-medium text-white mb-8">Established in the Marsh</h2>
                        <div className="space-y-6 text-stone-light text-xl leading-relaxed">
                            <p>
                                Cold Front Calls was born out of a simple necessity: a call that doesn't quit when the weather does.
                            </p>
                            <p>
                                What started as a hobby in a small garage has evolved into a premium manufacturer of custom-tuned waterfowl calls. Every call that leaves our shop is hand-turned from high-grade acrylic and tuned specifically for the realistic rasp and volume needed to pull birds in the toughest conditions.
                            </p>
                            <p>
                                We don't believe in mass production. We believe in the sound of a cold front moving in—crisp, powerful, and undeniable.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl bg-obsidian-light border border-white/5 overflow-hidden">
                            <img 
                                src="/craftsmanship.jpg" 
                                alt="Hand turning an acrylic call" 
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 liquid-glass rounded-full flex items-center justify-center text-center p-6 border border-white/10 hidden lg:flex">
                             <p className="text-platinum font-display text-lg leading-tight">100% Proudly Made in Michigan</p>
                        </div>
                    </motion.div>
                </div>

                {/* Values Selection */}
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Performance First",
                            desc: "Our calls are engineered to hold their tone in freezing temperatures and high-humidity environments."
                        },
                        {
                            title: "Human Touch",
                            desc: "Every call is hand-tuned by an obsessed hunter. We don't ship anything we wouldn't use on our own lanyard."
                        },
                        {
                            title: "The Legacy",
                            desc: "We build tools that are meant to be passed down. Built to last generations of hunts."
                        }
                    ].map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-2xl bg-obsidian-light border border-white/5 hover:border-white/20 transition-colors group"
                        >
                            <span className="text-stone-light text-sm font-body uppercase tracking-[0.3em] mb-6 block group-hover:text-platinum transition-colors">0{i + 1}</span>
                            <h3 className="text-2xl font-display font-medium text-white mb-4">{value.title}</h3>
                            <p className="text-stone-light text-lg">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
