import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media) {
      photos = media.map(photo => photo.medium);
    }

    return { photos };
  }

  render() {
    const { photos, active } = this.state;

    console.log(photos);

    return (
      <div className="carousel">
        <img src={photos[active]} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
