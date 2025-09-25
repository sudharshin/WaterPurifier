import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import EnquiryForm from "./components/home/EnquiryPopup";
import Home from "./components/home/Home";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import ProductDetailsPage from "./components/productComponent/ProductDetailsPage"; 
import AdminLogin from "./components/admin/AdminLogin";
import ProductForm from "./components/admin/ProductForm";
import ViewAllProducts from "./components/admin/ViewAllProducts";
import ProductDetails from "./components/productComponent/ProductDetails";

import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import ScrollManager from "./components/scroll/ScrollManager";
import AnimatedPage from "./components/routes/AnimatedPage";
import EnquiryPopup from "./components/home/EnquiryPopup";

const AppRoutes = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <>
      <Navbar products={products} />
      <ScrollManager />
      <div style={{ paddingTop: "50px", paddingBottom: "80px", minHeight: "100vh" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/products" element={<AnimatedPage><ProductDetailsPage /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><AdminLogin /></AnimatedPage>} />
              <Route path="/enquirypopup" element={<EnquiryPopup />} /> 
            {/* Protected Routes */}
            <Route path="/form" element={<PrivateRoute><AnimatedPage><ProductForm /></AnimatedPage></PrivateRoute>} />
            <Route path="/form/:id" element={<PrivateRoute><AnimatedPage><ProductForm /></AnimatedPage></PrivateRoute>} />
            <Route path="/viewallproducts" element={<PrivateRoute><AnimatedPage><ViewAllProducts /></AnimatedPage></PrivateRoute>} />

            <Route path="/products/:id" element={<AnimatedPage><ProductDetails /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

export default App;
