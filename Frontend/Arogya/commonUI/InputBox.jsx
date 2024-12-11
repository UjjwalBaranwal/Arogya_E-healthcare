import { Field, ErrorMessage } from "formik";
function InputBox({
  classNameLabel,
  classNameField,
  name,
  type,
  fieldName,
  classNameError,
}) {
  return (
    <>
      <label htmlFor={name} className={classNameLabel}>
        {fieldName}
      </label>
      <Field name={name} type={type} className={classNameField} />
      <ErrorMessage name={name} component="div" className={classNameError} />
    </>
  );
}

export default InputBox;
