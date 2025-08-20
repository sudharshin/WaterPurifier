import React from "react";
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  NavDropdown,
  Button,
} from "react-bootstrap";

const NavbarComponent = ({ sectionTitles = [] }) => {
  return (
    <BootstrapNavbar bg="white" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand href="#">opor</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>

            {/* ✅ Dynamic dropdown from ProductSection titles */}
            <NavDropdown title="Products" id="basic-nav-dropdown">
              {sectionTitles.length > 0 ? (
                sectionTitles.map((title, index) => (
                  <NavDropdown.Item key={index} href="#">
                    {title}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>No Sections</NavDropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-primary" className="ms-3">
            Login
          </Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavbarComponent;
