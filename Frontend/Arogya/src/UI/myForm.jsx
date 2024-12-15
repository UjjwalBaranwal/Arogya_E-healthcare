import React from "react";
import { Form } from "formik";
import FieldWithLabel from "./formField";

const MyForm = ({ handleLocation }) => {
  return (
    <Form className="w-full max-w-lg mx-auto p-2 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWithLabel name="name" label="First Name" />
        <FieldWithLabel name="email" label="Email" type="email" />
        <FieldWithLabel name="phoneNumber" label="Phone Number" />
        <FieldWithLabel name="password" label="Password" type="password" />
        <FieldWithLabel
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
        <FieldWithLabel
          name="gender"
          label="Gender"
          as="select"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <FieldWithLabel name="website" label="Website" />
        <FieldWithLabel name="address" label="Address" />
        <FieldWithLabel name="location" label="Location" />

        <button
          type="button"
          onClick={() => handleLocation((field, value) => field(value))}
          className="h-10 px-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
        >
          Use Current Location
        </button>

        <FieldWithLabel
          name="specialization"
          label="Specialization"
          as="select"
          options={[
            { value: "General Practitioner (GP)", label: "General Practitioner (GP)" },
            { value: "Cardiologist", label: "Cardiologist" },
            { value: "Dermatologist", label: "Dermatologist" },
            { value: "Neurologist", label: "Neurologist" },
            { value: "Endocrinologist", label: "Endocrinologist" },
            { value: "Gastroenterologist", label: "Gastroenterologist" },
            { value: "Oncologist", label: "Oncologist" },
            { value: "Rheumatologist", label: "Rheumatologist" },
            { value: "other", label: "Other" },
          ]}
        />
        
        <FieldWithLabel name="experience" label="Experience (Years)" />
        
        <FieldWithLabel
          name="consultationFee"
          label="Consultation Fee"
          type="number"
        />

        <FieldWithLabel
          name="status"
          label="Status"
          as="select"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default MyForm;
