import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalProducts, deleteProduct } from "../../Redux/Actions/actions.js";
import style from "./controlpanel.module.scss";
import { Edit, Delete, CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import { Link } from "react-router-dom";


export function ControlPanel() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allproducts);
  useEffect(() => {
    dispatch(totalProducts());
  }, [products.length]);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id))
    await dispatch(totalProducts());
  }

const [checkbox, setCheckbox] = useState([])
console.log(checkbox)
const checkPress = (id) => {
  for(let i=0; i <= checkbox.length; i++) {
    if(checkbox[i] === id) {
      return setCheckbox(...checkbox, checkbox.pop(id))
   } else return setCheckbox(...checkbox, checkbox.push(id))
  }
}
  
  
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
                      {checkbox.includes(product.id) ? <CheckBox id={product.id} onClick={() => checkPress(product.id)} class={style.icon}/> : 
                      <CheckBoxOutlineBlank id={product.id} onClick={() => checkPress(product.id)} class={style.icon}/>}
                      
                      <span class={style.name}>{product.name}</span>
                      <Link to={`/modifyproduct/${product.id}`}><Edit class={style.icon}/></Link>
                      <Delete class={style.icon} id={product.id} 
                      onClick={() => handleDelete(product.id)}/>
                    </div>
              )
          })}
      </div>
      </div>
    </div>
  );
}
{/* <a id={product.id} onClick={(e) => handleDelete(e)}><Delete/></a> */}