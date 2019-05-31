import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Tactics from "../Tactics";

import "./App.scss";

const App = () => (
  <div className="app-container">
    <Router>
      <Tactics path="/" />
    </Router>
  </div>
);

render(<App />, document.getElementById("root"));
