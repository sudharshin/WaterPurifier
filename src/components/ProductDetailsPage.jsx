import React, { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import ProductDetailsCard from "./ProductDetailsCard";

// Extract filters once from products
const extractFilters = (products = []) => {
  const filters = {};
  products.forEach((p) => {
    Object.keys(p).forEach((key) => {
      if (["title", "image", "desc", "price", "id"].includes(key)) return;
      if (!filters[key]) filters[key] = [];
      if (!filters[key].includes(p[key])) filters[key].push(p[key]);
    });
  });
  return filters;
};

// Price normalization
const toPriceNumber = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
};

const ProductDetailsPage = () => {
  const location = useLocation();
  const { products = [] } = location.state || {};

  const [openFilters, setOpenFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [loading, setLoading] = useState(false);

  // Memoize filter data
  const filtersData = useMemo(() => extractFilters(products), [products]);

  // Optimized toggle
  const toggleFilter = useCallback((key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Optimized filter selection
  const handleFilterChange = useCallback((filterKey, value) => {
    setActiveFilters((prev) => {
      const prevValues = prev[filterKey] || [];
      if (prevValues.includes(value)) {
        const nextValues = prevValues.filter((v) => v !== value);
        if (nextValues.length) return { ...prev, [filterKey]: nextValues };
        const { [filterKey]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [filterKey]: [...prevValues, value] };
    });
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setActiveFilters({});
    setSortBy("relevance");
    setOpenFilters({});
  }, []);

  // Derived filtered + sorted products
  const filteredProducts = useMemo(() => {
    let next = products.filter((product) =>
      Object.keys(activeFilters).every((filterKey) =>
        activeFilters[filterKey]?.includes(product[filterKey])
      )
    );

    if (sortBy === "lowToHigh") {
      next = [...next].sort(
        (a, b) => toPriceNumber(a.price) - toPriceNumber(b.price)
      );
    } else if (sortBy === "highToLow") {
      next = [...next].sort(
        (a, b) => toPriceNumber(b.price) - toPriceNumber(a.price)
      );
    }
    return next;
  }, [products, activeFilters, sortBy]);

  return (
    <section
      className="pt-5 mt-4"
      style={{
        background: "#fff",
        minHeight: "calc(100vh - 120px)",
        paddingBottom: "60px",
      }}
    >
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="mb-4">
            <div
              className="p-3 border rounded shadow-sm sticky-top bg-white"
              style={{ top: "80px" }}
            >
              <h5 className="fw-bold mb-3">Filters</h5>

              {Object.keys(filtersData).map((filterKey, idx) => (
                <div key={idx} className="mb-2">
                  <div
                    className="d-flex justify-content-between align-items-center p-2 border rounded"
                    style={{ cursor: "pointer", background: "#f8f9fa" }}
                    onClick={() => toggleFilter(filterKey)}
                  >
                    <span className="fw-semibold text-capitalize">
                      {filterKey}
                    </span>
                    <span style={{ fontSize: "20px" }}>
                      {openFilters[filterKey] ? "−" : "+"}
                    </span>
                  </div>

                  {openFilters[filterKey] && (
                    <div className="px-3 py-2 border-start border-end border-bottom">
                      {filtersData[filterKey].map((item, i) => {
                        const isChecked = activeFilters[filterKey]?.includes(
                          item
                        );
                        return (
                          <div
                            key={i}
                            className="d-flex align-items-center p-2 mb-1 rounded"
                            style={{
                              backgroundColor: isChecked
                                ? "#e6f0ff"
                                : "transparent",
                              transition: "background-color 0.3s ease",
                              fontWeight: isChecked ? "600" : "400",
                              color: isChecked ? "#0d47a1" : "inherit",
                            }}
                          >
                            <Form.Check
                              type="checkbox"
                              id={`${filterKey}-${i}`}
                              label={item}
                              checked={!!isChecked}
                              onChange={() =>
                                handleFilterChange(filterKey, item)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {(Object.keys(activeFilters).length > 0 ||
                sortBy !== "relevance") && (
                <div className="text-center mt-3">
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </Col>

          {/* Products Section */}
          <Col md={9}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
              <p className="mb-0">
                Showing {filteredProducts.length} of {products.length} results
              </p>
              <Form.Select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ maxWidth: "220px" }}
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </Form.Select>
            </div>

            <Row className="gx-4 gy-4">
              {loading ? (
                <div className="text-center mt-5 w-100">
                  <Spinner animation="border" />
                  <p className="mt-2">Loading products...</p>
                </div>
              ) : filteredProducts.length ? (
                filteredProducts.map((p, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    className="d-flex align-items-stretch"
                  >
                    <ProductDetailsCard
                      brand={p.brand}
                      image={p.image}
                      title={p.title}
                      desc={p.desc}
                      price={p.price}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center mt-4 w-100">No products found</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetailsPage;
