import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { loginUser } from "../../services/api";
import AdminLogo from "../../assets/Logo.png";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const { accessToken, refreshToken, role } = res.data;
      login({ email, role, accessToken, refreshToken });
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "calc(100vh - 90px)", // ✅ compensate for 90px route padding-top
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      padding: "0",
      overflow: "hidden",
    },
    row: {
      width: "100%",
      maxWidth: "1100px",
      display: "flex",
      flexDirection: "row", // Always horizontal
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      gap: "0",
    },
    leftCol: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 90px)",
      padding: "10px",
    },
    rightCol: {
      flex: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 90px)",
      padding: "10px",
    },
    logo: {
      width: "60%",
      maxWidth: "300px",
      height: "auto",
    },
    smallLogo: {
      width: "70px",
      marginBottom: "10px",
    },
    card: {
      width: "100%",
      maxWidth: "350px",
      border: "none",
      borderRadius: "10px",
      padding: "15px",
    },
  };

  return (
    <>
      <style>
        {`
          /* Always horizontal layout */
          .login-row {
            flex-direction: row !important;
          }

          /* --- Responsive scaling only (never stacking) --- */
          @media (max-width: 1024px) {
            .login-logo { width: 220px !important; }
            .login-small-logo { width: 60px !important; }
            .login-card { max-width: 320px !important; }
            .login-card h4 { font-size: 20px !important; }
            .login-card p { font-size: 13px !important; }
            .login-card input, .login-card button {
              font-size: 14px !important;
              height: 38px !important;
            }
          }

          @media (max-width: 768px) {
            .login-logo { width: 180px !important; }
            .login-small-logo { width: 55px !important; }
            .login-card { max-width: 280px !important; }
            .login-card h4 { font-size: 18px !important; }
            .login-card p { font-size: 12px !important; }
          }

          @media (max-width: 430px) {
            .login-logo { width: 150px !important; }
            .login-small-logo { width: 50px !important; }
            .login-card { max-width: 250px !important; }
            .login-card h4 { font-size: 16px !important; }
            .login-card p { font-size: 12px !important; }
            .login-card input, .login-card button {
              font-size: 12px !important;
              height: 34px !important;
            }
          }

          @media (max-width: 375px) {
            .login-logo { width: 130px !important; }
            .login-small-logo { width: 45px !important; }
            .login-card { max-width: 230px !important; }
            .login-card h4 { font-size: 15px !important; }
            .login-card p { font-size: 11px !important; }
          }

          @media (max-width: 350px) {
            .login-logo { width: 120px !important; }
            .login-small-logo { width: 40px !important; }
            .login-card { max-width: 210px !important; }
            .login-card h4 { font-size: 14px !important; }
            .login-card p { font-size: 10px !important; }
            .login-card input, .login-card button {
              font-size: 10px !important;
              height: 30px !important;
            }
          }

          @media (max-width: 300px) {
            .login-logo { width: 100px !important; }
            .login-small-logo { width: 35px !important; }
            .login-card { max-width: 190px !important; }
            .login-card h4 { font-size: 13px !important; }
            .login-card p { font-size: 9px !important; }
            .login-card input, .login-card button {
              font-size: 9px !important;
              height: 28px !important;
            }
          }
        `}
      </style>

      <Container fluid style={styles.container}>
        <Row className="login-row" style={styles.row}>
          {/* Left (Logo) */}
          <Col className="login-left" style={styles.leftCol}>
            <img
              src={AdminLogo}
              alt="Leomax Logo"
              className="login-logo"
              style={styles.logo}
            />
          </Col>

          {/* Right (Form) */}
          <Col className="login-right" style={styles.rightCol}>
            <Card className="login-card" style={styles.card}>
              <Card.Body>
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={AdminLogo}
                    alt="small logo"
                    className="login-small-logo"
                    style={styles.smallLogo}
                  />
                </div>

                <div className="text-center mb-4">
                  <h4 className="fw-bold">Log in to your account</h4>
                  <p className="text-muted" style={{ fontSize: "14px" }}>
                    Welcome back! Please enter your details.
                  </p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminLogin;
