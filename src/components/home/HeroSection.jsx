import React, { useState, useEffect } from "react";
import purifier from "../../assets/WaterPurifierImgHeroSection.png";

const slides = [
  {
    title: "Clean Water",
    highlight: "Healthy Life",
    text: "Advanced purification technologies for home and commercial needs.",
    img: purifier,
  },
  {
    title: "Pure Taste",
    highlight: "Every Drop",
    text: "Experience fresh, mineral-rich water for you and your family.",
    img: purifier,
  },
  {
    title: "Eco Friendly",
    highlight: "Sustainable Choice",
    text: "Our purifiers are energy-efficient and environmentally friendly.",
    img: purifier,
  },
  {
    title: "Smart Design",
    highlight: "Modern Homes",
    text: "Sleek, compact, and stylish purifiers that fit your home décor.",
    img: purifier,
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="hero-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="hero-slider"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
        aria-live="polite"
      >
        {slides.map((slide, i) => (
          <div className="hero-slide" key={i}>
            <div className="slide-content">
              <h1>
                {slide.title} <span className="highlight">{slide.highlight}</span>
              </h1>
              <p>{slide.text}</p>
              <button className="btn">Explore Our Products →</button>
            </div>
            <div className="slide-image">
              <img src={slide.img} alt={`${slide.title} - ${slide.highlight}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="navigation-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Styles */}
      <style>{`
        .hero-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          min-height: 70vh;
          background: linear-gradient(135deg, #0d6efd, #4dabff);
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .hero-slider {
          display: flex;
          width: ${slides.length * 100}%;
          transition: transform 0.8s ease-in-out;
        }

        .hero-slide {
          min-width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          color: #fff;
        }

        .slide-content {
          flex: 1;
          max-width: 50%;
        }

        .slide-content h1 {
          font-size: 2.8rem;
          font-weight: bold;
          margin-bottom: 1rem;
          animation: fadeSlideUp 0.8s ease;
        }

        .highlight {
          color: #bfe6ff;
          animation: glow 2.5s infinite;
        }

        .slide-content p {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          animation: fadeSlideUp 1s ease;
        }

        .btn {
          padding: 0.7rem 1.5rem;
          border: none;
          border-radius: 30px;
          background: #fff;
          color: #0d6efd;
          font-weight: 600;
          cursor: pointer;
          animation: pulse 3s infinite;
        }

        .slide-image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        .slide-image img {
          max-height: 55vh;
          width: auto;
          animation: slideInRight 1.2s ease;
        }

        /* Navigation Dots */
        .navigation-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.6rem;
          z-index: 2;
        }

        .dot {
          width: 12px;
          height: 12px;
          background: #fff;
          opacity: 0.4;
          border-radius: 50%;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .dot.active {
          opacity: 1;
        }

        /* Animations */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #00e5ff; }
          50% { text-shadow: 0 0 25px #00ffb3, 0 0 40px #00e5ff; }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-slide {
            flex-direction: column;
            text-align: center;
          }

          .slide-content {
            max-width: 100%;
            margin-bottom: 1.5rem;
          }

          .slide-content h1 {
            font-size: 2rem;
          }

          .slide-content p {
            font-size: 1rem;
          }

          .btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }

          .slide-image img {
            max-height: 40vh;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
