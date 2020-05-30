import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/layout";

import AuthContext from "./contexts/auth";
import { Dashboard } from "./containers/dashboard";
import HomePage from "./components/homepage";
import AddForm from "./components/addform";
import DetailSet from "./components/detailset";

function App() {
  const [authUser, setAuthUser] = useState(null);
  return (
	  <AuthContext.Provider value={{ authUser, setAuthUser }}>
				<div className="App">
					<Header />
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/flashcard/new" component={AddForm} />
						<Route path="/flashcard/detail" component={DetailSet} />
					</Switch>
				</div>
    </AuthContext.Provider>
  );
}

export default App;
