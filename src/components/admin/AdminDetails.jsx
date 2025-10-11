import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDetails = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetch from localStorage or API
    const user = JSON.parse(localStorage.getItem("user"));
    setTimeout(() => {
      setAdmin(user);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Container className="py-4">
      {/* Header Navigation Links */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <Link to="/admin/dashboard">
            <Button variant="outline-primary">Products</Button>
          </Link>
          <Link to="/admin/details">
            <Button variant="primary">Admin</Button>
          </Link>
          <Link to="/admin/enquiry">
            <Button variant="outline-primary">Enquiry</Button>
          </Link>
        </div>
      </div>

      <h3 className="mb-4 text-center">Admin Details</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <div>Loading admin details...</div>
        </div>
      ) : !admin ? (
        <div className="text-center text-muted">No admin details found.</div>
      ) : (
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Username</strong></td>
              <td>{admin.username || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Role</strong></td>
              <td>{admin.role || "Admin"}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDetails;
