import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductDetailsCard from "./ProductDetailsCard";
import HeroSection from "./HeroSection";

// ✅ Utility to extract dynamic filter values
const extractFilters = (products = []) => {
  const filters = {};
  products.forEach((p) => {
    Object.keys(p).forEach((key) => {
      if (["title", "image", "desc", "price", "id"].includes(key)) return; // skip non-filter fields

      if (!filters[key]) filters[key] = [];
      if (!filters[key].includes(p[key])) filters[key].push(p[key]);
    });
  });
  return filters;
};

const ProductDetailsPage = () => {
  const location = useLocation();
  const { products = [] } = location.state || {}; // fallback safety

  const filtersData = useMemo(() => extractFilters(products), [products]);

  const [openFilters, setOpenFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  // Toggle open/close sidebar filter section
  const toggleFilter = (key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle checkbox change
  const handleFilterChange = (filterKey, value) => {
    setActiveFilters((prev) => {
      const prevValues = prev[filterKey] || [];
      if (prevValues.includes(value)) {
        return { ...prev, [filterKey]: prevValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [filterKey]: [...prevValues, value] };
      }
    });
  };

  // ✅ Apply filters dynamically
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      Object.keys(activeFilters).every((filterKey) => {
        if (!activeFilters[filterKey]?.length) return true;
        return activeFilters[filterKey].includes(product[filterKey]);
      })
    );
  }, [products, activeFilters]);

  return (
    <section className="py-5" style={{ background: "#fff" }}>
      <Container fluid>
        <Row>
          {/* ✅ Sidebar Filters */}
          <Col md={3} className="mb-4">
            <div className="p-3 border rounded shadow-sm sticky-top" style={{ top: "80px" }}>
              <h5 className="fw-bold mb-3">Filters</h5>

              {Object.keys(filtersData).map((filterKey, idx) => (
                <div key={idx} className="mb-2">
                  {/* Header with toggle */}
                  <div
                    className="d-flex justify-content-between align-items-center p-2 border rounded"
                    style={{ cursor: "pointer", background: "#f8f9fa" }}
                    onClick={() => toggleFilter(filterKey)}
                  >
                    <span className="fw-semibold text-capitalize">{filterKey}</span>
                    <span style={{ fontSize: "20px" }}>
                      {openFilters[filterKey] ? "−" : "+"}
                    </span>
                  </div>

                  {/* Checkbox list */}
                  {openFilters[filterKey] && (
                    <div className="px-3 py-2 border-start border-end border-bottom">
                      {filtersData[filterKey].map((item, i) => (
                        <Form.Check
                          key={i}
                          type="checkbox"
                          id={`${filterKey}-${i}`}
                          label={item}
                          checked={activeFilters[filterKey]?.includes(item) || false}
                          onChange={() => handleFilterChange(filterKey, item)}
                          className="mb-1"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* ✅ Reset button */}
              {Object.keys(activeFilters).length > 0 && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => setActiveFilters({})}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </Col>

          {/* ✅ Product Grid */}
          <Col md={9}>
            <Row>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p, index) => (
                  <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                    <ProductDetailsCard
                      image={p.image}
                      title={p.title}
                      desc={p.desc}
                      price={p.price}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center mt-4">No products found</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetailsPage;
