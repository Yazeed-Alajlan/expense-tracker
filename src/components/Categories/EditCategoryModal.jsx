import { useRef, useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { icons } from "data/Data";
import { useCategories } from "contexts/CategoriesContext";
import Select from "react-select";

const EditCategoryModal = ({
  show,
  handleClose,
  categorId,
  max,
  name,
  iconName,
  icon,
}) => {
  const [selectedOption, setSelectedOption] = useState({
    icon: icon,
    iconName: iconName,
  });

  const nameRef = useRef();
  const maxRef = useRef();
  const { updateCategory } = useCategories();

  function handleSubmit(e) {
    e.preventDefault();
    updateCategory(
      nameRef.current.value,
      parseFloat(maxRef.current.value),
      selectedOption.iconName,
      categorId
    );

    handleClose();
  }
  useEffect(() => {
    setSelectedOption({
      icon: icon,
      iconName: iconName,
    });
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={nameRef}
              type="text"
              defaultValue={name || 0}
              required
            />
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
              getOptionValue={(option) => option.iconName} // changes here!!!
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              defaultValue={max || 0}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="main" type="submit">
              Edit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
