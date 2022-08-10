import React from "react";
import ExpenseCard from "./ExpenseCard";

import { useExpenses } from "contexts/ExpensesContext";
import { useCategories } from "contexts/CategoriesContext";
import { Container } from "react-bootstrap";

const Expenses = ({ categoryName, month }) => {
  const { getExpenses } = useExpenses();
  return (
    <Container>
      {getExpenses().map((expense) => {
        {
          if (
            categoryName == expense.category &&
            month === expense.date.substring(0, 7)
          ) {
            return (
              <ExpenseCard
                category={expense.category}
                amount={expense.amount}
                date={expense.date}
                notes={expense.notes}
                // icon={getCategories().map((category) => {
                //   if (category.name === expense.category) return category.icon;
                // })}
              />
            );
          }
        }
      })}
    </Container>
  );
};

export default Expenses;
