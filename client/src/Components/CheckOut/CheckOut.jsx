//2

import React, { useEffect, useState } from "react";
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import style from "./checkout.module.scss";
import { ItemCart } from "./ItemCart";
import { clearCart } from "../../Redux/Cart/cartActions";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { Divider } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem'
  },
  paper: {
    width: '80vw',
    display: 'flex',
    padding: '2rem',
  },
  checkout: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  total: {
    fontSize: '3rem',
    alignItems: 'flex-end',
    flexDirection: 'column',
    paddingRight: '4rem'
  },
  buttons: {
    width: '15rem',
    margin: '.5rem'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
}));

export function CheckOut() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const history = useHistory();
  const [total, setTotal] = useState(0.0);
  const [subtotal, setSubtotal] = useState(0.0);
  const [coupon, setCoupon] = useState(0);

  useEffect(() => {
    if (cart) {
      let amount = cart.reduce((acc, product) => {
        acc = acc + product.price * product.quantity;
        return acc;
      }, 0.0)
      setSubtotal(
        amount
      );
      localStorage.setItem("amountTotal", JSON.stringify(amount))
    }
  }, [cart]);

  useEffect(() => {
    setTotal((subtotal - subtotal * (coupon / 100)).toFixed(2));
  }, [subtotal, coupon]);

  const handleClearCart = () => {
    swal("Are you sure you want to CLEAR your cart?", {
      dangerMode: true,
      buttons: true,
    }).then(resp => {
      if (resp) {
        dispatch(clearCart())
        history.push("/");
      }
    })
  };

  const handleCheckOut = () => {
    if (localStorage.getItem("supabase.auth.token")) {
      swal("Proceed to payment", "", "success")
        .then(resp => {
          if (resp) {
            history.push("/order/payment");
          }
        })
    } else {
      swal("Do you want to login to go to checkout?", {
        buttons: {
          button: "Go to Checkout",
          roll: {
            text: "Sign In!",
            value: "signIn",
          },
        },
      }).then(resp => {
        if (resp === "signIn") {
          history.push("/access");
        } else {
          history.push("/order/payment")
        }
      })
      //------------------------------------------------//  
    }

  };

  return (
    <>
      <script
        src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
        data-preference-id="<%= global.id %>"
      ></script>
      {/* <CssBaseline /> */}
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={3}>


          <div>
            <Grid container direction="column" className={style.orderList}>
              <Typography variant="h6">Order Details</Typography>
              <List className={classes.list}>
                {cart &&
                  cart.map((product) => {
                    return (
                      <>
                        <ItemCart product={product} />
                        <Divider />
                      </>
                    );
                  })}
              </List>

              <div className={classes.checkout}>
                <ListItem className={classes.total}>
                  <Typography style={{fontSize: '2rem'}}>{`Total: ${total}`}</Typography>
                </ListItem>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="primary"
                  onClick={handleCheckOut}
                >
                  Check Out
              </Button>
                <Button
                  className={classes.buttons}
                  color="secondary"
                  variant="contained"
                  onClick={handleClearCart}>
                  Clear cart
              </Button>
              </div>

            </Grid>
          </div>

        </Paper>
      </main>
    </>
  );
}
