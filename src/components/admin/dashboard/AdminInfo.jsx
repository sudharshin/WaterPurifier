import React, { useState, useEffect } from "react";
import { Button, Spinner, Pagination, Form } from "react-bootstrap";
import { FaSync } from "react-icons/fa";

const AdminInfo = () => {
  const [admins] = useState([
    { id: 1, email: "john@example.com", role: "Super Admin" },
    { id: 2, email: "jane@example.com", role: "Moderator" },
    { id: 3, email: "alex@example.com", role: "Editor" },
    { id: 4, email: "emma@example.com", role: "Admin" },
    { id: 5, email: "mike@example.com", role: "Moderator" },
    { id: 6, email: "lucy@example.com", role: "Admin" },
    { id: 7, email: "charlie@example.com", role: "Admin" },
    { id: 8, email: "olivia@example.com", role: "Super Admin" },
    { id: 9, email: "sophia@example.com", role: "Moderator" },
    { id: 10, email: "liam@example.com", role: "Editor" },
    { id: 11, email: "noah@example.com", role: "Moderator" },
    { id: 12, email: "ava@example.com", role: "Admin" },
  ]);

  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

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

  // Search filter
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Inline CSS
  const styles = {
    container: {
      padding: isMobile ? "10px" : "20px",
      fontFamily: "Arial, sans-serif",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "15px",
      gap: "10px",
    },
    leftControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    searchInput: {
      width: isMobile ? "100%" : "250px", // ✅ fixed shorter width on desktop
      borderRadius: "6px",
      border: "1px solid #ccc",
      padding: "6px 10px",
      fontSize: "14px",
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
      height: "38px",
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
    colEmail: {
      flex: isMobile ? "none" : 2,
      color: "#333",
      fontWeight: 500,
      marginBottom: isMobile ? "6px" : 0,
      wordBreak: "break-all",
    },
    colRole: {
      flex: isMobile ? "none" : 1,
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
        <div style={styles.leftControls}>
          <Form.Control
            type="text"
            placeholder="Search by email or role..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.searchInput}
          />
        </div>

        <Button
          style={styles.refreshButton}
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : <FaSync />}{" "}
          Refresh
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
            <div style={{ ...styles.colEmail, fontWeight: 600 }}>Email</div>
            <div style={{ ...styles.colRole, fontWeight: 600 }}>Role</div>
          </div>

          {/* Data Rows */}
          {paginatedAdmins.length > 0 ? (
            paginatedAdmins.map((admin) => (
              <div key={admin.id} style={styles.tableRow}>
                <div style={styles.colEmail}>{admin.email}</div>
                <div style={styles.colRole}>{admin.role}</div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "15px" }}>
              No matching records found.
            </p>
          )}

          {/* Pagination */}
          {filteredAdmins.length > itemsPerPage && (
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminInfo;
