import React, { useState, useContext } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";

import Auth from "../../containers/auth";
import Avatar from "../avatar/index";
import logo from "./flashmind-logo.png";
import authCtx from "../../contexts/auth";
const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const { authUser } = useContext(authCtx);
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
            <Auth onHide={props.onHide} />
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
        <Navbar.Brand href="/dashboard">
          <b className="m-4">
            <img src={logo} alt="" className="logo" />
          </b>
        </Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
        {!authUser ? (
          <span
            onClick={() => {
              setModalShow(true);
            }}
            className="spanLogin"
          >
            Login or Register
          </span>
        ) : (
          <Avatar size="xl" src={authUser.user.photoUrl} />
        )}

        <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
      </Navbar>
    </>
  );
};

export default Header;
