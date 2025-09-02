import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // ✅ Selection icon

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [showImages, setShowImages] = useState({ show: false, images: [] });
  const [showCustomFields, setShowCustomFields] = useState({
    show: false,
    fields: [],
    productName: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  // ✅ Map field keys to proper display labels
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

  const handleDelete = () => {
    if (!selectedProduct) {
      alert("Please select a product first!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== selectedProduct.id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      setSelectedProduct(null);
    }
  };

  const handleEdit = () => {
    if (!selectedProduct) {
      alert("Please select a product first!");
      return;
    }
    navigate(`/form/${selectedProduct.id}`);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">All Products</h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <Link to="/form">
            <Button variant="primary">Add Product</Button>
          </Link>
          <Button variant="warning" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
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
              <th>Custom Fields</th> {/* ✅ Single column for all custom fields */}
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={idx}
                className={
                  selectedProduct?.id === product.id ? "table-primary" : ""
                }
                style={{ height: "70px", verticalAlign: "middle" }} // ✅ Smaller row height
              >
                {/* ✅ Selection icon */}
                <td
                  className="text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setSelectedProduct(
                      selectedProduct?.id === product.id ? null : product
                    )
                  }
                >
                  <FaCheckCircle
                    color={
                      selectedProduct?.id === product.id ? "green" : "lightgray"
                    }
                    size={20}
                  />
                </td>

                {/* ✅ Image display */}
                <td>
                  {product.images && product.images.length > 0 ? (
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
                          onClick={() =>
                            setShowImages({ show: true, images: product.images })
                          }
                        >
                          View More
                        </Button>
                      )}
                    </>
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>

                {/* ✅ Show fixed fields dynamically */}
                {Object.keys(fieldLabels).map((field, i) => (
                  <td key={i}>{product[field] || "-"}</td>
                ))}

                {/* ✅ Combine checkbox values into one column */}
                <td>
                  {[
                    product.isTopSelling ? "Top Selling" : null,
                    product.isFeatured ? "Featured" : null,
                    product.isBudgetFriendly ? "Budget Friendly" : null,
                  ]
                    .filter(Boolean)
                    .join(", ") || "-"}
                </td>

                {/* ✅ Custom Fields with "View More" option */}
                <td>
                  {product.customFields && product.customFields.length > 0 ? (
                    <>
                      <span className="d-inline-block text-truncate" style={{ maxWidth: "200px" }}>
                        {product.customFields
                          .slice(0, 2) // show only first 2 inline
                          .map((f, idx) => {
                            const key = f.name || f.fieldName || "Unknown";
                            const val = f.value || f.fieldValue || "-";
                            return `${key}: ${val}`;
                          })
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

      {/* ✅ Modal for showing all images */}
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
              style={{
                maxHeight: "200px",
                maxWidth: "200px",
                objectFit: "cover",
              }}
            />
          ))}
        </Modal.Body>
      </Modal>

      {/* ✅ Modal for showing full custom fields */}
      <Modal
        show={showCustomFields.show}
        onHide={() =>
          setShowCustomFields({ show: false, fields: [], productName: "" })
        }
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Custom Fields - {showCustomFields.productName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showCustomFields.fields.map((f, idx) => {
            const key = f.name || f.fieldName || "Unknown";
            const val = f.value || f.fieldValue || "-";
            return (
              <p key={idx}>
                <strong>{key}:</strong> {val}
              </p>
            );
          })}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ViewAllProducts;
