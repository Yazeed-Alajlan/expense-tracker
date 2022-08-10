import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import SideBar from "components/Sidebar/SideBar";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <SideBar>
        <Outlet />
      </SideBar>
    </>
  );
};

export default PrivateRoute;
