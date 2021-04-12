import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CategoriesHome.module.scss";

export function CategoriesHome({ id, name, image, price }) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <NavLink to={`/product/${id}`}>
          <img src={image} alt="." />
        </NavLink>
      </div>

      <div className={styles.details}>
        <NavLink to={`/product/${id}`}>
          <div className={styles.name}>
            <span>{name.split(" ").slice(0, 5).join(" ")}</span>
          </div>
        </NavLink>
        <div>
          <span>
            $<b>{price}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
