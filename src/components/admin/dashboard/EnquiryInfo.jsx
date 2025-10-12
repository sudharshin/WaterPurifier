import React, { useState, useEffect } from "react";
import { Button, Spinner, Pagination } from "react-bootstrap";
import { FaSync } from "react-icons/fa";

const EnquiryInfo = () => {
  const [enquiries, setEnquiries] = useState([
    { id: 1, customer: "Michael", email: "mike@gmail.com", message: "Need product info" },
    { id: 2, customer: "Susan", email: "susan@gmail.com", message: "Requesting bulk price" },
    { id: 3, customer: "John", email: "john@gmail.com", message: "Delivery query" },
    { id: 4, customer: "Anna", email: "anna@gmail.com", message: "Product warranty info" },
    { id: 5, customer: "Alex", email: "alex@gmail.com", message: "Payment issue" },
    { id: 6, customer: "Emma", email: "emma@gmail.com", message: "Request for demo" },
    { id: 7, customer: "Liam", email: "liam@gmail.com", message: "Technical support" },
    { id: 8, customer: "Olivia", email: "olivia@gmail.com", message: "Feedback" },
  ]);

  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Responsive handling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const isMobile = windowWidth <= 768;

  // Pagination
  const totalPages = Math.ceil(enquiries.length / itemsPerPage);
  const paginatedEnquiries = enquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Inline CSS (matching AdminInfo)
  const styles = {
    container: {
      padding: isMobile ? "10px" : "20px",
      fontFamily: "Arial, sans-serif",
    },
    headerRow: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "10px",
    },
    refreshButton: {
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "14px",
    },
    tableHeader: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      backgroundColor: "#f8f9fa",
      fontWeight: 600,
      padding: isMobile ? "10px" : "12px 20px",
      borderBottom: "2px solid #e5e5e5",
      borderRadius: "8px",
      fontSize: isMobile ? "14px" : "16px",
    },
    tableRow: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      background: "#fff",
      padding: isMobile ? "12px" : "14px 20px",
      marginTop: "10px",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      transition: "all 0.2s ease",
      fontSize: isMobile ? "14px" : "16px",
    },
    colCustomer: {
      flex: isMobile ? "none" : 2,
      color: "#333",
      fontWeight: 500,
      marginBottom: isMobile ? "6px" : 0,
      wordBreak: "break-all",
    },
    colEmail: {
      flex: isMobile ? "none" : 2,
      color: "#333",
      fontWeight: 500,
      marginBottom: isMobile ? "6px" : 0,
      wordBreak: "break-all",
    },
    colMessage: {
      flex: isMobile ? "none" : 3,
      color: "#555",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "15px",
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Row */}
      <div style={styles.headerRow}>
        <Button
          style={styles.refreshButton}
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : <FaSync />} Refresh
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <>
          {/* Table Header */}
          <div style={styles.tableHeader}>
            <div style={{ ...styles.colCustomer, fontWeight: 600 }}>Customer</div>
            <div style={{ ...styles.colEmail, fontWeight: 600 }}>Email</div>
            <div style={{ ...styles.colMessage, fontWeight: 600 }}>Message</div>
          </div>

          {/* Data Rows */}
          {paginatedEnquiries.map((enquiry) => (
            <div key={enquiry.id} style={styles.tableRow}>
              <div style={styles.colCustomer}>{enquiry.customer}</div>
              <div style={styles.colEmail}>{enquiry.email}</div>
              <div style={styles.colMessage}>{enquiry.message}</div>
            </div>
          ))}

          {/* Pagination */}
          <div style={styles.paginationContainer}>
            <Pagination>
              <Pagination.First
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default EnquiryInfo;
