import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import HomePage from "pages/Content/HomePage";
import ExpensesPage from "pages/Content/ExpensesPage";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import Side from "components/Sidebar/Side";
import Header from "components/Header/Header";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="app bg-light">
      <Router>
        {currentUser ? (
          <>
            <Header />
            <div className="d-flex">
              <Side />
              <Routes>
                {/* Auth */}
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Content */}

                <Route element={<PrivateRoute />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/expenses" element={<ExpensesPage />} />
                </Route>
              </Routes>
            </div>
          </>
        ) : (
          <>
            <Routes>
              {/* Auth */}
              <Route exact path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
