import React from "react";
import { motion } from "framer-motion";
import { Wind, Target, Award, Users } from "lucide-react";

const VALUES = [
    {
        icon: Wind,
        title: "Precision Tone",
        description: "Every call is tuned to cut through any weather condition, delivering crystal-clear sound that carries."
    },
    {
        icon: Target,
        title: "Handcrafted Quality",
        description: "Each piece is hand-turned on a lathe, ensuring unique character and premium craftsmanship in every call."
    },
    {
        icon: Award,
        title: "Field Tested",
        description: "Our calls are designed by hunters, for hunters. Every product has been proven in real hunting conditions."
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "We're not just selling calls - we're building a community of passionate waterfowl hunters."
    }
];

export const About = () => {
    return (
        <div className="min-h-screen bg-obsidian">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ice-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-platinum/5 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                            Cut Through
                            <span className="block text-platinum-dark">The Storm</span>
                        </h1>
                        <p className="text-xl text-stone-light max-w-3xl mx-auto leading-relaxed">
                            Cold Front Calls was born from a passion for waterfowl hunting and a commitment to craftsmanship. Every call we make is designed to perform when conditions get tough.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-obsidian-light border border-white/10">
                                <img 
                                    src="/products/call-01.jpg" 
                                    alt="Cold Front Calls Workshop"
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-ice-500 to-ice-600 rounded-2xl flex items-center justify-center">
                                <span className="text-4xl font-display font-bold text-white">10+</span>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display font-bold text-white mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-stone-light text-lg leading-relaxed">
                                <p>
                                    What started in a small garage workshop has grown into a passion project dedicated to creating the finest waterfowl calls on the market.
                                </p>
                                <p>
                                    Every Cold Front call is hand-turned on a lathe, giving each piece its own unique character while maintaining the precision tone that serious hunters demand.
                                </p>
                                <p>
                                    We believe that the right call can make all the difference when you're facing tough conditions. That's why we test every design in the field before it ever reaches your hands.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-20 bg-obsidian-light/50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-display font-bold text-white mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-stone-light text-lg max-w-2xl mx-auto">
                            Every decision we make is guided by these core principles
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {VALUES.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-obsidian rounded-2xl p-8 border border-white/5 hover:border-ice-500/30 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-ice-500/10 flex items-center justify-center mb-6 group-hover:bg-ice-500/20 transition-colors">
                                    <value.icon className="w-6 h-6 text-ice-400" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-stone-light leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">
                        Ready to Upgrade Your Arsenal?
                    </h2>
                    <p className="text-stone-light text-lg mb-8">
                        Browse our collection of premium hand-turned calls
                    </p>
                    <a 
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm"
                    >
                        Shop Now
                    </a>
                </div>
            </section>
        </div>
    );
};
