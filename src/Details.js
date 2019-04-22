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
        client_id: "wwBdaD0eNIoLJBj2Xy1S4DRkB2kDrmrL7jcE96GTvuoIeKlFSM",
        client_secret: "cdRnD4bu0JBxMMWBkOVXTCVGWtiUdZNODpVuWjiA",
        grant_type: "client_credentials"
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        fetch(`https://api.petfinder.com/v2/animals/this.props.id`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log("details");
            console.log(data);
            console.log(this.props.id);
            const pet = data;

            this.setState({
              name: pet.name,
              location: `${pet.contact.address.city}, ${
                pet.contact.address.state
              }}`,
              description: pet.description,
              media: pet.photos,
              breed: pet.breeds.primary,
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
      return <div>loading...</div>;
    }
    const { breed, location, description } = this.state;

    return (
      <div className="details">
        <div>
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
