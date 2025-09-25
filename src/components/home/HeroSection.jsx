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
    text: "Reduce plastic waste and conserve water with our energy-efficient purification system.",
    img: purifier4,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          >
            <div className="hero-content">
              <h1>
                {slide.title}
                <br />
                <span className="highlight">{slide.highlight}</span>
              </h1>
              <p>{slide.text}</p>
              <button className="btn">Explore Product →</button>
            </div>
            <div className="hero-image">
              <img src={slide.img} alt="Water Purifier" />
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button className="arrow left-arrow" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="arrow right-arrow" onClick={nextSlide}>
          &#10095;
        </button>

        {/* Bottom band */}
        <div className="bottom-band">
          <div className="dots-bottom">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* CSS styles */}
      <style>{`
        .hero-wrapper {
          position: relative;
          width: 100%;
        }

        .hero-container {
          position: relative;
          overflow: hidden;
          min-height: 75vh;
          background: linear-gradient(135deg, #eaf6ff, #d6eeff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 4vw, 3rem) 5%;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 100%;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateX(30px);
          transition: all 1s ease;
        }

        .slide.active {
          left: 0;
          opacity: 1;
          transform: translateX(0);
          z-index: 2;
        }

        .hero-content {
          flex: 1;
          min-width: 300px;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: clamp(2rem, 6vw, 80px);
          z-index: 3;
          margin-bottom: 100px;
        }

        .hero-content h1 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #111;
          margin-bottom: 0.8rem;
        }

        .highlight {
          display: inline-block;
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          color: #0066ff;
          font-weight: 800;
          line-height: 1.2;
        }

        .hero-content p {
          font-size: clamp(1.1rem, 1.7vw, 1.3rem);
          margin-top: 1.2rem;
          margin-bottom: 2rem;
          color: #555;
          max-width: 90%;
        }

        .btn {
          background: linear-gradient(90deg, #0066ff, #0040ff);
          border-radius: 50px;
          padding: 0.9rem 2.2rem;
          font-size: 1.1rem;
          font-weight: bold;
          color: #fff;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 100, 255, 0.3);
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .btn:hover {
          background: #003bb3;
          transform: translateY(-2px);
        }

        .hero-image {
          flex: 1;
          min-width: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image img {
          width: clamp(300px, 35vw, 500px);
          filter: drop-shadow(0 10px 30px rgba(0, 100, 255, 0.2));
          transform: scale(1.05);
          transition: transform 0.5s ease;
          position: relative;
          z-index: 3;
          margin-bottom: -70px; /* Pull image below container */
        }

        .slide.active .hero-image img {
          transform: scale(1.1);
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.3);
          color: #fff;
          border: none;
          padding: clamp(0.6rem, 1.5vw, 1rem);
          cursor: pointer;
          border-radius: 50%;
          font-size: clamp(1rem, 2vw, 1.5rem);
          z-index: 5;
          transition: background 0.3s;
        }

        .arrow:hover {
          background-color: rgba(0, 0, 0, 0.6);
        }

        .left-arrow {
          left: clamp(10px, 2vw, 20px);
        }

        .right-arrow {
          right: clamp(10px, 2vw, 20px);
        }

        .bottom-band {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: clamp(100px, 20vh, 160px); /* Increased height */
          background: #d6d6d6;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .dots-bottom {
          display: flex;
          gap: clamp(6px, 1vw, 12px);
        }

        .dot {
          height: clamp(8px, 1vw, 12px);
          width: clamp(8px, 1vw, 12px);
          background-color: #bbb;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dot.active {
          background-color: #0d6efd;
          transform: scale(1.5);
        }

        @media (max-width: 992px) {
          .slide {
            flex-direction: column;
            text-align: center;
            justify-content: center;
          }

          .hero-content {
            padding: 0 20px;
          }

          .btn {
            align-self: center;
          }

          .hero-image img {
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
