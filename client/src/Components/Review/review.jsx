import React, { useEffect, useState } from "react";
import style from "./review.module.scss";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  getReviewsOfProduct,
  getReviewById
} from "../../Redux/Reviews/reviewsActions";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export function Review({ id }) {
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const history = useHistory();
  const [userLog] = useLocalStorage("supabase.auth.token");
  const userId = userLog && userLog.currentSession.user.id;
  const dispatch = useDispatch();
  const [setUserId] = useState();
  const [review, setReview] = useState({
    rating: null,
    description: null,
    userId,
    productId: id,
    reviewId: null,
    isRated: null,
  });


  const userReview = reviews.filter((f) => f.user_id === userId);
  if (userReview.length > 0) {
    setReview({
      rating: userReview[0].rating,
      description: userReview[0].description,
      reviewId: userReview[0].reviewId,
      isRated: true,
    });
  }

  const [hover, setHover] = useState(null);


  const submitReview = (e) => {
    e.preventDefault();


  dispatch(createReview(review));
      swal(
        "Thank you for the feedback!",
        {
          buttons: {
            button: "Ok",
          },
            icon: "success"
        },
      ).then((resp) => {
        resp && history.push("/controlpanel");
        //debería redireccionar al product para ver la review
      });
  };  


  return (
    <div className={style.containerReview}>
      <h2>Create review</h2>
      <br/>
      <h3>Rating</h3>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                id=""
                value={ratingValue}
                onClick={() =>
                  setReview({
                    ...review,
                    rating: ratingValue,
                    isRated: true,
                  })
                }
              />
              <FaStar
                className={style.star}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                color={
                  ratingValue <= (hover || review.rating)
                    ? "#9abf15"
                    : "#e4e5e9"
                }
              />
            </label>
          );
        })}
      </div>
      <form className={style.formReview}>
        {review.isRated ? (
          <div>
            <span>Please tell us your experience:</span>
            <textarea
              name="description"
              rows="10"
              cols="50"
              placeHolder="How is the quality? Was it what you expected? Would you change something?"
              onChange={(e) => {
                setReview({
                  ...review,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>
        ) : null}
         <div className={style.button}>
        <input type="submit" value="Post review"  onClick={submitReview}/>
        </div>
      </form>
    </div>
    
  );
}
