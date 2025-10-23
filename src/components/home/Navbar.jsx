import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Nav,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/logo.png"; // your logo path

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
      className="py-0 custom-navbar"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #eee",
        zIndex: 1000,
        height: "50px",
        padding: "0 40px",
      }}
    >
      {/* Logo */}
      <BootstrapNavbar.Brand
        onClick={() => {
          navigate("/");
          setExpanded(false);
        }}
        style={{
          cursor: "pointer",
          marginRight: "80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "45px",
            width: "auto",
            objectFit: "contain",
            marginTop: "2px",
          }}
        />
      </BootstrapNavbar.Brand>

      {/* Mobile Toggle */}
      <BootstrapNavbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(expanded ? false : true)}
        className="border-0 d-md-none ms-auto"
      />

      {/* Collapsible Content */}
      <BootstrapNavbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-between align-items-center collapse-area"
      >
        <Nav
          className="align-items-center nav-links"
          style={{
            display: "flex",
            gap: "60px",
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 400,
            fontSize: "16px",
          }}
        >
          {/* Home */}
          <Nav.Link
            onClick={() => {
              navigate("/");
              setExpanded(false);
            }}
            className={`${
              isActive("/")
                ? "text-primary border-bottom border-primary"
                : "text-dark"
            }`}
            style={{
              paddingBottom: "2px",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
              borderBottomWidth: isActive("/") ? "2px" : "0px",
            }}
          >
            Home
          </Nav.Link>

          {/* About */}
          <Nav.Link
            onClick={() => {
              navigate("/aboutus");
              setExpanded(false);
            }}
            className={`${
              isActive("/aboutus")
                ? "text-primary border-bottom border-primary"
                : "text-dark"
            }`}
            style={{
              paddingBottom: "2px",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
              borderBottomWidth: isActive("/aboutus") ? "2px" : "0px",
            }}
          >
            About Us
          </Nav.Link>

          {/* Contact */}
          <Nav.Link
            onClick={() => {
              navigate("/contactus");
              setExpanded(false);
            }}
            className={`${
              isActive("/contactus")
                ? "text-primary border-bottom border-primary"
                : "text-dark"
            }`}
            style={{
              paddingBottom: "2px",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
              borderBottomWidth: isActive("/contactus") ? "2px" : "0px",
            }}
          >
            Contact
          </Nav.Link>
        </Nav>

        {/* Right Section - Login/Logout */}
        <div className="d-flex align-items-center justify-content-md-end justify-content-center gap-2 mobile-auth">
          {user ? (
            <Button
              variant="outline-danger"
              onClick={() => {
                handleLogout();
                setExpanded(false);
              }}
              className="px-3"
              style={{
                borderRadius: "20px",
                fontWeight: "500",
                fontFamily: '"Poppins", sans-serif',
                whiteSpace: "nowrap",
                height: "32px",
                lineHeight: "1",
              }}
            >
              Logout
            </Button>
          ) : (
            <NavLink
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={() => setExpanded(false)}
            >
              <Button
                variant="primary"
                className="px-3"
                style={{
                  borderRadius: "50px",
                  background: "#266990",
                  border: "1px solid #E0E0E0",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                  whiteSpace: "nowrap",
                  height: "32px",
                  lineHeight: "1",
                }}
              >
                Login
              </Button>
            </NavLink>
          )}
        </div>
      </BootstrapNavbar.Collapse>

      {/* Custom CSS */}
      <style>{`
        /* Reduce extra space inside navbar collapse */
        .collapse-area {
          padding: 6px 0 !important;
        }

        .navbar-collapse {
          background-color: white !important;
          border-top: 1px solid #eee;
        }

        /* Mobile nav alignment */
        @media (max-width: 767px) {
          .custom-navbar {
            height: auto;
            min-height: 55px;
            padding: 8px 20px;
          }

          .navbar-collapse.show {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            background-color: white !important;
            width: 100%;
            padding: 10px 0 !important;
          }

          .nav-links {
            flex-direction: column !important;
            gap: 18px !important;
            margin-bottom: 10px;
          }

          .mobile-auth {
            flex-direction: column;
            gap: 10px;
          }

          .navbar-toggler {
            border: none;
          }

          .navbar-toggler:focus {
            box-shadow: none;
          }
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default NavbarComponent;
