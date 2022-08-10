import React from "react";
import { Card } from "react-bootstrap";
import { FaHamburger } from "react-icons/fa";
import "styles/css/CategoriesAndExpenses.css";

const ExpenseCard = ({ category, amount, date, notes, icon }) => {
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
    <Card className="expense-card border-0 border-top rounded-2 shadow-sm p-3 w-75  ">
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
  );
};

export default ExpenseCard;
