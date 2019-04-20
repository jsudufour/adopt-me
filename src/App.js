import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  handleTitleClick() {
    alert("Title clicked!");
  }
  render() {
    return React.createElement("div", {}, [
      React.createElement(
        "h1",
        { onClick: this.handleTitleClick },
        "Adopt Me!"
      ),
      React.createElement(Pet, {
        name: "Luna",
        animal: "dog",
        breed: "Havanese"
      }),
      React.createElement(Pet, {
        name: "Knox",
        animal: "dog",
        breed: "french bulldog"
      }),
      React.createElement(Pet, {
        name: "Flux",
        animal: "dog",
        breed: "italian greyhound"
      })
    ]);
  }
}

render(React.createElement(App), document.getElementById("root"));
