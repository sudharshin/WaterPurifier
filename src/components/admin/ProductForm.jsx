import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
  refreshAccessToken,
} from "../../services/api";

// Get valid token (refresh if needed)
const getValidToken = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  let token = user.accessToken;
  const refresh = user.refreshToken;

  if (!token && refresh) {
    try {
      const res = await refreshAccessToken(refresh);
      token = res.data.accessToken;
      const updatedUser = { ...user, accessToken: token };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Token refresh failed", err);
      localStorage.removeItem("user");
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!token) throw new Error("No valid token found.");
  return token;
};

// Format date for date input
const formatDateForInput = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toISOString().split("T")[0];
};

// Upload to Cloudinary
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "purifier_preset");
  data.append("cloud_name", "dam4nl5ra");

  const res = await fetch("https://api.cloudinary.com/v1_1/dam4nl5ra/image/upload", {
    method: "POST",
    body: data,
  });

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const result = await res.json();
  return result.secure_url;
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    brandName: "",
    buyingPrice: "",
    sellingPrice: "",
    vendorPrice: "",
    quantity: "",
    date: "",
    isTopSelling: false,
    isFeatured: false,
    isBudgetFriendly: false,
    description: "",
    customFields: [],
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const token = await getValidToken();
        const res = await getProductById(id, token);
        const p = res.data;

        setFormData({
          ...p,
          date: formatDateForInput(p.date),
           productCode: p.productCode || "",
          customFields: p.customFields || [],
        });

        const imageObjects = (p.images || []).map((url) => ({
          file: null,
          preview: url,
          uploaded: true,
        }));

        setImages(imageObjects);
      } catch (err) {
        console.error("Failed to load product:", err);
        alert("Error loading product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    return () => {
      images.forEach(({ preview, uploaded }) => {
        if (!uploaded && preview) URL.revokeObjectURL(preview);
      });
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (files) => {
    const fileArray = Array.from(files);
    const newImages = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploaded: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const removed = prev[index];
      if (!removed.uploaded && removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const addCustomFieldRow = () => {
    const hasEmpty = formData.customFields.some(
      (row) => !row.name?.trim() || !row.value?.trim()
    );
    if (hasEmpty) return alert("Fill existing custom fields first!");
    setFormData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { name: "", value: "" }],
    }));
  };

  const updateCustomFieldRow = (index, field, value) => {
    const updated = [...formData.customFields];
    updated[index][field] = value;
    setFormData({ ...formData, customFields: updated });
  };

  const removeCustomFieldRow = (index) => {
    const updated = [...formData.customFields];
    updated.splice(index, 1);
    setFormData({ ...formData, customFields: updated });
  };

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
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    else if (selectedDate <= today) newErrors.date = "Date must be in the future";

    if (
      !formData.isTopSelling &&
      !formData.isFeatured &&
      !formData.isBudgetFriendly
    ) {
      newErrors.categories = "Select at least one category";
    }

    formData.customFields.forEach((row, index) => {
      if (!row.name?.trim())
        newErrors[`customFields_name_${index}`] = "Field Name is required";
      if (!row.value?.trim())
        newErrors[`customFields_value_${index}`] = "Value is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const token = await getValidToken();

      const uploadedImageUrls = [];

      for (const img of images) {
        if (img.uploaded) {
          uploadedImageUrls.push(img.preview);
        } else {
          const url = await uploadToCloudinary(img.file);
          uploadedImageUrls.push(url);
        }
      }

      const payload = {
        ...formData,
        images: uploadedImageUrls,
        customFields: formData.customFields,
      };

      if (id) {
        await updateProduct(id, payload, token);
      } else {
        await createProduct(payload, token);
      }

      alert(`✅ Product ${id ? "updated" : "added"} successfully!`);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "❌ Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100" >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }


  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100"  style={{paddingTop:"30px"}}>
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }}>
          <div className="p-4 shadow rounded bg-white">
            <h3 className="text-center mb-4">Inventory</h3>
            <Form onSubmit={handleSubmit}>
              {/* Image Upload */}
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
                  {errors.images && <p className="text-danger">{errors.images}</p>}
                  <div className="d-flex mt-2 flex-wrap">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="position-relative me-2 mb-2"
                        style={{ width: 80, height: 80 }}
                      >
                        <img
                          src={img.preview}
                          alt={`Product ${i}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0 p-1 small-btn"
                          onClick={() => removeImage(i)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Standard Fields */}
              {[
                { label: "Item Name", name: "name", type: "text" },
                { label: "Product Code", name: "productCode", type: "text" },
                { label: "Brand Name", name: "brandName", type: "text" },
                { label: "Buying Price", name: "buyingPrice", type: "number" },
                { label: "Selling Price", name: "sellingPrice", type: "number" },
                { label: "Vendor Price", name: "vendorPrice", type: "number" },
                { label: "Quantity", name: "quantity", type: "number" },
                { label: "Expiry Date", name: "date", type: "date", min: minDate },
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

              {/* Description */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Label>Description</Form.Label>
                </Col>
                <Col md={8}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ maxWidth: "400px" }}
                  />
                  {errors.description && (
                    <p className="text-danger">{errors.description}</p>
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
                          value={row.name}
                          onChange={(e) =>
                            updateCustomFieldRow(index, "name", e.target.value)
                          }
                          style={{ maxWidth: "200px" }}
                        />
                        {errors[`customFields_name_${index}`] && (
                          <p className="text-danger">
                            {errors[`customFields_name_${index}`]}
                          </p>
                        )}
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Value"
                          value={row.value}
                          onChange={(e) =>
                            updateCustomFieldRow(index, "value", e.target.value)
                          }
                          style={{ maxWidth: "200px" }}
                        />
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
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="primary" onClick={addCustomFieldRow}>
                    Add Row
                  </Button>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={{ span: 8, offset: 4 }}>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const confirmDiscard = window.confirm("Discard changes?");
                        if (confirmDiscard) navigate("/admin/dashboard");
                      }}
                      disabled={submitting}
                    >
                      Discard
                    </Button>

                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Saving...
                        </>
                      ) : (
                        `${id ? "Update" : "Add"} Product`
                      )}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
