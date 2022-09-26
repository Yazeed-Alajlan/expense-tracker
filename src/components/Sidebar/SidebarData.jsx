import {
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaRegChartBar,
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
    path: "/statistics",
    name: "Statistics",
    icon: <FaRegChartBar />,
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
