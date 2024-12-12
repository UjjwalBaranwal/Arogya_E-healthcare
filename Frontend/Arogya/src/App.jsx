<<<<<<< HEAD
import LandingPage from "./features/LandingPage/LandingPage";
import Chatbot from "./features/chatbot/Chatbot";
// import Signup from "./features/patient/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
=======
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> refs/remotes/origin/main
import { Provider } from "react-redux";
import { store } from "./redux/store";

import LandingPage from "./features/LandingPage/LandingPage";
// import Chatbot from "./features/chatbot/Chatbot";
// import Signup from "./features/patient/SignUp";
import Login from "./features/patient/Login";
// import { useSelector } from "react-redux";
import Signup1 from "./features/patient/SignUp1";
import Banner from "./features/LandingPage/Banner";
import Testimonials from "./features/LandingPage/testimonials";
import Dashboard from "./features/patient/dashboard";
import Record from "./features/LandingPage/record";

import PrivateRoute from "./redux/privateRoute";
import Doctorsignup from "./features/doctors/signup";
import Login1 from "./features/doctors/Login"
import Sign1 from "./features/doctors/signup"
import Dashboard1 from "./features/doctors/dashboard/Dashboard";
function App() {
  // const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <Provider store={store}>
      {/* <Chatbot/> */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginforme" element={<Login1/>}/>
            <Route path="/loginformes" element={<Sign1/>}/>
            <Route path="/patient/signup" element={<Signup1 />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/about" element={<Record />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup1 />} />
            <Route path="/doctor/signup" element={<Doctorsignup />} />

            {/* Protected Route */}
            <Route element={<PrivateRoute />}>
              <Route path="/patient/dashboard/Dashboard" element={<Dashboard/>}/>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/doctor/dashboard/Dashboard" element={<Dashboard1/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
