import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EnquiryDetails = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching enquiry data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEnquiries([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          subject: "Product availability",
          message: "Is product X available in stock?",
          date: "2025-10-10",
        },
        {
          id: 2,
          name: "Priya Sharma",
          email: "priya@gmail.com",
          subject: "Bulk order query",
          message: "Can I get a discount for bulk purchase?",
          date: "2025-10-09",
        },
        {
          id: 3,
          name: "Arun Kumar",
          email: "arun.kumar@yahoo.com",
          subject: "Payment issue",
          message: "My payment failed, can you assist?",
          date: "2025-10-08",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <Container className="py-4">
      {/* 🔗 Top Navigation Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3">
          <Button variant="outline-primary" onClick={() => navigate("/admin/dashboard")}>
            Products
          </Button>
          <Button variant="outline-primary" onClick={() => navigate("/admin/details")}>
            Admin
          </Button>
          <Button variant="primary" disabled>
            Enquiry
          </Button>
        </div>
      </div>

      <h3 className="mb-4 text-center">Enquiry Details</h3>

      {/* Loading State */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <div>Loading enquiries...</div>
        </div>
      ) : enquiries.length === 0 ? (
        <p className="text-center text-muted">No enquiries found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td>{enquiry.id}</td>
                <td>{enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.subject}</td>
                <td>{enquiry.message}</td>
                <td>{enquiry.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default EnquiryDetails;
