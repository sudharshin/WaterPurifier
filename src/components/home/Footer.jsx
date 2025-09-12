import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #2D7BA5, #357CA5)",
        color: "#fff",
        paddingTop: 40,
        paddingBottom: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: "auto",

      }}
    >
      <Container fluid="lg">
        <Row className="gy-4 text-center text-md-start">
          {/* Company Info */}
          <Col xs={12} sm={6} md={3}>
            <h4 className="fw-bold">Opor</h4>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>
              Connecting you to trusted suppliers with quality products, easy details, and quick enquiries – all in one place.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start flex-wrap gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    color: "#2D7BA5",
                    fontSize: 16,
                    textDecoration: "none",
                    margin: "5px",
                    flexShrink: 0,
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={6} md={3}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled" style={{ fontSize: 14, paddingLeft: 0 }}>
              {["Home", "About Us", "Products", "Enquiry Form", "Testimonials", "FAQs", "Contact Us"].map((item, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Products */}
          <Col xs={12} sm={6} md={3}>
            <h6 className="fw-bold mb-3">Products</h6>
            <ul className="list-unstyled" style={{ fontSize: 14, paddingLeft: 0 }}>
              {["Water Purifiers", "Filters", "Accessories", "Spare Parts"].map((item, i) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Address */}
          <Col xs={12} sm={6} md={3}>
            <h6 className="fw-bold mb-3">Address</h6>
            <p style={{ fontSize: 14, marginBottom: 4 }}>
              45 / 5, Bharathiyar 5th street <br />
              Sankarankovil, Tenkasi
            </p>
            <a href="#" style={{ color: "#fff", fontSize: 14, display: "inline-block", marginBottom: 12 }}>
              See on Google Map
            </a>
            <h6 className="fw-bold mt-3">Office Hours</h6>
            <p style={{ fontSize: 14, marginBottom: 0 }}>Mon – Fri ( 8AM – 6PM )</p>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "24px 0" }} />

        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={6}>
            <p style={{ margin: 0, fontSize: 14 }}>
              © 2025 TrickyTechies. All rights reserved
            </p>
          </Col>
          <Col xs={12} md={6} className="mt-2 mt-md-0">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3">
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Privacy</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Security</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Terms</a>
              <span style={{ fontSize: 14 }}>Developed by TrickyTechies</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
