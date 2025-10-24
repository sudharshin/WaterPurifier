import React from "react";
import contactBanner from "../../assets/HeroSectionImg.png"; // Replace with your banner path

const ContactUs = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <img src={contactBanner} alt="Contact Us" className="hero-image" />
        <h1 className="hero-text">Contact Us</h1>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Section */}
          <div className="contact-left">
            <h2 className="left-heading">
              HAVE A PRODUCT QUESTION?
              <br /> ASK US NOW!
            </h2>
            <p className="left-desc">
              Share your needs, and we’ll match you with the right product at
              the right price.
            </p>

            <div className="chat-info">
              <p className="chat-title">CHAT WITH US</p>
              <p className="chat-sub">Our friendly team is here to help.</p>
              <a href="mailto:example@gmail.com" className="chat-email">
                example@gmail.com
              </a>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a href="#" aria-label="Phone">
                  <i className="fa-solid fa-phone"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Type" />
            </div>

            <div className="form-row">
              <input type="tel" placeholder="Phone Number" />
              <input type="email" placeholder="Email" />
            </div>

            <div className="form-row">
              <input type="text" placeholder="State" />
              <input type="text" placeholder="District" />
            </div>

            <textarea placeholder="Message" rows="4"></textarea>

            <div className="submit-wrapper">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <div className="submit-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <style>{`
        /* Base Styles */
        .contact-page {
          font-family: 'Poppins', sans-serif;
          color: #000;
        }

        .hero-section {
          position: relative;
        }

        .hero-image {
          width: 100%;
          height: auto;
          max-height: 450px;
          object-fit: cover;
        }

        .hero-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 42px;
          font-weight: 600;
          color: #fff;
          text-align: center;
          padding: 0 10px;
        }

        /* Contact Section */
        .contact-section {
          background-color: #d8edfb;
          padding: 80px 100px;
          margin-top: 60px;
          border-radius: 25px;
          display: flex;
          justify-content: center;
        }

        .contact-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 50px;
          max-width: 1200px;
          width: 100%;
        }

        .contact-left {
          flex: 1;
          min-width: 300px;
        }

        .left-heading {
          font-size: 40px;
          font-weight: 600;
          margin-bottom: 25px;
        }

        .left-desc {
          font-size: 15px;
          color: #333;
          margin-bottom: 30px;
          line-height: 1.6;
          max-width: 320px;
        }

        .chat-info {
          margin-top: 40px;
        }

        .chat-title {
          font-weight: 700;
          font-size: 15px;
        }

        .chat-sub {
          font-size: 14px;
          margin: 6px 0;
        }

        .chat-email {
          font-size: 14px;
          color: #000;
          text-decoration: none;
          display: inline-block;
        }

        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .social-icons i {
          font-size: 18px;
        }

        /* Form Styling */
        .contact-form {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .contact-form input {
          flex: 1;
          min-width: 180px;
          padding: 14px 18px;
          border-radius: 50px;
          border: none;
          background-color: #fff;
          font-size: 14px;
          outline: none;
        }

        .contact-form textarea {
          width: 100%;
          padding: 16px 20px;
          border-radius: 20px;
          border: none;
          background-color: #fff;
          font-size: 14px;
          resize: none;
        }

        .submit-wrapper {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .submit-btn {
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 35px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }

        .submit-arrow {
          background-color: #000;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -10px;
          border: 3px solid #000;
          background: #000000;
        }

        .submit-arrow i {
          color: #fff;
          font-size: 16px;
        }

        /* Hover */
        .submit-btn:hover,
        .submit-arrow:hover {
          background-color: #111;
        }

        /* Responsive Media Queries */
        @media (max-width: 1024px) {
          .contact-section {
            padding: 60px 60px;
          }

          .left-heading {
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 50px 30px;
          }

          .contact-container {
            flex-direction: column;
            gap: 30px;
          }

          .left-heading {
            font-size: 32px;
          }

          .left-desc {
            max-width: 100%;
          }

          .form-row {
            flex-direction: column;
          }

          .contact-form input {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-text {
            font-size: 28px;
          }

          .contact-section {
            padding: 40px 20px;
          }

          .left-heading {
            font-size: 26px;
          }

          .submit-btn {
            padding: 10px 25px;
            font-size: 14px;
          }

          .submit-arrow {
            width: 40px;
            height: 40px;
          }

          .social-icons i {
            font-size: 16px;
          }
        }

        @media (max-width: 414px) {
          .hero-text {
            font-size: 26px;
          }

          .left-heading {
            font-size: 24px;
          }

          .contact-section {
            padding: 35px 15px;
          }
        }

        @media (max-width: 375px) {
          .hero-text {
            font-size: 22px;
          }

          .left-heading {
            font-size: 22px;
          }

          .contact-section {
            padding: 30px 10px;
          }
        }

        @media (max-width: 350px) {
          .hero-text {
            font-size: 20px;
          }

          .left-heading {
            font-size: 20px;
          }

          .social-icons i {
            font-size: 14px;
          }
        }

        @media (max-width: 300px) {
          .hero-text {
            font-size: 18px;
          }

          .left-heading {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
