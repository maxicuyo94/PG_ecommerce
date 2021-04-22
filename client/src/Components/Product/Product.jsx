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
import Slider from "./Slider/Slider";
import Thumbs from "./Thumbs/Thumbs";
import { Review } from "../Reviews/review";
import { deleteReview } from "../Reviews/deleteReview";
import { Rating } from "../Reviews/rating";
import { getReviewsOfProduct } from "../../Redux/Reviews/reviewsActions";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const random = Math.round(Math.random() * 2);
export const Product = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentProduct, currentReviewsOfProduct } = state;
  const [maxReviews, setMaxReviews] = useState(5);
  const details = useSelector((state) => state.productReducer.productDetail);
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );

  const renderReviews = () => dispatch(getReviewsOfProduct(id));

  const id = props.id;
  const [value, setValue] = useState(1);
  const [nav, setNav] = useState("details");
  /*    const [index, setIndex] = useState(1)
       const [slide, setSlide] = useState(1) */

  const handleSum = () => {
    value < details.stock && value < 10 && setValue(value + 1);
  };
  const handleRes = () => {
    value > 1 && setValue(value - 1);
  };
  useEffect(() => {
    const idDetails = async () => {
      await dispatch(productDetail(id));
    };
    idDetails();
    const Products = async () => {
      await dispatch(getProductsByCategories());
    };
    renderReviews();
    Products();
    /*  window.innerWidth < 601 ? setSlide(1) : setSlide(3) */
    return () => {
      setNav("details");
    };
    // eslint-disable-next-line
  }, [id]);

  const ratingReviews = () => {
    let number =
      currentReviewsOfProduct.reduce(function (previous, current) {
        return parseInt(current.rating) + previous;
      }, 0) / currentReviewsOfProduct.length;
    return number;
  };

  /* const filterReview = () => {
    return currentReviewsOfProduct.filter((review) => {
      if (!!userActive && review.userId === userActive.id) return true;
      if (!review.description) return false;
      return true;
    });
  }; */

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

  //Para agregar en la descripción:
  {
    /*
  Total Reviews: {currentReviewsOfProduct.length}
  {currentReviewsOfProduct[0] && (
    <Rating finalRating={ratingReviews()}></Rating>
  )}
</p> */
  }

  //Para renderizar reviews
  {
    /* <div className="reviewContainer">
<div className="review">
    <h2> Reviews </h2>
  <div>
    <div className="FlexReviewsProduct">
      {filterReview()[0] &&
        filterReview()
          .reverse()
          .slice(0, maxReviews)
          .map((review) => {
            return (
              <deleteReview
                rating={review.rating}
                description={review.description}
                idReview={
                  !!userActive &&
                  review.userId === userActive.id &&
                  review.id
                }
                idProduct={id}
                dispatch={dispatch}
                renderReviews={renderReviews}
              ></deleteReview>
            );
          })}
    </div>
    <div className="buttonSeeMoreContainer">
      <div className="buttonSeeMore">
        {filterReview().length > maxReviews && (
          <button
            className="button-see"
            onClick={() => setMaxReviews(maxReviews + 5)}
          >
            <span className="text-button-see">{"Read more"}</span>
          </button>
        )}
      </div>
    </div>

    <Review
      productId={id}
      renderReviews={renderReviews}
      currentReviewsOfProduct={currentReviewsOfProduct}
    ></Review>
  </div>
</div>
</div>
);
} */
  }

  return (
    <div className={styles.container}>
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
            <span>{details.name?.split(" ").slice(0, 3).join(" ")}</span>
            <div className={styles.desc}>
              <ul className={styles.values}>
                {nav === "details" &&
                  details.description &&
                  Object.entries(details.description).map(([key, value]) => {
                    return (
                      <li key={key}>
                        <b>{key.split(/(?=[A-Z])/).join(" ")}</b>:{" "}
                        {value.toString()}
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
                <button onClick={handleSum}>+</button>
                <button onClick={handleRes}>-</button>
              </div>
            </div>
            {details.stock > 0 ? (
              <button
                onClick={() => {
                  handleAddToCart(details);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <button
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

      <div className={styles.related}>
        <div className={styles.title}>
          <span>MORE PRODUCTS</span>
        </div>
        <div className={styles.slider}>
          {productByCategories[random] && (
            <Slider products={productByCategories[random].data} />
          )}
        </div>
      </div>
    </div>
  );
};
