import React, { useState } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";
import Login from "../../containers/auth";
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
            <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="header">
          <b className="m-4">FlashMind</b>
        </Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
        <Button
          variant="outline-light"
          className="btnLogin"
          onClick={() => setModalShow(true)}
        >
          Login
        </Button>
        <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
      </Navbar>
    </>
  );
};

export default Header;
