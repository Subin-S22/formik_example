import { useFormik } from "formik";
import React from "react";
//to create a validation schema object
import * as yup from "yup";

interface MyField {
  name: string;
  email: string;
  password: string;
}
const initialValues: MyField = {
  name: "",
  email: "",
  password: "",
};

//const validationSchema = yup.object({})
//const validationSchema = yup.object().shape({}) -- both method can be used
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required!")
    .min(2, "Too short!")
    .max(128, "Too long!"),
  email: yup.string().email("Invalid email id").required("Required!"),
  password: yup.string().required("Required!"),
});

/**
 * @param values initial values
 * @returns error should be an object
 */
const validate = (values: MyField): MyField => {
  let errors: MyField = { name: "", email: "", password: "" };
  //this will show all the error message while typing in one field.
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if ("email regex" && false) {
    errors.email = "Invalid email format";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

/**
 * @param values initial values
 */
const onSubmit = async (values: MyField) => {
  console.log("on submit", values);
};

const SimpleForm: React.FC = () => {
  //if we use validationSchema with yup, then validate is not required.
  const formik = useFormik<MyField>({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  });
  console.log("formik visited", formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" {...formik.getFieldProps("name")} />
      {/* since we have value, onChange and onBlur repeated. We can use 
      formik.getFieldProps('name given in name attribute') = helps to remove boilerplate codes 
        ---------------------------------------
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        ------------------------------------
      */}
      {formik.errors.name && formik.touched.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
      <label htmlFor="email">Email</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />
      {formik.errors.email && formik.touched.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      {formik.errors.password && formik.touched.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <button type="submit">submit</button>
    </form>
  );
};

export default SimpleForm;
