import React from "react";
import { Nav } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUserCog,
  FaEnvelope,
} from "react-icons/fa";

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="custom-sidebar">
      <h4 className="sidebar-title">Admin Panel</h4>

      <Nav className="flex-column mt-4">
        <Nav.Link
          onClick={() => setActivePage("dashboard")}
          className={`sidebar-link ${
            activePage === "dashboard" ? "active" : ""
          }`}
        >
          <FaTachometerAlt className="me-2 icon" /> Dashboard
        </Nav.Link>

        <Nav.Link
          onClick={() => setActivePage("product")}
          className={`sidebar-link ${
            activePage === "product" ? "active" : ""
          }`}
        >
          <FaBoxOpen className="me-2 icon" /> Product Details
        </Nav.Link>

        <Nav.Link
          onClick={() => setActivePage("admin")}
          className={`sidebar-link ${
            activePage === "admin" ? "active" : ""
          }`}
        >
          <FaUserCog className="me-2 icon" /> Admin Details
        </Nav.Link>

        <Nav.Link
          onClick={() => setActivePage("enquiry")}
          className={`sidebar-link ${
            activePage === "enquiry" ? "active" : ""
          }`}
        >
          <FaEnvelope className="me-2 icon" /> Enquiry
        </Nav.Link>
      </Nav>

      <style jsx="true">{`
        .custom-sidebar {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 25px 20px;
          height: 100vh; /* full vertical height */
          background: linear-gradient(180deg, #357ca5 0%, #285f7b 100%);
          color: white;
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
          box-shadow: 4px 0 10px rgba(0, 0, 0, 0.15);
          position: sticky;
          top: 0;
        }

        .sidebar-title {
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }

        .sidebar-link {
          color: #e3f2fd !important;
          display: flex;
          align-items: center;
          padding: 12px 15px;
          margin-bottom: 8px;
          border-radius: 10px;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 15px;
        }

        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: #fff !important;
          transform: translateX(4px);
        }

        .sidebar-link.active {
          background-color: rgba(255, 255, 255, 0.25);
          color: #fff !important;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
          font-weight: 600;
        }

        .icon {
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .custom-sidebar {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            height: 100vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
