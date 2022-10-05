import { useState, useEffect, useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import { useExpenses } from "contexts/ExpensesContext";

import PieChart from "components/Charts/PieChart";
import BarChart from "components/Charts/BarChart";
import HorizontalBarChart from "components/Charts/HorizontalBarChart";

import { Container, Row, Col } from "react-bootstrap";
const StatisticsPage = () => {
  const {
    getCategories,
    getAllCategoriesAmountByDateSortedByCategory,
    selectedMonth,
    getAllCategoriesAmountByDateSortedByMonth,
  } = useCategories();
  const { getExpenseAmountSortedByDayForDate } = useExpenses();

  const pieChartData = {
    labels: getCategories().map((category) => category.name),
    datasets: [
      {
        data: getAllCategoriesAmountByDateSortedByCategory(selectedMonth),

        backgroundColor: [
          "rgb(111, 78, 55)",
          "rgb(50, 205, 50)",
          "rgb(255, 223, 70)",
          "#fff",
          "rgb(255,97,29)",
          "rgb(199, 175, 118)",
          "rgb(201, 203, 207)",
          "rgb(70, 68, 93)",

          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",

          // "#6f4e37",
          // "#67801f",
          // "#35350f",
          // "#f3ba2f",
          // "#982121	",
          // "#6f4f61",
          // "#b1b38b",
          // "#543608",
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
        data: getExpenseAmountSortedByDayForDate(selectedMonth),
        backgroundColor: "#7569f8",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const horizontalBarChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: getAllCategoriesAmountByDateSortedByMonth(),
        backgroundColor: "#7569f8",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Container className="my-5">
      {/* <div className="d-flex flex-wrap justify-content-between">
        <div
          className="card border-0 rounded-4 shadow-sm"
          style={{ width: "620px" }}
        >
          <h1 className="text-muted text-center fs-3">Monthly Spending</h1>
          <HorizontalBarChart chartData={horizontalBarChartData} />
        </div>
        <div
          className="card border-0 rounded-4 shadow-sm  "
          style={{ width: "620px" }}
        >
          <h1 className="text-muted text-center fs-3">Spending by Day</h1>
          <BarChart chartData={barChartData} />
        </div>
        <div className="card border-0 rounded-4 shadow-sm  ">
          <h1 className="text-muted text-center fs-3">Expenses by Category</h1>
          <PieChart chartData={pieChartData} />
        </div>
      </div> */}
      <Row>
        <Col lg={6}>
          <div className="card border-0 rounded-4 shadow-sm  mb-5">
            <h1 className="text-muted text-center fs-3">Monthly Spending</h1>
            <HorizontalBarChart chartData={horizontalBarChartData} />
          </div>
        </Col>
        <Col lg={6}>
          <div className="card border-0 rounded-4 shadow-sm  mb-5">
            <h1 className="text-muted text-center fs-3">Spending by Day</h1>
            <BarChart chartData={barChartData} />
          </div>
        </Col>
      </Row>
      <Row className="mb-5 justify-content-center">
        <Col lg={6}>
          <div className="card border-0 rounded-4 shadow-sm mb-5">
            <h1 className="text-muted text-center fs-3">
              Expenses by Category
            </h1>
            <PieChart chartData={pieChartData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsPage;
