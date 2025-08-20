import React from "react";
import { Card } from "react-bootstrap";

const ProductDetailsCard = ({ brand, image, title, desc, price }) => {
  return (
    <Card
      className="shadow-sm product-details-card"
      style={{
        minWidth: "260px",
        borderRadius: "20px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // ✅ smooth animation
      }}
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
          height: "180px",
          objectFit: "contain",
          padding: "10px",
        }}
      />

      {/* Product Info */}
      <Card.Body style={{ padding: "12px 16px" }}>
        {/* Title */}
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

        {/* Description */}
        <Card.Text
          style={{
            fontSize: "0.85rem",
            color: "#6B7280",
            marginBottom: "10px",
          }}
        >
          {desc}
        </Card.Text>

        {/* Price */}
        <div>
          <span
            style={{
              backgroundColor: "#E6F2FB",
              color: "#1A73E8",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "8px",
              fontSize: "0.9rem",
            }}
          >
            ₹ {price}
          </span>
        </div>
      </Card.Body>

      {/* ✅ Hover Effect CSS */}
      <style>
        {`
          .product-details-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </Card>
  );
};

export default ProductDetailsCard;
