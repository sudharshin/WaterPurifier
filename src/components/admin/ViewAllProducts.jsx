import React, { useState } from "react";
import { Container, Table, Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { deleteProduct } from "../../services/api";
import { useProducts } from "../redux/useProduct";

const ViewAllProducts = () => {
  const { products, loading, error, refresh } = useProducts();
  const [showImages, setShowImages] = useState({ show: false, images: [] });
  const [showCustomFields, setShowCustomFields] = useState({
    show: false,
    fields: [],
    productName: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async () => {
    if (!selectedProduct) {
      alert("Please select a product first!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.accessToken;
        await deleteProduct(selectedProduct.id, token);

        await refresh();
        setSelectedProduct(null);
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleEdit = () => {
    if (!selectedProduct) {
      alert("Please select a product first!");
      return;
    }
    navigate(`/form/${selectedProduct.id}`, {
      state: { onReturn: true },
    });
  };

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

  // Refresh products if navigated back with state flag
  React.useEffect(() => {
    if (location.state?.refreshProducts) {
      refresh();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, refresh]);

  return (
    <Container className="py-4">
      <h3 className="mb-4">All Products</h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <Link to="/form" state={{ onReturn: true }}>
            <Button variant="primary">Add Product</Button>
          </Link>
          <Button variant="warning" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={refresh} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Refreshing...
              </>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
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
                    product.isBudgetFriendly ? "Budget Friendly" : null,
                  ]
                    .filter(Boolean)
                    .join(", ") || "-"}
                </td>

                <td>
                  {product.customFields && product.customFields.length > 0 ? (
                    <>
                      <span className="d-inline-block text-truncate" style={{ maxWidth: "200px" }}>
                        {product.customFields
                          .slice(0, 2)
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

      {/* Image Modal */}
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

      {/* Custom Fields Modal */}
      <Modal
        show={showCustomFields.show}
        onHide={() =>
          setShowCustomFields({ show: false, fields: [], productName: "" })
        }
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Custom Fields - {showCustomFields.productName}</Modal.Title>
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
