import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const CategoryCardFlat = ({ name, amount, max, icon }) => {
  const classNames = [];
  if (amount > max) {
    classNames.push(
      "category-card-flat border-0 rounded-4 shadow-md p-3 mt-4",
      "bg-danger",
      "bg-opacity-10"
    );
  } else {
    classNames.push("category-card-flat border-0 rounded-4 shadow-md p-3 mt-4");
  }
  return (
    <motion.div layout>
      <Card className={classNames.join(" ")}>
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
      </Card>{" "}
    </motion.div>
  );
};

export default CategoryCardFlat;
