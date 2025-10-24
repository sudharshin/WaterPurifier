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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const baseStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
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
      minHeight: "100vh", // Ensures sidebar fills full height
      overflow: "hidden",
    },
    sidebar: {
      width: isMobile ? (showSidebar ? "70%" : "0") : "260px",
      background: "linear-gradient(180deg, #357CA5 0%, #285F7B 100%)",
      color: "white",
      borderTopRightRadius: "30px",
      borderBottomRightRadius: "30px",
      transition: "all 0.3s ease",
      overflow: "hidden",
      zIndex: 1000,
      position: isMobile ? "absolute" : "sticky",
      top: 0,
      left: 0,
      height: "100vh", // Full vertical coverage
      boxShadow: "4px 0 10px rgba(0, 0, 0, 0.15)",
    },
    overlay: {
      display: isMobile && showSidebar ? "block" : "none",
      position: "fixed",
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
      paddingBottom: 0,
      overflowX: "auto", // Allows horizontal scrolling
      overflowY: "auto",
      transition: "all 0.3s ease",
    },
    title: {
      fontWeight: "bold",
      textTransform: "capitalize",
      marginBottom: "20px",
      fontSize: isMobile ? "20px" : "26px",
      color: "#333",
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
        <h5 style={{ margin: 0 }}>Admin Panel</h5>
      </div>

      <div style={baseStyles.layout}>
        {/* Sidebar */}
        <div style={baseStyles.sidebar}>
          <Sidebar
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              if (isMobile) setShowSidebar(false);
            }}
          />
        </div>

        {/* Overlay for mobile */}
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
