import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid="lg">
        <Row className="gy-4 text-center text-md-start">
          {/* Company Info */}
          <Col xs={12} sm={6} md={3}>
            <h4>Leomax</h4>
            <p style={{ fontFamily: "Poppins, Tofu" }}>
              Connecting you to trusted suppliers with quality products, easy
              details, and quick enquiries – all in one place.
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
                     fontFamily: "Poppins, Tofu",
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
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              {[
                "Home",
                "About Us",
                "Products",
                "Enquiry Form",
                "Testimonials",
                "FAQs",
                "Contact Us",
              ].map((item, i) => (
                <li key={i}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Products */}
          <Col xs={12} sm={6} md={3}>
            <h6>Products</h6>
            <ul className="list-unstyled">
              {["Home", "About Us", "Products", "Enquiry Form"].map((item, i) => (
                <li key={i}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Address */}
          <Col xs={12} sm={6} md={3} style={{ fontFamily: "Poppins, Tofu" }}>
            <h6>Address</h6>
            <p style={{ fontFamily: "Poppins, Tofu" }}>45 / 5, Bharathiyar 5th street</p>
            <p style={{ fontFamily: "Poppins, Tofu" }}>Sankarankovil, Tenkasi</p>
            <a href="#" className="map-link">
              See on Google Map
            </a>

            <h6 className="mt-3">Office Hours</h6>
            <p className="office-hours" style={{ fontFamily: "Poppins, Tofu" }}>
              Mon – Fri ( <strong>8AM – 6PM</strong> )
            </p>
          </Col>
        </Row>

        <hr />

        {/* Bottom Footer */}
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={6}>
            <p className="footer-bottom mb-0" style={{ fontFamily: "Poppins, Tofu" }}>
              Copyright 2025 all rights reserved
            </p>
          </Col>
          <Col xs={12} md={6} className="mt-2 mt-md-0">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-4">
              <a href="#">Privacy</a>
              <a href="#">Security</a>
              <a href="#">Terms</a>
              <span className="footer-bottom">Made with examplename</span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ✅ Inline CSS inside JSX */}
      <style>{`
       
        .footer {
          background: linear-gradient(135deg, #2D7BA5, #357CA5);
          color: #fff;
          padding-top: 50px;
          font-family: "Poppins, Tofu";
          padding-bottom: 30px;
          border-top-left-radius: 40px;
          border-top-right-radius: 40px;
          font-family: "Poppins", sans-serif;
        }

        .footer p {
          font-weight: 300;
          font-size: 15px;
          line-height: 25px;
          font-family: "Poppins, Tofu";
          margin-bottom: 10px;
          color: #fff;
        }

        .footer h4 {
          font-weight: 600;
           fontFamily: "Poppins, Tofu";
          font-size: 24px;
          color: #fff;
        }

        .footer h6 {
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 20px;
           fontFamily: "Poppins, Tofu";
          color: #fff;
        }

        .footer a {
          color: #fff;
          text-decoration: none;
          font-weight: 400;
           fontFamily: "Poppins, Tofu";
          font-size: 15px;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 10px;
          background-color: #fff;
          color: #2D7BA5;
          font-size: 20px;
        }

        .map-link {
          font-size: 16px;
          font-weight: 500;
          text-decoration: underline;
          display: inline-block;
          fontFamily: "Poppins, Tofu";
          margin-bottom: 24px;
        }

        .office-hours {
          font-weight: 500;
          fontFamily: "Poppins, Tofu";
        }

        .footer hr {
          border-color: rgba(255, 255, 255, 0.15);
          margin: 40px 0 30px;
        }

        .footer-bottom {
          font-size: 15px;
           fontFamily: "Poppins, Tofu";
          font-weight: 500;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
