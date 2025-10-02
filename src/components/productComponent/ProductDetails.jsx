import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { UserContext } from "../../context/UserContext";

const ProductDetails = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();

  const images = product?.images?.length
    ? product.images
    : [product.image || product.imageUrl || "/placeholder.png"];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [showModal, setShowModal] = useState(false);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4>Product not found</h4>
      </Container>
    );
  }

  const discountPercent = 20;
  const currentPrice =
    user?.role === "vendor" ? product.vendorPrice : product.sellingPrice;
  const originalPrice =
    product.originalPrice || Math.round(currentPrice / (1 - discountPercent / 100));

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Container fluid className="py-5">
      <Row className="gx-4">
        {/* Left Column - Images and Enquiry */}
        <Col md={4} className="d-none d-md-block">
          <div className="image-panel sticky-panel">
            <div className="main-image-container mb-3">
              <img
                src={selectedImage}
                alt={product.name}
                className="main-product-image"
                onClick={() => setShowModal(true)}
                style={{ cursor: "zoom-in" }}
              />
            </div>

            {images.length > 1 && (
              <div className="d-flex flex-row flex-wrap gap-2 justify-content-start mb-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumbnail-wrapper ${
                      selectedImage === img ? "selected-thumbnail" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="thumbnail-img" />
                  </div>
                ))}
              </div>
            )}

            <div className="text-center">
              <Button
                className="enquiry-btn px-4 py-2"
                onClick={() => navigate("/#enquiry")}
              >
                Enquiry <ArrowRight className="ms-2" />
              </Button>
            </div>
          </div>
        </Col>

        {/* Right Column - Product Content */}
        <Col xs={12} md={8}>
          <div className="product-content scrollable-panel">
            {/* Mobile Image */}
            <div className="text-center mb-4 d-md-none">
              <div className="main-image-container mx-auto">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="main-product-image w-100"
                />
              </div>
            </div>

            {/* Product Title & Price */}
            <div className="section-block">
              <h1 className="product-title text-uppercase fw-bold text-primary">
                {product.name}
              </h1>

              <div className="d-flex align-items-center gap-3 mb-3">
                <h2 className="text-dark fw-bold m-0">₹{currentPrice}</h2>
                <h5 className="text-muted text-decoration-line-through m-0">
                  ₹{originalPrice}
                </h5>
                <span className="badge bg-info text-dark fw-semibold">20% OFF</span>
              </div>

              <hr />
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="section-block">
                <h5 className="section-heading">Speciality of {product.name}:</h5>
                <ul className="info-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <hr />
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="section-block">
                <h5 className="description-heading text-uppercase fw-bold text-primary mb-3">
                  Description
                </h5>
                <p className="product-description">{product.description}</p>
                <hr />
              </div>
            )}

            {/* Key Features - from customFields */}
            {product.customFields?.length > 0 && (
              <div className="section-block">
                <h5 className="section-heading text-uppercase mb-3">Key Features</h5>
                <ul className="features-list">
                  {product.customFields.map((field, idx) => {
                    const value = field.value || field.fieldValue;
                    return value ? <li key={idx}>{truncateText(value, 70)}</li> : null;
                  })}
                </ul>
                <hr />
              </div>
            )}

            {/* Styled Specifications Grid */}
            {product.customFields?.length > 0 && (
              <div className="section-block">
                <h5 className="spec-heading text-uppercase">Specifications</h5>
                <div className="spec-grid">
                  {product.customFields.map((field, idx) => {
                    const name = field.name || field.fieldName;
                    const value = field.value || field.fieldValue;
                    if (!name || !value) return null;

                    return (
                      <React.Fragment key={idx}>
                        <div className="spec-label">{name}</div>
                        <div className="spec-value">{truncateText(value, 60)}</div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Modal for Image Zoom */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body className="p-0">
          <img src={selectedImage} alt="Zoomed" className="img-fluid w-100" />
        </Modal.Body>
      </Modal>

      {/* Styles */}
      <style>{`
        * {
    font-family: 'Poppins', sans-serif;
  }

        .product-title {
          font-size: 32px;
          font-weight: 700;
          color: #0033cc;
        }

        .badge.bg-info {
          background-color: #d0ebff;
          color: #0056b3;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .description-heading {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .product-description {
          font-size: 16px;
          color: #444;
          line-height: 1.6;
        }

        .section-heading {
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }

        .info-list,
        .features-list {
          padding-left: 20px;
          font-size: 16px;
          color: #444;
        }

        .info-list li,
        .features-list li {
          margin-bottom: 8px;
          list-style-type: disc;
        }

        .section-block {
          margin-bottom: 32px;
          width: 100%;
        }

        hr {
          border: none;
          border-top: 2px solid #ccc;
          margin: 32px 0;
        }

        .main-image-container {
          width: 100%;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 12px;
          overflow: hidden;
        }

        .main-product-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .thumbnail-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          padding: 4px;
          cursor: pointer;
          transition: border 0.3s ease, box-shadow 0.3s ease;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }

        .thumbnail-wrapper:hover {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .selected-thumbnail {
          border-color: #0d6efd;
          background-color: #e9f2ff;
        }

        .enquiry-btn {
          background-color: #0d6efd;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 500;
          border: none;
          transition: background 0.3s;
        }

        .enquiry-btn:hover {
          background-color: #004a9f;
        }

        .sticky-panel {
          position: sticky;
          top: 80px;
        }

        .scrollable-panel {
          max-height: 80vh;
          overflow-y: scroll;
          padding-right: 1rem;
          scrollbar-width: none; /* Firefox */
        }

        .scrollable-panel::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        /* Specification Grid Style */
        .spec-heading {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
          padding-bottom: 8px;
        }
        .spec-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 15px;
        color: #333;
        border: none;
        border-radius: 0;
      }


        .spec-grid > div {
          padding: 12px 16px;
          border-bottom: 1px solid #c5cad1ff;
        }

        .spec-grid > div:nth-child(2n) {
          text-align: right;
          font-weight: 600;
        }

        .spec-grid > div:last-child,
        .spec-grid > div:nth-last-child(2) {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .sticky-panel {
            position: static;
          }

          .scrollable-panel {
            max-height: none;
            overflow-y: visible;
            padding-right: 0;
          }

          .main-image-container {
            height: 240px;
          }

          .thumbnail-wrapper {
            width: 60px;
            height: 60px;
          }

          .product-title {
            font-size: 22px;
          }

          .spec-grid {
            grid-template-columns: 1fr;
          }

          .spec-grid > div:nth-child(2n) {
            text-align: left;
          }
        }
      `}</style>
    </Container>
  );
};

export default ProductDetails;
