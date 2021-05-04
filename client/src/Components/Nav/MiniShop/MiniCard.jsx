//1
import React from "react";
import { useDispatch } from "react-redux";
//import style from "./checkout.module.scss";
import { makeStyles } from '@material-ui/core/styles';

import { useRef } from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
//import Icon from "@material-ui/core/Icon";

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import { List, ThemeProvider } from "@material-ui/core";
import swal from "sweetalert";
import { useTheme } from '@material-ui/core/styles';
import { addItemCart, deleteItemCart } from "../../../Redux/Cart/cartActions";



const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    // justifyContent: 'space-around',
    alignItems: "center",
    flexWrap: 'wrap',
    // border: '3px solid red',
    padding: '.5rem',
    margin: '0',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '2rem',
  },
  quantity: {
    // border: '2px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  unity: {
    padding: '1rem'
  },
}));

export default function MiniCard({ product }) {
  console.log(product)
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  let btnRefDELETE = useRef();
  let btnRefADD = useRef();


  const handleQuantityChange = async (amount) => {
    const newValue = product.quantity + amount;
    if (newValue <= product.stock && newValue >= 1) {
      let productToDispatch = {
        id: product.id,
        image: product.image,
        quantity: amount,
        stock: product.stock,
      };
      dispatch(addItemCart(productToDispatch))
      if (amount > 0) {
        btnRefADD.current.setAttribute("disabled", "disabled");
        setTimeout(() => {
          if (btnRefADD.current) btnRefADD.current.removeAttribute("disabled");
        }, 1000);
      } else {
        btnRefDELETE.current.setAttribute("disabled", "disabled");
        setTimeout(() => {
          if (btnRefDELETE.current) btnRefDELETE.current.removeAttribute("disabled");
        }, 1000);
      }
    }
  };

  const handleDeleteItem = () => {
    swal("Delete item?", {
      dangerMode: true,
      buttons: true,
    }).then(resp => {
      if (resp) {
        dispatch(deleteItemCart(product));
      }
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <List className={classes.item}>
        <div className={classes.title}>
          <ListItemAvatar>
            <Avatar
              alt="product-avatar"
              src={product.image && product.image}
            />
          </ListItemAvatar>
          <Link to={`product/${product.id}`}>
            <ListItemText
              primary={product.title.slice(0, 20) + '...'}
            />
          </Link>
        </div>

        <div className={classes.quantity}>
          <Button color="secondary" aria-label="remove" ref={btnRefDELETE} onClick={() => handleQuantityChange(-1)}>
            {/* <button ref={btnRefDELETE} onClick={() => handleQuantityChange(-1)}> */}
            <RemoveIcon />
            {/* </button> */}
          </Button>

          <ListItemText className={classes.unity}>{product.quantity}</ListItemText>

          
            <Button color="primary" aria-label="add" ref={btnRefADD} onClick={() => handleQuantityChange(+1)}>
              {/* <button ref={btnRefADD} onClick={() => handleQuantityChange(+1)}> */}
              <AddIcon />
              {/* </button> */}
            </Button>
          


          <Button edge="end" aria-label="delete" onClick={() => handleDeleteItem(product.id)}>
            {/* <button onClick={() => handleDeleteItem(product.id)}> */}
            <DeleteIcon />
            {/* </button> */}
          </Button>
        </div>

      </List>
      
    </ThemeProvider>
  );
}
