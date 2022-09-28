import React, { useState, useRef } from "react";
import { useAuth } from "contexts/AuthContext";
import { useCategories } from "contexts/CategoriesContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import CenteredContainer from "components/Utils/CenteredContainer";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { logout } = useAuth();
  logout();
  const { register } = useAuth();
  const { addDefualtCategories } = useCategories();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      addDefualtCategories();
      navigate("/home");
    } catch (error) {
      setError("Falid to create an account");
    }
    setLoading(false);
  };

  return (
    <CenteredContainer>
      <Card className="border-0 rounded-4 shadow-sm d-flex flex-row justify-content-between p-5">
        <div className="left-section ">
          <Card.Title>
            <h1 className="text-center mb-2 ">Sign up to XXXXX</h1>
          </Card.Title>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="form-input mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  ref={emailRef}
                  id="email"
                  placeholder="Email"
                  maxLength="100"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  id="password"
                  placeholder="Password"
                  maxLength="128"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
              type="password"
              ref={passwordConfirmationRef}
              id="passwordConfirmation"
              placeholder="Confirm Password"
              maxLength="128"
              required
                />
              </Form.Group>
              <Form.Group className="mb-3">
           

                <Button
                  variant="main"
                  className="w-100"
                  disabled={loading}
                  type="submit"
                >
                  Creat an Account
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </div>
        <div className="right-section">
          <Form.Group>
            <h1 className="signup-title text-center ">New Here?</h1>
            <p className="text-center">Sign up! </p>
            <Link className="signup-btn btn text-center py-1" to="/login">
              Sign Up
            </Link>
          </Form.Group>
        </div>
      </Card>
    </CenteredContainer>

    // <div className="page d-flex-row ">
    //   <div className="signup-container container card w-75 ">
    //     <div className="left-section d-flex-row align-items-center">
    //       <div className="container d-flex-column align-items-center py-2 gap-2 ">
    //         <h1 className="login-title">Has an Account?</h1>
    //         <Link className="signup-btn btn text-center py-1" to="/login">
    //           Sign In
    //         </Link>
    //       </div>
    //     </div>

    //     <div className="right-section">
    //       <h1 className="signup-title text-center mb-2">Create Free Account</h1>
    //       {error && <div className="card">{error}</div>}

    //       <form className="container d-flex-column align-items-center gap-1">
    //         <input
    //           type="text"
    //           ref={emailRef}
    //           id="email"
    //           placeholder="Email"
    //           maxLength="100"
    //           required
    //         />
    //         <input
    //           type="password"
    //           ref={passwordRef}
    //           id="password"
    //           placeholder="Password"
    //           maxLength="128"
    //           required
    //         />
    //         <input
    //           type="password"
    //           ref={passwordConfirmationRef}
    //           id="passwordConfirmation"
    //           placeholder="Confirm Password"
    //           maxLength="128"
    //           required
    //         />
    //         <button
    //           className="login-btn btn my-1"
    //           disabled={loading}
    //           onClick={handleSubmit}
    //           type="submit"
    //         >
    //           Sign Up
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Register;
