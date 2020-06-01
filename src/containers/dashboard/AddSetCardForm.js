import React, { useState, useContext } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

const SetCardSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
});

const AddSetCardForm = (props) => {
  function handleChange(val) {
    if (formik.values.folder.indexOf(val) === -1) {
      formik.values.folder.push(val);
    } else {
      const indx = formik.values.folder.indexOf(val);
      formik.values.folder.splice(indx, 1);
    }
  }

  const formik = useFormik({
    validationSchema: SetCardSchema,
    initialValues: {
      title: "",
      description: "a newly added set of flashcard",
      avatar: "Choose a featured image!",
      folder: [],
    },
    onSubmit: (values) => {
      console.log({
        ...values,
        empty: true,
        finish: false,
        detail: [],
      });
    },
  });
  return (
    <Form className="m-4" onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          onChange={formik.handleChange}
          name="title"
          value={formik.values.title}
          isInvalid={formik.errors.title}
          placeholder="Enter the title of the new set"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          onChange={formik.handleChange}
          name="description"
          isInvalid={formik.errors.description}
          value={formik.values.description}
          placeholder="Provide a short description about your set"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.File
          id="uploadAvatar"
          label={formik.values.avatar}
          data-browse="Upload"
          onChange={(e) =>
            (formik.values.avatar = `http://localhost:5000/public/images/${e.target.files[0].name}`)
          }
          custom
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Classfify as folder</Form.Label>
        <Form.Check
          name="folder"
          type="checkbox"
          value={1}
          label="English"
          onChange={handleChange}
        />
        <Form.Check
          name="folder"
          type="checkbox"
          label="Coding"
          value={2}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        style={{ width: 150, margin: "0 auto" }}
      >
        Add
      </Button>
    </Form>
  );
};

export default AddSetCardForm;
