import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <div className="bg-back-record flex flex-col">
      <div class="flex flex-col ml-15 mt-15 md:flex-row ml-4 mt-10 font-exo">
        
        <div className="flex flex-col gap-4 flex-wrap justify-evenly basis-full md:basis-1/3">
          <h1 className="">Logo 1</h1>
          <p>
            Tempora dolorem voluptatum nam vero assumenda voluptate, facilis ad
            eos obcaecati tenetur veritatis eveniet distinctio possimus.
          </p>
          <div className="logo -icons flex flex-row mx-4">
            <FaXTwitter />
            <FaLinkedin />
            <CgMail />
          </div>
        </div>
        <div class="flex flex-col basis-1/6 m-6 gap-4 sm: items-center">
          <h1 class="text-lg font-semibold">Department</h1>
          <span class="text-gray-700">Surgery</span>
          <span class="text-gray-700">Women's Health</span>
          <span class="text-gray-700">Radiology</span>
          <span class="text-gray-700">Cardiac Medicine</span>
        </div>
        <div className="flex flex-col basis-1/6 m-6 gap-4 sm: items-center">
          <h1 class="text-lg font-semibold">Support </h1>
          <span class="text-gray-700">Terms & Conditions</span>
          <span class="text-gray-700">Privacy Policy</span>
          <span class="text-gray-700">Company Support</span>
          <span class="text-gray-700">FAQuestions</span>
          <span class="text-gray-700">Company License</span>
        </div>
        <div className="flex flex-col basis-1/6 m-6 gap-4 sm: items-center">
          <h1 class="text-lg font-semibold">Get In Touch</h1>
          <CgMail />
          <span>tbhis is email</span>
          <span>Email heading</span>
          <CgMail />
          <span>support heading</span>
          <span>Number</span>
        </div>
      </div>
      <div className="footer-table">
        <h1> This is the last line</h1>
      </div>
    </div>
  );
};

export default Footer;
