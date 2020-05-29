import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth = (onHide) => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <div>
      {haveAccount ? (
        <Login onHide={onHide} onMoveToRegister={() => setHaveAccount(false)} />
      ) : (
        <Register onMoveToLogin={() => setHaveAccount(true)} />
      )}
    </div>
  );
};

export default Auth;
