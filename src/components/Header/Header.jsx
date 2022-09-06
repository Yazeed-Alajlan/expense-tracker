import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Button } from "react-bootstrap";
import AddExpenseModal from "components/Expenses/AddExpenseModal";
const Header = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  return (
    <div className="header d-flex justify-content-evenly align-items-center bg-white shadow-sm fixed-top ">
      <div className="d-flex justify-content-between">
        <FaWallet className="fs-2 text-danger" />
        <p>405</p>
      </div>
      <div>
        <Button variant="add" onClick={() => setShowAddExpenseModal(true)}>
          Add New Expenses
        </Button>
      </div>
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </div>
  );
};

export default Header;
