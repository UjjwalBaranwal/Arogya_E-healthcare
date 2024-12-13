import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineCog6Tooth, HiOutlineHome } from "react-icons/hi2";
import { MdOutlineLeaderboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
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
    navigate("/doctorLogin"); // Redirect to the login page
  };

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `${navStyle} ${isActive ? "text-gray-800 bg-cyan-200" : ""}`
            }
          >
            <HiOutlineHome className={iconStyle} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="my_record"
            className={({ isActive }) =>
              `${navStyle} ${isActive ? "text-gray-800 bg-cyan-200" : ""}`
            }
          >
            <FiActivity className={iconStyle} />
            <span>Patient History</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="leaderboard"
            className={({ isActive }) =>
              `${navStyle} ${isActive ? "text-gray-800 bg-cyan-200" : ""}`
            }
          >
            <MdOutlineLeaderboard className={iconStyle} />
            <span>View Today Appointment</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `${navStyle} ${isActive ? "text-gray-800 bg-cyan-200" : ""}`
            }
          >
            <HiOutlineCog6Tooth className={iconStyle} />
            <span>Settings</span>
          </NavLink>
        </li>
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
