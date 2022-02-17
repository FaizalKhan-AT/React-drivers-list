import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import AddDriver from "./components/AddDriver/AddDriver";
import Contexts from "./store/Contexts";

function App() {
  return (
    <>
      <Contexts>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup">
            <Login signup />
          </Route>
          <Route path="/add" component={AddDriver} />
          <Route path="/edit">
            <AddDriver edit />
          </Route>
        </Router>
      </Contexts>
    </>
  );
}

export default App;
