import React, { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { Header } from "./components/layout";

import AuthContext from "./contexts/auth";
import { Dashboard } from "./containers/dashboard";
import HomePage from "./components/homepage";



function App() {
  const [authUser, setAuthUser] = useState(null);
  return (
	  <AuthContext.Provider value={{ authUser, setAuthUser }}>
			<Router>
				<div className="App">
					<Header />
					<Route path="/" exact component={HomePage} />
					<Route path="/dashboard" component={Dashboard} />
				</div>
			</Router>
    </AuthContext.Provider>

  );
}

export default App;
