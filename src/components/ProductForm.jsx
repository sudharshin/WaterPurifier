import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    brandName: "",
    buyingPrice: "",
    sellingPrice: "",
    vendorPrice: "",
    quantity: "",
    date: "",
    isTopSelling: false,
    isFeatured: false,
    isBudgetFriendly: false,
    customFields: [], // always array
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Load existing product when editing
  useEffect(() => {
    if (id) {
      const existing = JSON.parse(localStorage.getItem("products")) || [];
      const product = existing.find((p) => p.id === id);
      if (product) {
        setFormData({
          ...product,
          customFields: product.customFields || [], // ✅ ensure array
        });
        setImages(product.images || []);
      }
    }
  }, [id]);

  // Handle normal input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle image upload
  const handleImageChange = (files) => {
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Add custom field row
  const addCustomFieldRow = () => {
    setFormData((prev) => ({
      ...prev,
      customFields: [
        ...prev.customFields,
        { fieldName: "", fieldType: "", value: "" },
      ],
    }));
  };

  // Update custom field row with validation
  const updateCustomFieldRow = (index, field, value) => {
    const updated = [...formData.customFields];
    updated[index][field] = value;

    if (field === "fieldName") {
      const normalized = value.trim().toLowerCase();

      const isDuplicate = updated.some(
        (f, i) => i !== index && f.fieldName.trim().toLowerCase() === normalized
      );

      const mainFields = [
        "name",
        "id",
        "brandName",
        "buyingPrice",
        "sellingPrice",
        "vendorPrice",
        "quantity",
        "date",
      ];
      const isInMainForm = mainFields.includes(normalized);

      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          [`customFields_fieldName_${index}`]: "Field name is required",
        }));
      } else if (isDuplicate) {
        setErrors((prev) => ({
          ...prev,
          [`customFields_fieldName_${index}`]: "Field name already exists",
        }));
      } else if (isInMainForm) {
        setErrors((prev) => ({
          ...prev,
          [`customFields_fieldName_${index}`]:
            "This field already exists in the form",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`customFields_fieldName_${index}`];
          return newErrors;
        });
      }
    }

    setFormData({ ...formData, customFields: updated });
  };

  const removeCustomFieldRow = (index) => {
    const updated = [...formData.customFields];
    updated.splice(index, 1);
    setFormData({ ...formData, customFields: updated });

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`customFields_fieldName_${index}`];
      delete newErrors[`customFields_fieldType_${index}`];
      delete newErrors[`customFields_value_${index}`];
      return newErrors;
    });
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const selectedDate = new Date(formData.date);

    if (!images.length) newErrors.images = "At least one image is required";
    if (!formData.name) newErrors.name = "Item name is required";
    if (!formData.id) newErrors.id = "Product code is required";
    if (!formData.brandName) newErrors.brandName = "Brand name is required";
    if (!formData.buyingPrice) newErrors.buyingPrice = "Buying price is required";
    if (!formData.sellingPrice) newErrors.sellingPrice = "Selling price is required";
    if (!formData.vendorPrice) newErrors.vendorPrice = "Vendor price is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else if (selectedDate <= today) {
      newErrors.date = "Date must be in the future"; // ✅ stricter check
    }

    if (
      !formData.isTopSelling &&
      !formData.isFeatured &&
      !formData.isBudgetFriendly
    ) {
      newErrors.categories = "At least one category must be selected";
    }

    // Validate custom fields
    const seenFieldNames = new Set();
    formData.customFields.forEach((row, i) => {
      if (!row.fieldName.trim()) {
        newErrors[`customFields_fieldName_${i}`] = "Field name is required";
      } else if (seenFieldNames.has(row.fieldName.trim().toLowerCase())) {
        newErrors[`customFields_fieldName_${i}`] = "Field name already exists";
      } else {
        seenFieldNames.add(row.fieldName.trim().toLowerCase());
      }

      if (!row.fieldType)
        newErrors[`customFields_fieldType_${i}`] = "Field type is required";
      if (!row.value)
        newErrors[`customFields_value_${i}`] = "Value is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const existing = JSON.parse(localStorage.getItem("products")) || [];
    if (id) {
      const updated = existing.map((p) =>
        p.id === id ? { ...formData, images } : p
      );
      localStorage.setItem("products", JSON.stringify(updated));
      alert("✅ Product updated successfully!");
    } else {
      const newProduct = { ...formData, images };
      existing.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existing));
      alert("✅ Product added successfully!");
    }

    navigate("/viewallproducts");
  };

  // Get tomorrow for min date restriction
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }}>
          <div className="p-4 shadow rounded bg-white">
            <h3 className="text-center mb-4">Inventory</h3>

            <Form onSubmit={handleSubmit}>
              {/* Images */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Product Images</Form.Label>
                </Col>
                <Col md={8}>
                  <div
                    className="d-flex align-items-center justify-content-center border border-2 rounded"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderStyle: "dashed",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                    onClick={() => document.getElementById("imageUpload").click()}
                  >
                    <span className="text-muted">
                      Drag image here <br /> or <br /> <u>Browse image</u>
                    </span>
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange(e.target.files)}
                  />

                  {errors.images && (
                    <p className="text-danger">{errors.images}</p>
                  )}

                  <div className="d-flex mt-2 flex-wrap">
                    {images.map((img, i) => (
                      <div key={i} className="position-relative me-2 mb-2">
                        <img
                          src={img}
                          alt={`Product ${i}`}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0"
                          onClick={() => removeImage(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Basic Fields */}
              {[
                { label: "Item Name", name: "name", type: "text" },
                { label: "Product Code", name: "id", type: "text" },
                { label: "Brand Name", name: "brandName", type: "text" },
                { label: "Buying Price", name: "buyingPrice", type: "number" },
                { label: "Selling Price", name: "sellingPrice", type: "number" },
                { label: "Vendor Price", name: "vendorPrice", type: "number" },
                { label: "Quantity", name: "quantity", type: "number" },
                {
                  label: "Expiry Date",
                  name: "date",
                  type: "date",
                  min: minDate,
                },
              ].map((field, idx) => (
                <Row className="mb-3" key={idx}>
                  <Col md={4}>
                    <Form.Label>{field.label}</Form.Label>
                  </Col>
                  <Col md={8}>
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      min={field.min || undefined}
                      style={{ maxWidth: "300px" }}
                    />
                    {errors[field.name] && (
                      <p className="text-danger">{errors[field.name]}</p>
                    )}
                  </Col>
                </Row>
              ))}

              {/* Categories */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Categories</Form.Label>
                </Col>
                <Col md={8}>
                  {["isTopSelling", "isFeatured", "isBudgetFriendly"].map(
                    (cat, i) => (
                      <Form.Check
                        key={i}
                        type="checkbox"
                        label={cat.replace("is", "").replace(/([A-Z])/g, " $1")}
                        name={cat}
                        checked={formData[cat]}
                        onChange={handleChange}
                      />
                    )
                  )}
                  {errors.categories && (
                    <p className="text-danger">{errors.categories}</p>
                  )}
                </Col>
              </Row>

              {/* Custom Fields */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Custom Fields</Form.Label>
                </Col>
                <Col md={8}>
                  {formData.customFields.map((row, index) => (
                    <Row key={index} className="mb-2">
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Field Name"
                          value={row.fieldName}
                          onChange={(e) =>
                            updateCustomFieldRow(index, "fieldName", e.target.value)
                          }
                          style={{ maxWidth: "200px" }}
                        />
                        {errors[`customFields_fieldName_${index}`] && (
                          <p className="text-danger">
                            {errors[`customFields_fieldName_${index}`]}
                          </p>
                        )}
                      </Col>
                      <Col>
                        <Form.Select
                          value={row.fieldType}
                          onChange={(e) =>
                            updateCustomFieldRow(index, "fieldType", e.target.value)
                          }
                          style={{ maxWidth: "150px" }}
                        >
                          <option value="">Select Type</option>
                          <option value="Text">Text</option>
                          <option value="Number">Number</option>
                          <option value="Date">Date</option>
                        </Form.Select>
                        {errors[`customFields_fieldType_${index}`] && (
                          <p className="text-danger">
                            {errors[`customFields_fieldType_${index}`]}
                          </p>
                        )}
                      </Col>
                      <Col>
                        {row.fieldType === "Text" && (
                          <Form.Control
                            type="text"
                            placeholder="Value"
                            value={row.value}
                            onChange={(e) =>
                              updateCustomFieldRow(index, "value", e.target.value)
                            }
                            style={{ maxWidth: "200px" }}
                          />
                        )}
                        {row.fieldType === "Number" && (
                          <Form.Control
                            type="number"
                            placeholder="Value"
                            value={row.value}
                            onChange={(e) =>
                              updateCustomFieldRow(index, "value", e.target.value)
                            }
                            style={{ maxWidth: "200px" }}
                          />
                        )}
                        {row.fieldType === "Date" && (
                          <Form.Control
                            type="date"
                            min={minDate}
                            value={row.value}
                            onChange={(e) =>
                              updateCustomFieldRow(index, "value", e.target.value)
                            }
                            style={{ maxWidth: "200px" }}
                          />
                        )}
                        {errors[`customFields_value_${index}`] && (
                          <p className="text-danger">
                            {errors[`customFields_value_${index}`]}
                          </p>
                        )}
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="danger"
                          onClick={() => removeCustomFieldRow(index)}
                        >
                          🗑
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="outline-primary" onClick={addCustomFieldRow}>
                    + Add Field
                  </Button>
                </Col>
              </Row>

              {/* Buttons */}
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  type="button"
                  onClick={() => navigate("/viewallproducts")}
                >
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
