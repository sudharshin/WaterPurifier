// src/components/EnquiryModal.jsx
import React, { useState } from "react";
import { Modal, Form, Button, Spinner, Row, Col } from "react-bootstrap";

const EnquiryModal = ({ show, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Enquiry Submitted", { ...formData, product });
      setSubmitted(true);
      setSubmitting(false);

      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({ name: "", email: "", address: "" });
      }, 2000);
    }, 1200);
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
          <Form onSubmit={handleSubmit}>
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
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>

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
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>

            <Row className="mb-4 align-items-center">
              <Col xs={12} md={4} className="text-md-end mb-1 mb-md-0">
                <Form.Label>Address</Form.Label>
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  className="rounded"
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-end flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="btn-primary px-4"
              >
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
          </Form>
        )}
      </div>

      {/* Inline styling to match ProductForm */}
      <style>{`
        .modal-content {
          border-radius: 12px;
          box-shadow: 0 0 16px rgba(0,0,0,0.1);
          border: none;
        }

        .form-label {
          font-weight: 500;
          color: #333;
        }

        .form-control {
          border: 1px solid #ced4da;
          font-size: 15px;
        }

        .btn-primary {
          background-color: #0d6efd;
          border: none;
          font-weight: 500;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        .btn-secondary {
          background-color: #6c757d;
          border: none;
        }

        .btn-secondary:hover {
          background-color: #5a6268;
        }
      `}</style>
    </Modal>
  );
};

export default EnquiryModal;
