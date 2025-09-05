import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetailsPage from "./components/ProductDetailsPage"; 
import AdminLogin from "./components/AdminLogin";
import ProductForm from "./components/ProductForm";
import EnquirySection from "./components/EnquirySection";
import ViewAllProducts from "./components/ViewAllProducts";
import ProductDetails from "./components/ProductDetails";
// 🔑 Import Context & PrivateRoute
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToHashElement from "./components/ScrollToHashElement";
import ScrollManager from "./components/ScrollManager";


const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <UserProvider>
      <Router>
        {/* ✅ Navbar gets products */}
        <Navbar products={products} />
        <ScrollManager />
        {/* ✅ Main Content Wrapper */}
        <div style={{ paddingTop: "50px", paddingBottom: "80px", minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductDetailsPage />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            
            {/* 🔒 Protected Routes */}
            <Route path="/form" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
            <Route path="/form/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
            <Route path="/viewallproducts" element={<PrivateRoute><ViewAllProducts /></PrivateRoute>} />

            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>

        {/* ✅ Footer */}
        <section id="footer">
          <Footer />
        </section>
      </Router>
    </UserProvider>
  );
};

export default App;
