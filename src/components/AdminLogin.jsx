import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ✅ Import context
import AdminLogo from "../assets/AdminLogo.jpg";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // ✅ get login function from context

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Hardcoded credentials (replace with API if needed)
    /*if (email === "admin@gmail.com" && password === "admin" || email === "vendor@gmail.com" && password === "vendor") {
      setError("");
      login({ email }); // ✅ Save user in context + localStorage
      navigate("/viewallproducts", { replace: true }); // ✅ Redirect to protected page
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };*/

   if (email === "admin@gmail.com" && password === "admin") {
      setError("");
      login({ email, role: "admin" }); // ✅ set role
      navigate("/viewallproducts", { replace: true });
    } else if (email === "vendor@gmail.com" && password === "vendor") {
      setError("");
      login({ email, role: "vendor" }); // ✅ set role
      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left side with logo */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center bg-white"
        >
          <img
            src={AdminLogo}
            alt="Kanban Logo"
            style={{ width: "250px", marginBottom: "20px" }}
          />
          <h4 className="fw-bold text-primary">KANBAN</h4>
        </Col>

        {/* Right side with form */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Card style={{ width: "350px", border: "none" }}>
            <Card.Body>
              <div className="d-flex justify-content-center mb-3">
                <img src={AdminLogo} alt="small logo" style={{ width: "40px" }} />
              </div>

              <div className="text-center mb-4">
                <h4 className="fw-bold">Log in to your account</h4>
                <p className="text-muted" style={{ fontSize: "14px" }}>
                  Welcome back! Please enter your details.
                </p>
              </div>

              {/* Error Alert */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Login Form */}
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

                <Button variant="primary" type="submit" className="w-100">
                  Sign in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLogin;
