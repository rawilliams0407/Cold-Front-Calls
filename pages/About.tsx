import React from "react";
import { motion } from "framer-motion";
import { Wind, Target, Award, Users } from "lucide-react";
import { SEO } from "../components/SEO";

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
        title: "Competition Tested",
        description: "Our calls have earned recognition in competitions across the country, proving their real-world performance."
    },
    {
        icon: Users,
        title: "Hunter Community",
        description: "Built by hunters, for hunters. We understand the demands of the field and build accordingly."
    }
];

export const About = () => {
    return (
        <>
            <SEO
                title="Our Story"
                description="Learn about the passion and craftsmanship behind Cold Front Calls. Hand-tuned on a lathe, built by hunters for hunters."
                keywords="cold front calls story, custom duck call maker, waterfowl hunting passion, handcrafted turkey calls"
            />
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1505231649931-e405a7695393?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-40"
                        alt="About Background"
                    />
                </div>

                <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="tracking-[0.3em] uppercase text-sm font-bold text-platinum mb-4">
                            Our Story
                        </h2>
                        <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
                            Hunt the <span className="front-animate">Front</span>
                        </h1>
                        <p className="text-stone-light text-xl font-light leading-relaxed">
                            Born from a passion for waterfowl hunting and a dedication to craft,
                            Cold Front Calls creates premium acrylic calls that cut through any conditions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-platinum font-bold uppercase tracking-[0.2em] text-xs mb-4 block">The Beginning</span>
                        <h2 className="text-4xl md:text-5xl font-display text-white mb-8">
                            Started in the Blind
                        </h2>
                        <div className="space-y-6 text-stone-light text-lg font-light leading-relaxed">
                            <p>
                                Cold Front Calls was founded with a simple mission: create waterfowl calls that
                                perform when it matters most. After years of hunting in every condition imaginable,
                                we knew what was missing from the market.
                            </p>
                            <p>
                                Each call starts as a solid block of premium acrylic, carefully selected for
                                its acoustic properties. From there, it's hand-turned on a precision lathe,
                                shaped with intention and expertise developed over thousands of hours.
                            </p>
                            <p>
                                The result? A call that delivers tone so cutting it'll bring birds in through
                                the worst fronts. That's why we say: <strong className="text-white">Hunt the Front</strong>.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=800&auto=format&fit=crop"
                                className="w-full h-[500px] object-cover"
                                alt="Craftsmanship"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-platinum/30 rounded-2xl -z-10" />
                        <div className="absolute -top-6 -right-6 w-24 h-24 border border-ice-500/30 rounded-2xl -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
                <div className="text-center mb-16">
                    <span className="text-platinum font-bold uppercase tracking-[0.2em] text-xs mb-4 block">What We Stand For</span>
                    <h2 className="text-4xl md:text-5xl font-display text-white">Our Values</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {VALUES.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="liquid-glass rounded-2xl p-8 text-center group hover:bg-white/10 transition-all duration-500"
                        >
                            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-br from-platinum/20 to-platinum/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <value.icon size={24} className="text-platinum" />
                            </div>
                            <h3 className="text-xl font-display text-white mb-3">{value.title}</h3>
                            <p className="text-stone-light text-sm font-light leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-6 py-16 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    <div className="absolute inset-0 z-0 bg-obsidian-light">
                        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/40 z-10" />
                        <img
                            src="/hero-slideshow/04.jpg"
                            className="w-full h-full object-cover opacity-60"
                            alt="Hunting Field"
                        />
                    </div>

                    <div className="relative z-20 p-12 md:p-16 max-w-xl">
                        <h3 className="text-3xl md:text-4xl font-display text-white mb-4">
                            Ready to Experience the Difference?
                        </h3>
                        <p className="text-stone-light mb-8 font-light">
                            Browse our collection and find the perfect call for your next hunt.
                        </p>
                        <a
                            href="/shop"
                            className="inline-flex items-center px-10 py-4 bg-platinum text-obsidian font-bold text-sm rounded-full shadow-[0_0_20px_rgba(228,228,231,0.2)] transition-all hover:bg-white uppercase tracking-widest hover:-translate-y-1"
                        >
                            Shop Now
                        </a>
                    </div>
                </motion.div>
            </section>
        </>
    );
};
