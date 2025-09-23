import React, { useEffect, useState, useContext } from "react";
import ProductListing from "./ProductListing";
import { useProducts } from "../redux/useProduct";

const ProductSection = () => {

   const { products, loading } = useProducts();

  const topSelling = products.filter((p) => p.isTopSelling);
  const featured = products.filter((p) => p.isFeatured);
  const budget = products.filter((p) => p.isBudgetFriendly);

  // Inline styles for overlay and spinner
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const spinnerStyle = {
    width: "60px",
    height: "60px",
    border: "6px solid #ccc",
    borderTopColor: "#007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      {/* Full-page loading overlay */}
      {loading && (
        <div style={overlayStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}

      {!loading && (
        <>
          {topSelling.length > 0 && (
            <ProductListing
              title="Top Selling Products"
              description="Explore our top-selling water purifiers, trusted by thousands of families."
              products={topSelling}
            />
          )}

          {featured.length > 0 && (
            <ProductListing
              title="Featured Products"
              description="Check out our featured models with the latest technology."
              products={featured}
            />
          )}

          {budget.length > 0 && (
            <ProductListing
              title="Budget Friendly Products"
              description="Affordable purifiers that don’t compromise on quality."
              products={budget}
            />
          )}

          {products.length === 0 && <p>No products available.</p>}
        </>
      )}

      {/* Keyframes for spinner animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default ProductSection;