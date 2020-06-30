import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { data } from "./data"

ReactDOM.render(<App notes={data} />, document.getElementById("root"));
