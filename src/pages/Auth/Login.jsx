import React, { useState, useRef } from "react";
import { useAuth } from "contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import CenteredContainer from "components/Utils/CenteredContainer";

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
      <Card className="border-0 rounded-4 shadow-sm d-flex flex-row justify-content-between p-5">
        <div className="left-section ">
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
              <Form.Group className="mb-3">
                <div className="mb-3">
                  <label className="me-2" htmlFor="">
                    Remember me
                  </label>
                  <input type="checkbox" />
                </div>

                <Button
                  variant="main"
                  className="w-100"
                  disabled={loading}
                  type="submit"
                >
                  Log In
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </div>
        <div className="right-section">
          <Form.Group>
            <h1 className="signup-title text-center ">New Here?</h1>
            <p className="text-center">Sign up! </p>
            <Link className="signup-btn btn text-center py-1" to="/register">
              Sign Up
            </Link>
          </Form.Group>
        </div>
      </Card>
    </CenteredContainer>
  );
};

export default Login;
