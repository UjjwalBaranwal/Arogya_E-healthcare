import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import AppLayout from "./features/patient/AppLayout";
import MyRecord from "./features/patient/MyRecord";
import DoctorLogin from "./features/doctors/Login";
import DoctorDashboard from "./features/doctors/DoctorDashboard";
import DoctorLayout from "./features/doctors/AppLayout";
import DoctorSignup from "./features/doctors/signup";
import PastAppointment from "./features/patient/contents/pastAppointment";
///// Common UI
import ErrorPage from "./UI/ErrorPage";
import AdminLayout from "../src/features/Admin/AdminLayout"
import AdminLogin from "./features/Admin/AdminLogin";
import AdminDashboard from "./features/Admin/AdminDashboard";
import GetAllPatient from "./features/Admin/content/getPatient";
import GetAllDoctors from "./features/Admin/content/getDoctor";
import GetNotification from "./features/Admin/content/getNotification";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // 1000->mili so 60*1000==60sec
      staleTime: 0, // 1000->mili so 60*1000==60sec
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<Signup1 />} />
            <Route path="banner" element={<Banner />} />
            <Route path="about" element={<Record />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="login" element={<Login />} />
            <Route path="doctorLogin" element={<DoctorLogin />} />
            <Route path="doctorSignup" element={<DoctorSignup />} />
            <Route path="adminLogin" element={<AdminLogin />} />
            <Route
              path="patient"
              element={
                <PrivateRoute requiredRole="patient">
                  <AppLayout />
                </PrivateRoute>
              }
            >
              <Route path="patientAppointment" element={<PastAppointment />} />
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="my_record" element={<MyRecord />} />
            </Route>
            <Route
              path="doctor"
              element={
                <PrivateRoute requiredRole="doctor">
                  <DoctorLayout />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={<Navigate to="doctorDashboard" replace />}
              />
              <Route path="doctorDashboard" element={<DoctorDashboard />} />
            </Route>



            <Route
              path="admin"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={<Navigate to="adminDashboard" replace />}
              />
              <Route path="adminDashboard" element={<AdminDashboard />} />
              <Route path="getAllpatient" element={<GetAllPatient/>}/>
              <Route path="getAllDoctor" element={<GetAllDoctors/>}/>
              <Route path="getAllnotification" element={<GetNotification/>}/>
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
    </QueryClientProvider>
  );
}

export default App;
