import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

export const SuccessPage: React.FC = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  // Ensure cart is cleared on success page
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-obsidian text-stone-light font-body flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="text-emerald-400" size={48} />
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Order Received!
        </h1>

        <p className="text-stone-light text-lg mb-8 leading-relaxed">
          Thank you for your order. We've received your request and will contact you shortly to confirm payment and shipping details.
        </p>

        {/* Divider */}
        <div className="h-px w-16 bg-white/20 mx-auto mb-8" />

        {/* What's Next */}
        <div className="bg-obsidian-light rounded-2xl border border-white/10 p-6 mb-8 text-left">
          <h2 className="text-lg font-display font-bold text-white mb-4">
            What's Next?
          </h2>
          <ul className="space-y-3 text-stone-light">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-platinum text-obsidian flex items-center justify-center flex-shrink-0 font-bold text-sm">
                1
              </span>
              <span>We'll review your order and confirm availability</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-platinum text-obsidian flex items-center justify-center flex-shrink-0 font-bold text-sm">
                2
              </span>
              <span>We'll reach out via email or phone for payment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-platinum text-obsidian flex items-center justify-center flex-shrink-0 font-bold text-sm">
                3
              </span>
              <span>Your calls will ship within 2-3 business days</span>
            </li>
          </ul>
        </div>

        {/* Back to Shop */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(228,228,231,0.2)] group hover:scale-[1.02]"
        >
          <Home size={18} />
          Back to Shop
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};
