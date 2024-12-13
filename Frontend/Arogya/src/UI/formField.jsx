import React from "react";
import { Field, ErrorMessage } from "formik";

const FieldWithLabel = ({ name, label, type = "text", as = "input", options = [], readonly = false }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      {as === "select" ? (
        <Field
          as="select"
          name={name}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          name={name}
          type={type}
          readOnly={readonly}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default FieldWithLabel;
