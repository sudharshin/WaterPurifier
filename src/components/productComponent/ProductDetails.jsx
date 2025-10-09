// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Button, Modal } from "react-bootstrap";
// import { ArrowRight } from "react-bootstrap-icons";
// import { UserContext } from "../../context/UserContext";

// const ProductDetails = ({ id }) => {
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Scroll again, in case global didn't fire at the right moment
//     window.scrollTo(0, 0);

//     // Load product data by ID
//     const allProducts = JSON.parse(localStorage.getItem("products")) || [];
//     const found = allProducts.find((p) => String(p.id) === String(id));
//     setProduct(found);
//   }, [id]);

//   // Update selectedImage whenever product changes
//   useEffect(() => {
//     if (!product) return;

//     const images = product?.images?.length
//       ? product.images
//       : [product.image || product.imageUrl || "/placeholder.png"];

//     setSelectedImage(images[0]);
//   }, [product]);

//   if (!product) {
//     return (
//       <Container className="py-5 text-center">
//         <h4>Product not found</h4>
//       </Container>
//     );
//   }

//   const images = product?.images?.length
//     ? product.images
//     : [product.image || product.imageUrl || "/placeholder.png"];

//   const discountPercent = 20;
//   const currentPrice =
//     user?.role === "vendor" ? product.vendorPrice : product.sellingPrice;
//   const originalPrice =
//     product.originalPrice || Math.round(currentPrice / (1 - discountPercent / 100));

import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { UserContext } from "../../context/UserContext";

const ProductDetails = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // start null
  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const found = allProducts.find((p) => String(p.id) === String(id));
    setProduct(found);
  }, [id]);

  // Update selectedImage whenever product changes
  useEffect(() => {
    if (!product) return;

    const images = product?.images?.length
      ? product.images
      : [product.image || product.imageUrl || "/placeholder.png"];

    setSelectedImage(images[0]);
  }, [product]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4>Product not found</h4>
      </Container>
    );
  }

  const images = product?.images?.length
    ? product.images
    : [product.image || product.imageUrl || "/placeholder.png"];

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

        <Col xs={12} md={8}>
          <div className="product-content">
            <div className="text-center mb-4 d-md-none">
              <div className="main-image-container mx-auto">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="main-product-image w-100"
                />
              </div>
            </div>

            <div className="section-block">
              <h1 className="product-title text-uppercase text-primary">
                {product.name}
              </h1>

              <div className="d-flex align-items-center gap-3 mb-3">
                <h2 className="current-price m-0">₹{currentPrice}</h2>
                <h5 className="original-price m-0">₹{originalPrice}</h5>
                <span className="badge bg-info text-dark fw-semibold">20% OFF</span>
              </div>
            </div>

            {product.features?.length > 0 && (
              <div className="section-block">
                <h5 className="section-heading">Speciality of {product.name}:</h5>
                <ul className="info-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.description && (
              <div className="section-block">
                {/* Description heading removed as per request */}
                <p className="product-description">{product.description}</p>
              </div>
            )}

            {product.customFields?.length > 0 && (
              <div className="section-block">
                <h5 className="section-heading text-uppercase mb-3">Key Features</h5>
                <ul className="features-list">
                  {product.customFields.map((field, idx) => {
                    const value = field.value || field.fieldValue;
                    return value ? <li key={idx}>{value}</li> : null;
                  })}
                </ul>
              </div>
            )}

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
                        <div className="spec-value">{value}</div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body className="p-0">
          <img src={selectedImage} alt="Zoomed" className="img-fluid w-100" />
        </Modal.Body>
      </Modal>

      <style>{`
        /* Global font */
        * {
          font-family: 'Poppins', sans-serif;
        }

        html, body {
          height: 100%;
          overflow-x: hidden;
        }

        /* Headings */
        .product-title,
        .section-heading,
        .spec-heading {
          font-weight: 700; /* Bold */
          color: #0033cc;
          margin-bottom: 16px;
        }

        .section-heading,
        .spec-heading {
          color: #000;
        }

        /* Labels */
        .spec-label {
          font-weight: 600; /* Semi-bold */
          color: #222222;
          text-align: left;
          word-break: break-word;
        }

        /* Values */
        .spec-value,
        .product-description,
        .info-list,
        .features-list {
          font-weight: 400; /* Light */
          color: #2a2424ff;
          font-size: 16px;
          line-height: 1.6;
          text-align: left;
          word-break: break-word;
        }

        /* Lists */
        .info-list li,
        .features-list li {
          margin-bottom: 8px;
          list-style-type: disc;
          font-weight: 400;
          color:  #2a2424ff;
        }

        /* Price styling */
        .d-flex.align-items-center > h2.current-price {
          font-weight: 700; /* Bold */
          color: #222;
          margin: 0;
        }

        .d-flex.align-items-center > h5.original-price {
          font-weight: 300; /* Light */
          color: #888888;
          margin: 0;
          text-decoration: line-through;
        }

        /* Badge */
        .badge.bg-info {
          background-color: #d0ebff;
          color: #0056b3;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 6px;
        }

        /* Main container spacing */
        .section-block {
          margin-bottom: 32px;
          width: 100%;
        }

        /* Image containers */
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

        /* Thumbnail styling */
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

        /* Enquiry button */
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

        /* Sticky sidebar panel */
        .sticky-panel {
          position: sticky;
          top: 80px;
        }

        .product-content {
          padding-right: 1rem;
        }

        /* Spec grid */
        .spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 24px;
          font-size: 15px;
          color: #333;
          border: none;
        }

        @media (max-width: 768px) {
          .sticky-panel {
            position: static;
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
            gap: 8px;
          }

          .spec-grid > .spec-label,
          .spec-grid > .spec-value {
            text-align: left;
          }
        }
      `}</style>
    </Container>
  );
};

export default ProductDetails;
