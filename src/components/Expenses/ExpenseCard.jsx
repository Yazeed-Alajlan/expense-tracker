import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useExpenses } from "contexts/ExpensesContext";
import { Card, Button } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit, FaRegTimesCircle } from "react-icons/fa";
import DeleteExpenseModal from "./DeleteExpenseModal";
import EditExpenseModal from "./EditExpenseModal";
const ExpenseCard = ({ id, category, amount, date, notes }) => {
  const { setSelectedExpenseId, selectedExpenseId } = useExpenses();
  const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var d = new Date(date);
  var dayName = days[d.getDay()];
  var monthName = months[d.getMonth()];

  return (
    <motion.div layout>
      <Card className="expense-card border-0 border-top rounded-4 shadow-sm p-3 ">
        {selectedExpenseId === id ? (
          <motion.div>
            <Card.Title className="expense-card-top-section d-flex justify-content-between">
              <div>
                <Button
                  style={{ border: 0 }}
                  variant="outline"
                  onClick={() => {
                    setSelectedExpenseId();
                  }}
                >
                  <FaRegTimesCircle />
                </Button>
                Transaction details
              </div>
              <div>
                <Button style={{ border: 0 }} variant="outline">
                  <FaRegTrashAlt
                    onClick={() => {
                      setShowDeleteExpenseModal(true);
                    }}
                  />
                </Button>
                <Button style={{ border: 0 }} variant="outline">
                  <FaRegEdit
                    onClick={() => {
                      setShowEditExpenseModal(true);
                    }}
                  />
                </Button>
              </div>
            </Card.Title>
          </motion.div>
        ) : (
          <></>
        )}
        <motion.div>
          <Card.Body
            onClick={() => {
              setSelectedExpenseId(id);
            }}
          >
            <motion.div
              layout="position"
              className="d-flex justify-content-between align-items-center "
            >
              <div className="d-flex gap-3">
                <div className=" display-5">{date.substring(8, 10)}</div>
                <div className="d-flex justify-content-center align-items-center ">
                  <div className="fs-5">
                    {dayName}, {monthName}, {date.substring(0, 4)}
                  </div>
                </div>
              </div>
              <div className="fs-3 text-danger">-{amount}</div>
            </motion.div>
          </Card.Body>
        </motion.div>

        {selectedExpenseId === id ? (
          <motion.div>
            <Card.Footer>{notes}</Card.Footer>
          </motion.div>
        ) : (
          <></>
        )}
      </Card>
      <DeleteExpenseModal
        show={showDeleteExpenseModal}
        handleClose={() => setShowDeleteExpenseModal(false)}
        expenseId={id}
      />
      <EditExpenseModal
        show={showEditExpenseModal}
        handleClose={() => setShowEditExpenseModal(false)}
        expenseId={id}
        category={category}
        amount={amount}
        date={date}
        notes={notes}
      />
    </motion.div>
  );
};

export default ExpenseCard;
