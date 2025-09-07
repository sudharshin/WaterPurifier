import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #2D7BA5, #357CA5)",
        color: "#fff",
        paddingTop: 50,
        paddingBottom: 30,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Container fluid="lg">
        <Row className="gy-4 text-center text-md-start">
          {/* Company Info */}
          <Col xs={12} sm={6} md={3}>
            <h4 style={{ fontWeight: 600, fontSize: 24 }}>Opor</h4>
            <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: "#fff", marginTop: 16 }}>
              Connecting you to trusted suppliers with quality products, easy details, and quick enquiries – all in one place.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-4">
              {[FaWhatsapp, FaInstagram, FaFacebookF].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 46,
                    height: 46,
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    color: "#2D7BA5",
                    fontSize: 20,
                    textDecoration: "none",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={12} sm={6} md={3}>
            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20 }}>Quick Links</h6>
            <ul className="list-unstyled" style={{ fontSize: 16, lineHeight: 2.2, paddingLeft: 0 }}>
              {["Home", "About Us", "Products", "Enquiry Form", "Testimonials", "FAQs", "Contact Us"].map((item, i) => (
                <li key={i}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Products */}
          <Col xs={12} sm={6} md={3}>
            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20 }}>Products</h6>
            <ul className="list-unstyled" style={{ fontSize: 16, lineHeight: 2.2, paddingLeft: 0 }}>
              {["Home", "About Us", "Products", "Enquiry Form"].map((item, i) => (
                <li key={i}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Address */}
          <Col xs={12} sm={6} md={3}>
            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20 }}>Address</h6>
            <p style={{ fontSize: 16, fontWeight: 300, marginBottom: 4 }}>
              45 / 5, Bharathiyar 5th street
            </p>
            <p style={{ fontSize: 16, fontWeight: 300, marginBottom: 4 }}>
              Sankarankovil, Tenkasi
            </p>
            <a
              href="#"
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "underline",
                display: "inline-block",
                marginBottom: 24,
              }}
            >
              See on Google Map
            </a>

            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Office Hours</h6>
            <p style={{ fontSize: 16, fontWeight: 500 }}>
              Mon – Fri ( <strong>8AM – 6PM</strong> )
            </p>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.15)", margin: "40px 0 30px" }} />

        {/* Bottom Footer */}
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={6}>
            <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 0 }}>
              Copyright 2025 all rights reserved
            </p>
          </Col>
          <Col xs={12} md={6} className="mt-2 mt-md-0">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-4">
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Privacy</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Security</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Terms</a>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Made with examplename</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
