import React, { useRef } from 'react';
import { useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar/Avatar';
// import Button from '@material-ui/core/Button';
// import DeleteIcon from '@material-ui/icons/Delete';
import swal from "sweetalert";
import { addItemCart, deleteItemCart } from '../../../Redux/Cart/cartActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex'
  },
  paper: {
    // padding: theme.spacing(2),
    // margin: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));




//Component 
export default function MiniCard({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch()


  // Handlers ----------------------------------------*
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
      if (amount > 0) {
        btnRefADD.current.setAttribute("disabled", "");
        setTimeout(() => {
          if (btnRefADD.current) btnRefADD.current.removeAttribute("disabled");
        }, 1000);
      } else {
        btnRefDELETE.current.setAttribute("disabled", "");
        setTimeout(() => {
          if (btnRefDELETE.current) btnRefDELETE.current.removeAttribute("disabled");
        }, 1000);
      }
    }
  };

  const handleDeleteItem = (product) => {
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar className={classes.img} src={product.image} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item>
                {/* <Typography gutterBottom variant="subtitle1">
                  {product.title}
                </Typography> */}
                <Typography variant="body2" gutterBottom>
                  {product.title.slice(0, 30)}...
                </Typography>
                <Grid item>
                  <Typography variant="subtitle1">$ {product.price}</Typography>
                </Grid>
              </Grid>
              <Grid item>
              <button onClick={() => handleQuantityChange(-1)} ref={btnRefDELETE} children='-' variant="contained" size="small" />
                {product.quantity}
                <button onClick={() => handleQuantityChange(1)} ref={btnRefADD} children='+' variant="contained" size="small" />

                <button onClick={() => handleDeleteItem(product)} children='Remove item'/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}