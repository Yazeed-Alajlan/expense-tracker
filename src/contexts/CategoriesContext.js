import React, { useContext, useState, useEffect } from "react";
import { currentMonth } from "data/MonthData";
import { useExpenses } from "./ExpensesContext";
import { useAuth } from "./AuthContext";
import useFirestore from "hooks/useFirestore";
import { icons, categoriesTypes } from "data/Data";
import { db } from "firebase.js";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
const CategoriesContext = React.createContext();
const categoriesRef = collection(db, "categories");

export function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const currentUser = useAuth().currentUser;

  const { docs } = useFirestore("categories");

  const [categories, setCategories] = useState(docs);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [counter, setCounter] = useState(0);
  const { getExpenses } = useExpenses();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCategories(docs);
  }, [docs]);

  useEffect(() => {
    setCounter(1 + counter);
    if (counter !== 0 && categories.length == 0) {
      categoriesTypes.forEach((category) => {
        addCategory(
          category.name,
          category.max,
          category.iconName,
          currentUser.uid
        );
      });
    }
    if (counter !== 0) {
      docs.forEach((category) => {
        // category.icon = <FaTshirt />;
        category.icon = categoriesTypes.map((icon) => {
          if (icon.iconName === category.iconName) return icon.icon;
        });
      });
    }
  }, [categories]);

  function getCategories() {
    return categories;
  }
  function getCategoryByName(name) {
    return categories.find((category) => category.name === name);
  }

  function getCategoryExpenses(name) {
    return getExpenses().filter((expense) => expense.category === name);
  }

  function getCategoryAmountByDate(name, date) {
    return getExpenses().filter(
      (expense) =>
        expense.category === name && expense.date.substring(0, 7) === date
    );
  }
  function getAllCategoriesAmountByDate(date) {
    const amount = getExpenses()
      .filter((expense) => expense.date.substring(0, 7) === date)
      .reduce((total, expense) => total + expense.amount, 0);
    return amount;
  }

  function getAllCategoriesAmountByDateSortedByCategory(date) {
    const amountList = [];
    getCategories().map((data) => {
      let sum = 0;
      getCategoryAmountByDate(data.name, date).forEach((element) => {
        sum += element.amount;
      });
      amountList.push(sum);
    });
    return amountList;
  }
  function getAllCategoriesAmountByDateSortedByMonth() {
    var month = [
      new Date().getFullYear() + "-01",
      new Date().getFullYear() + "-02",
      new Date().getFullYear() + "-03",
      new Date().getFullYear() + "-04",
      new Date().getFullYear() + "-05",
      new Date().getFullYear() + "-06",
      new Date().getFullYear() + "-07",
      new Date().getFullYear() + "-08",
      new Date().getFullYear() + "-09",
      new Date().getFullYear() + "-10",
      new Date().getFullYear() + "-11",
      new Date().getFullYear() + "-12",
    ];
    const amountList = [];

    month.map((mon) => {
      const amount = getAllCategoriesAmountByDate(mon);
      amountList.push(amount);
    });
    console.log(amountList);
    return amountList;
  }

  // DATE
  function getAllCategoriesMaximum() {
    return categoriesTypes.reduce((total, category) => total + category.max, 0);
  }

  async function addCategory(name, max, iconName, uid) {
    await addDoc(categoriesRef, {
      name,
      max,
      uid,
      iconName,
      createdAt: new Date().toISOString(),
    });
  }
  async function deleteCategory(categoryId) {
    return await deleteDoc(doc(db, "categories", categoryId));
  }
  async function updateCategory(name, max, iconName, categoryId) {
    return await updateDoc(doc(db, "categories", categoryId), {
      name: name,
      max: max,
      iconName: iconName,
    });
  }

  const value = {
    getCategories,
    getCategoryByName,
    getCategoryExpenses,
    getCategoryAmountByDate,
    getAllCategoriesAmountByDate,
    getAllCategoriesMaximum,
    getAllCategoriesAmountByDateSortedByCategory,
    getAllCategoriesAmountByDateSortedByMonth,
    selectedMonth,
    setSelectedMonth,
    setIsOpen,
    isOpen,
    addCategory,
    deleteCategory,
    updateCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
