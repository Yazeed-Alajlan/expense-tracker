import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Button } from "react-bootstrap";
import AddExpenseModal from "components/Expenses/AddExpenseModal";
const Header = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  return (
    <div className="header d-flex justify-content-around align-items-center bg-white shadow-sm fixed-top ">
      <div className="d-flex justify-content-between align-items-center">
        <FaWallet className="wallet-icon fs-2" />
        <div>405</div>
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
