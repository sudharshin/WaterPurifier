import React, { useEffect, useState } from "react";
import ProductListing from "./ProductListing";
import demoProducts from "./DemoProducts";
const ProductSection = () => {
  const [products, setProducts] = useState([]);

  /*useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);*/

   useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products"));
    if (!stored || stored.length === 0) {
      console.log("demo products");
      localStorage.setItem("products", JSON.stringify(demoProducts));
      setProducts(demoProducts);
    } else {
        console.log("Loaded products from storage:", stored);
      setProducts(stored);
    }
  }, []);

  const topSelling = products.filter((p) => p.isTopSelling);
  const featured = products.filter((p) => p.isFeatured);
  const budget = products.filter((p) => p.isBudgetFriendly);

  return (
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
    </>
  );
};

export default ProductSection;
