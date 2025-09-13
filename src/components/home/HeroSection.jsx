import React, { useState, useEffect } from "react";
import purifier1 from "../../assets/WaterPurifierImgHeroSection.png";
import purifier2 from "../../assets/WaterPurifierImgHeroSection.png";
import purifier3 from "../../assets/WaterPurifierImgHeroSection.png";
import purifier4 from "../../assets/WaterPurifierImgHeroSection.png";

const slides = [
  {
    title: "Trusted Quality",
    highlight: "Safe Hydration",
    text: "Experience the purest water with advanced multi-stage filtration, ensuring the health of your family.",
    img: purifier1,
  },
  {
    title: "Pure Taste",
    highlight: "Every Drop",
    text: "Enjoy fresh, mineral-rich water that your family will love every day.",
    img: purifier2,
  },
  {
    title: "Smart Filtration",
    highlight: "Innovative Technology",
    text: "Advanced purification technology designed for homes and offices.",
    img: purifier3,
  },
  {
    title: "Eco-Friendly",
    highlight: "Sustainable Living",
    text: "Conserve water and energy while enjoying clean, safe drinking water.",
    img: purifier4,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="hero-container">
      {/* Left Content */}
      <div className="hero-content">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : "inactive"}`}
          >
            <h1>
              {slide.title} <br />
              <span className="highlight">{slide.highlight}</span>
            </h1>
            <p>{slide.text}</p>
            <button className="btn">Explore Product →</button>
          </div>
        ))}
      </div>

      {/* Right Image */}
      <div className="hero-image">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.img}
            alt="Water Purifier"
            className={index === currentSlide ? "active" : "inactive"}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>

      <style>{`
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3rem 6%;
          min-height: 70vh;
          background: linear-gradient(135deg, #eaf6ff, #d6eeff);
          position: relative;
          overflow: hidden;
          flex-wrap: wrap; /* ✅ ensures wrapping on small screens */
        }

        /* --- Content --- */
        .hero-content {
          flex: 1;
          min-width: 300px;
          max-width: 600px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .slide {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          transition: transform 0.8s ease, opacity 0.8s ease;
          opacity: 0;
        }

        .slide.active {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
          z-index: 2;
        }

        .slide.inactive {
          opacity: 0;
          transform: translateY(-50%) translateX(50px);
          z-index: 1;
        }

        .hero-content h1 {
          font-size: clamp(1.8rem, 4vw, 3rem); /* ✅ responsive font */
          font-weight: 800;
          color: #111;
          margin-bottom: 1.2rem;
          line-height: 1.2;
        }

        .highlight {
          color: #0d6efd;
        }

        .hero-content p {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: #444;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .btn {
          padding: 0.9rem 2rem;
          border-radius: 35px;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          background: #0d6efd;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .btn:hover {
          transform: scale(1.05);
          background: #0056b3;
        }

        /* --- Image --- */
        .hero-image {
          flex: 1;
          min-width: 280px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-image img {
          max-width: 100%;
          width: clamp(220px, 40vw, 420px); /* ✅ responsive size */
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: transform 0.8s ease, opacity 0.8s ease;
          opacity: 0;
        }

        .hero-image img.active {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
          z-index: 2;
        }

        .hero-image img.inactive {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.95);
          z-index: 1;
        }

        /* Dots */
        .dots {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .dot {
          height: 12px;
          width: 12px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: background 0.3s;
        }

        .dot.active {
          background-color: #0d6efd;
        }

    
        /* Responsive */
        @media (max-width: 768px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
          }

          .hero-content {
            max-width: 100%;
          }

          .hero-content h1 {
            font-size: 2.2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .hero-image img {
            max-width: 300px;
            margin-top: 2rem;
          }
        }

      `}</style>
    </div>
  );
};

export default HeroSection;
