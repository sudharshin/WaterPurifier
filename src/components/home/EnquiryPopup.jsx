import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Modal, Form, Button } from "react-bootstrap";

const EnquiryPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {}; // get product from navigate

  const [showModal, setShowModal] = useState(true); // Show form on page load
  const [showSuccess, setShowSuccess] = useState(false); // Success popup

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    product: product || {}
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData, "Product:", product);

    setShowModal(false);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/"); // Redirect to home page after success
  };

  return (
    <Container>
      {/* Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Enquiry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {product && (
            <p>
              <strong>Product:</strong> {product.name}
            </p>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={3}
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={handleSuccessClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Form submitted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EnquiryPopup;
