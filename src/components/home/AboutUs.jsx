import React, { useState } from "react";
import aboutBanner from "../../assets/HeroSectionImg.png";
import PassionLogo from "../../assets/PassionLogo.png";
import CustomerLogo from "../../assets/CustomerFirstLogo.png";
import CommitmentLogo from "../../assets/CommitmentLogo.png";
import LearnLogo from "../../assets/LearnabilityLogo.png";

const AboutUs = () => {
  const [activeValue, setActiveValue] = useState("Commitment");

  const values = [
    {
      image: PassionLogo,
      title: "Passion",
      description:
        "We expect our people to approach everything with their hearts and minds; enjoying what they are doing and they believe is right.",
    },
    {
      image: CommitmentLogo,
      title: "Commitment",
      description:
        "Employees who demonstrate responsibility, commitment, and readiness regardless of their positions or tasks.",
    },
    {
      image: CustomerLogo,
      title: "Customer First",
      description: "Customers & God. He is the reason for our existence.",
    },
    {
      image: LearnLogo,
      title: "Learnability",
      description:
        "Human beings must keep learning; we must learn from anywhere and be always open to change all the time.",
    },
  ];

  const stats = [
    { num: "1000+", label: "Sell products" },
    { num: "95%", label: "Customers satisfaction rate" },
    { num: "xx+", label: "Years of experience" },
  ];

  return (
    <div className="about-us-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <img
          src={aboutBanner}
          alt="About Us Banner"
          className="banner-image"
          loading="lazy"
        />
        <div className="banner-text">About Us</div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are">
        <p className="who-title">who we are</p>
        <h2 className="who-description">
          We’re redefining online shopping by connecting you with quality products,{" "}
          <span>trusted suppliers, and a seamless enquiry experience you can rely on.</span>
        </h2>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((item, i) => (
          <div key={i} className="stat-card">
            <h3>{item.num}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      {/* Trusted Partner Section */}
      <section className="trusted-partner">
        <div className="trusted-left">
          <h4>Your Trusted Partner <br /> in Everyday Shopping.</h4>
        </div>
        <div className="trusted-right">
          <div>
            <h5>OUR VISION</h5>
            <p>
              We aim to build a world’s first and best water treatment components platform...
            </p>
          </div>
          <div>
            <h5>OUR MISSION</h5>
            <p>
              Our mission is to upgrade business standards in the water management field...
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <div className="values-left">
          <h3>Our Values</h3>
        </div>
        <div className="values-right">
          {values.map((val) => (
            <div
              key={val.title}
              onClick={() => setActiveValue(val.title)}
              className={`value-card ${activeValue === val.title ? "active" : ""}`}
            >
              <div className="logo-circle">
                <img src={val.image} alt={val.title} />
              </div>
              <h5>{val.title}</h5>
              <p>{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive Styles */}
      <style>
        {`
          /* Base Styles */
          .about-us-container {
            font-family: 'Poppins', sans-serif;
            color: #1a1a1a;
            background-color: #fff;
            overflow-x: hidden;
            padding-bottom: 3rem;
          }
          
          /* Hero Banner */
          .hero-banner {
            position: relative;
            width: 100%;
            margin: 0 auto; /* Center horizontally */
          }
          .banner-image {
            width: 100%;
            height: auto; /* Maintain aspect ratio */
            display: block;
          }
          .banner-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: clamp(1.5rem, 5vw, 4rem);
            font-weight: 700;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
            text-align: center;
            width: 100%;
          }

          /* Who We Are */
          .who-we-are {
            max-width: 1100px;
            margin: 3rem auto 2rem;
            padding: 0 2rem;
            text-align: left;
          }
          .who-title {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-style: italic;
            font-weight: 300;
            margin-bottom: 0.5rem;
            text-transform: lowercase;
          }
          .who-description {
            font-size: clamp(1.5rem, 2.5vw, 3.5rem);
            line-height: 1.3;
            max-width: 900px;
          }
          .who-description span {
            color: #393939;
            font-weight: 400;
          }

          /* Stats Section */
          .stats-section {
            max-width: 900px;
            margin: 2rem auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
            padding: 0 1rem;
          }
          .stat-card {
            flex: 1 1 200px;
            text-align: center;
            background: #f9f9f9;
            border-radius: 8px;
            padding: 1rem 0;
            box-shadow: 0 1px 5px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
          }
          .stat-card:hover {
            transform: translateY(-5px);
          }
          .stat-card h3 {
            color: #266990;
            font-weight: 900;
            font-size: clamp(2rem, 5vw, 3rem);
            margin-bottom: 0.5rem;
          }
          .stat-card p {
            color: #3f3f3f;
            font-size: clamp(1rem, 2vw, 1.25rem);
          }

          /* Trusted Partner Section */
          .trusted-partner {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 5rem auto;
            padding: 0 2rem;
          }
          .trusted-left h4 {
            font-size: clamp(1.8rem, 4vw, 2.5rem);
            font-weight: 600;
            color: #000;
            line-height: 1.3;
          }
          .trusted-right h5 {
            color: #007bc7;
            font-weight: 600;
            font-size: clamp(1rem, 2vw, 1.2rem);
            margin-bottom: 0.5rem;
          }
          .trusted-right p {
            font-size: clamp(0.9rem, 1.5vw, 1rem);
            color: #555;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          /* Our Values */
          .our-values {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 5rem auto 6rem;
            padding: 0 2rem;
          }
          .values-left h3 {
            font-weight: 400;
            line-height: 1.2;
            font-size: clamp(2rem, 5vw, 3rem);
            color: #000;
          }
          .values-right {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .value-card {
            cursor: pointer;
            background: #fff;
            color: #1a1a1a;
            border-radius: 12px;
            padding: 1.5rem 1rem;
            flex: 1 1 260px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .value-card.active {
            background: #007bc7;
            color: #fff;
            box-shadow: 0 6px 14px rgba(0,123,199,0.5);
          }
          .logo-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            transition: background-color 0.3s ease;
          }
          .value-card.active .logo-circle {
            background: #cce5f6;
          }
          .logo-circle img {
            width: 22px;
            height: 22px;
            transition: filter 0.3s ease;
          }
          .value-card.active .logo-circle img {
            filter: invert(0) brightness(0) saturate(100%);
          }
          .value-card h5 {
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .value-card p {
            font-size: clamp(0.75rem, 1.5vw, 0.9rem);
            line-height: 1.6;
            color: inherit;
            margin-top: 0;
          }

          /* Media Queries for Responsiveness */

          /* Extra Small Phones (<= 350px) */
          @media (max-width: 350px) {
            .banner-text { font-size: 1.5rem; }
            .who-description { font-size: 1.2rem; line-height: 1.3; }
            .stat-card h3 { font-size: 1.5rem; }
            .stat-card p { font-size: 0.75rem; }
            .trusted-left h4 { font-size: 1.3rem; }
            .trusted-right h5 { font-size: 0.9rem; }
            .trusted-right p { font-size: 0.75rem; }
            .values-left h3 { font-size: 1.5rem; }
            .value-card { padding: 1rem; }
            .value-card p { font-size: 0.65rem; }
          }

          /* Small Phones (<= 414px) */
          @media (max-width: 414px) {
            .banner-text { font-size: 1.8rem; }
            .who-description { font-size: 1.4rem; }
            .stat-card h3 { font-size: 1.8rem; }
            .stat-card p { font-size: 0.8rem; }
            .trusted-left h4 { font-size: 1.5rem; }
            .trusted-right h5 { font-size: 1rem; }
            .trusted-right p { font-size: 0.85rem; }
            .values-left h3 { font-size: 1.8rem; }
            .value-card { padding: 1.1rem; }
            .value-card p { font-size: 0.7rem; }
          }

          /* Medium Phones / Portrait Tablets (<= 480px) */
          @media (max-width: 480px) {
            .banner-text { font-size: 2rem; }
            .who-description { font-size: 1.5rem; }
            .stat-card h3 { font-size: 2rem; }
            .stat-card p { font-size: 0.9rem; }
            .trusted-left h4 { font-size: 1.7rem; }
            .trusted-right h5 { font-size: 1.1rem; }
            .trusted-right p { font-size: 0.9rem; }
            .values-left h3 { font-size: 2rem; }
            .value-card { padding: 1.25rem; }
            .value-card p { font-size: 0.75rem; }
          }

          /* Tablets (768px) */
          @media (max-width: 768px) {
            .who-we-are {
              padding: 0 1rem;
              text-align: center;
            }
            .stats-section {
              justify-content: center;
            }
            .trusted-partner {
              grid-template-columns: 1fr;
              gap: 2rem;
              padding: 0 1rem;
              text-align: center;
            }
            .trusted-right p {
              margin-bottom: 1rem;
            }
            .our-values {
              grid-template-columns: 1fr;
              padding: 0 1rem;
              text-align: center;
            }
            .values-right {
              flex-direction: column;
              align-items: center;
            }
            .value-card {
              max-width: 350px;
            }
          }

          /* Desktops */
          @media (min-width: 1200px) {
            .about-us-container {
              padding-bottom: 5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
