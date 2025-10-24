import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import enquiryImg from "../../assets/EnquirySectionImg.png"; // ✅ Replace with your image path

const EnquirySection = () => {
  const phoneNumber = "+1234567890";
  const email = "support@example.com";
  const whatsappNumber = "+1234567890";

  const [activeBtn, setActiveBtn] = useState(null);

  // Button style function
  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? "#266990" : "#FFFFFF",
    color: isActive ? "#FFFFFF" : "#000000",
    border: "1px solid #CCCCCC",
    borderRadius: "25px",
    fontFamily: "Poppins, Tofu",
    padding: "10px 28px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
  });

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#D3EDFC",
        borderRadius: "20px",
        fontFamily: "Poppins, Tofu",
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
                onClick={() => setActiveBtn("call")}
                href={`tel:${phoneNumber}`}
                style={buttonStyle(activeBtn === "call")}
              >
                Call
              </Button>

              {/* Email Button */}
              <Button
                onClick={() => setActiveBtn("email")}
                href={`mailto:${email}?subject=Enquiry&body=Hi, I’d like to know more about your products.`}
                style={buttonStyle(activeBtn === "email")}
              >
                Email
              </Button>

              {/* WhatsApp Button */}
              <Button
                onClick={() => setActiveBtn("whatsapp")}
                href={`https://wa.me/${whatsappNumber.replace(
                  "+",
                  ""
                )}?text=Hi, I am interested in your products and would like to know more.`}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle(activeBtn === "whatsapp")}
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
                maxHeight: "420px",
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
