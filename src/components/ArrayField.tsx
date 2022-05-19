import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FieldProps,
  FieldArray,
  FieldArrayRenderProps,
  FastField,
} from "formik";
import React from "react";
//to create a validation schema object
import * as yup from "yup";
import TextError from "./TextError";

interface MyField {
  name: string;
  email: string;
  password: string;
  textarea?: string;
  address: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumber: Array<string>;
  phNumWithFieldArray: Array<string>;
}
//example for nested field
const initialValues: MyField = {
  name: "",
  email: "",
  password: "",
  textarea: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumber: ["", ""],
  phNumWithFieldArray: [""],
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
        {/* example for nested field in the data change in the name field can solve this problem */}
        <div>
          <label htmlFor="password">FaceBook</label>
          <Field
            as="facebook"
            id="facebook"
            type="facebook"
            name="social.facebook"
            placeholder="Enter your textarea"
          />
          <ErrorMessage name="social.facebook" />
        </div>
        <div>
          <label htmlFor="password">Twitter</label>
          <Field
            as="twitter"
            id="twitter"
            type="twitter"
            name="social.twitter"
            placeholder="Enter your textarea"
          />
          <ErrorMessage name="social.twitter" />
        </div>
        {/* dealing with array in formik fields */}
        <div>
          <label htmlFor="password">primary phone number</label>
          <Field
            as="primary"
            id="primary"
            type="primary"
            name="phoneNumber[0]"
            placeholder="Enter your textarea"
          />
          <ErrorMessage name="phoneNumber[0]" />
        </div>
        <div>
          <label htmlFor="password">secondary phone number</label>
          <Field
            as="secondary"
            id="secondary"
            type="secondary"
            name="phoneNumber[1]"
            placeholder="Enter your secondary number"
          />
          <ErrorMessage name="phoneNumber[1]" />
        </div>

        {/* example for fieldArray in formik for multiple field with user input  */}
        <div>
          <label htmlFor="password">phone with field array</label>
          <FieldArray name="phNumWithFieldArray">
            {(props: FieldArrayRenderProps) => {
              const { push, remove, form } = props;
              const { values } = form;
              const { phNumWithFieldArray } = values;
              return (
                <div>
                  {phNumWithFieldArray.map((phone: string, index: number) => {
                    return (
                      <div>
                        <Field
                          name={`phNumWithFieldArray[${index}]`}
                          value={phone}
                        ></Field>
                        {index && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                        <button type="button" onClick={() => push("")}>
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </FieldArray>
          <ErrorMessage name="phoneNumber[1]" />
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
        {/* to avoid the re-rendering of the input components */}
        <div>
          <label htmlFor="password">fast field</label>
          <FastField
            as="secondary"
            id="secondary"
            type="secondary"
            name="phoneNumber[1]"
            placeholder="Enter your secondary number"
          >
            {(props: FieldProps) => {
              return <div>fast field</div>;
            }}
          </FastField>
          <ErrorMessage name="phoneNumber[1]" />
        </div>
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default SimpleForm;
