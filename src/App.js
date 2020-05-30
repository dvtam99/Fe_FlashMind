import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/layout";

import AuthContext from "./contexts/auth";
import { useAsync } from "react-hook-async";
import { Dashboard } from "./containers/dashboard";
import HomePage from "./components/homepage";
import AddForm from "./components/addform";
import DetailSet from "./components/detailset";
import { me } from "./api/profile";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const [profileApi, fetchProfile] = useAsync(null, me);

  useEffect(() => {
    debugger;
    if (!authUser) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        fetchProfile(jwt).then((user) => setAuthUser(user));
      }
    }
  }, [authUser, fetchProfile, setAuthUser]);

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
