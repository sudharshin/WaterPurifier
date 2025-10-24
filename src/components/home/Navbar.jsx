import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Nav,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/Logo.png"; // your logo path

const NavbarComponent = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BootstrapNavbar
      expand="md"
      expanded={expanded}
      fixed="top"
      className="custom-navbar"
    >
      {/* Logo */}
      <BootstrapNavbar.Brand
        onClick={() => {
          navigate("/");
          setExpanded(false);
        }}
        className="navbar-logo"
      >
        <img src={logo} alt="Logo" className="logo-img" />
      </BootstrapNavbar.Brand>

      {/* Toggle Button (Mobile) */}
      <BootstrapNavbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
        className="border-0 ms-auto"
      />

      {/* Collapsible Nav Links */}
      <BootstrapNavbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-between align-items-center collapse-area"
      >
        <Nav className="nav-links">
          <Nav.Link
            onClick={() => {
              navigate("/");
              setExpanded(false);
            }}
            className={`nav-item-link ${isActive("/") ? "active-link" : ""}`}
          >
            Home
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate("/aboutus");
              setExpanded(false);
            }}
            className={`nav-item-link ${isActive("/aboutus") ? "active-link" : ""}`}
          >
            About Us
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate("/contactus");
              setExpanded(false);
            }}
            className={`nav-item-link ${isActive("/contactus") ? "active-link" : ""}`}
          >
            Contact
          </Nav.Link>
        </Nav>

        {/* Login / Logout */}
        <div className="auth-section">
          {user ? (
            <Button
              variant="outline-danger"
              onClick={() => {
                handleLogout();
                setExpanded(false);
              }}
              className="auth-btn logout-btn"
            >
              Logout
            </Button>
          ) : (
            <NavLink
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={() => setExpanded(false)}
            >
              <Button className="auth-btn login-btn">Login</Button>
            </NavLink>
          )}
        </div>
      </BootstrapNavbar.Collapse>

      {/* ✅ Responsive Styling */}
      <style>{`
        .custom-navbar {
          background-color: white;
          border-bottom: 1px solid #eee;
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: all 0.3s ease-in-out;
          padding: 4px 28px;
        }

        .navbar-logo {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: 50px;
        }

        .logo-img {
          height: 70px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 1px rgba(0,0,0,0.15));
          transition: all 0.3s ease-in-out;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 40px;
          font-family: "Poppins", sans-serif;
          font-weight: 400;
          font-size: 15px;
        }

        .nav-item-link {
          color: #212529;
          transition: all 0.3s ease;
          padding-bottom: 2px;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
        }

        .nav-item-link:hover {
          color: #266990;
        }

        .active-link {
          color: #266990 !important;
          border-bottom-color: #266990 !important;
        }

        .auth-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .auth-btn {
          border-radius: 50px;
          font-family: "Poppins", sans-serif;
          font-weight: 500;
          height: 30px;
          line-height: 1;
          font-size: 13px;
          padding: 0 16px;
          transition: all 0.2s ease-in-out;
        }

        .login-btn {
          background: #266990;
          border: 1px solid #E0E0E0;
        }

        .login-btn:hover {
          background: #1f5676;
        }

        .logout-btn {
          border-radius: 20px;
          padding: 0 14px;
        }

        /* Responsive adjustments */
        @media (max-width: 991px) {
          .custom-navbar { padding: 6px 18px; }
          .logo-img { height: 60px; }
          .nav-links { gap: 30px; font-size: 14px; }
        }

        @media (max-width: 767px) {
          .custom-navbar { padding: 6px 12px; }
          .logo-img { height: 50px; }
          .nav-links { flex-direction: column !important; gap: 12px; margin-bottom: 8px; font-size: 13px; }
          .auth-section { flex-direction: column; gap: 6px; }
          .auth-btn { font-size: 12px; height: 28px; padding: 0 12px; }
        }

        @media (max-width: 480px) {
          .custom-navbar { padding: 4px 10px; }
          .logo-img { height: 42px; }
          .nav-links { font-size: 12px; gap: 8px; }
          .auth-btn { font-size: 11px; height: 26px; padding: 0 10px; }
        }

        @media (max-width: 375px) {
          .custom-navbar { padding: 3px 8px; }
          .logo-img { height: 38px; }
        }

        @media (max-width: 320px) {
          .custom-navbar { padding: 2px 6px; }
          .logo-img { height: 34px; }
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default NavbarComponent;
