import React from "react";
import { Card } from "react-bootstrap";

const ProductDetailsCard = ({ brand, image, title, desc, price, onClick }) => {
  return (
    <Card
      className="product-details-card w-100 h-100"
      style={{
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        backgroundColor: "#F6F6F6", // ✅ ash background
        boxShadow: "none",
        transition: "transform 0.3s ease",
      }}
      onClick={onClick}
    >
      {/* Brand */}
      <div
        className="px-3 pt-3"
        style={{
          fontSize: "0.9rem",
          fontWeight: "500",
          color: "#333",
        }}
      >
        {brand}
      </div>

      {/* Product Image */}
      <Card.Img
        variant="top"
        src={image}
        style={{
          height: "200px",
          objectFit: "contain",
          padding: "10px",
          backgroundColor: "transparent", // ✅ transparent image area
          mixBlendMode: "multiply", // ✅ removes white background visually
        }}
      />

      {/* Product Info */}
      <Card.Body style={{ padding: "12px 16px" }}>
        <Card.Title
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            marginBottom: "6px",
            color: "#111827",
          }}
        >
          {title}
        </Card.Title>

        <Card.Text
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "23px",
            color: "#383737",
          }}
        >
          {desc}
        </Card.Text>

        <div>
          <span
            style={{
              backgroundColor: "#E6F2FB",
              color: "#2A2A2A",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "8px",
              fontSize: "0.9rem",
            }}
          >
            ₹{price}
          </span>
        </div>
      </Card.Body>

      {/* Hover Effect */}
      <style>
        {`
          .product-details-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: none;
          }
        `}
      </style>
    </Card>
  );
};

export default ProductDetailsCard;
