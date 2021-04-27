import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./CategoriesHome.module.scss";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//import WhatshotIcon from '@material-ui/icons/Whatshot';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
//import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import StarIcon from '@material-ui/icons/Star';
//import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { addItemCart } from '../../../Redux/Cart/cartActions';
import { useState } from "react";
import notFound from './altimage.png'
import { getReviewsOfProduct } from '../../../Redux/Reviews/reviewsActions'
export const CategoriesHome = (props) => {
  const dispatch = useDispatch();
  const [fav, setFav] = useState(false)
  const [cart, setCart] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const handleFav = () => {
    setFav(!fav)
  }
  //const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const dark = useSelector((state) => state.darkReducer.dark)
  const average = Math.ceil(props.reviews.reduce((counter, obj) => obj.rating + counter, 0) / props.reviews.length)
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
  useEffect(() => {
    const renderReviews = async () => {
      await dispatch(getReviewsOfProduct(props.id));
    };
    renderReviews();
  }, [])
  return (
    <div className={dark ? styles.containerDark : styles.container}>
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
            <img src={props.images || notFound} alt='.' />
          </NavLink>
        </div>
        <NavLink className={styles.title} to={`/product/${props.id}`}>
          <p>{props.title}</p>
        </NavLink>
        <div className={styles.review}>
          {props.reviews.length > 0 ?
            Math.ceil(props.reviews.reduce((counter, obj) => obj.rating + counter, 0) / props.reviews.length)
            : false}
          {props.reviews.length > 0 ?
            <span>
              {[...Array(average)].map(() => {
                return <StarIcon style={{ fontSize: '1rem' }} />
              })} ({props.reviews.length})
            </span>
            : <span>No reviews yet</span>
          }
        </div>


        <div className={styles.offer}>
          <span>US$<b>{(props.price * 1.1).toFixed(2)}</b></span>
        </div>
        <div className={styles.price}>
          <span>US$<b>{props.price}</b></span>
        </div>

        {cart ?
          <button className={styles.btnOff}
            onClick={() => { cart && handleAddToCart(props) }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <><AddShoppingCartIcon style={{ fontSize: '1.5rem' }} />
              {
                isShown ?
                  <span> Add one more?</span>
                  :
                  <span> In the Cart!</span>
              }
            </>
          </button>
          :
          <button className={styles.btnOn}
            onClick={() => { !cart && handleAddToCart(props); setCart(true) }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <><AddShoppingCartIcon style={{ fontSize: '1.5rem' }} />
              {
                isShown ?
                  <span> Add to Cart?</span>
                  :
                  <span> Add to Cart!</span>
              }
            </>
          </button>
        }
      </div>
    </div>
  );
}
