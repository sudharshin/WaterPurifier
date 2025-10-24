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
            <div>
              <h2 className="left-heading">
                HAVE A PRODUCT QUESTION?
                <br /> ASK US NOW !
              </h2>
              <p className="left-desc">
                Share your needs, and we’ll match you with <br /> the right
                product at the right price.
              </p>
            </div>

            <div className="chat-info">
              <p className="chat-title">CHAT WITH US</p>
              <p className="chat-sub">Our friendly team is here to help.</p>
              <a href="mailto:oporsales@gmail.com" className="chat-email">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                oporsales@gmail.com
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
              <select>
                <option>Choose Type</option>
                <option>Product Inquiry</option>
                <option>Support</option>
              </select>
            </div>

            <div className="form-row">
              <input type="tel" placeholder="Phone Number" />
              <input type="email" placeholder="Email" />
            </div>

            <div className="form-row">
              <select>
                <option>Select State</option>
                <option>State 1</option>
                <option>State 2</option>
              </select>
              <select>
                <option>Select District</option>
                <option>District 1</option>
                <option>District 2</option>
              </select>
            </div>

            <textarea placeholder="Message" rows="4"></textarea>

            <button type="submit" className="submit-btn">
              Submit <span className="arrow">→</span>
            </button>
          </form>
        </div>
      </section>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <style>{`
        /* Page Base */
        .contact-page {
          font-family: 'Poppins', sans-serif;
          color: #000;
          overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: auto;
          max-height: 480px;
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
        }

        /* Contact Section */
        .contact-section {
          background-color: #d8edfb;
          padding: 80px 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 60px;
        }

        .contact-container {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          flex-wrap: wrap;
          max-width: 1200px;
          width: 100%;
          gap: 60px;
        }

        /* Left Section */
        .contact-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 280px;
        }

        .left-heading {
          font-size: 60px;
          font-weight: 400;
          line-height: 70px;
          color: #242424;
          margin-bottom: 30px;
        }

        .left-desc {
          font-size: 15px;
          color: #333;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        /* Chat Info Section */
        .chat-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 30px;
        }

        .chat-title {
          font-weight: 600;
          font-size: 15px;
          color: #000;
        }

        .chat-sub {
          font-size: 14px;
          color: #333;
        }

        .chat-email {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          text-decoration: none;
          margin: 4px 0 8px;
        }

        .chat-email i {
          font-size: 15px;
          color: #000;
        }

        .social-icons {
          display: flex;
          gap: 18px;
          margin-top: 6px;
        }

        .social-icons i {
          font-size: 18px;
          color: #000;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .social-icons i:hover {
          color: #0077b6;
        }

        /* Right Form Section */
        .contact-form {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 320px;
        }

        .form-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .contact-form input,
        .contact-form select {
          flex: 1;
          min-width: 180px;
          padding: 14px 18px;
          border-radius: 50px;
          border: none;
          background-color: #fff;
          font-size: 14px;
          outline: none;
          color: #333;
        }

        .contact-form textarea {
          width: 100%;
          padding: 16px 20px;
          border-radius: 20px;
          border: none;
          background-color: #fff;
          font-size: 14px;
          resize: none;
          color: #333;
        }

        /* Submit Button */
        .submit-btn {
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 60px;
          padding: 16px 0;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          letter-spacing: 0.5px;
        }

        .submit-btn:hover {
          background-color: #111;
          transform: translateY(-2px);
        }

        .arrow {
          font-size: 18px;
          font-weight: 500;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-section {
            padding: 60px 50px;
            margin-top: 50px;
          }

          .left-heading {
            font-size: 42px;
            line-height: 54px;
          }
        }

        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
            gap: 50px;
          }

          .contact-left {
            align-items: flex-start;
          }

          .chat-info {
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .hero-text {
            font-size: 28px;
          }

          .left-heading {
            font-size: 28px;
            line-height: 36px;
          }

          .left-desc,
          .chat-title,
          .chat-sub,
          .chat-email {
            font-size: 13px;
          }

          .submit-btn {
            font-size: 14px;
            padding: 14px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
