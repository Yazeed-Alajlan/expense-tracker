import React, { useContext, useState, useEffect } from "react";
import useFirestore from "hooks/useFirestore";
import { db } from "firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { FaHamburger } from "react-icons/fa";

const ExpensesContext = React.createContext();
const expensesRef = collection(db, "expenses");

export function useExpenses() {
  return useContext(ExpensesContext);
}

export function ExpensesProvider({ children }) {
  const { docs } = useFirestore("expenses");
  const [expenses, setExpenses] = useState(docs);

  useEffect(() => {
    setExpenses(docs);
  }, [getExpenses]);

  function getExpenses() {
    return expenses;
  }

  async function addExpense(category, amount, date, notes, uid) {
    await addDoc(expensesRef, {
      category,
      amount,
      date,
      notes,
      uid,
      createdAt: new Date().toISOString(),
    });
  }

  const value = { getExpenses, addExpense };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
