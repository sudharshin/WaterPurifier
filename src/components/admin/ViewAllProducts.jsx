import React, { useState } from "react";
import { Container, Table, Modal, Spinner, Tabs, Tab,Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useProducts } from "../redux/useProduct";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { products, loading, error } = useProducts();
  const [activeTab, setActiveTab] = useState("products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showImages, setShowImages] = useState({ show: false, images: [] });
  const [showCustomFields, setShowCustomFields] = useState({ show: false, fields: [], productName: "" });

  const navigate = useNavigate();

  const fieldLabels = {
    name: "Name",
    id: "ID",
    brandName: "Brand Name",
    buyingPrice: "Buying Price",
    sellingPrice: "Selling Price",
    vendorPrice: "Vendor Price",
    quantity: "Quantity",
    date: "Date",
  };

  const handleTabSelect = (key) => {
    if (key === "admin") {
      navigate("/admin/details");
    } else if (key === "enquiry") {
      navigate("/admin/enquiry");
    } else {
      setActiveTab(key);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold text-primary mb-4 text-center">Dashboard</h2>

      {/* Tab Navigation */}
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-4 justify-content-center"
      >
        <Tab eventKey="products" title="Products">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" />
              <div>Loading products...</div>
            </div>
          ) : error ? (
            <div className="text-danger">Error loading products.</div>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Image</th>
                  {Object.keys(fieldLabels).map((field, idx) => (
                    <th key={idx}>{fieldLabels[field]}</th>
                  ))}
                  <th>Tags</th>
                  <th>Custom Fields</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr
                    key={idx}
                    className={selectedProduct?.id === product.id ? "table-primary" : ""}
                    style={{ height: "70px", verticalAlign: "middle" }}
                  >
                    <td
                      className="text-center"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedProduct(selectedProduct?.id === product.id ? null : product)
                      }
                    >
                      <FaCheckCircle
                        color={selectedProduct?.id === product.id ? "green" : "lightgray"}
                        size={20}
                      />
                    </td>
                    <td>
                      {product.images?.length ? (
                        <>
                          <img
                            src={product.images[0]}
                            alt="product"
                            className="img-fluid rounded border"
                            style={{ maxHeight: "60px", objectFit: "cover" }}
                          />
                          {product.images.length > 1 && (
                            <Button
                              variant="link"
                              className="p-0 ms-2"
                              onClick={() => setShowImages({ show: true, images: product.images })}
                            >
                              View More
                            </Button>
                          )}
                        </>
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    {Object.keys(fieldLabels).map((field, i) => (
                      <td key={i}>{product[field] || "-"}</td>
                    ))}
                    <td>
                      {[product.isTopSelling ? "Top Selling" : null,
                        product.isFeatured ? "Featured" : null,
                        product.isBudgetFriendly ? "Budget Friendly" : null]
                        .filter(Boolean)
                        .join(", ") || "-"}
                    </td>
                    <td>
                      {product.customFields?.length ? (
                        <>
                          <span className="d-inline-block text-truncate" style={{ maxWidth: "200px" }}>
                            {product.customFields
                              .slice(0, 2)
                              .map((f) => `${f.name || f.fieldName}: ${f.value || f.fieldValue}`)
                              .join(", ")}
                          </span>
                          {product.customFields.length > 2 && (
                            <Button
                              variant="link"
                              className="p-0 ms-2"
                              onClick={() =>
                                setShowCustomFields({
                                  show: true,
                                  fields: product.customFields,
                                  productName: product.name,
                                })
                              }
                            >
                              View More
                            </Button>
                          )}
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>

        {/* Placeholder Tabs */}
        <Tab eventKey="admin" title="Admin" />
        <Tab eventKey="enquiry" title="Enquiry" />
      </Tabs>

      {/* Modals */}
      <Modal
        show={showImages.show}
        onHide={() => setShowImages({ show: false, images: [] })}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Images</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-wrap">
          {showImages.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="more"
              className="m-2 border rounded"
              style={{ maxHeight: "200px", maxWidth: "200px", objectFit: "cover" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Modal
        show={showCustomFields.show}
        onHide={() => setShowCustomFields({ show: false, fields: [], productName: "" })}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Custom Fields - {showCustomFields.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showCustomFields.fields.map((f, idx) => (
            <p key={idx}>
              <strong>{f.name || f.fieldName}:</strong> {f.value || f.fieldValue}
            </p>
          ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
