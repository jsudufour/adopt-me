import React from "react";
import { ANIMALS } from "petfinder-client";

class SearchParams extends React.Component {
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: []
  };
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState({
      animal: event.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div className="search-params">
        <label htmlFor="loation">
          Location:
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={this.state.location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
          />
          <option />
          {ANIMALS.map(animal => {
            <option key={animal} value={animal}>
              {animal}
            </option>;
          })}
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.state.breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
            disabled={this.state.breeds.length === 0}
          >
            <option />
            {this.state.breeds.map(breed => {
              <option key={breed} value={breed}>
                {breed}
              </option>;
            })}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
