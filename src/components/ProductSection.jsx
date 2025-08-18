import React from "react";
import ProductListing from "./ProductListing";
import purifier from "../assets/WaterPurifierimg.jpg";
import purifier2 from "../assets/WaterPurifierimg2.jpg";

const products = [
        { title: "Purifier Model 1", image: purifier, desc: "Compact purifier with smart technology.", price: "₹ 20,000" },
        { title: "Purifier Model 2", image: purifier2, desc: "High-performance water purifier for families.", price: "₹ 18,000" },
        { title: "Purifier Model 3", image: purifier, desc: "Stylish design with efficient filtering.", price: "₹ 22,000" },
        { title: "Purifier Model 4", image: purifier2, desc: "Energy-saving purifier with advanced features.", price: "₹ 19,500" },
        { title: "Purifier Model 5", image: purifier, desc: "Durable build and easy to maintain.", price: "₹ 21,000" },
        { title: "Purifier Model 6", image: purifier2, desc: "Budget-friendly purifier with solid performance.", price: "₹ 20,500" },
        { title: "Purifier Model 7", image: purifier, desc: "Premium model with smart alerts.", price: "₹ 23,000" },
        { title: "Purifier Model 8", image: purifier2, desc: "Compact purifier for modern kitchens.", price: "₹ 24,000" },
     
];

const ProductSection = () => {
  return (
    <>
      <ProductListing
        title="Top Selling Products"
        description="Explore our top-selling water purifiers, trusted by thousands of families."
        products={products}
      />
      <ProductListing
        title="Featured Products"
        description="Check out our featured models with the latest technology."
        products={products}
      />
      <ProductListing
        title="Budget Friendly Products"
        description="Affordable purifiers that don’t compromise on quality."
        products={products}
      />
    </>
  );
};

export default ProductSection;
