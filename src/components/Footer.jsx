import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #2D7BA5, #357CA5)",
        color: "#fff",
        padding: "40px 0 15px 0",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        marginTop: "auto", // 👈 keeps footer at bottom if content is short
      }}
    >
      <Container>
        {/* Top Section */}
        <Row className="mb-4 text-center text-md-start">
          {/* Company Info */}
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <h4 className="fw-bold">Opor</h4>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              Connecting you to trusted suppliers with quality products, easy
              details, and quick enquiries – all in one place.
            </p>
            {/* Social Icons */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3 flex-wrap">
              <a href="#" style={iconStyle}><FaFacebookF /></a>
              <a href="#" style={iconStyle}><FaTwitter /></a>
              <a href="#" style={iconStyle}><FaInstagram /></a>
              <a href="#" style={iconStyle}><FaLinkedinIn /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={3} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled" style={{ fontSize: "14px" }}>
              {["Home","About Us","Products","Enquiry Form","Testimonials","FAQs","Contact Us"].map((item,i)=>(
                <li key={i}><a href="#" style={linkStyle}>{item}</a></li>
              ))}
            </ul>
          </Col>

          {/* Products */}
          <Col xs={6} md={3} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Products</h6>
            <ul className="list-unstyled" style={{ fontSize: "14px" }}>
              {["Water Purifiers","Filters","Accessories","Spare Parts"].map((item,i)=>(
                <li key={i}><a href="#" style={linkStyle}>{item}</a></li>
              ))}
            </ul>
          </Col>

          {/* Address */}
          <Col xs={12} md={3}>
            <h6 className="fw-bold mb-3">Address</h6>
            <p style={{ fontSize: "14px" }}>
              45 / 5, Bharathiyar 5th street <br />
              Sankarankovil, Tenkasi
            </p>
            <a href="#" style={{ color: "#fff", fontSize: "14px" }}>
              See on Google Map
            </a>
            <h6 className="fw-bold mt-3">Office Hours</h6>
            <p style={{ fontSize: "14px" }}>Mon – Fri ( 8AM – 6PM )</p>
          </Col>
        </Row>

        {/* Divider */}
        <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Bottom Section */}
        <Row className="d-flex justify-content-between align-items-center text-center text-md-start">
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <p style={{ margin: 0, fontSize: "14px" }}>
              © 2025 Opor. All rights reserved
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <a href="#" style={linkStyle}>Privacy</a> &nbsp;&nbsp;
            <a href="#" style={linkStyle}>Security</a> &nbsp;&nbsp;
            <a href="#" style={linkStyle}>Terms</a> &nbsp;&nbsp;
            <span style={{ fontSize: "14px" }}>Made with ❤️ by examplename</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// ✅ Styles
const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  color: "#2D7BA5",
  fontSize: "16px",
  textDecoration: "none",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  transition: "color 0.3s ease",
};

export default Footer;
