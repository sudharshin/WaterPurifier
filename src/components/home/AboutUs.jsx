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

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#1a1a1a",
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Hero Banner */}
      <section style={{ width: "100%", position: "relative", overflow: "hidden" }}>
        <img
          src={aboutBanner}
          alt="About Us Banner"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />

         <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "40px",
            fontWeight: "600",
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            textAlign: "center",
          }}
        >
          About Us
        </div>
      </section>

      {/* Who We Are */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 20px 20px 20px",
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontSize: "30px",
            fontStyle: "italic",
            fontWeight: "300",
            color: "#000000",
            marginBottom: "10px",
          }}
        >
          who we are
        </p>
        <h2
          style={{
            fontSize: "60px",
            lineHeight: "75px",
            fontWeight: "400",
            color: "#000000",
          }}
        >
          We’re redefining online shopping by connecting you with quality products,{" "}
          <span style={{ color: "#393939", fontWeight: "400" }}>
            trusted suppliers, and a seamless enquiry experience you can rely on.
          </span>
        </h2>
      </section>

      {/* Stats Section */}
      <section
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "0 20px",
        }}
      >
        {[
          { num: "1000+", label: "Sell products" },
          { num: "95%", label: "Customers satisfaction rate" },
          { num: "xx+", label: "Years of experience" },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: "center", flex: "1 1 200px" }}>
            <h3
              style={{
                color: "#266990",
                fontWeight: "900",
                fontSize: "3rem",
                marginBottom: "6px",
              }}
            >
              {item.num}
            </h3>
            <p style={{ color: "#3F3F3F", fontSize: "20px" }}>{item.label}</p>
          </div>
        ))}
      </section>

      {/* Section 1: Trusted Partner */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "60px",
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 20px",
          alignItems: "start",
        }}
      >
        {/* Left Side */}
        <div>
          <h4
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#000000",
              lineHeight: "1.3",
              letterSpacing: "0.5px",
            }}
          >
            Your Trusted Partner <br />
            in Everyday Shopping.
          </h4>
        </div>

        {/* Right Side */}
        <div>
          <div style={{ marginBottom: "40px" }}>
            <h5
              style={{
                color: "#007bc7",
                fontWeight: "600",
                fontSize: "18px",
                marginBottom: "8px",
              }}
            >
              OUR VISION
            </h5>
            <p
              style={{
                fontSize: "15px",
                color: "#555",
                lineHeight: "1.8",
              }}
            >
              We aim to build a world’s first and best water treatment components
              platform. The design of the entire system is to create a common
              meeting place for sellers and buyers, which seamlessly enhances their
              experience and efficiency. We provide unmatched speed and instant
              response to our buyers and channel partners worldwide, supplying
              quality goods and global sourcing benefits with unmatched reach,
              speed, and transparency.
            </p>
          </div>

          <div>
            <h5
              style={{
                color: "#007bc7",
                fontWeight: "600",
                fontSize: "18px",
                marginBottom: "8px",
              }}
            >
              OUR MISSION
            </h5>
            <p
              style={{
                fontSize: "15px",
                color: "#555",
                lineHeight: "1.8",
              }}
            >
              Our mission is to upgrade business standards in the water management
              field—saving time, money, and creating ease in doing business. We raise
              the bar by giving equal access and opportunity to all customers,
              regardless of size or location, ensuring delightful business
              experiences for suppliers and buyers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Our Values */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "60px",
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 20px",
          alignItems: "start",
        }}
      >
        {/* Left Side */}
        <div>
          <h3
            style={{
              fontWeight: "400",
              lineHeight: "32px",
              color: "#000000",
              marginBottom: "30px",
              fontSize: "47px",
            }}
          >
            Our Values
          </h3>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "flex-start",
          }}
        >
          {values.map((val) => (
            <div
              key={val.title}
              onClick={() => setActiveValue(val.title)}
              style={{
                cursor: "pointer",
                background: activeValue === val.title ? "#007bc7" : "#fff",
                color: activeValue === val.title ? "#fff" : "#1a1a1a",
                borderRadius: "12px",
                padding: "25px 20px",
                width: "260px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                transition: "0.3s ease",
              }}
            >
              {/* Logo with circle background */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background:
                    activeValue === val.title ? "#cce5f6" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "15px",
                  transition: "0.3s ease",
                }}
              >
                <img
                  src={val.image}
                  alt={val.title}
                  style={{
                    width: 22,
                    height: 22,
                    filter:
                      activeValue === val.title
                        ? "invert(0) brightness(0) saturate(100%)" // makes logo black when active
                        : "none",
                    transition: "0.3s ease",
                  }}
                />
              </div>

              <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>
                {val.title}
              </h5>
              <p
                style={{
                  fontSize: "14px",
                  color: activeValue === val.title ? "#f5f5f5" : "#555",
                  lineHeight: "1.6",
                }}
              >
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 1024px) {
            h2 { font-size: 28px !important; line-height: 1.5 !important; }
            section { padding: 40px 15px !important; }
          }
          @media (max-width: 900px) {
            section[style*="grid"] {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
          @media (max-width: 600px) {
            h2 { font-size: 22px !important; }
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
