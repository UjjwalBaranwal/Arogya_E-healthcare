import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const LoginDropdown = () => {
  const users = [
    { name: "Doctor Login", to: "/doctorLogin" },
    { name: "Patient Login", to: "/login" },
    { name: "Admin Login", to: "/adminLogin" },
    { name: "Insurance Login", to: "/insuranceLogin" },
  ];

  return (
    <div className="relative">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="flex border-none mt-0 items-center justify-between w-full px-4  text-lg font-semibold text-black rounded-lg hover:bg-sky-200 transition duration-200 ease-in-out">
              Login
              <ChevronDownIcon
                className={`h-5 w-5 ml-2 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </DisclosureButton>
            {/* Increased width and centered content */}
            <DisclosurePanel style={{ width: '200px' }} className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg">
              <div className="py-2 flex flex-col items-center">
                {" "}
                {/* Centering content */}
                {users.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className="block w-full text-center rounded-lg px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-blue-100 transition duration-150 ease-in-out"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default LoginDropdown;
