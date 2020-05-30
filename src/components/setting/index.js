import React, { useContext } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Route } from "react-router-dom";
import Profile from "./profile";
import authCtx from "../../contexts/auth";
import withAuth from "../../hoc/authHoc";

const Setting = () => {
  const { authUser } = useContext(authCtx);

  return (
    <Container className="my-5">
      <h3 className="display-4">
        Settings for <span className="code">@{authUser.user.username}</span>
      </h3>
      <Row>
        <Col xs={3}>
          <Nav defaultActiveKey="/settings" className="flex-column">
            <Nav.Link href="/profile">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav>
        </Col>
        <Col xs={9}>
          <Route path="/profile" component={Profile} />
        </Col>
      </Row>
    </Container>
  );
};

export default withAuth(Setting);
