import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import purifier from "../../assets/WaterPurifierimg.jpg";
import purifier2 from "../../assets/WaterPurifierimg2.jpg";

const OurProducts = () => {
  // Categories
  const categories = ["All", "Water Purifier", "Spares", "View More"];

  const [activeCategory, setActiveCategory] = useState("All");

  // Product Data (Dynamic)
  const products = [
    {
      id: 1,
      title: "Product Name",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "₹ 20,000",
      category: "Water Purifier",
      image: purifier,
    },
    {
      id: 2,
      title: "Product Name",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "₹ 20,000",
      category: "Water Purifier",
      image: purifier2,
    },
    {
      id: 3,
      title: "Product Name",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "₹ 20,000",
      category: "Water Purifier",
      image: purifier,
    },
    {
      id: 4,
      title: "Product Name",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "₹ 20,000",
      category: "Spares",
      image: purifier2,
    },
    {
      id: 5,
      title: "Product Name",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "₹ 20,000",
      category: "Spares",
      image: purifier,
    },
    {
      id: 6,
      title: "Product Name",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "₹ 20,000",
      category: "View More",
      image: purifier2,
    },
  ];

  // Filter Products
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-5" style={{ background: "#f9f9f9" }}>
      <Container>
        {/* Title + Categories */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Our Products</h3>
          <div className="d-flex gap-2 flex-wrap">
            {categories.map((cat, idx) => (
              <Button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: activeCategory === cat ? "#000" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#000",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  fontWeight: "500",
                  padding: "6px 16px",
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <Row>
          {filteredProducts.map((p) => (
            <Col
              key={p.id}
              xs={12}
              sm={6}
              md={4}
              className="mb-4 d-flex justify-content-center"
            >
              <div
                className="card shadow-sm"
                style={{
                  border: "1px solid #eee",
                  borderRadius: "16px",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "300px",
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    position: "relative",
                    background: "#fff",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                    }}
                  />
                  {/* Heart Icon */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#fff",
                      borderRadius: "50%",
                      padding: "6px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <FaHeart size={16} color="#000" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 text-start">
                  <h6 className="fw-bold">{p.title}</h6>
                  <p className="text-muted small">{p.desc}</p>

                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      className="px-3 py-1 fw-semibold"
                      style={{
                        background: "#f1f1f1",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    >
                      {p.price}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        style={{
                          background: "#000",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                      >
                        Show Now
                      </Button>
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: "50%",
                          padding: "6px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          cursor: "pointer",
                        }}
                      >
                        <FaShoppingCart size={16} color="#000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* View All Button */}
        <div className="text-center mt-4">
          <Button
            onClick={() => setActiveCategory("All")}
            className="d-flex align-items-center justify-content-center gap-2 px-4 py-2 mx-auto"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              color: "#000",
              fontWeight: "500",
              borderRadius: "8px",
            }}
          >
            View All <span style={{ fontSize: "1rem" }}>→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default OurProducts;
