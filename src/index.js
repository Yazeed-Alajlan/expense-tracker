import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/css/Size.css";
import "styles/css/Utilities.css";
import { CategoriesProvider } from "contexts/CategoriesContext";
import { ExpensesProvider } from "contexts/ExpensesContext";
import { AuthProvider } from "contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ExpensesProvider>
      <CategoriesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CategoriesProvider>
    </ExpensesProvider>
  </React.StrictMode>
);
