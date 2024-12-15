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
      setIsLoading(false);
      setError("An error occurred. Please try again.");
      console.error(err);
      toast.error("Your email or password is incorrect.");
      setEmail(""); // Clear email and password only if you want to reset the form
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="flex flex-col items-center mb-6">
        <img src={doctor} alt="Doctor" className="w-24 h-24 mb-2 rounded-full shadow-lg" />
        <h1 className="text-center text-2xl font-bold text-gray-800 leading-tight">
          Welcome to Arogya
        </h1>
        <span className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-xs bg-white p-8 rounded-lg shadow-lg sm:max-w-sm"
      >
        <h2 className="text-xl text-center font-bold mb-6 text-gray-800">Sign In</h2>

        <label className="text-sm font-semibold mb-1 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter your email"
          required
        />

        <label className="text-sm font-semibold mb-1 text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter your password"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-300"
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
