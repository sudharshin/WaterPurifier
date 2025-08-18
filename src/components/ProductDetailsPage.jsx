import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductDetailsCard from "./ProductDetailsCard";
import purifier from "../assets/WaterPurifierimg.jpg";
import purifier2 from "../assets/WaterPurifierimg2.jpg";

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

const filtersData = {
  Membrane: ["Membrolla - Alpha - 80 GPD", "Membralla - Beta - 4040", "Membrolla - Alpha - 100 GPD"],
  Panel: ["Digital Panel", "Analog Panel"],
  Model: ["Model A", "Model B", "Model C"],
  Skid: ["Skid 1", "Skid 2"],
  "Membrolla Brand": ["Brand X", "Brand Y"],
  "Used in": ["Domestic", "Commercial"],
  Brand: ["Brand A", "Brand B"],
  Gpd: ["80 GPD", "100 GPD", "200 GPD"],
};

const ProductDetailsPage = () => {
  const [openFilters, setOpenFilters] = useState({ Membrane: true });

  const toggleFilter = (key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-5" style={{ background: "#fff" }}>
      <Container fluid>
        <Row>
          {/* Sidebar Filters */}
          <Col md={3} className="mb-4">
            <div className="p-3 border rounded shadow-sm">
              <h5 className="fw-bold mb-3">Filter</h5>

              {Object.keys(filtersData).map((filterKey, idx) => (
                <div key={idx} className="mb-2">
                  <div
                    className="d-flex justify-content-between align-items-center p-2 border rounded"
                    style={{ cursor: "pointer", background: "#f8f9fa" }}
                    onClick={() => toggleFilter(filterKey)}
                  >
                    <span>{filterKey}</span>
                    <span>{openFilters[filterKey] ? "−" : "+"}</span>
                  </div>

                  {openFilters[filterKey] && (
                    <div className="px-3 py-2 border-start border-end border-bottom">
                      {filtersData[filterKey].map((item, i) => (
                        <Form.Check
                          key={i}
                          type="checkbox"
                          id={`${filterKey}-${i}`}
                          label={item}
                          className="mb-1"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Col>

          {/* Product Grid */}
          <Col md={9}>
            <Row>
              {products.map((p, index) => (
                <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                  <ProductDetailsCard
                    image={p.image}
                    title={p.title}
                    desc={p.desc}
                    price={p.price}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetailsPage;
