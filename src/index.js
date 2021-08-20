import React from "react";
import ReactDOM from "react-dom";

import { EventProvider } from "./hooks";
import App from "./App";

import "./assets/stylesheets/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
