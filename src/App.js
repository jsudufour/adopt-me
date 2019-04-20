import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petFinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  componentDidMount() {
    const promise = petFinder.breed.list({ animal: "dog" }); //returns a promise

    promise.then(console.log, console.error);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Adopt Me!</h1>
        <Pet name="Luna" animal="dog" breed="chihuahua" />
        <Pet name="Knox" animal="dog" breed="french bulldog" />
        <Pet name="Flux" animal="dog" breed="italian greyhound" />
      </React.Fragment>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
