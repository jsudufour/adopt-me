import React from "react";
import { render } from "react-dom";
import Results from "./Results";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1> Adopt a Doggo </h1>
        <Results />
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
