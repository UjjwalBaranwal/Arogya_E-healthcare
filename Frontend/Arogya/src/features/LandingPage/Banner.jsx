import React from "react";
import banner from "../../assets/banner.jpg";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";

const Banner = () => {
  return (
    <>
      <div
        // className="bg-cover bg-center bg-no-repeat opacity-90 z-0  min-h-screen md:h-[80vh] sm:h-[60vh]"
        className="bg-cover bg-center bg-no-repeat opacity-90 z-0 min-h-[600px] md:h-[500px] sm:h-[400px]"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="flex flex-col items-start justify-around space-y-4 pl-20 w-1/2">
          <div className="bg-custom-red h-1.5 w-1/6 my-6 ml-5 my-4"></div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-gray-500 p-4">
            Total HealthCare Solutions
          </h3>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-banner-color justify-start ml-4">
            Your Most Trusted
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-banner-color justify-start ml-4">
            Health Partner
          </h1>
          <p className="text-base  ml-4 ">
            A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium
            quisquam aperiam maiores sunt fugit
          </p>
          <button className="ml-3 mt-6  bg-red-600 border border-rounded text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
            Make an appointment
          </button>
        </div>

        {/* This is the card section of the landing page */}
      </div>

      {/* this is the card section */}

      <div className="flex relative px-14 -mt-15 md:flex-row flex-col gap-6 ">
        <div className="basis-1/3 mx-4 flex flex-col justify-between p-10  rounded-2xl bg-white  shadow-lg md:basis-full">
          <FaUserDoctor className="text-4xl mb-4 text-banner-color" />
          <span className="text-lg font-semibold mb-2 font-exo text-gray-600">
            24 Hours Service
          </span>
          <h1 className="text-2xl font-bold mb-2 font-exo text-banner-color">
            Online Appointment
          </h1>
          <p className="text-base leading-relaxed mb-4">
            Get all-time support for emergencies. We have introduced the
            principle of family medicine.
          </p>
          <button className="bg-custom-red text-white font-exo font-bold py-2 px-4 rounded hover:bg-custom-red transition duration-300">
            Make an appointment
          </button>
        </div>

        <div className="basis-1/3 mx-4 flex flex-col justify-between p-10  rounded-2xl bg-white  shadow-lg md:basis-full">
          <FaClock className="text-4xl mb-4 text-banner-color" />
          <span className="text-lg font-semibold mb-2 font-exo text-gray-600">
            Timing Schedule{" "}
          </span>
          <h1 className="text-2xl font-bold mb-2 font-exo text-banner-color">
            Working Hours
          </h1>
          <div className="timing-section">
            <p>
              Get ALl time support for emergency.We have introduced the
              principle of family medicine.Get Conneted with us for any urgency
              .
            </p>
          </div>
        </div>
        <div className="basis-1/3 mx-4 flex flex-col justify-between p-10  rounded-2xl bg-white  shadow-lg md:basis-full">
          <RiCustomerServiceFill className="text-4xl mb-4 text-banner-color" />
          <span className="text-lg font-semibold mb-2 font-exo text-gray-600">
            Emergency Cases{" "}
          </span>
          <h1 className="text-2xl font-bold mb-2 font-exo text-banner-color">
            8840432962
          </h1>
          <p>
            Get ALl time support for emergency.We have introduced the principle
            of family medicine.Get Conneted with us for any urgency .
          </p>
        </div>
      </div>
    </>
  );
};
export default Banner;
