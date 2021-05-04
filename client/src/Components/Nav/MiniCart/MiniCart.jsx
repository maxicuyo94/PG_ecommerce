import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import MiniCard from '../MiniShop/MiniCard';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, makeStyles, ThemeProvider, Typography, useTheme } from '@material-ui/core';
import { useHistory } from 'react-router';
import swal from "sweetalert";
import { clearCart } from '../../../Redux/Cart/cartActions';



const useStyles = makeStyles((theme) => ({
    // miniCart: {
    //   width: 'auto',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   flexWrap: 'wrap',
    //   padding: '1rem'
    // },
    miniCart: {
      width: '40vw',
      display: 'flex',
      padding: '1rem',
      margin: '1rem'
    },
    checkout: {
      display: 'flex',
      alignItems: 'center',
      padding: '.5rem',
    },
    totalAmount: {
      alignItems: 'center',
      flexDirection: 'column',
      paddingRight: '1rem',
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        padding: theme.spacing(3),
      },
    },
    buttons: {
      width: '50vw',
      margin: '.5rem',
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        width: '20vw',
      },
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    clearButton: {
        width: '18vw',
        fontSize: '.rem'
    },
  }));

export default function SimpleMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    let cont = 0;
    const theme = useTheme();
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
      }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                CART
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.miniCart}
            >
                {
                    cart && cart.map((item) => {
                        cont += item.quantity * item.price;
                        return (
                            <MiniCard product={item} />
                        )
                    })
                }
                <div className={classes.checkout}>

                <ListItem className={classes.totalAmount}>
                  <Typography style={{fontSize: '1.2rem'}}>{`Total: us$ ${total}`}</Typography>
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
                  className={classes.clearButton}
                  color="secondary"
                  variant="contained"
                  onClick={handleClearCart}>
                  Clear cart
                </Button>

     

              </div>
            </Menu>
        </ThemeProvider>
    );
}
