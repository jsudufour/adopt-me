import React from "react";
import { navigate } from "@reach/router/lib/history";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    fetch(`https://api.petfinder.com/v2/oauth2/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "",
        Host: "api.petfinder.com"
      },
      body: JSON.stringify({
        client_id: "",
        client_secret: "",
        grant_type: "client_credentials"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        fetch(`https://api.petfinder.com/v2/animals/${this.props.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            const pet = data.animal;

            this.setState({
              name: pet.name,
              location: `${pet.contact.address.city}, ${
                pet.contact.address.state
              }`,
              description: pet.description,
              media: pet.photos,
              breed: pet.breeds.primary,
              photo: pet.photos[0].large,
              loading: false
            });
          })
          .catch(err => {
            this.setState({ error: err });
            navigate("/");
          });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>loading pet...</div>;
    }
    const { breed, location, description, photo } = this.state;

    return (
      <div className="details">
        <div>
          <img src={photo} alt={name} />
          <h1>{name}</h1>
          <h2>
            {breed} - {location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
