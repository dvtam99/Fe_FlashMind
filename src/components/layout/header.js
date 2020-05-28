import React, { useState } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import Login from "../../containers/auth";
import logo from "./flashmind-logo.png";
const Header = () => {
  const [modalShow, setModalShow] = useState(false);

  const AuthModal = (props) => {
    return (
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Login or Register
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home">
          <b className="m-4">
            <img src={logo} alt="" className="logo" />
          </b>
        </Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
        <span onClick={() => setModalShow(true)} className="spanLogin">
          Login or Register
        </span>
        <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
      </Navbar>
    </>
  );
};

export default Header;
