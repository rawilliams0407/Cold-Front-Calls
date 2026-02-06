import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, ChevronDown } from "lucide-react";

const FAQS = [
    {
        question: "How long does shipping take?",
        answer: "Most orders ship within 2-3 business days. Standard shipping typically takes 5-7 business days, while expedited options are available at checkout."
    },
    {
        question: "Do you offer custom calls?",
        answer: "Yes! We love creating custom pieces. Contact us with your vision and we'll work together to create something unique."
    },
    {
        question: "What's your return policy?",
        answer: "We stand behind our products. If you're not completely satisfied within 30 days, we'll make it right with a full refund or exchange."
    },
    {
        question: "How do I care for my call?",
        answer: "Keep your call dry and store it in a cool place. Wipe down with a soft cloth after use. Avoid extreme temperatures which can affect the reed."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within the United States. International shipping is coming soon - sign up for our newsletter to be notified!"
    }
];

export const Contact = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formState);
    };

    return (
        <div className="min-h-screen bg-obsidian">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold text-white text-center"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-stone-light text-lg text-center mt-4 max-w-2xl mx-auto"
                    >
                        Have a question or want to discuss a custom order? We'd love to hear from you.
                    </motion.p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-obsidian-light rounded-3xl p-8 border border-white/5">
                                <h2 className="text-2xl font-display font-bold text-white mb-6">
                                    Send a Message
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-stone-light text-sm mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={formState.name}
                                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                                className="w-full px-4 py-3 bg-obsidian rounded-xl border border-white/10 text-white placeholder-stone-light focus:border-ice-500 focus:outline-none transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-stone-light text-sm mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={formState.email}
                                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                                className="w-full px-4 py-3 bg-obsidian rounded-xl border border-white/10 text-white placeholder-stone-light focus:border-ice-500 focus:outline-none transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-stone-light text-sm mb-2">Subject</label>
                                        <select
                                            value={formState.subject}
                                            onChange={(e) => setFormState({...formState, subject: e.target.value})}
                                            className="w-full px-4 py-3 bg-obsidian rounded-xl border border-white/10 text-white focus:border-ice-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="order">Order Question</option>
                                            <option value="custom">Custom Order</option>
                                            <option value="wholesale">Wholesale Inquiry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-stone-light text-sm mb-2">Message</label>
                                        <textarea
                                            value={formState.message}
                                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                                            rows={5}
                                            className="w-full px-4 py-3 bg-obsidian rounded-xl border border-white/10 text-white placeholder-stone-light focus:border-ice-500 focus:outline-none transition-colors resize-none"
                                            placeholder="Tell us what's on your mind..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 group"
                                    >
                                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Quick Contact */}
                            <div className="bg-obsidian-light rounded-3xl p-8 border border-white/5">
                                <h2 className="text-2xl font-display font-bold text-white mb-6">
                                    Quick Contact
                                </h2>
                                <div className="space-y-4">
                                    <a href="mailto:hello@coldfrontcalls.com" className="flex items-center gap-4 p-4 bg-obsidian rounded-xl border border-white/5 hover:border-ice-500/30 transition-colors group">
                                        <div className="w-12 h-12 rounded-xl bg-ice-500/10 flex items-center justify-center group-hover:bg-ice-500/20 transition-colors">
                                            <Mail className="w-5 h-5 text-ice-400" />
                                        </div>
                                        <div>
                                            <div className="text-stone-light text-sm">Email</div>
                                            <div className="text-white font-medium">hello@coldfrontcalls.com</div>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 p-4 bg-obsidian rounded-xl border border-white/5 hover:border-ice-500/30 transition-colors group">
                                        <div className="w-12 h-12 rounded-xl bg-ice-500/10 flex items-center justify-center group-hover:bg-ice-500/20 transition-colors">
                                            <MessageCircle className="w-5 h-5 text-ice-400" />
                                        </div>
                                        <div>
                                            <div className="text-stone-light text-sm">Social</div>
                                            <div className="text-white font-medium">@coldfrontcalls</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="bg-gradient-to-br from-ice-500/10 to-transparent rounded-3xl p-8 border border-ice-500/20">
                                <h3 className="text-xl font-display font-bold text-white mb-3">
                                    Fast Response
                                </h3>
                                <p className="text-stone-light">
                                    We typically respond within 24 hours during business days. For urgent matters, reach out via social media.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-display font-bold text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-stone-light">
                            Quick answers to common questions
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full text-left bg-obsidian-light rounded-xl p-5 border border-white/5 hover:border-ice-500/30 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-medium">{faq.question}</span>
                                        <ChevronDown 
                                            className={`w-5 h-5 text-stone-light transition-transform ${
                                                openFaq === index ? 'rotate-180' : ''
                                            }`} 
                                        />
                                    </div>
                                    {openFaq === index && (
                                        <p className="text-stone-light mt-4 pt-4 border-t border-white/5">
                                            {faq.answer}
                                        </p>
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
