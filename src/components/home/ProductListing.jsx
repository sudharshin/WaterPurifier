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
    <section className="py-5 bg-white">
      <Container fluid className="px-3 px-md-4">
        {/* Title & Description */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
          <div style={{ maxWidth: "700px" }}>
            <h3 className="fw-bold mb-2 product-title">{title}</h3>
            {description && <p className="mb-0 product-description">{description}</p>}
          </div>

          {products.length > 6 && (
            <Button
              className="view-all-btn mt-2 mt-md-0"
              onClick={() => scroll("all")}
            >
              View All <span className="arrow">→</span>
            </Button>
          )}
        </div>

        {/* Scrollable Row of Product Cards */}
        <div
          className="d-flex overflow-auto flex-nowrap hide-scrollbar pb-2"
          ref={scrollRef}
        >
          {products?.map((p, index) => {
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
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #D3EDFC;
            border: none;
            color: #000;
            font-weight: 500;
            font-size: 16px;
            border-radius: 8px;
            padding: 8px 14px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            font-family: "Poppins", sans-serif;
          }

          .product-title {
            font-family: "Poppins", sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 2.5rem; /* default desktop */
            line-height: 1.2;
            color: #000;
          }

          .product-description {
            font-family: "Poppins", sans-serif;
            font-weight: 300;
            font-size: 1.125rem; /* 18px */
            line-height: 1.6;
            color: #2A2A2A;
          }

          .arrow {
            font-size: 1rem;
          }

          /* Responsive Adjustments */
          @media (max-width: 992px) {
            .product-title {
              font-size: 2rem;
            }
            .product-description {
              font-size: 1rem;
            }
          }

          @media (max-width: 768px) {
            .product-title {
              font-size: 1.75rem;
            }
            .product-description {
              font-size: 0.95rem;
            }
            .view-all-btn {
              align-self: flex-start;
            }
          }

          @media (max-width: 576px) {
            .product-title {
              font-size: 1.5rem;
            }
            .product-description {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </section>
  );
};

export default ProductListing;
