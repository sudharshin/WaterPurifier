import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetailsPage from "./components/ProductDetailsPage"; 
import { products } from "./components/ProductSection";
import AdminLogin from "./components/AdminLogin";
import ProductForm from "./components/ProductForm";
import ViewAllProducts from "./components/ViewAllProducts";

const App = () => {
  return (
    <Router>
      {/* ✅ Navbar always on top */}
      <Navbar products={products} />

      {/* ✅ Main Content Wrapper with spacing */}
      <div style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetailsPage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/form" element={<ProductForm />} />
          <Route path="/viewallproducts" element={<ViewAllProducts />} />
        </Routes>
      </div>

      {/* ✅ Footer always at bottom */}
      <Footer />
    </Router>
  );
};

export default App;
