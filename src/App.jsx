import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetailsPage from "./components/ProductDetailsPage"; // ⬅️ import details page
import { products } from "./components/ProductSection";
import AdminLogin from "./components/AdminLogin";
import ProductForm from "./components/ProductForm";
//import ProductProvider  from "./components/redux/ProductContext";
import ViewAllProducts from "./components/ViewAllProducts";
const App = () => {
  return (
   // <ProductProvider>
    <Router>
      <Navbar products={products}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductDetailsPage />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
         <Route path="/form" element={<ProductForm />} />
           <Route path="/viewallproducts" element={<ViewAllProducts />} />
      </Routes>

      <Footer />
    </Router>
   // </ProductProvider>
  );
};

export default App;
