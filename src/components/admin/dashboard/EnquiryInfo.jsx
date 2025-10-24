import React, { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Pagination,
  Form,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FaSync } from "react-icons/fa";
import { getEnquiries, updateEnquiryStatus } from "../../../services/api";

const EnquiryInfo = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("incoming");
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const itemsPerPage = 5;

  // Fetch Enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.accessToken;
      const response = await getEnquiries(token);

      const data = (response.data || []).map((item) => ({
        ...item,
        localStatus: (item.status || "open").toLowerCase(),
      }));

      setEnquiries(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch enquiries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Refresh
  const handleRefresh = () => {
    setCurrentPage(1);
    fetchEnquiries();
  };

  // open confirmation modal (no local update yet)
  const handleStatusChange = (enquiry, status) => {
    setSelectedEnquiry(enquiry);
    setNewStatus(status.toLowerCase());
    setShowModal(true);
  };

  // Confirm and call API, then update local state
  const confirmStatusChange = async () => {
    if (!selectedEnquiry) return;
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.accessToken;
      await updateEnquiryStatus(selectedEnquiry.id, newStatus, token);
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === selectedEnquiry.id
            ? { ...item, localStatus: newStatus }
            : item
        )
      );
      setShowModal(false);
      setSelectedEnquiry(null);
      setNewStatus("");
      setCurrentPage(1);
    } catch (err) {
      console.error("Status update failed:", err);
      setShowModal(false);
      setSelectedEnquiry(null);
      setNewStatus("");
    }
  };

  // Filtering by active tab & search
  const filteredData = enquiries.filter((enq) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      enq.name?.toLowerCase().includes(q) ||
      enq.email?.toLowerCase().includes(q) ||
      enq.productName?.toLowerCase().includes(q);

    const matchesTab =
      activeTab === "incoming"
        ? enq.localStatus === "open"
        : enq.localStatus === "closed";

    return matchesSearch && matchesTab;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render Tab Content
  const renderTabContent = () => (
    <>
      <div className="header-row">
        <Form.Control
          type="text"
          placeholder="Search by name, email, or product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        <Button
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? (
            <Spinner
              animation="border"
              size="sm"
              variant="light"
              style={{ color: "#b0b0b0" }} // Cement color
            />
          ) : (
            <FaSync />
          )}{" "}
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : paginatedData.length === 0 ? (
        <div className="text-center text-muted">No enquiries found.</div>
      ) : (
        <>
          <div className="table-wrapper">
            <div className="table-header">
              <div className="col sno-col">S.No</div>
              <div className="col name-col">Name</div>
              <div className="col email-col">Email</div>
              <div className="col phone-col">Phone</div>
              <div className="col product-col">Product</div>
              <div className="col message-col">Message</div>
              <div className="col status-col">Status</div>
            </div>

            {paginatedData.map((enquiry, index) => (
              <div key={enquiry.id} className="table-row">
                <div className="col sno-col" data-label="S.No">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </div>
                <div className="col name-col" data-label="Name">
                  {enquiry.name || "-"}
                </div>
                <div
                  className="col email-col email-cell"
                  title={enquiry.email || ""}
                  data-label="Email"
                >
                  {enquiry.email || "-"}
                </div>
                <div className="col phone-col" data-label="Phone">
                  {enquiry.phone || "-"}
                </div>
                <div className="col product-col" data-label="Product">
                  {enquiry.productName || "-"}
                </div>
                <div className="col message-col" data-label="Message">
                  {enquiry.message || "-"}
                </div>
                <div className="col status-col" data-label="Status">
                  <Form.Select
                    size="sm"
                    value={enquiry.localStatus}
                    onChange={(e) =>
                      handleStatusChange(enquiry, e.target.value)
                    }
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-container">
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
        </>
      )}
    </>
  );

  return (
    <div className="enquiry-container">
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => {
          setActiveTab(k);
          setCurrentPage(1);
        }}
        className="mb-3"
      >
        <Tab eventKey="incoming" title="Incoming Orders">
          {renderTabContent()}
        </Tab>
        <Tab eventKey="history" title="History">
          {renderTabContent()}
        </Tab>
      </Tabs>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the status to{" "}
          <strong>{newStatus?.toUpperCase()}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmStatusChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx="true">{`
        .enquiry-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .search-input {
          flex: 1;
          min-width: 220px;
          max-width: 420px;
        }
        .refresh-btn {
          background-color: #357ca5;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px; /* Adjust height as needed */
        }
        .table-wrapper {
          overflow-x: auto;
        }
        .table-header,
        .table-row {
          display: grid;
          grid-template-columns: 0.4fr 1.2fr 1.6fr 1fr 1.2fr 1.8fr 1fr;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 10px;
          background: #fff;
          min-width: 1000px;
        }
        .table-header {
          background: #f8f9fa;
          font-weight: 600;
          border-bottom: 2px solid #eaeaea;
        }
        .col {
          font-size: 14px;
          color: #333;
          text-align: left;
        }
        .email-cell {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 250px;
        }
        .pagination-container {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }
        @media (max-width: 820px) {
          .table-header,
          .table-row {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            min-width: unset;
          }
          .email-cell {
            white-space: normal;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EnquiryInfo;
