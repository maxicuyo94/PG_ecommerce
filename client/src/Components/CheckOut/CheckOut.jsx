import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import style from "./checkout.module.scss";
import { ItemCart } from "./ItemCart";
import { clearCart } from "../../Redux/Cart/cartActions";
import swal from "sweetalert";
import { useHistory } from "react-router";

export function CheckOut() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const history = useHistory();
  const [total, setTotal] = useState(0.0);
  const [subtotal, setSubtotal] = useState(0.0);
  // eslint-disable-next-line
  const [coupon, setCoupon] = useState(0);

  useEffect(() => {
    if (cart) {
      setSubtotal(
        cart.reduce((acc, product) => {
          acc = acc + product.price * product.quantity;
          return acc;
        }, 0.0)
      );
    }
  }, [cart]);

  useEffect(() => {
    setTotal((subtotal - subtotal * (coupon / 100)).toFixed(2));
  }, [subtotal, coupon]);

  // const handleClick = () => {
  //     // dispatch(setDiscount(coupon));
  //     history.push('/order/payment');
  // }

  const handleClearCart = () => {
    swal("Are you sure you want to CLEAR your cart?", {
      dangerMode: true,
      buttons: true,
    }).then(resp => {
      if(resp) {
        dispatch(clearCart())
        history.push("/");
      }
    })
  };

  const handleCheckOut = () => {
    if(localStorage.getItem("supabase.auth.token")) {
      swal("Proceed to payment", "", "success")
        .then(resp => {
          if(resp){
            history.push("/order/payment");
          }
        })
    } else {
      // swal("Proceed to payment", "", "success")
      //   .then(resp => {
      //     if(resp){
      //       history.push("/order/payment");
      //     }
      //   })
      //------------------------------------------------//  
      swal("UPS! You must be logged to checkout!",{
        buttons: {
          button: "Go to Checkout",
          roll: {
            text: "Sign In!",
            value: "signIn",
          },
        },
      }).then(resp => 
        { 
        if(resp === "signIn") {
          history.push("/access");
        } else {
          history.push("/order/payment")
        }
      })
      //------------------------------------------------//  
    }
    
  };

  return (
    <div>
      <script
        src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
        data-preference-id="<%= global.id %>"
      ></script>
      <div>
        <Grid container direction="column" className={style.orderList}>
          <Typography variant="h6">Order Details</Typography>
          <List>
            {cart &&
              cart.map((product) => {
                return <ItemCart product={product} />;
              })}
          </List>
          <ListItem>
            <ListItemText>{`Total: ${total}`}</ListItemText>
          </ListItem>
          <Button
            variant="contained"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
          <Button variant="contained" onClick={handleClearCart}>
            Clear cart
          </Button>
        </Grid>
      </div>
      {/* <div className="">

            </div> */}
    </div>
  );
}
