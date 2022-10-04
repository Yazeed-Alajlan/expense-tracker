import { useState, useRef, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  useEffect(() => {
    setMessage("");
    setError("");
    setLoading(false);
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot your password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form.Group className="mb-4">
            <p className="fs-5">
              We will email you a link to reset your password.
            </p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter you email"
              ref={emailRef}
              required
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button
              disabled={loading}
              className="fs-5"
              variant="primary"
              type="submit"
            >
              Reset
            </Button>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
