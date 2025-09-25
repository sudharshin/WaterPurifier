import React, { useContext, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { UserContext } from "../../context/UserContext";

const ProductListing = ({ title, description, products }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      if (direction === "all") {
        navigate("/products", { state: { products, title, description } });
      } else {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -300 : 300,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="py-5" style={{ background: "#fff" }}>
      <Container fluid className="px-4">
        {/* Title & Description */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div style={{ maxWidth: "700px" }}>
            <h3
              className="fw-bold mb-2"
              style={{
                textAlign: "start",
                 fontFamily: "Poppins, Tofu",
                fontWeight: 250,
                fontStyle: "normal",
                fontStretch: "normal",
                fontOpticalSizing: "auto",
                lineHeight: "initial",
                fontSize: "35px",
                color: "#000000",
              }}
            >
              {title}
            </h3>
            {description && (
              <p
                className="mb-0"
                style={{
                  textAlign: "start",
                   fontFamily: "Poppins, Tofu",
                 fontWeight: 100,
                  fontStyle: "normal",
                  fontStretch: "normal",
                  fontOpticalSizing: "auto",
                  fontSize: "15px",
                  lineHeight: "25px",
                  color: "#2A2A2A",
                }}
              >
                {description}
              </p>
            )}
          </div>

          {products.length > 6 && (
            <Button
              className="view-all-btn d-flex align-items-center justify-content-center gap-2 px-4 py-2 mt-3 mt-md-0"
              onClick={() => scroll("all")}
            >
              View All <span style={{ fontSize: "1rem" }}>→</span>
            </Button>
          )}
        </div>

        {/* Scrollable Row of Product Cards */}
        <div
          className="d-flex overflow-auto flex-nowrap hide-scrollbar"
          ref={scrollRef}
          style={{ paddingBottom: "1rem", scrollBehavior: "smooth" }}
        >
          {products?.map((p, index) => {
            // ✅ Use first image from Cloudinary URLs
            const imageUrl =
              Array.isArray(p.images) && p.images[0]?.startsWith("http")
                ? p.images[0]
                : "/placeholder.png";

            return (
              <ProductCard
                key={index}
                id={p.id}
                image={imageUrl}
                title={p.name || "Untitled Product"}
                brand={p.brandName || "N/A"}
                price={user?.role === "vendor" ? p.vendorPrice : p.sellingPrice || 0}
                onClick={() => handleProductClick(p)}
              />
            );
          })}
        </div>
      </Container>

      {/* Styles */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .view-all-btn {
            background-color: #e6f2ff;
            border: none;
            color: #000;
            font-weight: 500;
            border-radius: 8px;
            white-space: nowrap;
            transition: all 0.3s ease-in-out;
          }
          .view-all-btn:hover,
          .view-all-btn:active {
            background-color: #003366 !important;
            color: #fff !important;
          }
        `}
      </style>
    </section>
  );
};

export default ProductListing;
