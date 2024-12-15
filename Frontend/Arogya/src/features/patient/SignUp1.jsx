import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginPoster from "../../assets/loginPoster.jpg";
import { useNavigate } from "react-router";
import InputBox from "../../UI/InputBox";

const Signup1 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const passwordTest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 bg-gray-100">
      {/* Image Section */}
      <div className="hidden md:flex md:w-1/3 mx-4 px-4">
        <img src={loginPoster} alt="Login Poster" className="w-full h-auto rounded-lg shadow-lg" />
      </div>

      {/* Form Section */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          role: "",
          gender: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          phoneNumber: Yup.string()
            .length(10, "Phone number must have exactly 10 digits")
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .required("Phone number is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(
              passwordTest,
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            )
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const signupResponse = await fetch(
              "http://localhost:3000/api/v1/patient/signup",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );
            const data = await signupResponse.json();
            setLoading(false);
            if (signupResponse.ok) {
              window.alert("Successfully signed up");
              navigate("/login");
            } else {
              console.error(data);
              window.alert(data.message || "Signup failed");
            }
          } catch (err) {
            console.error(err);
            setLoading(false);
          }
        }}
      >
        <Form className="w-full max-w-md px-4 py-4 bg-white rounded-lg shadow-lg ">
          <h2 className="text-xl font-bold text-center text-gray-800">Sign Up</h2>

          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <Field
            name="name"
            type="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <Field
            name="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
          <Field
            name="phoneNumber"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />

          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <Field
            name="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
          <Field
            name="confirmPassword"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

          <label className="block text-sm font-semibold text-gray-700">Role</label>
          <Field
            name="role"
            as="select"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="hospital">Hospital</option>
          </Field>
          <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />

          <label className="block text-sm font-semibold text-gray-700">Gender</label>
          <Field
            name="gender"
            as="select"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>
          <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 my-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup1;
