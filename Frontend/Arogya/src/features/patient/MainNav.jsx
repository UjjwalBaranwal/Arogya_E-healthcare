import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineCog6Tooth, HiOutlineHome } from "react-icons/hi2";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";
import { AiTwotoneInsurance } from "react-icons/ai";

import { toast } from "react-hot-toast";
import { FiActivity } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
function MainNav() {
  const navStyle =
    "flex items-center gap-3 text-[#774A30] font-semibold text-base font-medium py-3 px-6 transition-all duration-300 hover:text-gray-800 hover:bg-cyan-300 hover:rounded-sm active:text-gray-800 active:bg-cyan-200 active:rounded-sm active:bg-cyan-200 [&.active]:text-gray-800 [&.active]:bg-cyan-200 [&.active]:rounded-sm";
  const iconStyle =
    "w-6 h-6 text-gray-400 transition-all duration-300 hover:text-brand-600 active:text-brand-600 [&.active]:text-brand-600";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout()); // Clear user session from Redux store
    toast.success("Logged out successfully");
    navigate("/login"); // Redirect to the login page
  };

  const navItems = [
    {
      to: "dashboard",
      icon: <HiOutlineHome className={iconStyle} />,
      label: "Home",
    },
    {
      to: "my_record",
      icon: <FiActivity className={iconStyle} />,
      label: "My Record",
    },
    {
      to: "patientAppointment",
      icon: <MdOutlineLeaderboard className={iconStyle} />,
      label: "View Past Appointment",
    },
    {
      to: "settings",
      icon: <FaNotesMedical className={iconStyle} />,
      label: "Doctor's Notes",
    },
    {
      to: "settings",
      icon: <AiTwotoneInsurance className={iconStyle} />,
      label: "Insurance Details",
    },
    {
      to: "payment_history",
      icon: <MdOutlinePayments className={iconStyle} />,
      label: "Payment History",
    },
    {
      to: "settings",
      icon: <HiOutlineCog6Tooth className={iconStyle} />,
      label: "Settings",
    },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `${navStyle} ${isActive ? "text-gray-800 bg-cyan-200" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            className={`${navStyle} bg-transparent w-full`}
            onClick={handleLogout}
          >
            <MdOutlineLogout className={iconStyle} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
