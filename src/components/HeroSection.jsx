import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Fixed import
import purifier from "../assets/WaterPurifierimg.jpg";

const HeroSection = () => {
  return (
    <section
      style={{
        background: "linear-gradient(90deg, #1a73e8, #3a8dfd)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        padding: "60px 0"
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Text */}
          <Col md={3}>
            <h1 style={{ fontWeight: "bold", fontSize: "3rem", lineHeight: "1.2" }}>
              Clean Water,{" "}
              <span
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "#bfe6ff"
                }}
              >
                Healthy Life.
              </span>
            </h1>
            <p
              style={{
                color: "#e0f0ff",
                fontSize: "1.1rem",
                marginTop: "15px"
              }}
            >
              Advanced purification technologies for home and commercial needs
            </p>

            <div className="mt-4">
              <Button
                style={{
                  backgroundColor: "#fff",
                  color: "#1a73e8",
                  border: "none",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                Shop Now <BsArrowRight />
              </Button>
            </div>
          </Col>

          {/* Right Side - Image */}
          <Col md={8} className="text-center">
            <img
              src={ purifier}
              alt="Water Purifier"
              style={{
                width: "100%",
                maxHeight: "450px",
                objectFit: "contain"
              }}
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>

      {/* Slider Nav Buttons */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          background: "#fff",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}
      >
        <BsChevronLeft color="#1a73e8" size={20} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          background: "#fff",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}
      >
        <BsChevronRight color="#1a73e8" size={20} />
      </div>
    </section>
  );
};

export default HeroSection;
