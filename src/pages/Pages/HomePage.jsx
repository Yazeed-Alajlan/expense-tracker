import { useState, useEffect, useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import CategoriesSlider from "components/Categories/CategoriesSlider";
import AddCategoryModal from "components/Categories/AddCategoryModal";
import { Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
const HomePage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const { getAllCategoriesAmountByDate, getCategories, selectedMonth } =
    useCategories();

  useEffect(() => {}, []);
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
          <Button
            className=" rounded-circle text-black "
            variant="outline-light"
            onClick={() => setShowAddCategoryModal(true)}
          >
            <FaPlus />
          </Button>
        </div>
        <CategoriesSlider month={selectedMonth} />
      </div>
      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
      />
    </Container>
  );
};

export default HomePage;
