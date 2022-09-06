import {
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

export const SidebarData = [
  {
    path: "/home",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <FaMoneyBill />,
  },
  {
    path: "/Analytics",
    name: "Analytics",
    icon: <FaHome />,
  },
  {
    path: "/users",
    name: "Settings",
    icon: <FaUser />,
  },
  {
    path: "/login",
    name: "Logout",
    icon: <FaSignOutAlt />,
  },
];
