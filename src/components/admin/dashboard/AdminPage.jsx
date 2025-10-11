import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import Dashboard from "./Dashboard";
import ProductInfo from "./ProductInfo";
import AdminInfo from "./AdminInfo";
import EnquiryInfo from "./EnquiryInfo";
import { Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Page content rendering
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "product":
        return <ProductInfo />;
      case "admin":
        return <AdminInfo />;
      case "enquiry":
        return <EnquiryInfo />;
      default:
        return <Dashboard />;
    }
  };

  // Inline styles
  const baseStyles = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    },
    topbar: {
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#357CA5",
      color: "white",
      padding: "10px 15px",
    },
    layout: {
      display: "flex",
      flex: 1,
      height: "100%",
      flexDirection: "row",
    },
    sidebar: {
      width: isMobile ? (showSidebar ? "70%" : "0") : "250px",
      maxWidth: "250px",
      backgroundColor: "#357CA5",
      color: "white",
      borderTopRightRadius: "25px",
      borderBottomRightRadius: "25px",
      transition: "all 0.3s ease",
      overflow: "hidden",
      zIndex: 1000,
      position: isMobile ? "absolute" : "relative",
      height: "100%",
    },
    overlay: {
      display: isMobile && showSidebar ? "block" : "none",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 999,
    },
    mainContent: {
      flex: 1,
      backgroundColor: "#f8f9fa",
      padding: isMobile ? "15px" : "30px",
      overflowY: "auto",
      transition: "padding 0.3s ease",
    },
    title: {
      fontWeight: "bold",
      textTransform: "capitalize",
      marginBottom: "20px",
      fontSize: isMobile ? "20px" : "26px",
    },
  };

  return (
    <div style={baseStyles.container}>
      {/* Mobile Topbar */}
      <div style={baseStyles.topbar}>
        <Button
          variant="light"
          size="sm"
          onClick={() => setShowSidebar(!showSidebar)}
          style={{
            backgroundColor: "white",
            border: "none",
            boxShadow: "0 0 3px rgba(0,0,0,0.2)",
          }}
        >
          <FaBars style={{ color: "#0d6efd" }} />
        </Button>
      </div>

      <div style={baseStyles.layout}>
        {/* Sidebar */}
        <div style={baseStyles.sidebar}>
          <Sidebar
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              if (isMobile) setShowSidebar(false); // auto-close on mobile
            }}
          />
        </div>

        {/* Overlay (for mobile) */}
        <div
          style={baseStyles.overlay}
          onClick={() => setShowSidebar(false)}
        ></div>

        {/* Main Content */}
        <div style={baseStyles.mainContent}>
          <h3 style={baseStyles.title}>
            {activePage.replace(/^\w/, (c) => c.toUpperCase())}
          </h3>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
