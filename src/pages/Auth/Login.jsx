import React, { useState, useRef } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import CenteredContainer from "components/CenteredContainer";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { logout } = useAuth();
  logout();
  const { login } = useAuth();

  const navigate = useNavigate();

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
      <Card className="shadow border-dark">
        <Card.Title>
          <h1 className="text-center mb-2 ">Login to Your Account</h1>
        </Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-input mb-3">
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
            <Button disabled={loading} type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="container d-flex-column align-items-center py-2 gap-2 ">
        <h1 className="signup-title">New Here?</h1>
        <p>Sign up! </p>
        <Link className="signup-btn btn text-center py-1" to="/register">
          Sign Up
        </Link>
      </div>
    </CenteredContainer>
  );
};

export default Login;
