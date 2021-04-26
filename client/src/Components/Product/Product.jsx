import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetail,
  getProductsByCategories,
} from "../../Redux/Products/productActions";
import styles from "./Product.module.scss";
import swal from "sweetalert";
import { addItemCart } from "../../Redux/Cart/cartActions";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
//import Slider from "./Slider/Slider";
import Thumbs from "./Thumbs/Thumbs";
import { getReviewsOfProduct } from "../../Redux/Reviews/reviewsActions";
import SwiperSlider from '../Home/Swiper/SwiperSlider'
//import StarBorderIcon from '@material-ui/icons/StarBorder';
//import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import { useLocalStorage } from  '../../LocalStorage/useLocalStorage'
import { deleteReview } from "../../Redux/Reviews/reviewsActions";
import { Link } from "react-router-dom";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const random = Math.round(Math.random() * 2);


export const Product = (props) => {
  const dispatch = useDispatch();
  //const state = useSelector((state) => state);
  //const { currentProduct, currentReviewsOfProduct } = state;
  //const [maxReviews, setMaxReviews] = useState(5);

  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const details = useSelector((state) => state.productReducer.productDetail);
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );

  const [deleting, setDeleting] = useState(null)

  const id = props.id;
  const [value, setValue] = useState(1);
  const [nav, setNav] = useState("details");

  const handleSum = () => {
    value < details.stock && value < 10 && setValue(value + 1);
  };
  const handleRes = () => {
    value > 1 && setValue(value - 1);
  };

  const [userLog] = useLocalStorage("supabase.auth.token")
  const userId = userLog.currentSession.user.id

  useEffect(() => {

    const renderReviews = async () => {
      await dispatch(getReviewsOfProduct(id));
    };
    renderReviews();
    const idDetails = async () => {
      await dispatch(productDetail(id));
    };
    idDetails();
    const Products = async () => {
      await dispatch(getProductsByCategories());
    };
    renderReviews();
    Products();
    return () => {
      setNav("details");
    };
    // eslint-disable-next-line
  }, [id]);

  const handleAddToCart = (details) => {
    //console.log('add to cart')
    let cartItemModel = {
      title: details.name,
      image: details.images[0].url,
      id: details.id,
      quantity: value,
      price: details.price,
      stock: details.stock,
    };
    dispatch(addItemCart(cartItemModel));
    setValue(1);
    swal("Done!", "Added to cart", "success");
  };

  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <ul className={styles.nav}>
        <li
          onClick={() => {
            setNav("about");
          }}
        >
          About Product
        </li>
        <li
          onClick={() => {
            setNav("details");
          }}
        >
          Details
        </li>
        <li
          onClick={() => {
            setNav("category");
          }}
        >
          Categories
        </li>
      </ul>
      <div className={styles.main}>
        <div className={styles.details}>
          <div className={styles.info}>
            <div className={styles.name}>
              <span>{details.name?.split(" ").slice(0, 3).join(" ")}</span>
            </div>
            <div className={styles.desc}>
              <ul className={styles.values}>
                {nav === "details" &&
                  details.description &&
                  Object.entries(details.description).map(([key, value]) => {
                    return (
                      <li key={key}>
                        <p>
                          <b>{key.split(/(?=[A-Z])/).join(" ")}</b>:{" "}
                          {value.toString()}
                        </p>
                      </li>
                    );
                  })}
                {nav === "category" &&
                  details.categories &&
                  details.categories.map((category) => {
                    return (
                      <li key={category.id}>
                        <b>{category.name}</b>
                      </li>
                    );
                  })}
                {nav === "about" && details.name && (
                  <li>
                    {details.name
                      ?.split(" ")
                      .slice(3, details.name.length)
                      .join(" ")}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.images}>
          <div className={styles.carousel}>
            <Thumbs images={details.images} />
          </div>
          <div className={styles.buy}>
            <label>
              On sale from <b>${(details.price * value).toFixed(2)}</b>
            </label>
            <div className={styles.cont}>
              <input type="text" value={value} disabled />
              <div className={styles.change}>
                <button className={styles.add} onClick={handleSum}>+</button>
                <button className={styles.add} onClick={handleRes}>-</button>
              </div>
            </div>
            {details.stock > 0 ? (
              <button
                className={styles.addCart}
                onClick={() => {
                  handleAddToCart(details);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className={styles.addCart}
                onClick={() => {
                  swal("Sorry!", "Come back in a few days", "error");
                }}
              >
                Sold out
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.review}>
        <div className={styles.reviewTitle}>
          <span> Reviews</span>
        </div>

        {reviews.length > 0 ?
          <div className={styles.reviews}>
            {reviews.map((review) => {
              return <>
                <span>Description: {review.description}</span>
                <span>User: {review.user_id}</span>
                <span>
                  Rating:
                        {Array.from(Array(review.rating).keys()).map(() => {
                  return <StarIcon style={{ fontSize: '1rem' }} />
                })}
                </span>
                <hr />
              </>
            })
            }
          </div> :
          <div className={styles.notReviews}>
            <span>
              This product has no reviews yet
            </span>
            <hr />
          </div>
        }

      </div>
      <div className={styles.related}>
        <div className={styles.more}>
          <span>MORE PRODUCTS</span>
        </div>
        <div className={styles.slider}>
          {productByCategories[random] && (
            <SwiperSlider products={productByCategories[random].data} />
          )}
        </div>
      </div>
    </div>
  );
};
