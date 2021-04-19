import React from 'react'
import { useDispatch } from 'react-redux';
import style from "./checkout.module.scss";



import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Icon from '@material-ui/core/Icon';
import { addItemCart, deleteItemCart } from '../../Redux/Cart/cartActions';
import { Link } from 'react-router-dom';



export function ItemCart({ product }) {

    const dispatch = useDispatch()

    const handleQuantityChange = (amount) => {
        const newValue = product.quantity + amount;
        if (newValue <= product.stock && newValue >= 1 && newValue <= 10) {
            // let productToDispatch = { ...product };
            let productToDispatch = {
                id: product.id,
                image: product.image,
                quantity: amount,
            };

            productToDispatch.quantity = amount;
            dispatch(addItemCart(productToDispatch));
            // let payload = {
            //     id: product.id,
            //     quantity: amount,
            //     stock: product.stock
            // };
            // dispatch(editStock(payload));
        }
    }

    const handleDeleteItem = () => {
        dispatch(deleteItemCart(product))
    }


    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar variant="square" alt="product-avatar" src={`${product.image}`} />
                </ListItemAvatar>
                <Link to={`product/${product.id}`}>
                    <ListItemText
                        primary={product.title}
                        secondary={product.stock > 0 ? `In Stock` : `NO Stock`}
                    />
                </Link>

                {product.quantity > 1 && <button onClick={() => handleQuantityChange(-1)}>
                    <Icon> - </Icon>
                </button>}
                <h6 style={{ margin: "1rem" }}>{product.quantity}</h6>
                {product.quantity < 10 && product.quantity < product.stock && <button onClick={() => handleQuantityChange(+1)}>
                    <Icon> + </Icon>
                </button>}


                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" >
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
    )
}
