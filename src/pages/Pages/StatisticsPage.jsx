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
        <Col xs="12" xm="6" xl="6" lg={6} md={12}>
          <div className="card border-0 rounded-4 shadow-sm  mb-5">
            <h1 className="text-muted text-center fs-3">Monthly Spending</h1>
            <HorizontalBarChart chartData={horizontalBarChartData} />
          </div>
        </Col>
        <Col xs="12" xm="6" xl="6" lg={6} md={12}>
          <div className="card border-0 rounded-4 shadow-sm  mb-5">
            <h1 className="text-muted text-center fs-3">Spending by Day</h1>
            <BarChart chartData={barChartData} />
          </div>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs="12" xm="6" xl="6" lg={6} md={12}>
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
