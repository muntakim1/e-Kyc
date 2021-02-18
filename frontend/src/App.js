import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
const App = () => {
  const [storage, setStorage] = useState("");
  useEffect(() => {
    setStorage(localStorage.getItem("access_token"));
  }, [storage]);
  return (
    <Router>
      <Navbar Storage={storage}></Navbar>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
