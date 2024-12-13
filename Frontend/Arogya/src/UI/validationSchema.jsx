import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
  website: Yup.string().url("Invalid URL"),
  address: Yup.string().required("Address is required"),
  location: Yup.string().required("Location is required"),
  specialization: Yup.string().required("Specialization is required"),
  experience: Yup.string()
    .matches(/^[0-9]+$/, "Experience must be numeric")
    .required("Experience is required"),
  consultationFee: Yup.number()
    .positive("Fee must be positive")
    .required("Consultation Fee is required"),
  status: Yup.string().required("Status is required"),
});

export default validationSchema;
