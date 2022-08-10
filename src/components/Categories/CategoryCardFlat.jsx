import Expenses from "components/Expenses/Expenses";
import React from "react";
import { Card, Stack, ProgressBar, Container } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import "styles/css/CategoriesAndExpenses.css";

const CategoryCardFlat = ({ name, amount, max, icon }) => {
  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "success";
    if (ratio < 0.75) return "warning";
    return "danger";
  }

  return (
    <Card className="category-card-flat border-0 rounded-4 shadow-sm p-3 mt-4 w-75 ">
      <div className="d-flex align-items-center">
        <div className="category-card-icon d-flex justify-content-center align-items-center rounded-circle me-4">
          <p>{icon}</p>
        </div>
        <div className="text-muted fs-4">{name}</div>

        <div className="d-flex align-items-baseline fs-4 ms-auto ">
          ${amount} <span className="text-muted fs-6 ms-1">/ ${max}</span>
        </div>
      </div>
      {/* <div className="d-flex justify-content-between align-content-center m-4">
          <FaEllipsisV className="my-4" />
        </div> */}
    </Card>
  );
};

export default CategoryCardFlat;
