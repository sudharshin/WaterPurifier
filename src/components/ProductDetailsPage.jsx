import React, { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import ProductDetailsCard from "./ProductDetailsCard";

// Normalize number
const toNumber = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
};

// Define static price ranges for filters (sellingPrice now)
const priceRanges = [
  { label: "Greater than 5,000", value: 5000 },
  { label: "Greater than 9,000", value: 9000 },
  { label: "Greater than 10,000", value: 10000 },
];

const ProductDetailsPage = () => {
  const location = useLocation();
  const { products = [] } = location.state || {};

  const [openFilters, setOpenFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("relevance");
  const [loading, setLoading] = useState(false);

  // ✅ Extract unique brand names
  const brandOptions = useMemo(() => {
    const brands = [];
    products.forEach((p) => {
      if (p.brandName && !brands.includes(p.brandName)) {
        brands.push(p.brandName);
      }
    });
    return brands;
  }, [products]);

  // Toggle filter collapse
  const toggleFilter = useCallback((key) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Handle filter selection
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

  // ✅ Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let next = [...products];

    // Filter by brandName
    if (activeFilters.brandName?.length) {
      next = next.filter((p) =>
        activeFilters.brandName.includes(p.brandName)
      );
    }

    // ✅ Filter by price ranges (sellingPrice now)
    if (activeFilters.price?.length) {
      next = next.filter((p) => {
        const sellingPrice = toNumber(p.sellingPrice);
        return activeFilters.price.some((min) => sellingPrice > min);
      });
    }

    // Sorting
    if (sortBy === "lowToHigh") {
      next = [...next].sort(
        (a, b) => toNumber(a.sellingPrice) - toNumber(b.sellingPrice)
      );
    } else if (sortBy === "highToLow") {
      next = [...next].sort(
        (a, b) => toNumber(b.sellingPrice) - toNumber(a.sellingPrice)
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

              {/* Brand Filter */}
              <div className="mb-2">
                <div
                  className="d-flex justify-content-between align-items-center p-2 border rounded"
                  style={{ cursor: "pointer", background: "#f8f9fa" }}
                  onClick={() => toggleFilter("brandName")}
                >
                  <span className="fw-semibold">Brand</span>
                  <span style={{ fontSize: "20px" }}>
                    {openFilters.brandName ? "−" : "+"}
                  </span>
                </div>

                {openFilters.brandName && (
                  <div className="px-3 py-2 border-start border-end border-bottom">
                    {brandOptions.map((brand, i) => {
                      const isChecked = activeFilters.brandName?.includes(brand);
                      return (
                        <div
                          key={i}
                          className="d-flex align-items-center p-2 mb-1 rounded"
                          style={{
                            backgroundColor: isChecked ? "#e6f0ff" : "transparent",
                            transition: "background-color 0.3s ease",
                            fontWeight: isChecked ? "600" : "400",
                            color: isChecked ? "#0d47a1" : "inherit",
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            id={`brand-${i}`}
                            label={brand}
                            checked={!!isChecked}
                            onChange={() => handleFilterChange("brandName", brand)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ✅ Selling Price Filter */}
              <div className="mb-2">
                <div
                  className="d-flex justify-content-between align-items-center p-2 border rounded"
                  style={{ cursor: "pointer", background: "#f8f9fa" }}
                  onClick={() => toggleFilter("price")}
                >
                  <span className="fw-semibold">Selling Price</span>
                  <span style={{ fontSize: "20px" }}>
                    {openFilters.price ? "−" : "+"}
                  </span>
                </div>

                {openFilters.price && (
                  <div className="px-3 py-2 border-start border-end border-bottom">
                    {priceRanges.map((range, i) => {
                      const isChecked = activeFilters.price?.includes(range.value);
                      return (
                        <div
                          key={i}
                          className="d-flex align-items-center p-2 mb-1 rounded"
                          style={{
                            backgroundColor: isChecked ? "#e6f0ff" : "transparent",
                            transition: "background-color 0.3s ease",
                            fontWeight: isChecked ? "600" : "400",
                            color: isChecked ? "#0d47a1" : "inherit",
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            id={`price-${i}`}
                            label={range.label}
                            checked={!!isChecked}
                            onChange={() => handleFilterChange("price", range.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Reset */}
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
                      brand={p.brandName}
                      image={p.images?.[0]}
                      title={p.name}
                      // desc={p.customFields?.map((cf) => cf.value).join(", ")}
                      price={`₹${p.sellingPrice}`}
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
