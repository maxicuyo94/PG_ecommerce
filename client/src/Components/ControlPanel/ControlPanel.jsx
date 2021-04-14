import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, deleteProduct } from "../../Redux/Actions/actions.js";
import style from "./controlpanel.module.scss";
import { Edit, Delete, CheckBoxOutlineBlank } from '@material-ui/icons';
import { Link } from "react-router-dom";


export function ControlPanel() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.wantedProducts);
  console.log('aca', products)
  useEffect(() => {
    dispatch(allProducts());
  }, []);

  
  return (
    <div class={style.container}>
      <h2>Control Panel</h2>
      <div class={style.barButtons}>
      <button>Products</button>
      <button>Orders</button>
      <button>Categories</button>
      <Link to='/addproduct'>
                <button>
                  Add Product
                </button>
              </Link>
      </div>
      <div class={style.containerList}>
      <div class={style.bar}>
        <h4><CheckBoxOutlineBlank/></h4>
        <h4 class={style.name}>Product</h4>
        <h4>Modify</h4>
        <h4>Delete</h4>
      </div>
      <div class={style.containerList}>
          {products.map((product) => {
              return (
                    <div class={style.list}>
                      <CheckBoxOutlineBlank class={style.icon}/>
                      <span class={style.name}>{product.name}</span>
                      <Link to={`/modifyproduct/${product.id}`}><Edit class={style.icon}/></Link>
                      <Delete class={style.icon} id={product.id}/>
                    </div>
              )
          })}
      </div>
      </div>
    </div>
  );
}
{/* <a id={product.id} onClick={(e) => handleDelete(e)}><Delete/></a> */}