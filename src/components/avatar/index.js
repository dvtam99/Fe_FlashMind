import React, { useContext, useState, useRef } from "react";
import { Popover, PopoverHeader, PopoverBody, Button } from "reactstrap";
// import { Link } from "react-router-dom";
import defaultUser from "./avatar.jpg";
import authCtx from "../../contexts/auth";
import "../../css/avatar.css";
const defaultSize = 40;

const sizeScale = {
  xs: 0.5,
  sm: 0.75,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

const Avatar = ({ size, src, onClick }) => {
  const [show, setShow] = useState(false);
  const { authUser } = useContext(authCtx);

  const url = src ? `${process.env.REACT_APP_API_DOMAIN}/${src}` : defaultUser;
  return (
    <>
      <Popover
        placement="bottom"
        isOpen={show}
        target="Popover1"
        toggle={() => setShow(!setShow)}
      >
        <PopoverHeader>@{authUser.user.username}</PopoverHeader>
        <PopoverBody className="d-flex flex-column">
          <Button color="info" className="mb-2">
            Profile
          </Button>
          <Button color="info" className="mb-2">
            Setting
          </Button>
        </PopoverBody>
      </Popover>
      <img
        id="Popover1"
        onClick={() => setShow(!show)}
        src={url}
        alt=""
        className="border rounded-circle spanLogin"
        style={{
          width: defaultSize * sizeScale[size],
          height: defaultSize * sizeScale[size],
        }}
      />
    </>
  );
};

Avatar.defaultProps = {
  size: "md",
};

export default Avatar;