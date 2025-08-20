import React, { useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";  // ⬅️ for navigation
import ProductCard from "./ProductCard";

const ProductListing = ({ title, description, products }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      if (direction === "all") {
        // Instead of scrolling → route to details page
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
        {/* Title + Description + Button */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div style={{ maxWidth: "700px" }}>
            <h3 className="fw-bold mb-2">{title}</h3>
            {description && <p className="text-muted mb-0">{description}</p>}
          </div>

          <Button
            className="view-all-btn d-flex align-items-center justify-content-center gap-2 px-4 py-2 mt-3 mt-md-0"
            onClick={() => scroll("all")}
          >
            View All <span style={{ fontSize: "1rem" }}>→</span>
          </Button>
        </div>

        {/* Scrollable Row of Product Cards */}
        <div
          className="d-flex overflow-auto flex-nowrap hide-scrollbar"
          ref={scrollRef}
          style={{ paddingBottom: "1rem", scrollBehavior: "smooth" }}
        >
          {products?.map((p, index) => (
            <ProductCard
              key={index}
              image={p.image}
              title={p.title}
              desc={p.desc}
              price={p.price}
            />
          ))}
        </div>
      </Container>

      {/* Extra Styles */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* View All Button transition */
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
            background-color: #003366 !important; /* dark blue */
            color: #fff !important;
          }
        `}
      </style>
    </section>
  );
};

export default ProductListing;
