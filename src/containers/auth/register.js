import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = ({ onMoveToLogin }) => {
  const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username must length than 6 characters!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(4, "Password must length than 4 characters!")
      .max(50, "Too Long!")
      .required("Required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Confirm password not matched!")
      .required("Required"),
    policy:  Yup
    .boolean()
    .oneOf([true], 'Must Accept Terms and Conditions'),
      
    
  });

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
    onSubmit: (value) => {
      console.log(value.username + " " + value.password);
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="loginCard ">
        <Form className="m-4 text-center" onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
              isInvalid={formik.errors.username}
              placeholder="Enter userName"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="password"
              isInvalid={formik.errors.password}
              value={formik.values.password}
              placeholder="Password"
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="confirmPassword"
              isInvalid={formik.errors.confirmPassword}
              value={formik.values.confirmPassword}
              placeholder="confirmPassword"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <p style={{ display: "inline-flex" }}>
              <Form.Check
                type="checkbox"
                name="policy"
                value={formik.values.policy}
                isInvalid={formik.errors.policy}
                onChange={formik.handleChange}
                feedback="You must agree before submitting."
                required
              />
              I agree to the&nbsp;
              <span className="link">Terms of Use</span>&nbsp; and &nbsp;
              <span className="link"> Privacy Notice</span>
            </p>
            <Form.Control.Feedback type="invalid">
              {formik.errors.policy}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" style={{ width: "60%" }}>
            Register
          </Button>
          <Form.Label>
            You have an account? &nbsp;
            <span className="link" onClick={onMoveToLogin}>
              Login
            </span>
            &nbsp; now!
          </Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default Register;
