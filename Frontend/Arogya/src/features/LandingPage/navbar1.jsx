import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRocketchat } from "react-icons/fa";
import logo from "../../assets/logo.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWheelchairPickup } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Popover, ArrowContainer } from "react-tiny-popover";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <header>
      <div className="font-exo w-f bg-[#223a66] text-white py-3 px-4 md:px-10 lg:px-20 shadow-md flex flex-col md:flex-row justify-between">
        <div className="flex text-sm md:text-base lg:text-base">
          <div className="inline-flex items-center px-3 md:px-5">
            <div className="px-2">
              <FaRocketchat />
            </div>
            <span>supportArogya9695@gmail.com</span>
          </div>
          <div className="inline-flex items-center px-3 md:px-5">
            <div className="px-2">
              <CiLocationOn />
            </div>
            <span>Greater Noida KP-3</span>
          </div>
        </div>
        <div className="top-blue-right  inline-flex items-center text-sm md:text-base lg:text-xl mt-2 md:mt-0">
          Call Now:{" "}
          <span className="text-lg md:text-xl lg:text-2xl px-2">
            8840432962
          </span>
        </div>
      </div>
      <nav className="p-2 flex bg-white justify-between items-center py-5">
        <a href="#" id="brand" className="flex gap-2 items-center">
          <img src={logo} alt="image" className="w-20" />
          <span>Arogya</span>
        </a>
        <div id="nav-menu" className="hidden lg:flex gap-12 px-5">
          <Link to="/" className="font-medium hover:text-primary">
            Home
          </Link>
          <a href="#about" className="font-medium hover:text-primary">
            About
          </a>
          <Link to="/services" className="font-medium hover:text-primary">
            Services
          </Link>
          <Link to="/departments" className="font-medium hover:text-primary">
            Departments
          </Link>
          <Link to="/login" className="font-medium hover:text-primary">
            Login
          </Link>
          <Link to="/contact" className="font-medium hover:text-primary">
            Contact
          </Link>
          {/* <a href="#" className="font-medium hover:text-primary">Blog</a> */}
        </div>
        <button className="hidden lg:flex font-medium hover:text-primary px-5 py-2 rounded-lg gap-2 items-center border border-gray-400">
          <Popover
            isOpen={isPopoverOpen}
            positions={["top", "bottom", "left", "right"]} // Available positions for popover
            padding={10} // Adjust padding
            reposition={false} // Prevents repositioning
            onClickOutside={() => setIsPopoverOpen(false)} // Close on click outside
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={"blue"}
                arrowSize={10}
                arrowStyle={{ opacity: 0.7 }}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <div className="p-4 mt-10bg-white shadow-lg rounded-lg w-full max-w-xs sm:w-80">
                  <button className="w-full text-left px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    SignUp as Doctor
                  </button>
                  <Link
                    to="signup"
                    className="w-full text-left px-4 py-2 mt-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    SignUp as Patient
                  </Link>
                </div>
              </ArrowContainer>
            )}
          >
            {/* Button that triggers the popover */}
            <div
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="flex items-center gap-x-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
            >
              <MdOutlineWheelchairPickup size={24} />
              <span className="hidden sm:inline-block">Signup</span>
            </div>
          </Popover>
        </button>
        <button className="p-2 lg:hidden" onClick={handleMenu}>
          <GiHamburgerMenu />
        </button>

        {isNavOpen && (
          <div className="lg:hidden fixed bg-white z-50 inset-0 overflow-y-auto">
            <div id="nav-bar" className="flex justify-between">
              <a href="#" id="brand" className="flex gap-2 items-center">
                <img src={logo} alt="image" className="w-20" />
                <span>Arogya</span>
              </a>
              <button className="p-2 lg:hidden" onClick={handleMenu}>
                <FaRegWindowClose />
              </button>
            </div>
            <div className="mt-6">
              <a
                href="#"
                alt="price"
                className="font-medium  m-3 p-3 hover:bg-gray-400 block rounded-lg"
              >
                Home
              </a>
              <a
                href="#"
                alt="price"
                className="font-medium  m-3 p-3 hover:bg-gray-400 block rounded-lg"
              >
                About
              </a>
              <a
                href="#"
                alt="price"
                className="font-medium  m-3 p-3 hover:bg-gray-400 block rounded-lg"
              >
                Services
              </a>
              <a
                href="#"
                alt="price"
                className="font-medium  m-3 p-3 hover:bg-gray-400 block rounded-lg"
              >
                Departments
              </a>
              <a
                href="#"
                alt="price"
                className="font-medium  m-3 p-3 hover:bg-gray-400 block rounded-lg"
              >
                Doctors
              </a>
              <a
                href="#"
                alt="price"
                className="font-medium  m-3 p-3 hover:bg-gray-400 block rounded-lg"
              >
                Contact
              </a>
            </div>
            <div className="h-[1px] bg-gray-600"></div>
            <button className="flex gap-2  px-6 py-3 mx-60 my-4 rounded-lg gap-4 items-center border border-gray-400 lg:hidden">
              <MdOutlineWheelchairPickup />
              <span>Signup</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
export default Navbar;
