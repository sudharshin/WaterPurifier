import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../home/Home";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import ProductDetailsPage from "../productComponent/ProductDetailsPage";
import AdminLogin from "../admin/AdminLogin";
import ProductForm from "../admin/ProductForm";
import ViewAllProducts from "../admin/ViewAllProducts";
import ProductDetails from "../productComponent/ProductDetails";

import PrivateRoute from "./PrivateRoute"
import AnimatedPage from "./AnimatedPage";

const AppRoutes = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);


  // Load products from localStorage once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <>
      <Navbar products={products} />

      <div style={{ paddingTop: "50px", paddingBottom: "80px", minHeight: "100vh" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/products" element={<AnimatedPage><ProductDetailsPage /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><AdminLogin /></AnimatedPage>} />

            {/* Protected routes */}
            <Route
              path="/form"
              element={
                <PrivateRoute>
                  <AnimatedPage><ProductForm /></AnimatedPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/form/:id"
              element={
                <PrivateRoute>
                  <AnimatedPage><ProductForm /></AnimatedPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/viewallproducts"
              element={
                <PrivateRoute>
                  <AnimatedPage><ViewAllProducts /></AnimatedPage>
                </PrivateRoute>
              }
            />

            <Route path="/products/:id" element={<AnimatedPage><ProductDetails /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
};

export default AppRoutes;
