import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

import useFirestore from "hooks/useFirestore";
import { db } from "firebase.js";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
const ExpensesContext = React.createContext();
const expensesRef = collection(db, "expenses");

export function useExpenses() {
  return useContext(ExpensesContext);
}

export function ExpensesProvider({ children }) {
  const { docs } = useFirestore("expenses");
  const [expenses, setExpenses] = useState(docs);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [selectedExpenseId, setSelectedExpenseId] = useState(-1);

  useEffect(() => {
    setExpenses(docs);
  }, [getExpenses]);

  function getExpenses() {
    return expenses;
  }
  function getExpenseById(expenseId) {
    return expenses.find((element) => element.id === expenseId);
  }

  function getExpenseAmountSortedByDayForDate(date) {
    var amountList = [0, 0, 0, 0, 0, 0, 0];
    expenses.filter((expense) => {
      if (expense.date.substring(0, 7) === date) {
        var d = new Date(expense.date);
        amountList[d.getDay()] = amountList[d.getDay()] + expense.amount;
      }
    });

    return amountList;
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
  async function deleteExpense(expenseId) {
    return await deleteDoc(doc(db, "expenses", expenseId));
  }
  async function updateExpense(category, amount, date, notes, expenseId) {
    return await updateDoc(doc(db, "expenses", expenseId), {
      category: category,
      amount: amount,
      date: date,
      notes: notes,
    });
  }

  const value = {
    getExpenses,
    getExpenseById,
    addExpense,
    selectedExpense,
    setSelectedExpense,
    deleteExpense,
    updateExpense,
    selectedExpenseId,
    setSelectedExpenseId,
    getExpenseAmountSortedByDayForDate,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
