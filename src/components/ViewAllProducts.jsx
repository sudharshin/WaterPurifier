import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [showImages, setShowImages] = useState({ show: false, images: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">All Products</h3>
       <div className="d-flex justify-content-between align-items-center mb-4">
        {/* ✅ Button to redirect to AddProducts form */}
        <Link to="/form">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>ID</th>
              <th>Category</th>
              <th>Buying Price</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Expiry</th>
              <th>Threshold</th>
              <th>Custom Fields</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx}>
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
                <td>{product.name}</td>
                <td>{product.id}</td>
                <td>{product.category || "-"}</td>
                <td>{product.price || "-"}</td>
                <td>{product.quantity || "-"}</td>
                <td>{product.unit || "-"}</td>
                <td>{product.expiry || "-"}</td>
                <td>{product.threshold || "-"}</td>

                {/* ✅ Custom Fields */}
                <td>
                  {product.customFields && product.customFields.length > 0 ? (
                    <ul className="mb-0 ps-3">
                      {product.customFields.map((field, i) => (
                        <li key={i}>
                          <b>{field.name}:</b>{" "}
                          {field.value && field.value !== "" ? field.value : "-"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for showing all images */}
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
    </Container>
  );
};

export default ViewAllProducts;
