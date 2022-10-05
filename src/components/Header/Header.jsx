import { useState, useRef } from "react";
import { useCategories } from "contexts/CategoriesContext";
import { FaWallet } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { Button } from "react-bootstrap";
import AddExpenseModal from "components/Expenses/AddExpenseModal";
import SideOld from "components/Sidebar/SidebarMobile";
const Header = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const monthFilterRef = useRef();
  const {
    getAllCategoriesAmountByDate,
    getAllCategoriesMaximum,
    selectedMonth,
    setSelectedMonth,
    isOpen,
    setIsOpen,
  } = useCategories();

  const handleMonthFilter = () => {
    if (monthFilterRef.current.value === "") {
      setSelectedMonth(selectedMonth);
    }
    setSelectedMonth(monthFilterRef.current.value);
  };
  return (
    <>
      <div className="header d-flex justify-content-around align-items-center bg-white shadow-sm sticky-top w-100">
        <div className="d-flex justify-content-between align-items-center">
          <FaBars
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="bars fs-2"
          />
          <FaWallet className="wallet-icon fs-2" />
          <div className="wallet-value">
            {getAllCategoriesMaximum() -
              getAllCategoriesAmountByDate(selectedMonth)}
          </div>
        </div>
        <div>
          <input
            className="form-control  "
            type="month"
            ref={monthFilterRef}
            value={selectedMonth}
            onChange={handleMonthFilter}
          />
        </div>
        <div>
          <Button
            variant="primary"
            onClick={() => setShowAddExpenseModal(true)}
          >
            Add Expenses
          </Button>
        </div>
        <AddExpenseModal
          show={showAddExpenseModal}
          handleClose={() => setShowAddExpenseModal(false)}
        />
      </div>
    </>
  );
};

export default Header;
