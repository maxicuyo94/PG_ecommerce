import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalProducts, deleteProduct, getCategories, allUsers } from "../../Redux/Actions/actions.js";
import style from "./controlpanel.module.scss";
import { Edit, Delete, CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import { Link } from "react-router-dom";


export function ControlPanel() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allproducts);
  const categories = useSelector((state) => state.categories);
  const users = useSelector((state) => state.allusers);


  useEffect(() => {
    dispatch(totalProducts());
    dispatch(getCategories());
  }, [products.length]);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id))
    await dispatch(totalProducts());
  }

const [checkbox, setCheckbox] = useState(false);
const checkPress = (id) => {
  if (checkbox === false) {
    setCheckbox(true)
  } else setCheckbox (false)
}

const [tab, setTab] = useState('products');
const handleTab = (e) => {
  setTab(e.target.name)
}
  
  return (
    <div class={style.container}>
      <h2>Control Panel</h2>
      <div class={style.barButtons}>
      <button name='products' onClick={(e) => handleTab(e)}>Products</button>
      <button name='orders' onClick={(e) => handleTab(e)}>Orders</button>
      <button name='purchasehistory' onClick={(e) => handleTab(e)}>Purchase History</button>
      <button name='categories' onClick={(e) => handleTab(e)}>Categories</button>
      <button name='users' onClick={(e) => handleTab(e)}>Users</button>
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
          {tab === 'products' ? products.map((product) => {
              return (
                    <div class={style.list}>
                      {checkbox ? <CheckBox id={product.id} class={style.icon} onClick={() => checkPress(product.id)}/> : <CheckBoxOutlineBlank id={product.id} class={style.icon} onClick={() => checkPress(product.id)}/>}
                      <span class={style.name}>{product.name}</span>
                      <Link to={`/modifyproduct/${product.id}`}><Edit class={style.icon}/></Link>
                      <Delete class={style.icon} id={product.id} 
                      onClick={() => handleDelete(product.id)}/>
                    </div>
              )
          }) : null}
            {tab === 'orders' ? products.map((order) => {
              return (
                    <div class={style.list}>
                      <span>Aca se tienen que renderizar las ordenes</span>
                      {checkbox ? <CheckBox id={order.id} class={style.icon} onClick={() => checkPress(order.id)}/> : <CheckBoxOutlineBlank id={order.id} class={style.icon} onClick={() => checkPress(order.id)}/>}
                    </div>
              )
          }) : null}
          {tab === 'categories' ? categories.map((category) => {
              return (
                    <div class={style.list}>
                      <span>{category.name}</span>
                      {checkbox ? <CheckBox id={category.id} class={style.icon} onClick={() => checkPress(category.id)}/> : <CheckBoxOutlineBlank id={category.id} class={style.icon} onClick={() => checkPress(category.id)}/>}
                    </div>
              )
          }) : null}
          {tab === 'users' ? products.map((user) => {
              return (
                    <div class={style.list}>
                      <span>Aca se tienen que renderizar los users</span>
                      {checkbox ? <CheckBox id={user.id} class={style.icon} onClick={() => checkPress(user.id)}/> : <CheckBoxOutlineBlank id={user.id} class={style.icon} onClick={() => checkPress(user.id)}/>}
                    </div>
              )
          }) : null}
      </div>
      </div>
    </div>
  );
}
