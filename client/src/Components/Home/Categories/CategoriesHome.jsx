import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./CategoriesHome.module.scss";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import StarIcon from '@material-ui/icons/Star';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert';
import { addItemCart } from '../../../Redux/Cart/cartActions';
import { useState } from "react";
import notFound from './altimage.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper'
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"

SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade])
export const CategoriesHome = (props) => {
  const dispatch = useDispatch();
  const [fav, setFav] = useState(false)
  const [cart, setCart] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const handleFav = () => {
    setFav(!fav)
  }
  const dark = useSelector((state) => state.darkReducer.dark)
  const average = Math.ceil(props.reviews.reduce((counter, obj) => obj.rating + counter, 0) / props.reviews.length)
  const handleAddToCart = (item) => {
    let cartItemModel = {
      title: item.title,
      image: item.image,
      id: item.id,
      quantity: 1,
      price: (item.price * (1 - item.discount / 100)).toFixed(2),
      stock: item.stock,
      // discount: item.discount
    }
    dispatch(addItemCart(cartItemModel))
    swal("Done!", "Added to cart", "success");
  }
  return (
    <div className={dark ? styles.containerDark : styles.container}>

      <div className={styles.stock}>
        <div className={styles.icon}>
          {props.discount > 0 ?
            <>
              <WhatshotOutlinedIcon style={{ fontSize: '1rem' }} />
              <span> {props.discount}% off! </span>
              <WhatshotOutlinedIcon style={{ fontSize: '1rem' }} />
            </> :
            <>
              <CheckCircleIcon style={{ fontSize: '1rem' }} />
              <span>in stock</span>
            </>
          }
        </div>
        <button className={styles.fav} onClick={handleFav}>
          {fav ? <FavoriteIcon style={{ fontSize: '1.5rem' }} /> : <FavoriteBorderIcon style={{ fontSize: '1.5rem' }} />}
        </button>
      </div>

      <div className={styles.image} >
        <img src={props.image[0]?.url || notFound} alt='' />

        {/* <Swiper
          navigation={false}
          pagination={false}
          autoHeight={false}
          loop={true}
          //effect={'fade'}
          autoplay={{ "delay": 2500, "disableOnInteraction": false }}
          grabCursor={true}

        >
          {
            props.image.map((img, i) => {
              console.log('Url: ', i, img.url)
              return (
                <SwiperSlide key={i} >
                  <img src={img.url || notFound} alt='' />
                </SwiperSlide>
              );
            })
          }
        </Swiper> */}

      </div>


      <NavLink className={styles.title} to={`/product/${props.id}`}>
        <p>{props.title}</p>
      </NavLink>
      <div className={styles.review}>
        {/* {props.reviews.length > 0 ?
          Math.ceil(props.reviews.reduce((counter, obj) => obj.rating + counter, 0) / props.reviews.length)
          : false} */}
        {props.reviews.length > 0 ?
          <>
            <span>
              {[...Array(average)].map(() => {
                return <StarIcon style={{ fontSize: '1rem' }} />
              })}
              {[...Array(5 - average)].map(() => {
                return <StarBorderIcon style={{ fontSize: '1rem' }} />
              })}
            </span>
            <span>
              ({props.reviews.length})
          </span>
          </>
          : <span>No reviews yet</span>
        }
      </div>
      <div className={styles.prices}>
        {props.discount > 0 &&
          <div className={styles.offer}>
            <span>US$<b>{props.price}</b></span>
          </div>
        }
        <div className={styles.price}>
          <span>US$<b>{(props.price * (1 - props.discount / 100)).toFixed(2)}</b></span>
        </div>
      </div>

      {cart ?
        <button className={styles.btnOff}
          onClick={() => {
            cart && handleAddToCart(props);
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {
            isShown ? <>
              <span> Add one more?</span>
              <AddShoppingCartIcon style={{ fontSize: '1.5rem' }} />
            </>
              :
              <>
                <span> Added!</span>
                <CheckCircleIcon style={{ fontSize: '1.25rem' }} />
              </>
          }
        </button>
        :
        <button className={styles.btnOn}
          onClick={() => {
            !cart && handleAddToCart(props);
            setCart(true);
            setTimeout(() => { setCart(false) }, 3000)
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <>
            {
              isShown ?
                <span> Add to Cart?</span>
                :
                <span> Add to Cart!</span>
            }
            <AddShoppingCartIcon style={{ fontSize: '1.5rem', margin: '0 0.25rem' }} />
          </>
        </button>
      }
    </div>
  );
}
