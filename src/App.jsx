import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetailsPage from "./components/ProductDetailsPage"; // ⬅️ import details page

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
