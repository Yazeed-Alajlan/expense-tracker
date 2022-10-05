import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useCategories } from "contexts/CategoriesContext";
const SideOld = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const { isOpen, setIsOpen } = useCategories();
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
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="d-flex">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "0px",

            transition: {
              duration: 0.9,
              type: "",
              damping: 10,
            },
          }}
          className="sidebar-mobile fixed-top "
        >
          <div className="d-flex justify-content-end align-items-center p-3">
            {/* <AnimatePresence>
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
            </AnimatePresence> */}

            <div className="fs-3">
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
          <section className=" d-flex flex-column gap-1 ">
            {SidebarData.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="d-flex align-items-center gap-2 p-2 fs-2 text-white text-decoration-none border-end-2 link-mobile"
                >
                  <div className="fs-4">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="fs-4"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
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
      </div>
    </>
  );
};

export default SideOld;
