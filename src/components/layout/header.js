import React, { useState, useContext, useEffect } from "react";
import { Navbar, Form, FormControl, Button, Modal } from "react-bootstrap";

import Auth from "../../containers/auth";
import Avatar from "../avatar/index";
import logo from "./flashmind-logo.png";
import authCtx from "../../contexts/auth";
import { loadData } from "../../api/search";
import { useAsync } from "react-hook-async";
import "../../css/header.css";

const style = {
  fontSize: "30px",
  color: "white",
};

export const AuthModal = (props) => {
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
const Header = () => {
  const [search, setSearch] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { authUser } = useContext(authCtx);
  const [value, setValue] = useState(null);
  const [searchApiData, fetchSearchSetCard] = useAsync(null, loadData);

  useEffect(() => {
    fetchSearchSetCard(value)
      .then((setCard) => {
        console.log(setCard);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [value]);

  return (
    <>
      <Navbar>
        <Navbar.Brand href="/dashboard">
          <b className="m-4">
            <img src={logo} alt="" className="logo" />
          </b>
        </Navbar.Brand>
        <Form inline>
          {search && (
            <FormControl
              type="text"
              placeholder="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="inp-search"
            />
          )}

          <Button className="bnt-search" onClick={() => setSearch(!search)}>
            <i class="material-icons" style={{ width: "31px", height: "25px" }}>
              search
            </i>
          </Button>

          {!search && (
            <>
              <div className="break"></div>
              <i
                class="fa fa-plus"
                style={style}
                onClick={() => (document.location.pathname = "/flashcard/new")}
              ></i>
            </>
          )}
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
