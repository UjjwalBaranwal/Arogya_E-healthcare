
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Signup from './features/patient/Signup.jsx'
import App from "./App.jsx";

import "./index.css";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Navbar from './features/LandingPage/navbar1.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <App />
   
  </StrictMode>
);
