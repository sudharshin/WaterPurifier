import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
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

  const [images, setImages] = useState([null]); // start with 1 upload box
  const [errors, setErrors] = useState({});
   const navigate = useNavigate();
   
  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Handle image selection and convert to base64 for storage
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result; // store base64 string instead of File
        setImages(newImages);
        validateField("images", newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add another image input
  const addMoreImage = () => {
    setImages([...images, null]);
  };

  // Remove an image input
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages.length > 0 ? newImages : [null]); // keep at least one input
    validateField("images", newImages);
  };

  // Validation rules
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

  // Validate all before submit
 /* const validateForm = () => {
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    validateField("images", images);
    return (
      Object.values(errors).every((err) => err === "") &&
      images.some((img) => img !== null)
    );
  };*/

  const validateForm = () => {
  let isValid = true;

  // Validate each form field
  Object.keys(formData).forEach((key) => {
    validateField(key, formData[key]);

    if (!formData[key] || formData[key].trim() === "") {
      isValid = false;
    }
  });

  // Validate images separately
  validateField("images", images);
  if (!images.some((img) => img !== null)) {
    isValid = false;
  }

  // Check errors object as well
  if (!Object.values(errors).every((err) => err === "")) {
    isValid = false;
  }

  // If not valid, show popup
 /* if (!isValid) {
    alert("Please fill all required fields before submitting!");
  }*/

  return isValid;
};


  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("products")) || [];
      const newProduct = { ...formData, images }; // images are base64 strings now

      existing.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existing));

      alert("✅ Product added successfully!");
      navigate("/viewallproducts");
    } else {
      alert("❌ Please correct the errors before submitting.");
    }
  };

  // Discard
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
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="p-4 shadow rounded bg-white">
            <h4 className="mb-3">New Product</h4>
            <Form onSubmit={handleSubmit}>
              {/* Product Images */}
              <Form.Group className="mb-3">
                <Form.Label>Upload Product Images</Form.Label>
                {images.map((img, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index)}
                    />
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
                {errors.images && (
                  <div className="text-danger">{errors.images}</div>
                )}
              </Form.Group>

              {/* Product Name */}
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

              {/* Product ID */}
              <Form.Group className="mb-3">
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Enter product ID"
                />
                {errors.id && <div className="text-danger">{errors.id}</div>}
              </Form.Group>

              {/* Category */}
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
                {errors.category && (
                  <div className="text-danger">{errors.category}</div>
                )}
              </Form.Group>

              {/* Buying Price */}
              <Form.Group className="mb-3">
                <Form.Label>Buying Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter buying price"
                />
                {errors.price && (
                  <div className="text-danger">{errors.price}</div>
                )}
              </Form.Group>

              {/* Quantity */}
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
                {errors.quantity && (
                  <div className="text-danger">{errors.quantity}</div>
                )}
              </Form.Group>

              {/* Unit */}
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

              {/* Expiry Date */}
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                />
                {errors.expiry && (
                  <div className="text-danger">{errors.expiry}</div>
                )}
              </Form.Group>

              {/* Threshold Value */}
              <Form.Group className="mb-3">
                <Form.Label>Threshold Value</Form.Label>
                <Form.Control
                  type="text"
                  name="threshold"
                  value={formData.threshold}
                  onChange={handleChange}
                  placeholder="Enter threshold value"
                />
                {errors.threshold && (
                  <div className="text-danger">{errors.threshold}</div>
                )}
              </Form.Group>

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
                <Button variant="primary" type="submit">
                  Add Product
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
