import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

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
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Container fluid="lg">
        <Row className="gy-4 text-center text-md-start">
          {/* Company Info */}
          <Col xs={12} sm={6} md={3}>
            <h4 style={{ fontWeight: 600 }}>Opor</h4>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "#e3f2f7" }}>
              Connecting you to trusted suppliers with quality products, easy details, and quick enquiries – all in one place.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              {[FaWhatsapp, FaInstagram, FaFacebookF].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    color: "#2D7BA5",
                    fontSize: 18,
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
            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Quick Links</h6>
            <ul className="list-unstyled" style={{ fontSize: 16, lineHeight: "2", paddingLeft: 0 }}>
              {["Home", "About Us", "Products", "Enquiry Form", "Testimonials", "FAQs", "Contact Us"].map((item, i) => (
                <li key={i}>
                  <a href="#" style={{ color: "#e3f2f7", textDecoration: "none" }}>{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Products */}
          <Col xs={12} sm={6} md={3}>
            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Products</h6>
            <ul className="list-unstyled" style={{ fontSize: 16, lineHeight: "2", paddingLeft: 0 }}>
              {["Home", "About Us", "Products", "Enquiry Form"].map((item, i) => (
                <li key={i}>
                  <a href="#" style={{ color: "#e3f2f7", textDecoration: "none" }}>{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Address and Hours */}
          <Col xs={12} sm={6} md={3}>
            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Address</h6>
            <p style={{ fontSize: 15, color: "#e3f2f7", marginBottom: 4 }}>
              45 / 5, Bharathiyar 5th street <br />
              Sankarankovil, Tenkasi
            </p>
            <a
              href="#"
              style={{
                color: "#fff",
                fontSize: 15,
                display: "inline-block",
                marginBottom: 20,
                textDecoration: "underline",
              }}
            >
              See on Google Map
            </a>

            <h6 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>Office Hours</h6>
            <p style={{ fontSize: 15, color: "#e3f2f7", marginBottom: 0 }}>
              Mon – Fri ( 8AM – 6PM )
            </p>
          </Col>
        </Row>

        {/* Divider */}
        <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "30px 0" }} />

        {/* Bottom Row */}
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={6}>
            <p style={{ margin: 0, fontSize: 14, color: "#e3f2f7" }}>
              Copyright 2025 all rights reserved
            </p>
          </Col>
          <Col xs={12} md={6} className="mt-2 mt-md-0">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3">
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Privacy</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Security</a>
              <a href="#" style={{ color: "#fff", textDecoration: "none", fontSize: 14 }}>Terms</a>
              <span style={{ fontSize: 14, color: "#e3f2f7" }}>Made with examplename</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
