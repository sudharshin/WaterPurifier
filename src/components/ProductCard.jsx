import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ image, title, desc, price }) => {
  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-2 px-2 flex-shrink-0 d-flex flex-column"
      style={{ minHeight: "380px" }}
    >
      {/* Product Image */}
      <Card
        className="shadow-sm rounded mb-3 d-flex justify-content-center align-items-center"
        style={{
          height: "300px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          overflow: "hidden", // ✅ prevents image from overflowing when scaled
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: "180px",
              height: "180px",
              objectFit: "contain",
              transition: "transform 0.3s ease-in-out", // ✅ smooth transition
            }}
            className="product-image"
          />
        </div>
      </Card>

      {/* Product Info */}
      <div className="mt-3 text-start d-flex flex-column flex-grow-1">
        <h6 className="fw-bold">{title}</h6>
        <p className="text-muted small mb-2 flex-grow-1">{desc}</p>

        {/* Price */}
        <div className="d-flex align-items-center justify-content-start mt-auto">
          <div
            className="px-3 py-1 fw-semibold"
            style={{
              background: "#f1f1f1",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {price}
          </div>
        </div>
      </div>

      {/* ✅ Inline hover style using CSS */}
      <style>
        {`
          .product-image:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </div>
  );
};

export default ProductCard;
