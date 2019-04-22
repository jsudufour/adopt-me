import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const petFinder = {
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
};

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    let pets;
    fetch(`https://api.petfinder.com/v2/oauth2/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Host: "api.petfinder.com"
      },
      body: JSON.stringify({
        client_id: "wwBdaD0eNIoLJBj2Xy1S4DRkB2kDrmrL7jcE96GTvuoIeKlFSM",
        client_secret: "cdRnD4bu0JBxMMWBkOVXTCVGWtiUdZNODpVuWjiA",
        grant_type: "client_credentials"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        fetch(`https://api.petfinder.com/v2/animals?type=dog&location=94115`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data.animals.photos.small);
            if (data.animals) {
              // if finds one pet, returns an object
              // if finds 1+ pets, returns an array
              if (Array.isArray(data.animals)) {
                pets = data.animals;
              } else {
                pets = [data.animals];
              }
            } else {
              pets = [];
            }

            // update state with updated pets
            this.setState({
              pets // shallow merge - won't overwrite existing flat data
            });
          });
      });
  }

  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          return (
            <Pet
              key={pet.id}
              name={pet.name}
              breed={pet.breeds.primary}
              media={pet.photos}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
