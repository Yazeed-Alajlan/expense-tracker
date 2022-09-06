import { useState, useEffect, useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import { useExpenses } from "contexts/ExpensesContext";
import { currentMonth } from "data/MonthData";

import CategoriesSlider from "components/Categories/CategoriesSlider";
import PieChart from "components/Charts/PieChart";
import BarChart from "components/Charts/BarChart";
import AddExpenseModal from "components/Expenses/AddExpenseModal";

import { Button, Container } from "react-bootstrap";
import "styles/css/Home.css";

const HomePage = () => {
  const [month, setMonth] = useState(currentMonth);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const monthFilterRef = useRef();
  const {
    getAllCategoriesAmountByDate,
    getCategories,
    getAllCategoriesAmountByDateSortedByCategory,
  } = useCategories();
  const { getExpenseAmountSortedByDayForDate } = useExpenses();

  const pieChartData = {
    labels: getCategories().map((category) => category.name),
    datasets: [
      {
        label: "Users Gained",
        data: getAllCategoriesAmountByDateSortedByCategory(month),

        backgroundColor: [
          "#4263cb",
          "#67801f",
          "#50AF95",
          "#f3ba2f",
          "#6e7f3b",
          "#6f4f61",
          "#b1b38b",
          "#543608",
        ],
        borderColor: "grey",
        borderWidth: 0.5,
      },
    ],
  };
  const barChartData = {
    labels: [
      "Sunday ",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Users Gained",
        data: getExpenseAmountSortedByDayForDate(month),
        backgroundColor: [
          "#4263cb",
          "#67801f",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#e10aae",
          "#6e7f3b",
          "#6f4f61",
          "#b1b38b",
          "#543608",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const handleMonthFilter = () => {
    if (monthFilterRef.current.value === "") {
      setMonth(currentMonth);
    }
    setMonth(monthFilterRef.current.value);
  };

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center  my-5">
        <div>
          <h1 className="">Total</h1>
          <p className="fs-1 fw-bold">{getAllCategoriesAmountByDate(month)}</p>
        </div>

        <Button
          className="ms-auto"
          onClick={() => setShowAddExpenseModal(true)}
        >
          +
        </Button>
      </div>

      <input
        type="month"
        ref={monthFilterRef}
        value={month}
        onChange={handleMonthFilter}
      />

      <h2>Categories</h2>
      <CategoriesSlider month={month} />
      <div className="d-flex justify-content-center">
        <div style={{ width: 700 }}>
          <PieChart chartData={pieChartData} />
        </div>
        <div style={{ width: 700 }}>
          <BarChart chartData={barChartData} />
        </div>
      </div>

      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </Container>
  );
};

export default HomePage;
