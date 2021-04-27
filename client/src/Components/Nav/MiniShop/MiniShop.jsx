import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Container from '@material-ui/core/Container';
//import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styles from './MiniShop.module.scss'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MiniCard from './MiniCard'
import { clearCart } from '../../../Redux/Cart/cartActions';
import swal from "sweetalert";
import { useHistory } from "react-router";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: '#9abf15',
        borderRadius: '10px',
        width: '30vw',
        height: '35vh',
        //overflowY: 'scroll'
    },
    list: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }

})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
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
const StyledGo = withStyles({
    root: {
        background: '#9abf15',
        borderRadius: 30,
        border: 0,
        color: 'white',
        padding: 10,
        height: 30,
        width: '60%',
        margin: 'auto',
        fontSize: '1rem',
        fontWeight: 'bolder',
        '&:hover': {
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #000'
        }

    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

export default function CustomizedMenus() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    //const [cont, setCont] = React.useState(null);
    let cont = 0;

    const cart = useSelector(state => state.cartReducer.cart)


    // const shop = useSelector(state => state.productByCategories)

    const handleClick = (event) => {
        cart.length && setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    return (
        <div>
            <StyledButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                <ShoppingCartIcon />
                {cart && cart.length}
            </StyledButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={styles.container}
            >
                    <div className={styles.products}>
                        {
                            cart && cart.map((item) => {
                                cont += item.quantity * item.price;
                                return (
                                    <MiniCard product={item} />
                                )
                            })
                        }
                    </div>
                    <span>US${cont.toFixed(2)}</span>
                    <button onClick={() => handleClearCart()} children="Clear"/>
    
                    <StyledGo>
                        <NavLink to={'/order'}>
                            <span>Checkout</span>
                        </NavLink>
                    </StyledGo>
            </StyledMenu>
        </div>
    );
}