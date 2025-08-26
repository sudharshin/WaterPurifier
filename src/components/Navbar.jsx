import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";

import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import {
  FaTint,
  FaFilter,
  FaTools,
  FaIndustry,
  FaBox,
  FaGlassWhiskey,
  FaSearch,
} from "react-icons/fa";

// 🔹 Static Data (kept outside to avoid re-creation)
const productsData = [
  {
    category: "Domestic RO System",
    icon: <FaTint />,
    items: ["12 LPH", "25–40 LPH", "60 LPH", "75 LPH", "Add-on Product", "Alkaline Ionizer"],
  },
  { category: "Domestic Water Purifier", icon: <FaGlassWhiskey />, items: ["UV Purifier", "UF Purifier", "Gravity Based"] },
  { category: "Domestic Spares", icon: <FaTools />, items: ["Antiscalant", "Box", "Cabinet", "Clamp", "Connector", "Cover", "Filter"] },
  { category: "Industrial RO System", icon: <FaIndustry />, items: ["100 LPH", "250 LPH", "500 LPH", "1000 LPH"] },
  { category: "Industrial Spares", icon: <FaFilter />, items: ["Pump", "Motors", "Control Panels", "Switches"] },
  { category: "Water Dispenser", icon: <FaBox />, items: ["Hot & Cold", "Normal", "With RO"] },
  { category: "Other Products", icon: <FaBox />, items: ["TDS Controller", "Mineral Cartridge", "Ozonizer"] },
  { category: "Offer Products", icon: <FaBox />, items: ["Summer Sale", "Discount Kits", "Combo Offers"] },
];

// 🔹 Desktop Dropdown Component
const DesktopMenu = ({ activeCategory, setActiveCategory }) => (
  <div
    className="d-none d-lg-block"
    style={{
      minWidth: "250px",
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "10px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    }}
  >
    {productsData.map((category, index) => (
      <div
        key={index}
        onMouseEnter={() => setActiveCategory(index)}
        onMouseLeave={() => setActiveCategory(null)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "12px 15px",
          cursor: "pointer",
          fontWeight: activeCategory === index ? "600" : "500",
          backgroundColor: activeCategory === index ? "#f8f9fa" : "transparent",
          transition: "0.2s",
        }}
      >
        <span style={{ marginRight: "10px", fontSize: "18px" }}>{category.icon}</span>
        {category.category}

        {activeCategory === index && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "100%",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "10px 15px",
              minWidth: "200px",
              zIndex: 10,
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  className="hover-bg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
);

// 🔹 Mobile Accordion Component
const MobileMenu = ({ mobileOpen, setMobileOpen }) => (
  <div className="d-lg-none px-2">
    {productsData.map((category, index) => (
      <div key={index} style={{ borderBottom: "1px solid #eee" }}>
        <div
          onClick={() => setMobileOpen(mobileOpen === index ? null : index)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          <span>
            <span style={{ marginRight: "8px" }}>{category.icon}</span>
            {category.category}
          </span>
          <span>{mobileOpen === index ? "▲" : "▼"}</span>
        </div>
        {mobileOpen === index && (
          <ul style={{ listStyle: "none", paddingLeft: "20px", margin: 0 }}>
            {category.items.map((item, idx) => (
              <li key={idx} style={{ padding: "6px 0", fontSize: "15px", cursor: "pointer" }}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const NavbarComponent = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);

  const handleSetActiveCategory = useCallback((index) => setActiveCategory(index), []);
  const handleSetMobileOpen = useCallback((index) => setMobileOpen(index), []);

  return (
    <BootstrapNavbar bg="white" expand="lg" fixed="top" className="shadow-sm py-2">
      <Container fluid>
        {/* Left Logo */}
        <BootstrapNavbar.Brand href="#" className="fw-bold d-flex align-items-center">
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "#D6F0FF",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          ></div>
          <span className="text-primary" style={{ fontWeight: "600", fontSize: "20px" }}>
            Opor
          </span>
        </BootstrapNavbar.Brand>

        {/* Mobile Toggle */}
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Center Menu */}
          <Nav className="mx-auto align-items-center">
            <NavDropdown title="Products" id="products-nav-dropdown" className="mx-2">
              <DesktopMenu activeCategory={activeCategory} setActiveCategory={handleSetActiveCategory} />
              <MobileMenu mobileOpen={mobileOpen} setMobileOpen={handleSetMobileOpen} />
            </NavDropdown>

            <Nav.Link href="#" className="mx-2">Purchase & Service</Nav.Link>
            <Nav.Link href="#" className="mx-2">About Us</Nav.Link>
            <Nav.Link href="#" className="mx-2">Contact</Nav.Link>
          </Nav>
           
          {/* Right Search Box */}
          <Form className="d-flex align-items-center ms-lg-3 mt-2 mt-lg-0">
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
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default NavbarComponent;
