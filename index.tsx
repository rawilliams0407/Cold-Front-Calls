import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { SuccessPage } from "@/pages/SuccessPage";
import { Shop } from "@/pages/Shop";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* HomePage has its own nav/footer */}
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />

                {/* Pages using shared Layout */}
                <Route element={<Layout />}>
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
