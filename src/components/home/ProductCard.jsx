import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ image, title, brand, price, onClick }) => {
  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-2 px-2 flex-shrink-0 d-flex flex-column"
      style={{ minHeight: "400px" }}
    >
      {/* Product Image */}
      <Card
        className="shadow-sm rounded mb-3 d-flex justify-content-center align-items-center"
        style={{
          height: "300px",
          fontFamily: "Poppins, Tofu",
          border: "1px solid #D4D4D4",
          backgroundColor: "#F6F6F6",
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
              mixBlendMode: "multiply",
            }}
            className="product-image"
          />
        </div>
      </Card>

      {/* Product Info */}
      <div
        className="text-start d-flex flex-column flex-grow-1"
        style={{
          gap: "8px",
          maxWidth: "286px",
        }}
      >
        {/* Product Name */}
        <h6
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "32px",
            color: "#000000",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h6>

        {/* Brand / Description */}
        <p
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: "23px",
            color: "#383737",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2, // ✅ two lines only
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "286px",
          }}
        >
          {brand}
        </p>

        {/* Price */}
        <div
          className="d-flex align-items-center justify-content-start"
          style={{
            marginTop: "8px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontFamily: "Poppins, Tofu",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16px",
              color: "#1E1E1E",
              padding: "4px 10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            ₹ {price}
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
