import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ image, title, brand, price, onClick }) => {
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
          fontFamily: "Poppins, Tofu",
          border: "1px solid #ccc",
          backgroundColor: "#F6F6F6", // ✅ ash background
          boxShadow: "none",
          borderRadius: "20px",
          transition: "transform 0.3s ease",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={onClick}
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
              transition: "transform 0.3s ease-in-out",
              background: "transparent",
              mixBlendMode: "multiply", // ✅ removes white bg effect
            }}
            className="product-image"
          />
        </div>
      </Card>

      {/* Product Info */}
      <div className="mt-3 text-start d-flex flex-column flex-grow-1">
        {/* Title */}
        <h6
          style={{
            fontStyle: "normal",
             fontFamily: "Poppins, Tofu",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#2A2A2A",
            marginBottom: "6px",
          }}
        >
          {title}
        </h6>

        {/* Description / Brand */}
        <p
          style={{
             fontFamily: "Poppins, Tofu",
             fontStyle: "normal",
            fontWeight: 100,
            fontSize: "15px",
            lineHeight: "25px",
            color: "#2A2A2A",
            marginBottom: "10px",
          }}
        >
          {brand}
        </p>

        {/* Price */}
        <div className="d-flex align-items-center justify-content-start mt-auto">
          <div
            style={{
              background: "#c7ffffff",
              borderRadius: "6px",
              fontFamily: "Poppins, Tofu",
              fontSize: "14px",
              fontWeight: 600,
              color: "#2A2A2A",
              padding: "4px 10px",
            }}
          >
            ₹{price}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
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
