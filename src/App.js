import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { Header } from "./components/layout";

import AuthContext from "./contexts/auth";
import { Dashboard } from "./containers/dashboard";



function App() {
  const [authUser, setAuthUser] = useState(null);
  return (
	  <AuthContext.Provider value={{ authUser, setAuthUser }}>
			<Router>
				<div className="App">
					<Header />
					<Route path="/dashboard" component={Dashboard} />
				</div>
			</Router>
    </AuthContext.Provider>

  );
}

export default App;
