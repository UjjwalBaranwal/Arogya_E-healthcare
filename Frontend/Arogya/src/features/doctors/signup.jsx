import React from "react";
import { Formik } from "formik";
import MyForm from "../../UI/myForm";
import validationSchema from "../../UI/validationSchema";
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
  const navigate = useNavigate(); 

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    website: "",
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
      coordinates: [0,0],
    },
    status: "",
    ratingsAverage: 4,
    ratingsQuantity: 0,
  };

  const handleSubmit = async (values) => {
    console.log("submit button is clicked");
    try {
      const coordinates = values.location.split(",").map((loc) => parseFloat(loc.trim()));
      if (coordinates.length !== 2 || coordinates.some((num) => isNaN(num))) {
        throw new Error("Invalid location format. Please enter 'longitude,latitude'.");
      }
  
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
            // location: values.location.split(","), // Splitting location into an array
            specialization: values.specialization,
            experience: values.experience,
            consultationFee: values.consultationFee,
            // timing: values.timing,
            timing: {
              open: "09:00",
              close: "17:00",
            },
            location: {
              type: "Point",
              coordinates,
            },            // location:[28.4744567, 77.5106863],
            status: values.status,
            // ratingsAverage: values.ratingsAverage,
            ratingsAverage: 4,
            // ratingsQuantity: values.ratingsQuantity,
            ratingsQuantity: 101,
          }),
        }
      );

      const data = await signupResponse.json();

      if (signupResponse.ok) {
        window.alert("Successfully signed up");
        console.log("Signup successfully:", data);
        // Navigate to the login page (ensure you have access to navigate)
        navigate("/doctorLogin");
      } else {
        console.log("Signup failed:", data);
        window.alert("Signup failed. Please try again.");
        navigate("/doctor/signup");
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">Sign Up As a Doctor</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <MyForm
            handleLocation={(fieldValueSetter) => handleLocation(setFieldValue)}
          />
        )}
      </Formik>
    </div>
  );
};

export default DoctorSignup;
