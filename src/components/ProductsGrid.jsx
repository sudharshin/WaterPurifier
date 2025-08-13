import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductGrid = () => {
  const placeholders = Array(6).fill(null);

  return (
    <div className="container py-5">
      <h5 className="mb-4">Our All Products</h5>
      <div className="row g-4">
        {placeholders.map((_, index) => (
          <div className="col-6 col-md-4" key={index}>
            <div
              style={{
                backgroundColor: "#d9d9d9",
                width: "75%",       // full width of column
                paddingTop: "80%",   // height based on width to keep aspect ratio
                borderRadius: "8px",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
