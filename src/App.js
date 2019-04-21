import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petFinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    petFinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets;

        if (data.petFinder.pets && data.petFinder.pets.pet) {
          // if finds one pet, returns an object
          // if finds 1+ pets, returns an array
          if (Array.isArray(data.petFinder.pets.pet)) {
            pets = data.petFinder.pets.pet;
          } else {
            pets = [data.petFinder.pets.pet];
          }
        } else {
          pets = [];
        }

        // update state with updated pets
        this.setState({
          pets // shallow merge - won't overwrite existing flat data
        });
      });
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
