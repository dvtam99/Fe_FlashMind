import React, { useState, useContext } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

const SetCardSchema = Yup.object().shape({
	title: Yup.string()
	  .required("Required"),
});

const AddCardItemForm = (props) => {

	return (
		<div>Add card form</div>
	);
};

export default AddCardItemForm;