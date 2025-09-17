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
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          >
            <div className="hero-content">
              <h1>
                {slide.title} <br />
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

        {/* Bottom solid ash band with dots */}
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

      <style>{`
        .hero-wrapper {
          position: relative;
          width: 100%;
        }

        /* Hero container */
        .hero-container {
          position: relative;
          overflow: hidden;
          min-height: 70vh;
          background: linear-gradient(135deg, #eaf6ff, #d6eeff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 3vw, 3rem) 5%;
        }

        /* Each slide absolute */
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
          transition: all 1s ease-in-out;
        }

        .slide.active {
          left: 0;
          opacity: 1;
          z-index: 2;
        }

        .hero-content {
          flex: 1;
          min-width: 280px;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: clamp(2rem, 6vw, 80px);
          z-index: 3;
        }

        .hero-content h1 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 600;
          color: #111;
          margin-bottom: 1.2rem;
          line-height: 1.2;
        }

        .highlight {
          color: #0d6efd;
        }

        .hero-content p {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #444;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        /* ✅ Responsive Button */
        .btn {
          padding: clamp(0.6rem, 2vw, 0.9rem) clamp(1.2rem, 4vw, 2rem);
          border-radius: clamp(20px, 5vw, 35px);
          border: none;
          font-weight: 600;
          font-size: clamp(0.9rem, 2.5vw, 1rem);
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

        .hero-image {
          flex: 1;
          min-width: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-image img {
          max-width: 100%;
          width: clamp(220px, 35vw, 420px);
          height: auto;
        }

        /* Arrows */
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0,0,0,0.3);
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
          background-color: rgba(0,0,0,0.6);
        }

        .left-arrow {
          left: clamp(10px, 2vw, 20px);
        }

        .right-arrow {
          right: clamp(10px, 2vw, 20px);
        }

        /* Bottom solid ash band */
        .bottom-band {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: clamp(50px, 10vh, 80px);
          background: #d6d6d6;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 4;
        }

        /* Bottom Dots */
        .dots-bottom {
          display: flex;
          gap: clamp(6px, 1vw, 10px);
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
          transform: scale(1.2);
        }

        /* Responsive */
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
            align-self: center; /* center button on smaller screens */
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
