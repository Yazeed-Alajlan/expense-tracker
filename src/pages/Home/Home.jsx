import React, { useState } from "react";

import { Button, Container } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Categories from "components/Categories/Categories";
import Expenses from "components/Expenses/Expenses";
import ExpensesContainer from "components/Expenses/ExpensesContainer";
import AddExpenseModal from "components/Expenses/AddExpenseModal";

import { useExpenses } from "contexts/ExpensesContext";

import { useAuth } from "contexts/AuthContext";
const Home = () => {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const currentUser = useAuth().currentUser;
  const { getExpenses, addExpense } = useExpenses();

  return (
    <Container className="bg-light">
      <Categories />

      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <Button onClick={() => setShowAddExpenseModal(true)}>Add Expense</Button>

      {/* 
        const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

      <AddCategoryModal
        show={showAddCategoryModal}
        handleClose={() => setShowAddCategoryModal(false)}
      />
      <Button onClick={() => setShowAddCategoryModal(true)}>
        Add Category
      </Button> */}
    </Container>
  );
};

export default Home;
