import React from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import purifier from "../assets/WaterPurifierimg.jpg";
import purifier2 from "../assets/waterpurifierimg2.jpg";
import "../assets/css/HeroSection.css"; // custom styles

const HeroSection = () => {
  const slides = [
    {
      title: "Clean Water,",
      highlight: "Healthy Life.",
      text: "Advanced purification technologies for home and commercial needs.",
      img: purifier,
      bg: "linear-gradient(135deg, #1a73e8, #4dabff)",
    },
    {
      title: "Pure Taste,",
      highlight: "Every Drop.",
      text: "Experience fresh, mineral-rich water for you and your family.",
      img: purifier2,
      bg: "linear-gradient(135deg, #0d6efd, #3bc9db)",
    },
  ];

  return (
    <Carousel fade interval={5000} indicators={false} className="hero-carousel">
      {slides.map((slide, index) => (
        <Carousel.Item
          key={index}
          style={{
            background: slide.bg,
            color: "#fff",
            padding: "60px 30px", // <-- added horizontal spacing
            minHeight: "500px",
          }}
        >
          <Container fluid className="px-lg-5 px-3">
            <Row className="align-items-center">
              {/* Left Side - Text */}
              <Col md={5} className="text-md-start text-center">
                <h1 className="fw-bold display-4">
                  {slide.title}{" "}
                  <span className="fst-italic" style={{ color: "#bfe6ff" }}>
                    {slide.highlight}
                  </span>
                </h1>
                <p className="mt-3 fs-5">{slide.text}</p>
                <Button
                  variant="light"
                  className="rounded-pill fw-semibold mt-4 px-4 py-2 d-inline-flex align-items-center gap-2"
                >
                  Shop Now <BsArrowRight />
                </Button>
              </Col>

              {/* Right Side - Image */}
              <Col
                md={7}
                className="d-flex justify-content-end align-items-center"
              >
                <img
                  src={slide.img}
                  alt="Water Purifier"
                  style={{
                    height: "420px",
                    width: "420px",
                    objectFit: "contain",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSection;
