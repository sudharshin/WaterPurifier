import React from "react";
import { Nav } from "react-bootstrap";
import { FaTachometerAlt, FaBoxOpen, FaUserCog, FaEnvelope } from "react-icons/fa";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="d-flex flex-column h-100 p-3 text-white">
      <Nav className="flex-column">
        <Nav.Link
          onClick={() => setActivePage("dashboard")}
          className={`text-white mb-2 d-flex align-items-center ${activePage === "dashboard" ? "fw-bold" : ""}`}
        >
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>

        <Nav.Link
          onClick={() => setActivePage("product")}
          className={`text-white mb-2 d-flex align-items-center ${activePage === "product" ? "fw-bold" : ""}`}
        >
          <FaBoxOpen className="me-2" /> Product Details
        </Nav.Link>

        <Nav.Link
          onClick={() => setActivePage("admin")}
          className={`text-white mb-2 d-flex align-items-center ${activePage === "admin" ? "fw-bold" : ""}`}
        >
          <FaUserCog className="me-2" /> Admin Details
        </Nav.Link>

        <Nav.Link
          onClick={() => setActivePage("enquiry")}
          className={`text-white mb-2 d-flex align-items-center ${activePage === "enquiry" ? "fw-bold" : ""}`}
        >
          <FaEnvelope className="me-2" /> Enquiry
        </Nav.Link>
      </Nav>

    
    </div>
  );
};

export default Sidebar;
