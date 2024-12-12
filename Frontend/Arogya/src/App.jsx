import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
//////// Landing Page component
import LandingPage from "./features/LandingPage/LandingPage";
import Banner from "./features/LandingPage/Banner";
import Record from "./features/LandingPage/Record";
import Testimonials from "./features/LandingPage/testimonials";
/////// Patient Component
import Login from "./features/patient/Login";
import Signup1 from "./features/patient/SignUp1";
import Dashboard from "./features/patient/Dashboard";
import PrivateRoute from "./redux/privateRoute";
import Doctorsignup from "./features/doctors/Signup";
import AppLayout from "./features/patient/AppLayout";
import MyRecord from "./features/patient/MyRecord";
///// Common UI
import ErrorPage from "../commonUI/ErrorPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="signup" element={<Signup1 />} />
          <Route path="banner" element={<Banner />} />
          <Route path="about" element={<Record />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="login" element={<Login />} />
          <Route path="doctor/signup" element={<Doctorsignup />} />
          <Route
            path="patient"
            element={
              <PrivateRoute requiredRole="patient">
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my_record" element={<MyRecord />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </Provider>
  );
}

export default App;
