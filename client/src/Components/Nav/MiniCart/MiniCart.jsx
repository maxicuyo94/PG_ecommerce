import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import MiniCard from '../MiniShop/MiniCard';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Divider, ListItem, makeStyles, ThemeProvider, Typography, useTheme, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import swal from "sweetalert";
import { clearCart } from '../../../Redux/Cart/cartActions';

const StyledButton = withStyles({
  root: {
    background: '#9abf15',

    border: 0,
    color: 'black',
    height: 30,
    width: 20,
    padding: 10,
    '&:hover': {
      backgroundColor: '#9abf15',
      boxShadow: 'none',
    }
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  // miniCart: {
  //   width: 'auto',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexWrap: 'wrap',
  //   padding: '1rem'
  // },
  miniCart: {
    display: 'flex',
    padding: '1rem',
    margin: '1rem'
  },
  checkout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '.5rem',
  },
  totalAmount: {
    justifyContent: 'space-between',
    padding: '1rem',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3),
    },
  },
  buttons: {
    margin: '.5rem',
    width: '10vw',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  clearButton: {
    width: '10vw',
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
            history.push("/order/");
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
          history.push("/order/")
        }
      })
    }
  };

  const handleClick = (event) => {
    if(cart.length === 0) return
    let intViewportWidth = window.innerWidth;
    if( intViewportWidth > 720 ) {
      setAnchorEl(event.currentTarget);
    } else {
      history.push('/order')
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
        {/* {cart && cart.length} */}
      </StyledButton>
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
              <>
                <MiniCard product={item} />
                <Divider />
              </>
            )
          })
        }
        <div className={classes.checkout} >
          <ListItem className={classes.totalAmount} >
            <Typography variant='h5'>{`Total: `}</Typography>
            <Typography variant='h5'>{`us$ ${total}`}</Typography>
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
            variant="outlined"
            onClick={handleClearCart}>
            Clear cart
                </Button>
        </div>
      </Menu>
    </ThemeProvider>
  );
}
