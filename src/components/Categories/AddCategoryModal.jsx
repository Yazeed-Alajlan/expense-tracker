import { useRef, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { icons } from "data/Data";
import { useCategories } from "contexts/CategoriesContext";
import { useAuth } from "contexts/AuthContext";
import Select from "react-select";

const AddCategoryModal = ({ show, handleClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const currentUser = useAuth().currentUser;
  const nameRef = useRef();
  const maxRef = useRef();
  const { addCategory } = useCategories();

  function handleSubmit(e) {
    e.preventDefault();
    addCategory(
      nameRef.current.value,
      parseFloat(maxRef.current.value),
      selectedOption.iconName,
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

          <Form.Group className="mb-3" controlId="icon">
            <Form.Label>category</Form.Label>
            <Select
              required
              placeholder="Select Option"
              value={selectedOption}
              options={icons}
              onChange={(e) => {
                setSelectedOption(e);
              }}
              getOptionLabel={(e) => (
                <div className="fs-2 text-center">{e.icon}</div>
              )}
              getOptionValue={(option) => option.id} // changes here!!!
            />
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
            <Button variant="main" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
