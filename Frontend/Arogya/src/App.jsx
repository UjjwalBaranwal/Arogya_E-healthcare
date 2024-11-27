import LandingPage from "./features/LandingPage/LandingPage";
import Chatbot from "./features/chatbot/Chatbot";
// import Signup from "./features/patient/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./features/patient/Login";
import Signup1 from "./features/patient/SignUp1";
import Banner from "./features/LandingPage/Banner";
import Testimonials from "./features/LandingPage/testimonials";
import { store } from "./redux/store";
import Dashboard from "./features/patient/dashboard";
import Record from "./features/LandingPage/record";
import { useEffect, useState } from "react";
import PrivateRoute from "./redux/privateRoute";
import Doctorsignup from "./features/doctors/signup";

function App() {
  return (
    <Provider store={store}>
      {/* <Chatbot/> */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/patient/signup" element={<Signup1 />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/about" element={<Record />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup1/>}/>
            <Route path="/doctor/signup" element={<Doctorsignup/>}/>
            <Route element={<PrivateRoute />}>
              <Route path="/patient/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
