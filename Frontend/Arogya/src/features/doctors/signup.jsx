import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginPoster from "../../assets/loginPoster.jpg";
import { useNavigate } from "react-router";
const Doctorsignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const passwordTest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLocation = (setFieldValue) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude}, ${position.coords.longitude}`;
          setFieldValue("location", location);
          SpeechSynthesisErrorEvent("");
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Permission denied by the user");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavalilabe");
              break;
            case error.TIMEOUT:
              setError("loccation to get user is timed out");
              break;
            default:
              setError("An unknown error has occured");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by the browser");
    }
  };

  return (
    <div className="p-16 flex flex-row justify-around items-center ">
      <img src={loginPoster} className=" p-16 w-1/2 h-1/2" />

      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          gender: "",
          website:"",
          address: "",
          specialization: "",
          experience: 0,
          consultationFee: 0,
          timing: {
            open: "09:00",
            close: "17:00",
          },
          location: {
            type: "Point",
            coordinates: [""],
          },
          status: "",
          ratingsAverage: 4,
          ratingsQuantity: 0,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, "Must be 15 characters or less")
            .required("Name is required"),

          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

          phoneNumber: Yup.string()
            .length(10, "Phone number must have exactly 10 digits")
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .required("Phone number is required"),

          password: Yup.string()
            .min(6, "Password must be a minimum length of 6")
            .matches(
              passwordTest,
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            )
            .required("Password is required"),

          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          consultationFee: Yup.number()
            .min(0, "Consultation Fee must be greater than 10") // Updated to check for minimum value of 10
            .required("Consultation Fee is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const signupResponse = await fetch(
              "http://localhost:3000/api/v1/doctor/signup",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: values.name,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  gender: values.gender,
                  role: "doctor",
                  website: values.website,
                  address: values.address,
                  location: values.location.split(","),
                  specialization: values.specialization,
                  experience: values.experience,
                  consultationFee: values.consultationFee,
                  timing: values.timing,
                  status: values.status,
                  ratingsAverage: values.ratingsAverage,
                  ratingsQuantity: values.ratingsQuantity,
                  
                }),
              }
            );
            const data = await signupResponse.json();
            setLoading(false);
            if (signupResponse.ok) {
              window.alert("Successfully signup");
              console.log("Signup successfully:", data);
              // navigate to the login page
              navigate("/login");
            } else {
              navigate("/signup");
              console.log(data);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="w-1/2 h-auto max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              First Name
            </label>
            <Field
              name="name"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold text-gray-700"
            >
              Phone Number
            </label>
            <Field
              name="phoneNumber"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm"
            />
            <label
              htmlFor="gender"
              className="block text-sm font-semibold text-gray-700"
            >
              Gender
            </label>
            <Field
              name="gender"
              as="select"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500 text-sm"
            />
            <label
              htmlFor="website"
              className="block text-sm font-semibold text-gray-700"
            >
              Website
            </label>
            <Field
              name="website"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="website"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700"
            >
              Address
            </label>
            <Field
              name="address"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm"
            />
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Location
            </label>
            <Field
              name="location"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm"
            />
            <button
              type="button"
              onClick={() => handleLocation(setFieldValue)}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Use Current Location
            </button>
            <label
              htmlFor="specialization"
              className="block text-sm font-semibold text-gray-700"
            >
              Specialization
            </label>
            <Field
              name="specialization"
              as="select"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Specialization</option>
              <option value="General Practitioner (GP)">
                General Practitioner (GP)
              </option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Endocrinologist">Endocrinologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              <option value="Oncologist">Oncologist</option>
              <option value="Rheumatologist">Rheumatologist</option>
              <option value="other">other</option>
            </Field>
            <ErrorMessage
              name="specialization"
              component="div"
              className="text-red-500 text-sm"
            />
            <label
              htmlFor="experience"
              className="block text-sm font-semibold text-gray-700"
            >
              Experience
            </label>
            <Field
              name="experience"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="experience"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="consultationFee"
              className="block text-sm font-semibold text-gray-700"
            >
              Consultation Fee
            </label>
            <Field
              name="consultationFee"
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="consultationFee"
              component="div"
              className="text-red-500 text-sm"
            />
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-700"
            >
              Status
            </label>
            <Field
              name="status"
              type="text"
              as="select"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Status</option>
              <option value="active">Male</option>
              <option value="inactivef">Female</option>
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Doctorsignup;
