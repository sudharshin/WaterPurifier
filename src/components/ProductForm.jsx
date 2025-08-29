import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams(); // if editing, this will be populated
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    expiry: "",
    threshold: "",
  });

  const [images, setImages] = useState([null]);
  const [customFields, setCustomFields] = useState([]);
  const [newCustomField, setNewCustomField] = useState({ name: "", type: "text", value: "" });
  const [errors, setErrors] = useState({});

  // Predefined form fields
  const predefinedFields = [
    "name",
    "id",
    "category",
    "price",
    "quantity",
    "unit",
    "expiry",
    "threshold",
  ];

  // Load existing product details if editing
  useEffect(() => {
    if (id) {
      const existing = JSON.parse(localStorage.getItem("products")) || [];
      const product = existing.find((p) => p.id === id);
      if (product) {
        setFormData({
          name: product.name || "",
          id: product.id || "",
          category: product.category || "",
          price: product.price || "",
          quantity: product.quantity || "",
          unit: product.unit || "",
          expiry: product.expiry || "",
          threshold: product.threshold || "",
        });
        setImages(product.images && product.images.length > 0 ? product.images : [null]);
        setCustomFields(product.customFields || []);
      }
    }
  }, [id]);

  // Handle changes for predefined fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Handle image upload
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
        validateField("images", newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addMoreImage = () => setImages([...images, null]);

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages.length > 0 ? newImages : [null]);
    validateField("images", newImages);
  };

  // Handle custom field input
  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setNewCustomField({ ...newCustomField, [name]: value });
  };

  // Add custom field
  const addCustomField = () => {
    const fieldName = newCustomField.name.trim().toLowerCase();

    if (!newCustomField.name) {
      alert("Custom field name is required!");
      return;
    }

    if (predefinedFields.includes(fieldName)) {
      alert("⚠️ This field already exists in the form!");
      return;
    }

    if (customFields.some((field) => field.name.toLowerCase() === fieldName)) {
      alert("⚠️ This custom field is already added!");
      return;
    }

    setCustomFields([...customFields, newCustomField]);
    setNewCustomField({ name: "", type: "text", value: "" }); // reset
  };

  const removeCustomField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields);
  };

  // Validation
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value) message = "Product name is required";
        else if (!/^[A-Za-z0-9\s]+$/.test(value))
          message = "Product name can contain only letters and numbers";
        break;

      case "id":
        if (!value) message = "Product ID is required";
        else if (!/^[A-Za-z0-9]+$/.test(value))
          message = "Product ID must be alphanumeric";
        break;

      case "category":
        if (!value) message = "Category must be selected";
        break;

      case "price":
        if (!value) message = "Buying price is required";
        else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(value) || Number(value) <= 0)
          message = "Enter a valid positive number";
        break;

      case "quantity":
        if (!value) message = "Quantity is required";
        else if (!/^[0-9]+$/.test(value) || Number(value) <= 0)
          message = "Quantity must be a positive number";
        break;

      case "unit":
        if (!value) message = "Unit is required";
        else if (!/^[0-9]+$/.test(value))
          message = "Unit must be a number";
        break;

      case "expiry":
        if (!value) message = "Expiry date is required";
        else {
          const today = new Date();
          const selectedDate = new Date(value);
          today.setHours(0, 0, 0, 0);
          if (selectedDate <= today)
            message = "Expiry date must be in the future";
        }
        break;

      case "threshold":
        if (!value) message = "Threshold value is required";
        else if (!/^[0-9]+$/.test(value) || Number(value) <= 0)
          message = "Threshold must be a positive number";
        break;

      case "images":
        if (value.length === 0 || !value.some((img) => img !== null))
          message = "At least one product image is required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key] || formData[key].trim() === "") isValid = false;
    });

    validateField("images", images);
    if (!images.some((img) => img !== null)) isValid = false;

    if (!Object.values(errors).every((err) => err === "")) isValid = false;

    return isValid;
  };

  // Submit form (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existing = JSON.parse(localStorage.getItem("products")) || [];

      if (id) {
        // Update existing product
        const updated = existing.map((p) =>
          p.id === id ? { ...formData, images, customFields } : p
        );
        localStorage.setItem("products", JSON.stringify(updated));
        alert("✅ Product updated successfully!");
      } else {
        // Add new product
        const newProduct = { ...formData, images, customFields };
        existing.push(newProduct);
        localStorage.setItem("products", JSON.stringify(existing));
        alert("✅ Product added successfully!");
      }

      navigate("/viewallproducts");
    } else {
      alert("❌ Please correct the errors before submitting.");
    }
  };

  const handleDiscard = () => {
    setFormData({
      name: "",
      id: "",
      category: "",
      price: "",
      quantity: "",
      unit: "",
      expiry: "",
      threshold: "",
    });
    setImages([null]);
    setErrors({});
    setCustomFields([]);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="p-4 shadow rounded bg-white">
            <h4 className="mb-3">{id ? "Update Product" : "New Product"}</h4>
            <Form onSubmit={handleSubmit}>
              {/* Images */}
              <Form.Group className="mb-3">
                <Form.Label>Upload Product Images</Form.Label>
                {images.map((img, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    {img && (
                      <img
                        src={img}
                        alt="preview"
                        width="50"
                        height="50"
                        className="ms-2 border"
                      />
                    )}
                    {images.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={addMoreImage}
                >
                  + Add More
                </Button>
                {errors.images && <div className="text-danger">{errors.images}</div>}
              </Form.Group>

              {/* Predefined Fields */}
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Enter product ID"
                  disabled={!!id} // prevent changing ID on edit
                />
                {errors.id && <div className="text-danger">{errors.id}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select product category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothing">Clothing</option>
                </Form.Select>
                {errors.category && <div className="text-danger">{errors.category}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter buying price"
                />
                {errors.price && <div className="text-danger">{errors.price}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="Enter product unit (numbers only)"
                />
                {errors.unit && <div className="text-danger">{errors.unit}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                />
                {errors.expiry && <div className="text-danger">{errors.expiry}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Threshold Value</Form.Label>
                <Form.Control
                  type="text"
                  name="threshold"
                  value={formData.threshold}
                  onChange={handleChange}
                  placeholder="Enter threshold value"
                />
                {errors.threshold && <div className="text-danger">{errors.threshold}</div>}
              </Form.Group>

              {/* Custom Fields */}
              <div className="mb-3 border p-3 rounded">
                <h6>Add Custom Field</h6>
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newCustomField.name}
                      onChange={handleCustomFieldChange}
                      placeholder="Field Name"
                    />
                  </Col>
                  <Col>
                    <Form.Select
                      name="type"
                      value={newCustomField.type}
                      onChange={handleCustomFieldChange}
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Control
                      type={newCustomField.type}
                      name="value"
                      value={newCustomField.value}
                      onChange={handleCustomFieldChange}
                      placeholder="Field Value"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button variant="success" onClick={addCustomField}>
                      Add
                    </Button>
                  </Col>
                </Row>

                {customFields.length > 0 && (
                  <div className="mt-3">
                    {customFields.map((field, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                      >
                        <span>
                          <b>{field.name}</b> ({field.type}) : {field.value}
                        </span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeCustomField(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={handleDiscard}>
                  Discard
                </Button>
                <Button variant="primary" type="submit">
                  {id ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
