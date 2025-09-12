import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import enquiryImg from "../../assets/EnquirySectionImg.png"; // ✅ Replace with your image path

const EnquirySection = () => {
  const phoneNumber = "+1234567890"; // ✅ Replace with your number
  const email = "support@example.com"; // ✅ Replace with your email
  const whatsappNumber = "+1234567890"; // ✅ Replace with your WhatsApp number

  // Track which button is active
  const [activeBtn, setActiveBtn] = useState(null);

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#E6F3FB",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Column - Text */}
          <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
            <h2 className="fw-bold mb-3" style={{ fontSize: "2.2rem" }}>
              Have an Enquiry? <br /> Let’s Talk!
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: "1rem" }}>
              Whether you have a question, need advice, or want a tailored
              solution – our team is just a message or call away.
            </p>

            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
              {/* Call Button */}
              <Button
                href={`tel:${phoneNumber}`}
                onClick={() => setActiveBtn("call")}
                style={{
                  backgroundColor:
                    activeBtn === "call" ? "#003366" : "#fff",
                  color: activeBtn === "call" ? "#fff" : "#000",
                  border: "1px solid #ddd",
                  borderRadius: "25px",
                  padding: "10px 28px",
                  fontWeight: "500",
                }}
              >
                Call
              </Button>

              {/* Email Button */}
              <Button
                href={`mailto:${email}?subject=Enquiry&body=Hi, I’d like to know more about your products.`}
                onClick={() => setActiveBtn("email")}
                style={{
                  backgroundColor:
                    activeBtn === "email" ? "#003366" : "#fff",
                  color: activeBtn === "email" ? "#fff" : "#000",
                  border: "1px solid #ddd",
                  borderRadius: "25px",
                  padding: "10px 28px",
                  fontWeight: "500",
                }}
              >
                Email
              </Button>

              {/* WhatsApp Button */}
              <Button
                href={`https://wa.me/${whatsappNumber.replace(
                  "+",
                  ""
                )}?text=Hi, I am interested in your products and would like to know more.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveBtn("whatsapp")}
                style={{
                  backgroundColor:
                    activeBtn === "whatsapp" ? "#003366" : "#fff",
                  color: activeBtn === "whatsapp" ? "#fff" : "#000",
                  border: "1px solid #ddd",
                  borderRadius: "25px",
                  padding: "10px 28px",
                  fontWeight: "500",
                }}
              >
                Whatsapp
              </Button>
            </div>
          </Col>

          {/* Right Column - Image */}
          <Col xs={12} md={6} className="text-center text-md-end">
            <img
              src={enquiryImg}
              alt="Enquiry"
              className="img-fluid"
              style={{
                maxHeight: "420px", // ✅ makes the man image taller
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EnquirySection;
