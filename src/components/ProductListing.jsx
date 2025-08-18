import React, { useRef } from "react";
import { Container, Button } from "react-bootstrap";
import ProductCard from "./ProductCard"; // ⬅️ import the new card component

const ProductListing = ({ title, description, products }) => {
  const scrollRef = useRef(null);
 
  const scroll = (direction) => {
    if (scrollRef.current) {
      if (direction === "all") {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollWidth,
          behavior: "smooth",
        });
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
            className="d-flex align-items-center justify-content-center gap-2 px-4 py-2 mt-3 mt-md-0"
            style={{
              backgroundColor: "#e6f2ff",
              border: "none",
              color: "#000",
              fontWeight: "500",
              borderRadius: "8px",
              whiteSpace: "nowrap",
            }}
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

      {/* Hide Scrollbar CSS */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default ProductListing;
