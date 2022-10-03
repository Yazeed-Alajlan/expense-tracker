import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const emailRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter you email"
              ref={emailRef}
              required
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Reset
            </Button>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
