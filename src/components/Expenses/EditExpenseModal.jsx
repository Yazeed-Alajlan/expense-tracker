import { useRef, useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useCategories } from "contexts/CategoriesContext";
import { useExpenses } from "contexts/ExpensesContext";

import Select from "react-select";

export default function EditExpenseModal({
  show,
  handleClose,
  expenseId,
  category,
  amount,
  date,
  notes,
}) {
  const { getCategories, getCategoryByName } = useCategories();
  const { getExpenseById, setSelectedExpense } = useExpenses();
  const [selectedOption, setSelectedOption] = useState();

  const amountRef = useRef();
  const dateRef = useRef();
  const notesRef = useRef();
  const { updateExpense } = useExpenses();
  function handleSubmit(e) {
    e.preventDefault();
    updateExpense(
      selectedOption.name,
      parseFloat(amountRef.current.value),
      dateRef.current.value,
      notesRef.current.value,
      expenseId
    );

    handleClose();
  }

  useEffect(() => {
    setSelectedOption(getCategoryByName(category));
    // Update the document title using the browser API
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>category</Form.Label>
            <Select
              required
              defaultValue={getCategoryByName(category)}
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
              type="number"
              // key={amount}
              defaultValue={amount || 0}
              ref={amountRef}
              required
              min={0}
              step={1}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={dateRef}
              defaultValue={date || 0}
              type="date"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="notes">
            <Form.Label>notes</Form.Label>
            <Form.Control ref={notesRef} defaultValue={notes} type="text" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
