import React, { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  Form,
  FormControl,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

// 🔑 Import UserContext
import { UserContext } from "../../context/UserContext";

const NavbarComponent = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✅ Handle hash active check manually
  const isHashActive = (hash) => location.hash === hash;

  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      fixed="top"
      className="shadow-sm py-2"
    >
      <Container fluid>
        {/* ✅ Left Logo */}
        <BootstrapNavbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold d-flex align-items-center text-primary"
          style={{
            fontWeight: "600",
            fontSize: "20px",
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
          ></div>
          Opor
        </BootstrapNavbar.Brand>

        {/* ✅ Toggler */}
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />

        {/* ✅ Collapsible Nav */}
        <BootstrapNavbar.Collapse id="navbarScroll">
          {/* Center Nav Links - equally spaced */}
          <Nav className="mx-auto align-items-center justify-content-evenly w-50">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) =>
                `mx-2 ${
                  isActive
                    ? "fw-bold text-primary border-bottom border-primary"
                    : ""
                }`
              }
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/#footer"
              className={`mx-2 ${
                isHashActive("#footer")
                  ? "fw-bold text-primary border-bottom border-primary"
                  : ""
              }`}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/#enquiry"
              className={`mx-2 ${
                isHashActive("#enquiry")
                  ? "fw-bold text-primary border-bottom border-primary"
                  : ""
              }`}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* ✅ Right: Search + Auth */}
          <div className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
            {/* Search */}
            <Form className="d-flex align-items-center">
              <div
                className="input-group"
                style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: "20px",
                  padding: "4px 12px",
                }}
              >
                <span className="input-group-text bg-transparent border-0 p-0 pe-2">
                  <FaSearch className="text-muted" />
                </span>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="border-0 bg-transparent shadow-none"
                  style={{ width: "120px" }}
                />
              </div>
            </Form>

            {/* Login / Logout */}
            {user ? (
              <Button
                variant="outline-danger"
                className="ms-3 px-4 py-1"
                style={{ borderRadius: "20px", fontWeight: "500" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <NavLink to="/login">
                <Button
                  variant="primary"
                  className="ms-3 px-4 py-1"
                  style={{ borderRadius: "20px", fontWeight: "500" }}
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
