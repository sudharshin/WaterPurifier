import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../home/Home";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import CategoryBasedProductListingPage from "../productComponent/CategoryBasedProductListingPage";
import AdminLogin from "../admin/AdminLogin";
import ProductForm from "../admin/ProductForm";
import ViewAllProducts from "../admin/ViewAllProducts";
import ProductDetailsWrapper from "../productComponent/ProductDetailsWrapper";

import PrivateRoute from "./PrivateRoute";
import AboutUs from "../home/AboutUs";
import ContactUs from "../home/ContactUs";
import FadeOnRouteChange from "./FadeOnRouteChange";

const AppRoutes = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <FadeOnRouteChange duration={500}>
      <Navbar products={products} />

      <div style={{ paddingTop: "50px", paddingBottom: "80px", minHeight: "100vh" }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<CategoryBasedProductListingPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<VendorRegisterForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          {/* Protected Routes */}
          <Route path="/form" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/form/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/admin/dashboard" element={<PrivateRoute><ViewAllProducts /></PrivateRoute>} />
          <Route path="/products/:id" element={<ProductDetailsWrapper />} />

        </Routes>
      </div>

      <Footer />
    </FadeOnRouteChange>
  );
};

export default AppRoutes;
