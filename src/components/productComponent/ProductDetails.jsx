import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { UserContext } from "../../context/UserContext";
import EnquiryModal from "./EnquiryModal";

const ProductDetails = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const found = allProducts.find((p) => String(p.id) === String(id));
    setProduct(found);
  }, [id]);

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

  const renderThumbnails = () => (
    images.length > 1 && (
      <div className="d-flex flex-row flex-wrap gap-2 justify-content-center my-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`thumbnail-wrapper ${selectedImage === img ? "selected-thumbnail" : ""}`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} alt={`Thumb ${idx}`} className="thumbnail-img" />
          </div>
        ))}
      </div>
    )
  );

  const renderEnquiryButton = () => (
    <div className="text-center mt-3">
      <Button
        className="enquiry-btn px-4 py-2"
        onClick={() => setShowEnquiry(true)}
      >
        Enquiry <ArrowRight className="ms-2" />
      </Button>
    </div>
  );

  return (
    <Container fluid className="py-5 px-3 px-md-5">
      <Row className="gx-4">
        {/* DESKTOP Image panel */}
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
            {renderThumbnails()}
            {renderEnquiryButton()}
          </div>
        </Col>

        {/* CONTENT */}
        <Col xs={12} md={8}>
          <div className="product-content">
            {/* MOBILE Image panel */}
            <div className="d-md-none text-center mb-4">
              <div className="main-image-container mx-auto">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="main-product-image w-100"
                  onClick={() => setShowModal(true)}
                  style={{ cursor: "zoom-in" }}
                />
              </div>
              {renderThumbnails()}
              {renderEnquiryButton()}
            </div>

            {/* TITLE + PRICE */}
            <div className="section-block">
              <h1 className="product-title text-uppercase text-primary">
                {product.name}
              </h1>
              <div className="d-flex align-items-center gap-3 mb-3">
                <h2 className="current-price m-0">₹{currentPrice}</h2>
              </div>
            </div>

            {/* FEATURES LIST */}
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

            {/* DESCRIPTION */}
            {product.description && (
              <div className="section-block">
                <p className="product-description">{product.description}</p>
              </div>
            )}

            {/* KEY FEATURES & SPECIFICATIONS */}
            {product.customFields?.length > 0 && (
              <>
                <div className="section-block">
                  <h5 className="section-heading text-uppercase mb-3">Key Features</h5>
                  <ul className="features-list">
                    {product.customFields.map((field, idx) => {
                      const value = field.value || field.fieldValue;
                      return value ? <li key={idx}>{value}</li> : null;
                    })}
                  </ul>
                </div>

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
              </>
            )}
          </div>
        </Col>
      </Row>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body className="p-0">
          <img src={selectedImage} alt="Zoomed" className="img-fluid w-100" />
        </Modal.Body>
      </Modal>

      <EnquiryModal show={showEnquiry} onClose={() => setShowEnquiry(false)} product={product} />

      {/* INLINE STYLES */}
      <style>{`
        * { font-family: 'Poppins', sans-serif; }
        html, body { height: 100%; overflow-x: hidden; }

        .product-title, .section-heading, .spec-heading {
          font-weight: 700;
          color: #0033cc;
          margin-bottom: 16px;
        }

        .section-heading, .spec-heading { color: #000; }

        .spec-label {
          font-weight: 700;
          color: #222;
          text-align: left;
          padding-top: 4px;
        }

        .spec-value, .product-description, .info-list, .features-list {
          font-weight: 400;
          color: #2a2424ff;
          font-size: 16px;
          line-height: 1.6;
          text-align: left;
        }

        .info-list li, .features-list li {
          margin-bottom: 8px;
          list-style-type: disc;
        }

        h2.current-price { font-weight: 700; color: #222; margin: 0; }
        h5.original-price { font-weight: 300; color: #888; margin: 0; text-decoration: line-through; }

        .badge.bg-info {
          background-color: #d0ebff;
          color: #0056b3;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .section-block { margin-bottom: 32px; width: 100%; }

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
  background-color: #fff;
}

.thumbnail-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  margin: auto;
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
        }

        .enquiry-btn:hover {
          background-color: #004a9f;
        }

        .sticky-panel {
          position: sticky;
          top: 80px;
        }

        .product-content {
          padding-right: 1rem;
        }

        .spec-grid {
          margin: 0 1rem 8px 1.5rem;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 8px 16px;
        }

        @media (max-width: 575.98px) {
          .spec-grid {
            grid-template-columns: 1fr;
            gap: 6px 0;
          }

          .spec-label {
            font-size: 1rem;
            font-weight: 600;
            margin-top: 1rem;
            padding-top: 0;
          }

          .spec-value {
            font-size: 0.95rem;
            padding-left: 0.5rem;
            margin-top: 0.25rem;
          }

          .main-image-container {
            height: 200px;
            padding: 8px;
          }

          .thumbnail-wrapper {
            width: 50px;
            height: 50px;
          }

          .product-title {
            font-size: 1.5rem;
          }

          .current-price {
            font-size: 1.5rem;
          }

          .original-price {
            font-size: 1.1rem;
          }

            .enquiry-btn {
    width: auto;
    max-width: 280px;
    padding: 10px 24px;
    font-size: 1.1rem;
    border-radius: 24px;
    display: block;
    margin: 0 auto;
  }
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

          .product-content {
            padding-right: 0;
            padding-left: 0;
          }
        }

        @media (min-width: 992px) {
          .sticky-panel {
            top: 80px;
            max-width: 320px;
          }

          .product-content {
            padding-right: 3rem;
          }
        }

        .modal-body img {
          max-height: 80vh;
          object-fit: contain;
        }
      `}</style>
    </Container>
  );
};

export default ProductDetails;
