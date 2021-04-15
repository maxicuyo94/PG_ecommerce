import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styles from './MiniShop.module.scss'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        backgroundColor: 'white',
        borderRadius: '10px',
        width: '20vw',
        height: '30vh',
        //overflowY: 'scroll'
    },
    list: {
        height:'100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
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
        background: 'white',

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    let cont = 0;
    const props = [
        {
            id: 'fe637bc5-0954-4988-a47f-41eaad12af99',
            name: '[AMD] Ryzen 3',
            price: 200,
            image: 'https://i.ebayimg.com/images/g/9koAAOSwh-RfwWxB/s-l500.jpg'
        },
        {
            name: 'Lenovo IdeaPad 3 15ADA05 15.6',
            price: 200,
            image: 'https://i.ebayimg.com/images/g/9koAAOSwh-RfwWxB/s-l500.jpg'
        },
        {
            name: 'Lenovo IdeaPad 3 15ADA05 15.6',
            price: 200,
            image: 'https://i.ebayimg.com/images/g/9koAAOSwh-RfwWxB/s-l500.jpg'
        },
        {
            name: 'Lenovo IdeaPad 3 15ADA05 15.6',
            price: 200,
            image: 'https://i.ebayimg.com/images/g/9koAAOSwh-RfwWxB/s-l500.jpg'
        },
        {
            name: 'Pantalla',
            price: 200,
            image: 'https://i.ebayimg.com/images/g/9koAAOSwh-RfwWxB/s-l500.jpg'
        },
        {
            name: 'Pantalla',
            price: 200,
            image: 'https://i.ebayimg.com/images/g/9koAAOSwh-RfwWxB/s-l500.jpg'
        }
    ]
    const shop = useSelector(state => state.productByCategories)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                {shop[2]?.data.length}
            </StyledButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className={styles.products}>
                    {
                        shop[2] && shop[2].data.map((item) => {
                            console.log('Item: ', item)
                            cont += item.price;
                            return (
                                <div className={styles.container}>
                                    <div className={styles.cant}>
                                        <span>1 X</span>
                                        {item.images && <img src={item.images[0]} />}
                                    </div>
                                    <div className={styles.title}>

                                        <NavLink to={`/product/${item.id}`}>
                                            <span>{item.name?.split(" ").slice(0, 4).join(" ")}</span>
                                        </NavLink>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <span>US${cont.toFixed(2)}</span>
                <StyledGo>
                    <NavLink to={'/addproduct'}>
                        <span>Go to Checkout</span>

                    </NavLink>
                </StyledGo>
            </StyledMenu>
        </div>
    );
}