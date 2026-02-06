import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, ChevronDown, Facebook, Phone } from "lucide-react";

const FAQS = [
    {
        question: "How long does shipping take?",
        answer: "Most orders ship within 2-3 business days. Standard shipping typically takes 5-7 business days, while expedited options are available at checkout."
    },
    {
        question: "Do you offer custom calls?",
        answer: "Yes! We love creating custom pieces. Reach out through the form with your ideas and we'll work with you to create something unique."
    },
    {
        question: "What's your return policy?",
        answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your call, contact us for a return or exchange."
    },
    {
        question: "How do I care for my call?",
        answer: "Store your call in a dry place, clean with a soft cloth, and avoid extreme temperatures. Acrylic is durable but should be handled with care."
    }
];

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1457139621581-298d19263887?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30"
                        alt="Contact Background"
                    />
                </div>

                <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="tracking-[0.3em] uppercase text-sm font-bold text-platinum mb-4">
                            Get In Touch
                        </h2>
                        <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
                            Contact Us
                        </h1>
                        <p className="text-stone-light text-lg max-w-xl mx-auto font-light">
                            Questions about our calls? Need help with an order?
                            Or just want to share your latest hunt? We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-display text-white mb-8">Send a Message</h3>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="liquid-glass rounded-2xl p-12 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Send size={28} className="text-green-400" />
                                </div>
                                <h4 className="text-2xl font-display text-white mb-3">Message Sent!</h4>
                                <p className="text-stone-light">
                                    Thanks for reaching out. We'll get back to you within 24-48 hours.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 text-platinum hover:text-white transition-colors underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-platinum mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-light/50 focus:outline-none focus:border-platinum/50 transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-platinum mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-light/50 focus:outline-none focus:border-platinum/50 transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-platinum mb-2">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-platinum/50 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-obsidian">Select a subject...</option>
                                        <option value="order" className="bg-obsidian">Order Question</option>
                                        <option value="product" className="bg-obsidian">Product Question</option>
                                        <option value="custom" className="bg-obsidian">Custom Order</option>
                                        <option value="other" className="bg-obsidian">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-platinum mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-light/50 focus:outline-none focus:border-platinum/50 transition-colors resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-10 py-4 bg-platinum text-obsidian font-bold text-sm rounded-full shadow-[0_0_20px_rgba(228,228,231,0.2)] transition-all hover:bg-white uppercase tracking-widest hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="liquid-glass rounded-2xl p-8 mb-8">
                            <h4 className="text-xl font-display text-white mb-6">Quick Contact</h4>
                            <div className="space-y-4">
                                <a href="mailto:thecoldfrontcalls@gmail.com" className="flex items-center gap-4 text-stone-light hover:text-white transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <Mail size={20} className="text-platinum" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-platinum">Email</p>
                                        <p className="font-medium">thecoldfrontcalls@gmail.com</p>
                                    </div>
                                </a>
                                <a href="tel:2698303165" className="flex items-center gap-4 text-stone-light hover:text-white transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <Phone size={20} className="text-platinum" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-platinum">Phone</p>
                                        <p className="font-medium">(269) 830-3165</p>
                                    </div>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100063501552972" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-stone-light hover:text-white transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <Facebook size={20} className="text-platinum" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-platinum">Facebook</p>
                                        <p className="font-medium">Cold Front Calls</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-display text-white mb-6">Frequently Asked Questions</h4>
                            <div className="space-y-3">
                                {FAQS.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="border border-white/10 rounded-xl overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                        >
                                            <span className="text-white font-medium">{faq.question}</span>
                                            <ChevronDown
                                                size={20}
                                                className={`text-platinum transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: expandedFaq === index ? 'auto' : 0,
                                                opacity: expandedFaq === index ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-4 text-stone-light text-sm leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};
