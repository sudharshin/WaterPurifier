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

      {/* Main content wrapper */}
      <div className="main-content">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<CategoryBasedProductListingPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          {/* Protected Routes */}
          <Route
            path="/form"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/form/:id"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <ViewAllProducts />
              </PrivateRoute>
            }
          />
          <Route path="/products/:id" element={<ProductDetailsWrapper />} />
        </Routes>
      </div>

      <Footer />

      {/* Responsive CSS */}
      <style>{`
        .main-content {
          padding-top: 90px;
          padding-bottom: 80px;
          min-height: 100vh;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .main-content {
            padding-top: 80px;
            padding-bottom: 70px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding-top: 70px;
            padding-bottom: 60px;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding-top: 60px;
            padding-bottom: 50px;
          }
        }

        @media (max-width: 375px) {
          .main-content {
            padding-top: 50px;
            padding-bottom: 40px;
          }
        }
      `}</style>
    </FadeOnRouteChange>
  );
};

export default AppRoutes;
