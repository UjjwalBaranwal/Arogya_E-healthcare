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
  const classNameLabel = "block text-sm font-semibold text-gray-700";
  const classNameField =
    "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const classNameError = "text-red-500 text-sm";
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
          role: "",
          gender: "",
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
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const signupResponse = await fetch(
              "http://localhost:3000/api/v1/patient/signup",
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
                  role: values.role,
                  gender: values.gender,
                }),
              }
            );
            const data = await signupResponse.json();
            setLoading(false);
            if (signupResponse.ok) {
              window.alert("Successfully signup");
              console.log("Signup successfully:", data);
              // navigate to the login page
              navigate("login");
            } else {
              navigate("/signup");
              console.log(data);
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <Form className="w-1/2 h-auto max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-4">
          {/* <label
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
          /> */}

          <InputBox
            classNameField={classNameField}
            classNameLabel={classNameLabel}
            classNameError={classNameError}
            name={"name"}
            fieldName={"First Name"}
            type={"text"}
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
            htmlFor="role"
            className="block text-sm font-semibold text-gray-700"
          >
            Role
          </label>
          <Field
            name="role"
            as="select"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="hospital">Hospital</option>
          </Field>
          <ErrorMessage
            name="role"
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup1;
