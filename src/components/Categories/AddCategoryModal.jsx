import React from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import { useAuth } from "contexts/AuthContext";

const AddCategoryModal = ({ show, handleClose }) => {
  const currentUser = useAuth().currentUser;
  const nameRef = useRef();
  const maxRef = useRef();
  const { addCategory } = useCategories();

  function handleSubmit(e) {
    e.preventDefault();
    addCategory(
      nameRef.current.value,
      parseFloat(maxRef.current.value),
      currentUser.uid
    );

    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
