import React from "react";
import { Link } from "@reach/router";

class Pet extends React.Component {
  // every react class components have to have a render method
  render() {
    //render method has to return markup
    // should have no side effects - should not modify state
    // has to be fast - render gets called OFTEN

    // get these params from the parent
    const { name, breed, media, location, id } = this.props;

    // let photos = media.filter(obj => obj.medium);

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={media[0] ? media[0].small : ""} alt={name} />
        </div>
        <div className="info">
          <h2>{name}</h2>
          <h4>
            {breed} - {location}
          </h4>
        </div>
      </Link>
    );
  }
}

export default Pet;
