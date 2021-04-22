import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CategoriesHome.module.scss";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch } from "react-redux";
import swal from 'sweetalert';
import { addItemCart } from '../../../Redux/Cart/cartActions';
import { useState } from "react";
export const CategoriesHome = (props) => {
  const dispatch = useDispatch();
  const [fav, setFav] = useState(false)
  const handleFav = () => {
    setFav(!fav)
  }
  const handleAddToCart = (item) => {
    let cartItemModel = {
      title: item.title,
      image: item.images,
      id: item.id,
      quantity: 1,
      price: item.price,
      stock: item.stock
    }
    // console.log('Images', cartItemModel.images)
    dispatch(addItemCart(cartItemModel))
    swal("Done!", "Added to cart", "success");
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.stock}>
          <div className={styles.icon}>
            <CheckCircleIcon style={{ fontSize: '1rem' }} />
            <span>
              in stock
          </span>
          </div>
          <button className={styles.fav} onClick={handleFav}>
            {fav ? <FavoriteIcon style={{ fontSize: '1.5rem' }} /> : <FavoriteBorderIcon style={{ fontSize: '1.5rem' }} />}
          </button>
        </div>

        <div className={styles.image} >
          <NavLink to={`/product/${props.id}`}>
            <img src={props.images} alt='.' />
          </NavLink>
        </div>
        <div className={styles.review}>
          <span>
            <StarIcon style={{ fontSize: '1rem' }} />
            <StarIcon style={{ fontSize: '1rem' }} />
            <StarIcon style={{ fontSize: '1rem' }} />
            <StarIcon style={{ fontSize: '1rem' }} />
            <StarHalfIcon style={{ fontSize: '1rem' }} />
          </span>
          <NavLink to={`/product/${props.id}`}>
            Reviews(5)
          </NavLink>
        </div>

        <NavLink className={styles.title} to={`/product/${props.id}`}>
          <span>{props.title}</span>
        </NavLink>

        <div className={styles.offer}>
          <span>US$<b>{(props.price * 1.1).toFixed(2)}</b></span>
        </div>
        <div className={styles.price}>
          <span>US$<b>{props.price}</b></span>
        </div>

        {props.stock > 0 ?
          <button className={styles.btnOn}
            onClick={() => { handleAddToCart(props) }} >
            <AddShoppingCartIcon style={{ fontSize: '1.5rem' }} /><span> Add to Cart!</span>
          </button>
          :
          <button className={styles.btnOff}
            onClick={() => { swal("Sorry!", "Come back in a few days", "error"); }} >
            <span> Sold Out! </span> <RemoveShoppingCartIcon style={{ fontSize: '1rem' }} />
          </button>
        }
      </div>
    </div>
  );
}
