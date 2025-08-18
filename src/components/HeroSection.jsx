import React from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import purifier from "../assets/WaterPurifierImgHeroSection.png";

const HeroSection = () => {
  const slides = [
    {
      title: "Clean Water,",
      highlight: "Healthy Life.",
      text: "Advanced purification technologies for home and commercial needs.",
      img: purifier,
      bg: "linear-gradient(135deg, #1a73e8, #4dabff)", // blue gradient
    },
    {
      title: "Pure Taste,",
      highlight: "Every Drop.",
      text: "Experience fresh, mineral-rich water for you and your family.",
      img: purifier,
      bg: "linear-gradient(135deg, #0d6efd, #3bc9db)", // blue gradient
    },
  ];
  return (
    <Carousel fade interval={5000} indicators={false} className="hero-carousel">
      {slides.map((slide, index) => (
        <Carousel.Item
          key={index}
          style={{
            position: "relative",
            minHeight: "100vh", // Full screen height
            background: slide.bg,
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container fluid className="px-lg-5 px-3">
            <Row className="align-items-center">
              {/* Left Side - Text */}
              <Col
                xs={12}
                md={5}
                className="text-md-start text-center mb-4 mb-md-0"
                
              >
                <h1 className="fw-bold display-5 display-md-4">
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
                  Explore Our Products <BsArrowRight />
                </Button>
              </Col>

              {/* Right Side - Image */}
              <Col
                xs={12}
                md={7}
                className="d-flex justify-content-center align-items-center"
              >
                <img
                  src={slide.img}
                  alt="Water Purifier"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    maxWidth: "650px", // keeps it balanced on large screens
                    height: "auto",
                    maxHeight: "85vh",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 3, // ensure above ash strip
                  }}
                />
              </Col>
            </Row>
          </Container>

          {/* Ash Strip at Bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "130px",
              width: "100%",
              backgroundColor: "#e5e5e5",
              zIndex: 1,
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSection;
