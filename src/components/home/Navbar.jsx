import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
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

  const isHashActive = (hash) => location.hash === hash;

  return (
    <BootstrapNavbar
      expand="md"
      expanded={expanded}
      fixed="top"
      className="py-1"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #eee",
        zIndex: 1000,
        minHeight: "60px",
      }}
    >
      <Container fluid className="px-4 d-flex justify-content-between align-items-center">
        {/* Left Side - Logo */}
        <BootstrapNavbar.Brand
          onClick={() => {
            navigate("/");
            setExpanded(false);
          }}
          style={{ cursor: "pointer" }}
          className="d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "60px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </BootstrapNavbar.Brand>

        {/* Navbar Toggle (moved to right side) */}
        <BootstrapNavbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
          className="border-0 d-md-none ms-auto"
        />

        {/* Collapsible Menu */}
        <BootstrapNavbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <div className="d-flex w-100 justify-content-between align-items-center flex-column flex-md-row">
            {/* Navigation Links */}
            <Nav
              className="d-flex align-items-center"
              style={{
                gap: "30px",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                fontSize: "16px",
              }}
            >
              <Nav.Link
                onClick={() => {
                  navigate("/#home");
                  setExpanded(false);
                }}
                className={`${
                  isHashActive("#home")
                    ? "text-primary border-bottom border-primary"
                    : "text-dark"
                }`}
                style={{
                  paddingBottom: "1px",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Home
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  navigate("/aboutus");
                  setExpanded(false);
                }}
                className={`${
                  isHashActive("#aboutus")
                    ? "text-primary border-bottom border-primary"
                    : "text-dark"
                }`}
                style={{
                  paddingBottom: "1px",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                About Us
              </Nav.Link>

              <Nav.Link
                onClick={() => {
                  navigate("/contactus");
                  setExpanded(false);
                }}
                className={`${
                  isHashActive("#contactus")
                    ? "text-primary border-bottom border-primary"
                    : "text-dark"
                }`}
                style={{
                  paddingBottom: "1px",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                Contact
              </Nav.Link>
            </Nav>

            {/* Right Section - Login/Logout */}
            <div className="d-flex align-items-center mt-3 mt-md-0">
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
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavbarComponent;
