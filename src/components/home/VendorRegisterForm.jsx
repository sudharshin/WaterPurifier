// src/components/VendorRegisterPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Card } from "react-bootstrap";

const VendorRegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    businessType: "",
    businessAddress: "",
    taxId: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.companyName) newErrors.companyName = "Company Name is required";
    if (!formData.businessType) newErrors.businessType = "Business Type is required";
    if (!formData.businessAddress) newErrors.businessAddress = "Business Address is required";
    if (!formData.taxId) newErrors.taxId = "Tax ID / GST Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Vendor registration submitted successfully!");
      setSubmitting(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        businessType: "",
        businessAddress: "",
        taxId: "",
      });
    }, 1500);
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ maxWidth: "700px", width: "100%", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Vendor Registration</h2>
          <Form onSubmit={handleSubmit}>
            {[
              { label: "Full Name / Contact Person", name: "fullName", type: "text" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "text" },
              { label: "Password", name: "password", type: "password" },
              { label: "Confirm Password", name: "confirmPassword", type: "password" },
              { label: "Company Name / Business Name", name: "companyName", type: "text" },
              { label: "Business Type", name: "businessType", type: "select", options: ["Manufacturer", "Distributor", "Retailer", "Other"] },
              { label: "Business Address", name: "businessAddress", type: "text" },
              { label: "Tax ID / GST Number / Business Registration Number", name: "taxId", type: "text" },
            ].map((field, idx) => (
              <Form.Group as={Row} className="mb-3" key={idx} controlId={field.name}>
                <Form.Label column sm={4} className="text-end">
                  {field.label}:
                </Form.Label>
                <Col sm={8}>
                  {field.type === "select" ? (
                    <Form.Select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      {field.options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  )}
                  {errors[field.name] && <small className="text-danger">{errors[field.name]}</small>}
                </Col>
              </Form.Group>
            ))}

            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="secondary"
                className="me-3"
                type="button"
                onClick={() => setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  password: "",
                  confirmPassword: "",
                  companyName: "",
                  businessType: "",
                  businessAddress: "",
                  taxId: "",
                })}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Submitting...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VendorRegisterPage;
