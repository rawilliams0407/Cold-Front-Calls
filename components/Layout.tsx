import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export const Layout = () => {
    return (
        <div className="bg-obsidian text-stone-light font-body min-h-screen selection:bg-platinum-light selection:text-obsidian">
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
};
