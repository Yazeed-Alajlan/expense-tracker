import React, { useState, useRef } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import CenteredContainer from "components/Utils/CenteredContainer";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForogtPasswordModal, setShowForogtPasswordModal] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { logout, login } = useAuth();
  const navigate = useNavigate();
  logout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <CenteredContainer>
      <Card className="border-0 shadow-sm ">
        <Card.Title>
          <h1 className="text-center mb-2 ">Login to Your Account</h1>
        </Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-input mb-3 ">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between">
              <Form.Check type="checkbox" label="Remember me" />
              <a href="#" onClick={() => setShowForogtPasswordModal(true)}>
                Forgot Password
              </a>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="w-100 w-lg-50"
                  disabled={loading}
                  type="submit"
                >
                  Log In
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center ">
              <p className="me-2"> Don't have an account? </p>
              <Link className="" to="/register">
                Create One
              </Link>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <ForgotPasswordModal
        show={showForogtPasswordModal}
        handleClose={() => setShowForogtPasswordModal(false)}
      />
    </CenteredContainer>
  );
};

export default Login;
