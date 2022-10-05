import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import HomePage from "pages/Pages/HomePage";

import ExpensesPage from "pages/Pages/ExpensesPage";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import StatisticsPage from "pages/Pages/StatisticsPage";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import SidebarMobile from "components/Sidebar/SidebarMobile";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="app bg-light ">
      <Router>
        {currentUser ? (
          <>
            <div className="d-flex ">
              <SidebarMobile />
              <Sidebar />
              <div className="d-flex flex-column w-100 ">
                <Header />
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />

                  {/* Content */}

                  <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                  </Route>
                </Routes>
              </div>
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
