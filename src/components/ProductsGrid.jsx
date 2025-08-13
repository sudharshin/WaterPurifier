import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/App.css"; // Custom styles

const ProductGrid = () => {
  const placeholders = Array(6).fill(null); // Creates 6 placeholder items

  return (
    <div className="container py-5">
      <h5 className="mb-4">Our All Products</h5>
      <div className="row g-4">
        {placeholders.map((_, index) => (
          <div className="col-4" key={index}>
            <div className="aspect-ratio-box"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
