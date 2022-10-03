import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/css/Size.css";
import "styles/css/Auth.css";
import "styles/css/Utilities.css";
import "styles/css/Sidebar.css";
import "@splidejs/react-splide/css";
import "styles/css/CategoriesAndExpenses.css";
import "styles/css/SidebarMobile.css";

import { CategoriesProvider } from "contexts/CategoriesContext";
import { ExpensesProvider } from "contexts/ExpensesContext";
import { AuthProvider } from "contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <ExpensesProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </ExpensesProvider>
  </AuthProvider>
  // </React.StrictMode>
);
