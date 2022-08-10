import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "contexts/AuthContext";

import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Home from "pages/Home/Home";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import SideBar from "components/Sidebar/SideBar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth */}
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Content */}

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/manage" element={<ManageHabit />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Setting />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
