import React from "react";
import { Card, Container } from "react-bootstrap";
import Expenses from "./Expenses";
import "styles/css/CategoriesAndExpenses.css";

const ExpensesContainer = () => {
  return (
    <>
      <Card>
        <Card.Title className="expense-card  m-4 d-flex justify-content-between align-content-center gap-2">
          <div className="d-flex gap-4">
            <div className="d-flex flex-column justify-content-center align-content-center ">
              <div>Monday</div>
              <div>2022/6</div>
            </div>
            <div className=" display-6">22</div>
          </div>
          <div className="fs-2 text-danger">15564</div>
        </Card.Title>
      </Card>
      <Expenses />
    </>
  );
};

export default ExpensesContainer;
