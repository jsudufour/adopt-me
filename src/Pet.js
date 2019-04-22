import React from "react";

const Pet = props => {
  return (
    <div>
      <h2>{props.name.toUpperCase()}</h2>
      <h4>{props.breed}</h4>
    </div>
  );
};

export default Pet;
