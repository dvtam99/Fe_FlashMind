import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { Header } from "./components/layout";

import AuthContext from "./contexts/auth";
import { Dashboard } from "./containers/dashboard";



function App() {
  const [authUser, setAuthUser] = useState(null);
  return (
	  <AuthContext.Provider value={{ authUser, setAuthUser }}>
		
			<div className="App">
				<Header />
				
				<Dashboard />
			
			</div>
    </AuthContext.Provider>

  );
}

export default App;
