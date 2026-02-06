import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { CartSidebar } from "./CartSidebar";
import { UpsellModal } from "./UpsellModal";
import { useCartStore } from "../stores/cartStore";
import { StructuredData } from "./StructuredData";

// Default upsell products (can be replaced with Sanity data)
const UPSELL_PRODUCTS = {
    duck: {
        id: 4,
        name: "Down Draft",
        price: 149.99,
        image: "/products/down-draft-enhanced.png",
        category: "Duck"
    },
    goose: {
        id: 2,
        name: "Perfect Storm",
        price: 189.99,
        image: "/products/perfect-storm-enhanced.png",
        category: "Goose"
    }
};

export const Layout = () => {
    const navigate = useNavigate();
    const {
        isCartOpen,
        setCartOpen,
        isUpsellOpen,
        setUpsellOpen,
        upsellCategory,
        handleCheckout
    } = useCartStore();

    const handleUpsellAccept = () => {
        setUpsellOpen(false);
        navigate('/checkout');
    };

    const handleUpsellDecline = () => {
        setUpsellOpen(false);
        navigate('/checkout');
    };

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Cold Front Calls",
        "url": "https://coldfrontcalls.com",
        "logo": "https://coldfrontcalls.com/logo-full.png",
        "description": "Handcrafted, premium custom duck and goose calls engineered for performance and built for the hunt.",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-269-830-3165",
            "contactType": "customer service",
            "email": "thecoldfrontcalls@gmail.com"
        },
        "sameAs": [
            "https://www.facebook.com/profile.php?id=100063501552972"
        ]
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Cold Front Calls",
        "url": "https://coldfrontcalls.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://coldfrontcalls.com/shop?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <div className="bg-obsidian text-stone-light font-body min-h-screen selection:bg-platinum-light selection:text-obsidian">
            <StructuredData data={organizationData} />
            <StructuredData data={websiteData} />
            <Navigation />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setCartOpen(false)}
                onCheckout={() => handleCheckout(navigate)}
            />

            <UpsellModal
                isOpen={isUpsellOpen}
                onClose={() => setUpsellOpen(false)}
                onAccept={handleUpsellAccept}
                onDecline={handleUpsellDecline}
                suggestedCategory={upsellCategory || 'goose'}
                upsellProduct={upsellCategory ? UPSELL_PRODUCTS[upsellCategory] : null}
            />

            <Outlet />
            <Footer />
        </div>
    );
};
