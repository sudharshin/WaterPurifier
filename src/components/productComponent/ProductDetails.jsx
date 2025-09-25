import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { UserContext } from "../../context/UserContext";

const ProductDetails = () => {
  const { user } = useContext(UserContext);
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
      {/* ✅ Image + Thumbnails Section */}
      <Row className="justify-content-center mb-4">
        <Col md={8} className="d-flex align-items-start justify-content-center">
          {/* Thumbnails on Left */}
          <div className="d-flex flex-column me-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="img-thumbnail mb-2"
                style={{
                  width: "90px",
                  height: "75px",
                  objectFit: "contain",
                  cursor: "pointer",
                  border:
                    selectedImage === img
                      ? "2px solid #003366"
                      : "1px solid #ccc",
                }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Main Image in Center */}
          <div className="flex-grow-1 d-flex justify-content-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="img-fluid"
              style={{
                width: "70%",
                height: "380px",
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </Col>
      </Row>

      <Button
        className="enquiry-btn d-flex align-items-center justify-content-center px-4 py-2 mx-auto"
        onClick={() => navigate("/enquirypopup", { state: { product } })} // 👈 pass product details
        style={{
          backgroundColor: "#0d6efd",
          border: "none",
          borderRadius: "50px",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        Enquiry <ArrowRight className="ms-2" />
      </Button>

      {/* ✅ Product Info Section */}
      <div className="text-start mx-auto" style={{ maxWidth: "720px" }}>
        <h4 className="custom-heading">{product.name}</h4>
        <p className="custom-body">{product.brandName}</p>

        <h5 className="custom-heading text-danger mb-2">
          {user?.role === "vendor"
            ? `₹${product.vendorPrice}`
            : `₹${product.sellingPrice}`}{" "}
          <span className="custom-body small-text">Inclusive of GST</span>
        </h5>

        {/* ✅ Features */}
        {product.features?.length > 0 && (
          <div className="mb-3">
            <h6 className="custom-heading">Speciality of {product.name}:</h6>
            <ul className="custom-body">
              {product.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Description */}
        {product.description && (
          <p className="custom-body">
            <strong className="custom-heading">Description:</strong>{" "}
            {product.description}
          </p>
        )}

        {/* ✅ Custom Fields */}
        {product.customFields && product.customFields.length > 0 && (
          <div className="mt-3">
            <h6 className="custom-heading">Additional Information:</h6>
            <ul className="custom-body">
              {product.customFields.map((field, idx) => {
                const key = field.name || field.fieldName || "Unknown";
                const val = field.value || field.fieldValue || "-";
                return (
                  <li key={idx}>
                    <span className="field-key">{key}:</span>{" "}
                    <span className="field-value">{val}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* ✅ Styles */}
      <style>
        {`
          .custom-heading {
            font-family: "Poppins", "tofu;
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
            text-align: start;
          }

          .custom-body {
            font-family: "Poppins", "tofu;
            font-weight: 100;
            font-size: 16px;
            line-height: 24px;
            color: #2A2A2A;
            text-align: start;
          }

          .field-key {
            font-weight: 600; /* ✅ Bold only for field names */
          }

          .field-value {
            font-weight: 100; /* ✅ Light for values */
          }
        
          .small-text {
            font-size: 13px;
            font-weight: 300;
            color: #555;
          }

          ul.custom-body {
            padding-left: 20px;
          }

          .enquiry-btn:hover {
            background-color: #0055aa !important;
          }
        `}
      </style>
    </Container>
  );
};

export default ProductDetails;
