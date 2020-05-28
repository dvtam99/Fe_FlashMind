import React, { useState, useContext } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useAsync } from "react-hook-async";

import { login } from "../../api/auth";

import authCtx from "../../contexts/auth";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username must length than 6 characters!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Password must length than 4 characters!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = ({ onMoveToRegister }) => {
  const { setAuthUser } = useContext(authCtx);

  const [loginApiData, fetchLogin] = useAsync(null, login);

  const [failureModalVisible, setFailureModalVisible] = useState(false);

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      fetchLogin(values.username, values.password)
        .then((authUser) => {
          if (values.rememberMe) {
            localStorage.setItem("jwt", authUser.token);
          }
          setAuthUser(authUser);
        })
        .catch((e) => {
          console.log(e.message);
          setFailureModalVisible(true);
        });
    },
  });

  return (
    <div className="d-flex justify-content-center">

      <Modal show={failureModalVisible} centered>
        <Modal.Body className="alert-danger text-center">
          <Alert variant="danger" className="border-0">
            <Alert.Heading>Something went wrong</Alert.Heading>
            {loginApiData.error && (
              <p>{loginApiData.error.response.data.err}</p>
            )}
          </Alert>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setFailureModalVisible(false)}
          >
            Okay
          </Button>
        </Modal.Body>
      </Modal>

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
          
		  <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me!" />
          </Form.Group>
          
		  <Button variant="primary" type="submit" style={{ width: "60%" }}>
            Login
          </Button>

          <Form.Label>
            You don't have an account? &nbsp;
            <span className="link" onClick={onMoveToRegister}>
              Register
            </span>
            now!
          </Form.Label>
        
		</Form>

      </div>

    </div>
  );
};

export default Login;
