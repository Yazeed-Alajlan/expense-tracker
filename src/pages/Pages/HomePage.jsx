import { useState, useEffect, useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import { useExpenses } from "contexts/ExpensesContext";

import CategoriesSlider from "components/Categories/CategoriesSlider";
import AddCategoryModal from "components/Categories/AddCategoryModal";
import { Button, Container } from "react-bootstrap";
import "styles/css/CategoriesAndExpenses.css";

const HomePage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const {
    getAllCategoriesAmountByDate,
    getCategories,
    getAllCategoriesAmountByDateSortedByCategory,
    selectedMonth,
  } = useCategories();
  const { getExpenseAmountSortedByDayForDate } = useExpenses();

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

  return (
    <Container className="my-5 d-flex flex-column">
      <div className="d-flex mb-3">
        <div>
          <h2 className="fs-2 text-muted">Total</h2>
          <div className="fs-1 fw-bold mb-4">
            {getAllCategoriesAmountByDate(selectedMonth)}
          </div>
        </div>
      </div>

      <div>
        <div className="d-flex gap-4 mb-2">
          <h2 className="fs-2 text-muted">Categories</h2>
          <Button onClick={() => setShowAddCategoryModal(true)}>add</Button>
        </div>
        <CategoriesSlider month={selectedMonth} />
      </div>
      {/* <div>
        <div className="card border-0 rounded-4 shadow-sm mt-5 w-100">
          <h1 className="text-muted text-center fs-3">Spending by Day</h1>
          <div style={{ height: "300px" }}>
            <BarChart chartData={barChartData} />
          </div>
        </div>
      </div> */}
      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
      />
    </Container>
  );
};

export default HomePage;
