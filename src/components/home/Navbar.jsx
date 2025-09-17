import React, { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Nav,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const NavbarComponent = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isHashActive = (hash) => location.hash === hash;

  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{ minHeight: "56px" }}
    >
      <Container fluid className="d-flex align-items-center">
        {/* Logo (left) */}
        <BootstrapNavbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold d-flex align-items-center text-primary"
          style={{
            fontWeight: "600",
            fontSize: "20px",
            fontFamily: '"Poppins", sans-serif',
            textDecoration: "none",
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#D6F0FF",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          Opor
        </BootstrapNavbar.Brand>

        {/* Toggler */}
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />

        {/* Collapse area */}
        <BootstrapNavbar.Collapse
          id="navbarScroll"
          className="d-flex align-items-center w-100"
        >
          {/* Left links */}
          <Nav className="d-flex align-items-center">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) =>
                `me-3 ${
                  isActive
                    ? "fw-bold text-primary border-bottom border-primary"
                    : ""
                }`
              }
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "600", // Bold
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/#footer");
                setTimeout(() => {
                  const element = document.getElementById("footer");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className={`me-3 ${
                isHashActive("#footer")
                  ? "fw-bold text-primary border-bottom border-primary"
                  : ""
              }`}
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "600", // Bold
              }}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                navigate("/#enquiry");
                setTimeout(() => {
                  const element = document.getElementById("enquiry");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              className={`me-3 ${
                isHashActive("#enquiry")
                  ? "fw-bold text-primary border-bottom border-primary"
                  : ""
              }`}
              style={{
                paddingTop: 8,
                paddingBottom: 8,
                fontFamily: '"Poppins", sans-serif',
                fontWeight: "600", // Bold
              }}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Right side (Login / Logout) */}
          <div className="d-flex align-items-center ms-auto">
            {user ? (
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="px-4 d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: "20px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                  height: "38px",
                  lineHeight: "1",
                }}
              >
                Logout
              </Button>
            ) : (
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="primary"
                  className="px-4 d-flex align-items-center justify-content-center"
                  style={{
                    borderRadius: "20px",
                    fontWeight: "500",
                    fontFamily: '"Poppins", sans-serif',
                    height: "38px",
                    lineHeight: "1",
                  }}
                >
                  Login
                </Button>
              </NavLink>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavbarComponent;
