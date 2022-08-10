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
      value: 1,
      name: "Resturansts",
      icon: <FaUtensils />,
      max: 3000,
    },
    {
      value: 2,
      name: "Fast Food",
      icon: <FaHamburger />,
      max: 300,
    },
    {
      value: 3,
      name: "Coffee",
      icon: <FaCoffee />,
      max: 400,
    },
    {
      value: 4,
      name: "Grocery",
      icon: <FaShoppingCart />,
      max: 2500,
    },
    {
      value: 5,
      name: "Bills",
      icon: <FaReceipt />,
      max: 1000,
    },
    {
      value: 6,
      name: "TV",
      icon: <FaTv />,
      max: 1500,
    },
    {
      value: 7,
      name: "Gas",
      icon: <FaGasPump />,
      max: 1325,
    },
    {
      value: 8,
      name: "Cloths",
      icon: <FaTshirt />,
      max: 2500,
    },
    {
      value: 9,
      name: "Shopping",
      icon: <FaShoppingBag />,
      max: 3000,
    },
    {
      value: 10,
      name: "Transportation",
      icon: <FaRoute />,
      max: 900,
    },
  ];

  const [categories, setCategories] = useState(categoriesTypes);
  const { getExpenses } = useExpenses();

  function getCategories() {
    return categories;
  }

  function getCategoryExpenses(name) {
    return getExpenses().filter((expense) => expense.category === name);
  }

  // async function addCategory(name, max, uid) {
  //   await addDoc(categoriesRef, {
  //     name,
  //     max,
  //     uid,
  //     createdAt: new Date().toISOString(),
  //   });
  // }

  const value = { getCategories, getCategoryExpenses };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
