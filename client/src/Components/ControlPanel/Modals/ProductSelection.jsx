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
  return (
    <div className={style.div}>
      <h3>Reviews</h3>
      <ol>
        {products?.map((product) => {
          return (
            <div className={style.list}>
              <tr>{product.title}</tr>
              <Link to={`/rate-product/${product.product_id}`}>
                <button>Create review</button>
              </Link>
              <Link to={`/modifyReview/${product.product_id}`}>
                <button>Modify review</button>
              </Link>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
