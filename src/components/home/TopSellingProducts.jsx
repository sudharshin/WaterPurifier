import React, { useRef } from "react";
import { Container, Button } from "react-bootstrap";
import purifier from "../../assets/WaterPurifierimg.jpg";
import purifier2 from "../../assets/WaterPurifierimg2.jpg";

const TopSellingProducts = () => {
  const scrollRef = useRef(null);

  const products = [
    { title: "Purifier Model 1", image: purifier, desc: "Compact purifier with smart technology.", price: "₹ 20,000" },
    { title: "Purifier Model 2", image: purifier2, desc: "High-performance water purifier for families.", price: "₹ 18,000" },
    { title: "Purifier Model 3", image: purifier, desc: "Stylish design with efficient filtering.", price: "₹ 22,000" },
    { title: "Purifier Model 4", image: purifier2, desc: "Energy-saving purifier with advanced features.", price: "₹ 19,500" },
    { title: "Purifier Model 5", image: purifier, desc: "Durable build and easy to maintain.", price: "₹ 21,000" },
    { title: "Purifier Model 6", image: purifier2, desc: "Budget-friendly purifier with solid performance.", price: "₹ 20,500" },
    { title: "Purifier Model 7", image: purifier, desc: "Premium model with smart alerts.", price: "₹ 23,000" },
    { title: "Purifier Model 8", image: purifier2, desc: "Compact purifier for modern kitchens.", price: "₹ 24,000" },
  ];

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
        {/* Title + Description with View All button on right */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div style={{ maxWidth: "700px" }}>
            <h3 className="fw-bold mb-2">Top Selling Product</h3>
            <p className="text-muted mb-0">
              Explore our top-selling water purifiers, trusted by thousands of
              families for their durability, design, and advanced purification
              technology.
            </p>
          </div>

          {/* View All Button aligned right */}
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

        {/* Scrollable Product Row */}
        <div
          className="d-flex overflow-auto flex-nowrap hide-scrollbar"
          ref={scrollRef}
          style={{ paddingBottom: "1rem", scrollBehavior: "smooth" }}
        >
          {products.map((p, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-2 px-2 flex-shrink-0"
            >
              {/* Product Card */}
              <div
                className="shadow-sm rounded border p-3 d-flex justify-content-center align-items-center"
                style={{
                  borderColor: "#ccc",
                  height: "220px",
                  backgroundColor: "#f8f9fa", // light ash background
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.08)";
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "160px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="mt-3 text-start">
                <h6 className="fw-bold">{p.title}</h6>
                <p className="text-muted small mb-2">{p.desc}</p>
                <div
                  className="d-inline-block px-3 py-1 fw-semibold"
                  style={{
                    background: "#f1f1f1",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  {p.price}
                </div>
              </div>
            </div>
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

export default TopSellingProducts;
