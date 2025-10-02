import React, { useContext, useState } from "react";
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
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setExpanded(false);
  };

  // Helper: check if hash matches
  const isHashActive = (hash) => location.hash === hash;

  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
      className="shadow-sm"
      style={{ minHeight: "56px" }}
    >
      <Container fluid>
        {/* Logo */}
        <BootstrapNavbar.Brand
          as={NavLink}
          to="/"
          onClick={() => setExpanded(false)}
          className="fw-bold d-flex align-items-center text-primary"
          style={{
            fontSize: "20px",
            fontFamily: '"Poppins", sans-serif',
            textDecoration: "none",
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

        {/* Collapse */}
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {/* Home */}
            <Nav.Link
              as={NavLink}
              to="/#home"
              onClick={() => setExpanded(false)}
              className={({ isActive }) =>
                `me-3 ${
                  isActive
                    ? "fw-bold text-primary border-bottom border-primary"
                    : ""
                }`
              }
              style={{ fontFamily: '"Poppins", sans-serif', fontWeight: "600" }}
            >
              Home
            </Nav.Link>

            {/* About Us */}
            <Nav.Link
              onClick={() => {
                navigate("/#footer");
                setExpanded(false);
              }}
              className={`me-3 ${
                isHashActive("#footer")
                  ? "fw-bold text-primary border-bottom border-primary"
                  : ""
              }`}
              style={{ fontFamily: '"Poppins", sans-serif', fontWeight: "600" }}
            >
              About Us
            </Nav.Link>

            {/* Contact */}
            <Nav.Link
              onClick={() => {
                navigate("/#enquiry");
                setExpanded(false);
              }}
              className={`me-3 ${
                isHashActive("#enquiry")
                  ? "fw-bold text-primary border-bottom border-primary"
                  : ""
              }`}
              style={{ fontFamily: '"Poppins", sans-serif', fontWeight: "600" }}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Right side */}
          <div className="d-flex align-items-center ms-auto">
            {user ? (
              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="px-4"
                style={{
                  borderRadius: "20px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Logout
              </Button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setExpanded(false)}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="primary"
                  className="px-4"
                  style={{
                    borderRadius: "50px",
                    background: "#108cd5ff",
                    border: "1px solid #E0E0E0",
                    fontWeight: "500",
                    fontFamily: '"Poppins", sans-serif',
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
