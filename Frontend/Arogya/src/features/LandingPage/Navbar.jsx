import { useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const handleMouseEnter = () => {
    setVisible(true);
  };
  const handleMouseLeave = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className=" bg-red-400 my-3">
        <div className=" container mx-auto nav_head  h-15 flex  gap-2 justify-between">
          <div className="flex gap-2">
            <div className="flex gap-3">
              <FaRocketchat className=" h-8" /> support :
              arogya_healthcare@support.com
            </div>
            <div className="flex gap-3">
              <LiaPlaceOfWorshipSolid className=" h-8" /> address : patel nagar
            </div>
          </div>
          <div className="flex gap-3 text-xl">
            <IoCall className=" h-8" /> call :{" "}
            <span className="font-bold ">XXX-XXX-XXXX</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <nav className="flex justify-between">
          <div className="logo text-5xl flex gap-8 p-5">
            <FaUserDoctor />
            Arogya
          </div>
          <ul className="list-none flex gap-10 text-2xl p-5">
            <Link to={"/home"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/services"}>Services</Link>
            <span
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="flex text-center relative"
            >
              Doctor <RiArrowDropDownLine className="text-3xl " />
              {visible && (
                <ul className="absolute text-[18px] top-10 w-40 border  border-t-4 border-t-red-500 h-15">
                  <Link to={"/doctor"}>View All Doctor</Link>
                </ul>
              )}
            </span>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"/signup"}>Login</Link>
          </ul>
        </nav>
        this is main navbar
      </div>
    </div>
  );
}

export default Navbar;
