import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit, FaRegTimesCircle } from "react-icons/fa";
import { useExpenses } from "contexts/ExpensesContext";
import DeleteExpenseModal from "./DeleteExpenseModal";
import EditExpenseModal from "./EditExpenseModal";
const SelectedExpense = ({ id, category, amount, date, notes }) => {
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

  var dateObject = new Date(date);
  var dayName = days[dateObject.getDay()];
  var monthName = months[dateObject.getMonth()];

  const { setSelectedExpense, getExpenseById, deleteExpense } = useExpenses();
  const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);

  useEffect(() => {
    setSelectedExpense(getExpenseById(id));
  }, [getExpenseById]);
  return (
    <>
      <Card className="expense-card border-0 border-top rounded-2 shadow-sm p-3 sticky-top">
        <Card.Title className="d-flex justify-content-between">
          <div>
            <Button
              style={{ border: 0 }}
              variant="outline"
              onClick={() => {
                setSelectedExpense({});
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
        <div className="d-flex justify-content-between align-items-center ">
          <div className="d-flex gap-3">
            <div className=" display-5">{date.substring(8, 10)}</div>
            <div className="d-flex justify-content-center align-items-center ">
              <div className="fs-5">
                {dayName}, {monthName}, {date.substring(0, 4)}
              </div>
            </div>
          </div>

          {/* <div className="d-flex justify-content-center align-items-center">
            <div className="expense-icon me-2">
              <div className="fs-4 p-2">{icon}</div>
            </div>
          </div> */}
          <div className="fs-3 text-danger">-{amount}</div>
        </div>
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
    </>
  );
};

export default SelectedExpense;
