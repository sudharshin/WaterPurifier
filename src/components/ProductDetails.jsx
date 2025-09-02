import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();

  // ✅ Handle images (if multiple available)
  const images = product?.images?.length
    ? product.images
    : [product.image || product.imageUrl || "/placeholder.png"];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4>Product not found</h4>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        {/* LEFT SECTION: Thumbnails + Main Image + Enquiry Button */}
        <Col md={6} className="d-flex">
          {/* Thumbnails (vertical) */}
          <div className="d-flex flex-column me-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="img-thumbnail mb-2"
                style={{
                  width: "150px",
                  height: "120px",
                  objectFit: "contain",
                  cursor: "pointer",
                  border:
                    selectedImage === img ? "2px solid #003366" : "1px solid #ccc",
                }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Main Image + Enquiry Button below */}
          <div className="d-flex flex-column align-items-center flex-grow-1">
            <img
              src={selectedImage}
              alt={product.name}
              className="img-fluid mb-3"
              style={{
                width: "70%",
                height: "350px", // ⬅️ Bigger height
                objectFit: "contain", // ⬅️ Keeps proper aspect ratio
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <Button
              className="enquiry-btn d-flex align-items-center px-4 py-2 mt-2"
              onClick={() => navigate("/enquiry")}
              style={{
                backgroundColor: "#0d6efd", // ✅ Blue background
                border: "none",
                borderRadius: "50px", // ✅ Pill shape
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Enquiry <ArrowRight className="ms-2" />
            </Button>
          </div>
        </Col>

        {/* RIGHT SECTION: Product Info */}
        <Col md={6}>
          <h4 className="fw-bold">{product.name}</h4>
          <p className="text-muted">{product.brandName}</p>

          <h5 className="fw-bold text-danger mb-2">
           ₹{product.sellingPrice}{" "}
            <span className="text-muted fw-normal" style={{ fontSize: "14px" }}>
              Inclusive of GST
            </span>
          </h5>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mb-3">
              <h6 className="fw-bold">Speciality of {product.name}:</h6>
              <ul>
                {product.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          )}

          {/* ✅ Custom Fields Section */}
          {product.customFields && product.customFields.length > 0 && (
            <div className="mt-3">
              <h6 className="fw-bold">Additional Information:</h6>
              <ul>
                {product.customFields.map((field, idx) => {
                  const key = field.name || field.fieldName || "Unknown";
                  const val = field.value || field.fieldValue || "-";
                  return (
                    <li key={idx}>
                      <strong>{key}:</strong> {val}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Col>
      </Row>

      {/* Extra Styles */}
      <style>
        {`
          .enquiry-btn:hover {
            background-color: #0055aa !important;
          }
        `}
      </style>
    </Container>
  );
};

export default ProductDetails;
