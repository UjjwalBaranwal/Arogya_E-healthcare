import { Outlet } from "react-router";
import Navbar from "./navbar1";
import Banner from "./Banner";
import Poster from "./poster";
import Record from "./record";
import Testimonials from "./testimonials";
import Footer from "./footer";
import Login from "../patient/Login";
import Signup from "../patient/Signup";
import Signup1 from "../patient/SignUp1";
import Chatbot from "../chatbot/Chatbot";
function LandingPage() {
  return (
    <div>
      <Navbar />
      <Banner/>
      <Poster/>
      <Chatbot/>
      <Record/> 
      <Testimonials/>
      <Footer/>
      {/* <Login/> */}
    </div>
  );
}

export default LandingPage;
