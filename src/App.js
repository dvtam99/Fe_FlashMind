import React, { useState } from "react";

import { Header } from "./components/layout";

import AuthContext from "./contexts/auth";

function App() {
  const [authUser, setAuthUser] = useState(null);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      <div className="App">
        <Header />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
