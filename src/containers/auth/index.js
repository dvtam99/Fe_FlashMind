import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <div>
      {haveAccount ? (
        <Login onMoveToRegister={() => setHaveAccount(false)} />
      ) : (
        <Register onMoveToLogin={() => setHaveAccount(true)} />
      )}
    </div>
  );
};

export default Auth;
