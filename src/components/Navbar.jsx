import React from 'react'
import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown, Button } from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand href="#">opor</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Home Purifiers</NavDropdown.Item>
              <NavDropdown.Item href="#">Commercial Purifiers</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-primary" className="ms-3">Login</Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default NavbarComponent
