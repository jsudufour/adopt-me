import React from "react";

class Pet extends React.Component {
  // every react class components have to have a render method
  render() {
    //render method has to return markup
    // should have no side effects - should not modify state
    // has to be fast - render gets called OFTEN

    // get these params from the parent
    const { name, breed, media, location } = this.props;

    return (
      <div className="pet">
        <div className="image-container">
          <img src={media.large} alt={name} />
        </div>
        <div className="info">
          <h2>{name}</h2>
          <h4>
            {breed} - {location}
          </h4>
        </div>
      </div>
    );
  }
}

export default Pet;
