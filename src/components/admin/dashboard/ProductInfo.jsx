import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSync } from "react-icons/fa";
import { useProducts } from "../../redux/useProduct";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { deleteProduct } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const ProductInfo = () => {
  const { products, loading, error, refresh } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const productsPerPage = 10;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleEdit = () => {
    if (selectedIds.length !== 1) {
      alert("Please select exactly one product to edit!");
      return;
    }
    navigate(`/form/${selectedIds[0]}`, { state: { onReturn: true } });
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert("Please select product(s) to delete!");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} product(s)?`))
      return;

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.accessToken;
      for (let id of selectedIds) {
        await deleteProduct(id, token);
      }
      await refresh();
      setSelectedIds([]);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product(s).");
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const styles = {
    container: { width: "100%", display: "flex", flexDirection: "column", gap: "10px" },
    toolbar: { display: "flex", gap: "10px", marginBottom: "15px" },
    headers: {
      display: "grid",
      gridTemplateColumns: "0.5fr 1fr 2fr 1fr 1fr 1fr 1fr",
      fontWeight: 600,
      padding: "10px 20px",
      borderBottom: "2px solid #ccc",
    },
    headerCell: { display: "flex", alignItems: "center" },
    card: (selected) => ({
      display: "grid",
      gridTemplateColumns: "0.5fr 1fr 2fr 1fr 1fr 1fr 1fr",
      alignItems: "center",
      backgroundColor: selected ? "#e0f0ff" : "#ffffff",
      color: "#2A2A2A",
      borderRadius: "14px",
      padding: "15px 20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
    cell: { fontSize: "15px", fontWeight: 500, display: "flex", alignItems: "center" },
    modalBody: {
      maxHeight: "none",
      overflowY: "visible",
    },
    modalContent: {
      overflow: "visible",
    },
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spinner animation="border" /> Loading products...
      </div>
    );
  if (error) return <p style={{ color: "red" }}>Error loading products.</p>;
  if (!products || products.length === 0) return <p>No products available.</p>;

  return (
    <div style={styles.container}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <Button variant="primary" onClick={() => navigate("/form")}>
          <FaPlus /> Add Product
        </Button>
        <Button variant="warning" disabled={selectedIds.length !== 1} onClick={handleEdit}>
          <FaEdit /> Edit
        </Button>
        <Button variant="danger" disabled={selectedIds.length === 0} onClick={handleDelete}>
          <FaTrash /> Delete
        </Button>
        <Button variant="secondary" onClick={refresh}>
          <FaSync /> Refresh
        </Button>
      </div>

      {/* Field Labels */}
      <div style={styles.headers}>
        <div style={styles.headerCell}></div>
        <div style={styles.headerCell}>Image</div>
        <div style={styles.headerCell}>Product Name</div>
        <div style={styles.headerCell}>Brand Name</div>
        <div style={styles.headerCell}>Buying Price</div>
        <div style={styles.headerCell}>Vendor Price</div>
        <div style={styles.headerCell}>Quantity</div>
      </div>

      {/* Product Cards */}
      {currentProducts.map((product) => (
        <div
          key={product.id}
          style={styles.card(selectedIds.includes(product.id))}
          onClick={() => setSelectedProduct(product)}
        >
          {/* Checkbox */}
          <div style={styles.cell} onClick={(e) => e.stopPropagation()}>
            <Form.Check
              type="checkbox"
              checked={selectedIds.includes(product.id)}
              onChange={() => toggleSelect(product.id)}
            />
          </div>

          {/* Image */}
          <div style={styles.cell}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                borderRadius: "8px",
                backgroundColor: "#f0f0f0",
              }}
            />
          </div>

          {/* Product Name */}
          <div style={styles.cell}>{product.name}</div>

          {/* Brand Name */}
          <div style={styles.cell}>{product.brandName}</div>

          {/* Buying Price */}
          <div style={styles.cell}>₹{product.buyingPrice}</div>

          {/* Vendor Price */}
          <div style={styles.cell}>₹{product.vendorPrice}</div>

          {/* Quantity */}
          <div style={styles.cell}>{product.quantity}</div>
        </div>
      ))}

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", gap: "10px" }}>
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "primary" : "outline-primary"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      {/* Modal Popup */}
      <Modal
        show={selectedProduct !== null}
        onHide={() => setSelectedProduct(null)}
        size="lg"
        centered
        scrollable={false} // make sure this is false to avoid internal scroll
      >
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.modalBody}>
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              />
              <p>
                <strong>Description:</strong> {selectedProduct.description}
              </p>
              <h6>Custom Fields:</h6>
              <ul>
                {selectedProduct.customFields.map((field, idx) => (
                  <li key={idx}>
                    <strong>{field.name}:</strong> {field.value}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Buying Price:</strong> ₹{selectedProduct.buyingPrice}
              </p>
              <p>
                <strong>Vendor Price:</strong> ₹{selectedProduct.vendorPrice}
              </p>
              <p>
                <strong>Selling Price:</strong> ₹{selectedProduct.sellingPrice}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedProduct.quantity}
              </p>
              <p>
                <strong>Featured:</strong> {selectedProduct.isFeatured ? "Yes" : "No"} |{" "}
                <strong>Top Selling:</strong> {selectedProduct.isTopSelling ? "Yes" : "No"} |{" "}
                <strong>Budget Friendly:</strong> {selectedProduct.isBudgetFriendly ? "Yes" : "No"}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProductInfo;
