import React from "react";
import { useAuth } from "contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { SidebarData } from "./SidebarData";

const Side = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {}
  };
  return (
    <div className="sidebar bg-white shadow-lg sticky-top">
      <section className="sidebar-content d-flex flex-column justify-content-center align-items-center">
        {SidebarData.map((route, index) => {
          return (
            <NavLink
              onClick={route.name === "Logout" ? handleLogout : null}
              to={route.path}
              key={index}
              className="sidebar-link w-100"
            >
              <div className="d-flex flex-column justify-content-center align-items-center ">
                <div className="link-icon fs-3 ">{route.icon}</div>
                <div className="link-name">{route.name}</div>
              </div>
            </NavLink>
          );
        })}
      </section>
    </div>
  );
};

export default Side;
