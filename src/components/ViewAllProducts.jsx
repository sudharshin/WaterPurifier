import React, { useEffect, useState } from "react";
import { Button, Table, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [editImages, setEditImages] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Delete with confirmation
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = [...products];
      updated.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(updated));
      setProducts(updated);
    }
  };

  // Start editing
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(products[index]);
    setEditImages(products[index].images || []);
  };

  // Handle text field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...editImages];
        updatedImages[index] = reader.result; // base64
        setEditImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addMoreImage = () => {
    setEditImages([...editImages, null]);
  };

  const removeImage = (index) => {
    const updated = editImages.filter((_, i) => i !== index);
    setEditImages(updated.length > 0 ? updated : [null]);
  };

  // Save changes
  const handleSave = () => {
    const updated = [...products];
    updated[editIndex] = { ...editData, images: editImages };
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
    setEditIndex(null);
    setEditData({});
    setEditImages([]);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditIndex(null);
    setEditData({});
    setEditImages([]);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">All Products</h3>
       <div className="d-flex justify-content-between align-items-center mb-4">
        {/* ✅ Button to redirect to AddProducts form */}
        <Link to="/form">
          <Button variant="primary">Add Product</Button>
        </Link>
      </div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Images</th>
            <th>Product Name</th>
            <th>ID</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Expiry</th>
            <th>Threshold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>
                  {product.images && product.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt="Product"
                      style={{ width: "50px", height: "50px", marginRight: "5px" }}
                      rounded
                    />
                  ))}
                </td>
                {editIndex === index ? (
                  <>
                    {/* Editable fields */}
                    <td>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="id"
                        value={editData.id}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="category"
                        value={editData.category}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="unit"
                        value={editData.unit}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        name="expiry"
                        value={editData.expiry}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="threshold"
                        value={editData.threshold}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <div>
                        {editImages.map((img, i) => (
                          <div key={i} className="d-flex align-items-center mb-1">
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, i)}
                            />
                            {img && (
                              <Image
                                src={img}
                                alt="preview"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  marginLeft: "10px",
                                }}
                                rounded
                              />
                            )}
                            {editImages.length > 1 && (
                              <Button
                                variant="danger"
                                size="sm"
                                className="ms-2"
                                onClick={() => removeImage(i)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={addMoreImage}
                        >
                          + Add More
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Normal display mode */}
                    <td>{product.name}</td>
                    <td>{product.id}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.unit}</td>
                    <td>{product.expiry}</td>
                    <td>{product.threshold}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAllProducts;
