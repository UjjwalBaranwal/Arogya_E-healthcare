// import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Home from "./Home";

function LandingPage() {
  return (
    <div>
      <Navbar />
      {/* <Outlet/> */}
      <Home />
    </div>
  );
}

export default LandingPage;
