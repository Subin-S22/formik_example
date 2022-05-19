import { Formik, Form, ErrorMessage, Field, FieldProps } from "formik";
import React from "react";
//to create a validation schema object
import * as yup from "yup";
import TextError from "./TextError";

interface MyField {
  name: string;
  email: string;
  password: string;
  textarea?: "";
  address: "";
}
const initialValues: MyField = {
  name: "",
  email: "",
  password: "",
  textarea: "",
  address: "",
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
  address: yup.string().required("Required!!").max(256, "Too long!!"),
});

/**
 * @param values initial values
 */
const onSubmit = async (values: MyField) => {
  console.log("on submit", values);
};

const SimpleForm: React.FC = () => {
  //if we use validationSchema with yup, then validate is not required.
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" />
        </div>
        <div>
          <label htmlFor="password">TextArea</label>
          <Field
            as="textarea"
            id="textarea"
            type="textarea"
            name="textarea"
            placeholder="Enter your textarea"
          />
          <ErrorMessage name="textarea" />
        </div>
        <div>
          <label htmlFor="password">Address</label>
          <Field name="address">
            {(props: FieldProps) => {
              return (
                <div>
                  <input type="text" id="address" {...props.field} />
                  {props.meta.touched && props.meta.error && (
                    <div>{props.meta.error}</div>
                  )}
                </div>
              );
            }}
          </Field>
          <ErrorMessage name="address" />
        </div>
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default SimpleForm;
