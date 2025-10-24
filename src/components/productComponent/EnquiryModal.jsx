import React, { useState } from "react";
import { Modal, Form, Button, Spinner, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createEnquiry } from "../../services/api";

const EnquiryModal = ({ show, onClose, product }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const data = {
        productId: product?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
      };

      await createEnquiry(data);

      setSubmitted(true);
      setSubmitting(false);

      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      setError("Failed to submit enquiry. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="md">
      <div className="p-4">
        <h4 className="text-center text-primary mb-4">Product Enquiry</h4>

        {submitted ? (
          <div className="text-success text-center fw-semibold py-5">
            ✅ Enquiry Submitted Successfully!
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Product Name */}
              <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end mb-1 mb-md-0">
                  <Form.Label>Product</Form.Label>
                </Col>
                <Col xs={12} md={8} className="d-flex align-items-center">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={product?.name || ""}
                    className="mb-0 p-0"
                    style={{ fontWeight: "600", color: "#333", border: "none" }}
                  />
                </Col>
              </Row>

              {/* Name */}
              <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end mb-1 mb-md-0">
                  <Form.Label>Name</Form.Label>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="rounded"
                  />
                </Col>
              </Row>

              {/* Email */}
              <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end mb-1 mb-md-0">
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="rounded"
                  />
                </Col>
              </Row>

              {/* Phone */}
              <Row className="mb-3 align-items-center">
                <Col xs={12} md={4} className="text-md-end mb-1 mb-md-0">
                  <Form.Label>Phone</Form.Label>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number (optional)"
                    className="rounded"
                  />
                </Col>
              </Row>

              {/* Message */}
              <Row className="mb-4 align-items-center">
                <Col xs={12} md={4} className="text-md-end mb-1 mb-md-0">
                  <Form.Label>Message</Form.Label>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your enquiry message"
                    required
                    className="rounded"
                  />
                </Col>
              </Row>

              {/* Buttons */}
              <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex justify-content-end w-100 gap-2 flex-wrap">
                  <Button variant="secondary" onClick={onClose} disabled={submitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="btn-primary px-4">
                    {submitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>

                {/* Bulk order link */}
                <div className="mt-3 text-center">
                  For bulk orders, register as a{" "}
                  <span
                    style={{ color: "#0d6efd", cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      onClose();
                      navigate("/register"); // adjust route to your VendorRegisterPage
                    }}
                  >
                    vendor
                  </span>
                </div>
              </div>
            </Form>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EnquiryModal;
