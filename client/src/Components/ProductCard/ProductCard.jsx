import React from "react";
import greyheart from "./greyheart.png";
import sCart from "./shopping-cart.svg";
import revs from "./grafico-de-barras.png";
import Style from "./productcard.module.scss";

export function ProductCard(props) {
  return (
    <div className={Style.container}>
      <div className={Style.favorite}>
        {/* eslint-disable-next-line */}
        <img src={greyheart} />
        {/* eslint-disable-next-line */}
        <img src={revs} />
      </div>
      {/* eslint-disable-next-line */}
      <img src={props.images} className={Style.img} />
      <div className={Style.review}>
        <label>★</label>
        <label>★</label>
        <label>★</label>
        <label>★</label>
        <label>★</label>
        <p>Reviews (4)</p>
      </div>
      <div className={Style.name}>
        <p>{props.name}</p>
      </div>
      <div className={Style.price}>
        <p>
          <strong>{props.price}</strong>
        </p>
      </div>
      <div>
        <button>
          {" "}
          {/* eslint-disable-next-line */}
          <img src={sCart} />
          <strong>Add to Cart</strong>
        </button>
      </div>
    </div>
  );
}
