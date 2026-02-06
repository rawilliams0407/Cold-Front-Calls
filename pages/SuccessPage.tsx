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
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/20 flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </motion.div>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Order Received!
        </h1>
        <p className="text-stone-light text-lg mb-8 leading-relaxed">
          Thank you for your order! We've received your request and will reach
          out shortly to finalize details and collect payment.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm group"
          >
            <Home size={18} />
            Return Home
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all uppercase tracking-widest text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-white/40 text-sm mt-8">
          Check your email for a confirmation message.
        </p>
      </motion.div>
    </div>
  );
};
