import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore, CartItem } from '@/stores/cartStore';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  suggestedCategory: 'duck' | 'goose';
  upsellProduct: Omit<CartItem, 'quantity'> | null;
}

export const UpsellModal: React.FC<UpsellModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  suggestedCategory,
  upsellProduct,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAccept = () => {
    if (upsellProduct) {
      addItem(upsellProduct);
    }
    onAccept();
  };

  const categoryLabel = suggestedCategory === 'duck' ? 'Duck' : 'Goose';

  return (
    <AnimatePresence>
      {isOpen && upsellProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[90] p-4"
          >
            <div className="bg-obsidian-light rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-stone-light hover:text-white z-10"
              >
                <X size={20} />
              </button>

              {/* Product Image */}
              <div className="relative h-64 bg-obsidian-highlight overflow-hidden">
                <img
                  src={upsellProduct.image}
                  alt={upsellProduct.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-light via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-platinum text-obsidian px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest">
                  Best Seller
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  Complete Your Lanyard
                </h2>
                <p className="text-stone-light text-lg mb-6 leading-relaxed">
                  Most hunters carry both. Add a{' '}
                  <span className="text-platinum font-semibold">
                    {categoryLabel} Call
                  </span>{' '}
                  to be ready for anything.
                </p>

                {/* Product Card */}
                <div className="bg-obsidian rounded-2xl p-5 mb-8 border border-white/5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-obsidian-highlight flex-shrink-0">
                    <img
                      src={upsellProduct.image}
                      alt={upsellProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-display font-medium">
                      {upsellProduct.name}
                    </h3>
                    <p className="text-xs text-stone-light uppercase tracking-wider">
                      {upsellProduct.category}
                    </p>
                  </div>
                  <span className="text-platinum font-bold text-xl">
                    ${upsellProduct.price.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleAccept}
                    className="w-full py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(228,228,231,0.3)] flex items-center justify-center gap-2 group hover:scale-[1.02]"
                  >
                    <ShoppingCart size={18} />
                    Yes, Add to Order
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <button
                    onClick={onDecline}
                    className="w-full py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-full transition-all uppercase tracking-widest text-sm"
                  >
                    No, Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
