import React, { useEffect } from "react";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
    useEffect(() => {
        const baseTitle = "Cold Front Calls";
        document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Premium Custom Waterfowl Calls`;

        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", description);
            }
        }

        if (keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute("content", keywords);
            }
        }

        // Update OG title and description as well
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", title ? `${title} | ${baseTitle}` : baseTitle);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute("content", description || "Handcrafted, premium custom duck and goose calls.");

    }, [title, description, keywords]);

    return null;
};
