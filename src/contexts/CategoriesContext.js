import React, { useContext, useState, useEffect } from "react";
import { db } from "firebase.js";
import { useExpenses } from "./ExpensesContext";
import { collection, addDoc } from "firebase/firestore";
import {
  FaUtensils,
  FaHamburger,
  FaCoffee,
  FaShoppingCart,
  FaReceipt,
  FaTv,
  FaGasPump,
  FaShoppingBag,
  FaTshirt,
  FaRoute,
  FaHeartbeat,
  FaHome,
} from "react-icons/fa";
const CategoriesContext = React.createContext();
const categoriesRef = collection(db, "categories");

export function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const categoriesTypes = [
    {
      id: 1,
      value: "Resturansts",
      name: "Resturansts",
      icon: <FaUtensils />,
      max: 500,
    },
    {
      id: 2,
      value: "Fast Food",
      name: "Fast Food",
      icon: <FaHamburger />,
      max: 300,
    },
    {
      id: 3,
      value: "Coffee",
      name: "Coffee",
      icon: <FaCoffee />,
      max: 400,
    },
    {
      id: 4,
      value: "Grocery",
      name: "Grocery",
      icon: <FaShoppingCart />,
      max: 600,
    },
    {
      id: 5,
      value: "Bills",
      name: "Bills",
      icon: <FaReceipt />,
      max: 1000,
    },
    {
      id: 6,
      value: "TV",
      name: "TV",
      icon: <FaTv />,
      max: 250,
    },
    {
      id: 7,
      value: "Gas",
      name: "Gas",
      icon: <FaGasPump />,
      max: 250,
    },
    {
      id: 8,
      value: "Cloths",
      name: "Cloths",
      icon: <FaTshirt />,
      max: 500,
    },
    {
      id: 9,
      value: "Shopping",
      name: "Shopping",
      icon: <FaShoppingBag />,
      max: 1000,
    },
    {
      id: 10,
      value: "Transportation",
      name: "Transportation",
      icon: <FaRoute />,
      max: 250,
    },
    {
      id: 11,
      value: "sddsds",
      name: "Transportation",
      icon: <FaRoute />,
      max: 9999,
    },
  ];

  const [categories, setCategories] = useState(categoriesTypes);
  const { getExpenses } = useExpenses();

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

  // DATE
  function getAllCategoriesMaximum() {
    return categoriesTypes.reduce((total, category) => total + category.max, 0);
  }

  // async function addCategory(name, max, uid) {
  //   await addDoc(categoriesRef, {
  //     name,
  //     max,
  //     uid,
  //     createdAt: new Date().toISOString(),
  //   });
  // }

  const value = {
    getCategories,
    getCategoryByName,
    getCategoryExpenses,
    getCategoryAmountByDate,
    getAllCategoriesAmountByDate,
    getAllCategoriesMaximum,
    getAllCategoriesAmountByDateSortedByCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
