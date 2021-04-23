import React from "react";
import { useDispatch } from "react-redux";
//import style from "./checkout.module.scss";
import {useRef} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import { addItemCart, deleteItemCart } from "../../Redux/Cart/cartActions";
import { Link } from "react-router-dom";
import swal from "sweetalert";


export function ItemCart({ product }) {
  const dispatch = useDispatch();
  let btnRefDELETE = useRef();
  let btnRefADD = useRef();


  const handleQuantityChange = async (amount) => {
    const newValue = product.quantity + amount;
    if (newValue <= product.stock && newValue >= 1 && newValue <= 10) {
      // let productToDispatch = { ...product };
      let productToDispatch = {
        id: product.id,
        image: product.image,
        quantity: amount,
        stock: product.stock,

      };
      dispatch(addItemCart(productToDispatch))
      if(amount > 0) {
        btnRefADD.current.setAttribute("disabled", "disabled");
        setTimeout(() => {
          if(btnRefADD.current) btnRefADD.current.removeAttribute("disabled");
        }, 1000);
      } else {
        btnRefDELETE.current.setAttribute("disabled", "disabled");
        setTimeout(() => {
          if(btnRefDELETE.current) btnRefDELETE.current.removeAttribute("disabled");
        }, 1000);
      }
      
      // if(btnRef.current){
      //   btnRef.current.setAttribute("disabled", "disabled");
      // }
      // swal("Quantity modify!", "", "success")
    }
  };

  const handleDeleteItem = () => {
    swal("Delete item?", {
      dangerMode: true,
      buttons: true,
    }).then(resp => {
      if(resp) {
        dispatch(deleteItemCart(product));
        swal("Item deleted!", "", "success")
      }
    })
    
  };

  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            variant="square"
            alt="product-avatar"
            src={`${product.image}`}
          />
        </ListItemAvatar>
        <Link to={`product/${product.id}`}>
          <ListItemText
            primary={product.title}
            secondary={product.stock > 0 ? `In Stock` : `NO Stock`}
          />
        </Link>

        {product.quantity > 1 && (
          <button ref={btnRefDELETE} onClick={() => handleQuantityChange(-1)}>
            <Icon> - </Icon>
          </button>
        )}
        <h6 style={{ margin: "1rem" }}>{product.quantity}</h6>
        {product.quantity < 10 && product.quantity < product.stock && (
          <button ref={btnRefADD} onClick={() => handleQuantityChange(+1)}>
            <Icon> + </Icon>
          </button>
        )}

        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <button onClick={() => handleDeleteItem(product.id)}>
              <DeleteIcon />
            </button>
          </IconButton>
        </ListItemSecondaryAction>
        <ListItemText
          primary={`US$ ${(product.price * product.quantity).toFixed(2)}`}
          secondary={`US$ ${product.price.toFixed(2)}`}
        />
      </ListItem>
    </div>
  );
}
