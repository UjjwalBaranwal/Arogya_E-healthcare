import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/authSlice";
import doctor1 from "../../assets/doctor1.jpg";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state).auth.user;
  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center text-gray-800 bg-cover bg-center"
      style={{ backgroundImage: `url(${doctor1})` }}
    >
      <h1 className="text-3xl font-bold mb-4 text-lightBlueGreen">
        Welcome to the Dashboard of the Patient
      </h1>
      <h2 className="text-xl mb-8 text-gray-600">
        This is the first page of the patient
      </h2>
      <button
        onClick={handleLogout}
        className="px-6 py-3 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
