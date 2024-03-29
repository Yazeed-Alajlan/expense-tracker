import { useState, useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import { currentMonth } from "data/MonthData";

import CategoryCardFlat from "components/Categories/CategoryCardFlat";
import Expenses from "components/Expenses/Expenses";

import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

const ExpensesPage = () => {
  const {
    getCategories,
    getCategoryAmountByDate,
    getAllCategoriesAmountByDate,
    getAllCategoriesMaximum,
    selectedMonth,
  } = useCategories();

  const containerVariant = {
    hidden: {
      x: "-100vw",
    },
    visible: {
      x: 0,
      transition: {
        delay: 0.25,
        when: "beforeChildren",
      },
    },
  };
  const cardsVariant = {
    hidden: {
      x: -10,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      staggerChildren: 2,
      // transition: {
      //   delay: 0.4,
      // },
    },
  };

  return (
    <>
      <motion.div
        className="container my-5"
        variants={containerVariant}
        animate="visible"
        initial="hidden"
      >
        <Container className="card border-0 border-top rounded-2 shadow-sm p-4 ">
          <div className="d-flex justify-content-between ">
            <div className="left-section d-flex flex-column gap-2">
              <div className="fs-5">This Month Maximum: </div>
              <div className="fs-5">This Month Total: </div>
            </div>
            <div className="right-section d-flex flex-column gap-2">
              <div className="fs-4 text-primary  ">
                {getAllCategoriesMaximum()}{" "}
              </div>
              <div className="fs-4 text-danger">
                {getAllCategoriesAmountByDate(selectedMonth)}
              </div>
              <div className="fs-4 text-danger border-top ">
                {getAllCategoriesMaximum() -
                  getAllCategoriesAmountByDate(selectedMonth)}
              </div>
            </div>
          </div>
        </Container>

        {getCategories().map((category, index) => {
          const amount = getCategoryAmountByDate(
            category.name,
            selectedMonth
          ).reduce((total, expense) => total + expense.amount, 0);
          if (amount > 0) {
            return (
              <motion.div
                layout
                key={index}
                className="container d-flex flex-column px-0"
                variants={cardsVariant}
              >
                <CategoryCardFlat
                  name={category.name}
                  amount={amount}
                  max={category.max}
                  icon={category.icon}
                />
                <Expenses categoryName={category.name} month={selectedMonth} />
              </motion.div>
            );
          }
        })}
        {/* <Col xs={5}>
            {Object.keys(selectedExpense).length !== 0 && (
              <SelectedExpense
                id={selectedExpense.id}
                category={selectedExpense.category}
                amount={selectedExpense.amount}
                date={selectedExpense.date}
                notes={selectedExpense.notes}
              />
            )}
          </Col> */}
      </motion.div>
    </>
  );
};

export default ExpensesPage;
