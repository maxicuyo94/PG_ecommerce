import React from "react";
const image = `image.png`;

const ProductNotFound = () => {
  return (
    <div className="notFound">
      <h1>Nothing here, nothing there...</h1>
      <h3>Try again in a few days!</h3>
      <img className="imag" src={image} alt="Product not found"></img>
    </div>
  );
};

export default ProductNotFound;
