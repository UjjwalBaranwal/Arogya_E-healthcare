import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import doctor from "../../assets/doctor.jpg";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous error

    try {
      const loginResponse = await fetch(
        "http://localhost:3000/api/v1/patient/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await loginResponse.json();
      setIsLoading(false);

      if (loginResponse.ok) {
        const {
          token,
          data: { user },
        } = data; // Destructure token and user from the response
        dispatch(login({ token, user }));
        toast.success("Login successful");
        navigate("/patient");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
      toast.error("Your email or password is incorrect.");
      setEmail(""); // Clear email and password only if you want to reset the form
      setPassword("");
    }
  };

  return (
    <div className="flex flex-row items-center justify-around min-h-screen p-6 bg-login-color text-black sm:p-10">
      <div className="basis-2/5">
        <img src={doctor} alt="Doctor" />
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-lightBlueGreen leading-tight ">
          Welcome to Arogya
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm bg-white p-6 rounded-lg shadow-md sm:max-w-md"
      >
        <h1 className="text-xl text-center font-bold mb-6 sm:text-2xl md:text-3xl">
          Sign In
        </h1>

        <label className="text-sm font-semibold mb-2 text-gray-700 sm:text-base">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />

        <label className="text-sm font-semibold mb-2 text-gray-700 sm:text-base">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
        

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
