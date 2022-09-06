import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useExpenses } from "contexts/ExpensesContext";
import { FaRegTimesCircle } from "react-icons/fa";

export default function DeleteExpenseModal({ show, handleClose, expenseId }) {
  const { setSelectedExpense, deleteExpense } = useExpenses();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="contianer d-flex justify-content-center align-items-center flex-column gap-4">
        <FaRegTimesCircle className=" display-1 text-danger border-1" />
        <h2>Are you sure?</h2>
        <p className="text-center text-muted mx-4">
          Do you really want to delete this expense? This process cannot be
          undone.
        </p>
        {/* <Button variant="secondary">Cancel</Button> */}
        <Button
          variant="danger"
          onClick={() => {
            deleteExpense(expenseId);
            setSelectedExpense({});
          }}
        >
          Delete
        </Button>
      </Modal.Body>
    </Modal>
  );
}
