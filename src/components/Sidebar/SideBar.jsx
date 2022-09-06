import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "styles/css/Sidebar.css";

const SideBar = ({ children }) => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.error(e);
      setError("Failed to log out");
    }
  };

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.9,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.9,
      },
    },
  };

  return (
    <>
      <div className="d-flex">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.9,
              type: "spring",
              damping: 10,
            },
          }}
          // className={`sidebar `}
          className="sidebar fixed-top "
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}

          <section className="routes">
            {SidebarData.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink to={route.path} key={index} className="link">
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
              <div className="bars">
                <FaBars onClick={toggle} />
              </div>;
            })}
          </section>

          {/* <div className="bottom_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text btn btn-primary"
                >
                  Logout
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}
        </motion.div>
        <main className=" bg-light w-100">{children}</main>
      </div>
    </>
  );
};

export default SideBar;
