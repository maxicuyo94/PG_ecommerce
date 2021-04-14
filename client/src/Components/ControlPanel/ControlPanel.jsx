import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, deleteProduct } from "../../Redux/Actions/actions.js";
import style from "./controlpanel.module.scss";
import { Edit, Delete, CheckBoxOutlineBlank } from '@material-ui/icons';
import { Link } from "react-router-dom";


export function ControlPanel() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wantedProducts);
console.log(products)
  useEffect(() => {
    dispatch(allProducts());
  }, []);

  const handleDelete = (e) => {
    console.log('aca' + e.target.id)
        // dispatch(deleteProduct(e.target.id))
  }
  return (
    <div>
      <div>
        <span>bar to configure sorting and naming of every column</span>
      </div>
      <div>
          {products.map((product) => {
              return (
                    <div>
                      <CheckBoxOutlineBlank/>
                      <span>{product.name}</span>
                      <Link to={`/modifyproduct/${product.id}`}><Edit/></Link>
                      <Delete id={product.id} onClick={(e) => handleDelete(e)}/>
                    </div>
              )
          })}
      </div>
    </div>
  );
}
{/* <a id={product.id} onClick={(e) => handleDelete(e)}><Delete/></a> */}