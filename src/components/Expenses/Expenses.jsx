import ExpenseCard from "./ExpenseCard";

import { useExpenses } from "contexts/ExpensesContext";

const Expenses = ({ categoryName, month }) => {
  const { getExpenses } = useExpenses();

  return (
    <>
      {getExpenses().map((expense, index) => {
        {
          if (
            categoryName == expense.category &&
            month === expense.date.substring(0, 7)
          ) {
            return (
              <ExpenseCard
                key={index}
                id={expense.id}
                category={expense.category}
                amount={expense.amount}
                date={expense.date}
                notes={expense.notes}
              />
            );
          }
        }
      })}
    </>
  );
};

export default Expenses;
