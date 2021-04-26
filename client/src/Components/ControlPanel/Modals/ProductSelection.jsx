import React from "react";
import style from "./productselection.module.scss";
// import {
//   Edit,
//   Delete,
//   MoreVert,
//   CheckBoxOutlineBlank,
//   CheckBox,
// } from "@material-ui/icons";
import { Link } from "react-router-dom";

export function ProductSelection({ products }) {
  console.log(products, "aca");
  return (
    <div className={style.div}>
      <h3>Review selection</h3>
      <ol>
        {products?.map((product) => {
          return (
            <div className={style.list}>
              <tr>{product.title}</tr>
              <Link to={`/rate-product/${product.id}`}>
                <button>Review</button>
              </Link>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
