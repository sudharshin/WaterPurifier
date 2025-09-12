import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ScrollToTop from "./components/scroll/ScrollToTop";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import ProductDetailsPage from "./components/productComponent/ProductDetailsPage"; 
import AdminLogin from "./components/admin/AdminLogin";
import ProductForm from "./components/admin/ProductForm";
import ViewAllProducts from "./components/admin/ViewAllProducts";
import ProductDetails from "./components/productComponent/ProductDetails";
// 🔑 Import Context & PrivateRoute
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import ScrollToHashElement from "./components/scroll/ScrollToHashElement";
import ScrollManager from "./components/scroll/ScrollManager";


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
            <Route path="/login" element={<AdminLogin />} />
            
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
