import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SuccessPage } from "./pages/SuccessPage";
import { ScrollToTop } from "./components/ScrollToTop";

export const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* Pages using shared Layout */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>

                {/* Independent Pages */}
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
            </Routes>
        </BrowserRouter>
    );
};
