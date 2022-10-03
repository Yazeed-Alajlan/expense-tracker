import { useRef, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useCategories } from "contexts/CategoriesContext";
import { useExpenses } from "contexts/ExpensesContext";
import { useAuth } from "contexts/AuthContext";
import Select from "react-select";

export default function AddExpenseModal({ show, handleClose }) {
  const { getCategories } = useCategories();
  const [selectedOption, setSelectedOption] = useState(null);

  const currentUser = useAuth().currentUser;

  const amountRef = useRef();
  const dateRef = useRef();
  const notesRef = useRef();

  const { addExpense } = useExpenses();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense(
      selectedOption.name,
      parseFloat(amountRef.current.value),
      dateRef.current.value,
      notesRef.current.value,
      currentUser.uid
    );
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>category</Form.Label>
            <Select
              required
              placeholder="Select Option"
              value={selectedOption}
              options={getCategories()}
              onChange={(e) => {
                setSelectedOption(e);
              }}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.icon}
                  <span style={{ marginLeft: 5 }}>{e.name}</span>
                </div>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={dateRef} type="date" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="notes">
            <Form.Label>notes</Form.Label>
            <Form.Control ref={notesRef} type="text" />
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
}
