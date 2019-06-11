import React from "react";
import { navigate } from "@reach/router/lib/history";
import Carousel from "./Carousel.js";
import Modal from "./Modal";

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

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
      })
      .catch(err => {
        this.setState({ error: err });
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <div>loading pet...</div>;
    }
    const { breed, name, location, description, media, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          {/* <img src={photo} alt={name} /> */}
          <h1>{name}</h1>
          <h2>
            {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <div onClick={this.toggleModal}>Yes</div>
                <div onClick={this.toggleModal}>No</div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
