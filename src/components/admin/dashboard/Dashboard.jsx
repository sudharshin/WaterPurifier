import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Table } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserCircle,
  FaCheckCircle,
  FaClock,
  FaListAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { getEnquiries, getProducts } from "../../../services/api";
import { useUser } from "../../../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [enquiryData, setEnquiryData] = useState({
    completed: 0,
    incoming: 0,
    total: 0,
  });
  const [productData, setProductData] = useState({
    totalProducts: 0,
    mostEnquired: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enquiryRes, productRes] = await Promise.all([
          getEnquiries(user?.accessToken),
          getProducts(user?.accessToken),
        ]);

        const enquiries = enquiryRes?.data || [];
        const products = productRes?.data || [];

        // 🔹 Enquiries classification
        const completed = enquiries.filter(
          (e) => e.status?.toLowerCase() === "closed"
        ).length;
        const incoming = enquiries.filter(
          (e) => e.status?.toLowerCase() === "open"
        ).length;
        const total = enquiries.length;

        // 🔹 Product statistics
        const productCount = products.length;

        // 🔹 Find most enquired products
        const productMap = {};
        enquiries.forEach((e) => {
          if (e.productName) {
            productMap[e.productName] = (productMap[e.productName] || 0) + 1;
          }
        });

        const sortedProducts = Object.entries(productMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // top 5

        setEnquiryData({ completed, incoming, total });
        setProductData({
          totalProducts: productCount,
          mostEnquired: sortedProducts,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // --- Chart Colors ---
  const ENQUIRY_COLORS = ["#4CAF50", "#FF6F61"]; // bright green & coral
  const PRODUCT_COLORS = ["#00CFFF", "#FFD166", "#EF476F", "#8338EC", "#06D6A0"]; // bright palette

  const enquiryChartData = [
    { name: "Completed Enquiries", value: enquiryData.completed },
    { name: "Incoming Enquiries", value: enquiryData.incoming },
  ];

  const productChartData = productData.mostEnquired.map((p, index) => ({
    name: `Rank ${index + 1}`,
    value: p.count,
    productName: p.name,
  }));

  // --- UI ---
  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f9fafc" }}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-50">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Admin Info */}
          <Row className="mb-4">
            <Col md={12}>
              <Card className="shadow-sm border-0 p-3 d-flex flex-row align-items-center">
                <FaUserCircle size={60} color="#007bff" className="me-3" />
                <div>
                  <h4 className="mb-1">
                    Welcome, {user?.username || "Admin"}
                  </h4>
                  <p className="text-muted mb-0">
                    Email: {user?.email || "admin@example.com"}
                  </p>
                  <small className="text-secondary">
                    Role: {user?.role || "Administrator"}
                  </small>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Enquiry & Product Stats */}
          <Row className="g-4 mb-4">
            <Col md={3} sm={6}>
              <Card
                className="text-center shadow-sm border-0 p-3 h-100"
                style={{ backgroundColor: "#E8F5E9" }}
              >
                <FaCheckCircle size={40} color="#2E7D32" className="mb-2" />
                <h5>Completed Enquiries</h5>
                <h3 className="fw-bold text-success">{enquiryData.completed}</h3>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card
                className="text-center shadow-sm border-0 p-3 h-100"
                style={{ backgroundColor: "#FFF3E0" }}
              >
                <FaClock size={40} color="#FF6F00" className="mb-2" />
                <h5>Incoming Enquiries</h5>
                <h3 className="fw-bold text-warning">{enquiryData.incoming}</h3>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card
                className="text-center shadow-sm border-0 p-3 h-100"
                style={{ backgroundColor: "#E3F2FD" }}
              >
                <FaListAlt size={40} color="#1565C0" className="mb-2" />
                <h5>Total Enquiries</h5>
                <h3 className="fw-bold text-primary">{enquiryData.total}</h3>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card
                className="text-center shadow-sm border-0 p-3 h-100"
                style={{ backgroundColor: "#F3E5F5" }}
              >
                <FaBoxOpen size={40} color="#6A1B9A" className="mb-2" />
                <h5>Total Products</h5>
                <h3 className="fw-bold text-purple">{productData.totalProducts}</h3>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row className="mb-4">
            {/* Enquiries Pie Chart */}
            <Col md={6} sm={12}>
              <Card className="shadow-sm border-0 p-4">
                <h5 className="text-center mb-4">Enquiries Overview</h5>
                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={enquiryChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60} // donut effect
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {enquiryChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={ENQUIRY_COLORS[index % ENQUIRY_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            {/* Products Pie Chart */}
            <Col md={6} sm={12}>
              <Card className="shadow-sm border-0 p-4">
                <h5 className="text-center mb-4">
                  Most Enquired Products Overview
                </h5>
                {productChartData.length > 0 ? (
                  <>
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={productChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
                            innerRadius={50}
                            dataKey="value"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                          >
                            {productChartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name, props) => [
                              `${value} Enquiries`,
                              props.payload.productName,
                            ]}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Product Table */}
                    <Table
                      bordered
                      hover
                      size="sm"
                      className="mt-3 text-center align-middle"
                    >
                      <thead className="table-light">
                        <tr>
                          <th>Rank</th>
                          <th>Product</th>
                          <th>Enquiries</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productData.mostEnquired.map((p, index) => (
                          <tr key={index}>
                            <td>{`${index + 1}`}</td>
                            <td>{p.name}</td>
                            <td>{p.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <p className="text-center text-muted">
                    No product enquiries yet.
                  </p>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
