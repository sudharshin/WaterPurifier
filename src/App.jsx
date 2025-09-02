import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetailsPage from "./components/ProductDetailsPage"; 
import AdminLogin from "./components/AdminLogin";
import ProductForm from "./components/ProductForm";
import EnquirySection from "./components/EnquirySection";
import ViewAllProducts from "./components/ViewAllProducts";
import ProductDetails from "./components/ProductDetails";
const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <Router>
      {/* ✅ Navbar gets products */}
      <Navbar products={products} />

      {/* ✅ Main Content Wrapper */}
      <div style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetailsPage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
           <Route path="/enquiry" element={<EnquirySection />} /> 
          <Route path="/form" element={<ProductForm />} />
          <Route path="/form/:id" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/viewallproducts" element={<ViewAllProducts />} />
        </Routes>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </Router>
  );
};

export default App;
