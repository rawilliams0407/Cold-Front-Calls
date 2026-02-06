import React from "react";

interface BrandLogoProps {
    className?: string;
    showText?: boolean;
    size?: "sm" | "md" | "lg" | string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
    className = "",
    showText = true,
    size = "md"
}) => {
    // Size mapping for the icon
    const iconSize = {
        sm: "w-11 h-11",
        md: "w-16 h-16",
        lg: "w-24 h-24"
    }[size] || size;

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className={`${iconSize} flex items-center justify-center`}>
                <svg
                    viewBox="0 0 64 64"
                    className="w-full h-full text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                >
                    <title>Cold Front Calls Logo</title>
                    {/* The curved line (front boundary) */}
                    <path
                        d="M 20 10 Q 50 32 20 54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />
                    {/* Triangles - scaled down and better aligned to the curve */}
                    {/* Triangle 1 (Top) */}
                    <path d="M 30 18 L 42 24 L 33 30 Z" />
                    {/* Triangle 2 (Middle) */}
                    <path d="M 35 26 L 47 32 L 38 38 Z" />
                    {/* Triangle 3 (Bottom) */}
                    <path d="M 30 34 L 42 40 L 33 46 Z" />
                </svg>
            </div>
            {showText && (
                <span
                    className="text-white whitespace-nowrap pt-1"
                    style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: size === "sm" ? "1.6rem" : size === "lg" ? "2.8rem" : "2.2rem"
                    }}
                >
                    Cold Front Calls
                </span>
            )}
        </div>
    );
};
