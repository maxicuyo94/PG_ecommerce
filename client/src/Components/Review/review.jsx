import React, { useEffect, useState } from "react";
import style from "./review.module.scss";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createReview } from "../../Redux/Reviews/reviewsActions";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage";
import swal from "sweetalert";

export function Review({ id, currentReviewsOfProduct }) {
  const [userLog] = useLocalStorage("supabase.auth.token");
  const userId = userLog && userLog.currentSession.user.id;
  const dispatch = useDispatch();
  const [setUserId] = useState();
  const [review, setReview] = useState({
    rating: null,
    description: null,
    userId,
    productId: id,
    isRated: null,
  });

  const [hover, setHover] = useState(null);

  const submitReview = (e) => {
    e.preventDefault();

    dispatch(createReview(review));
    swal({ text: `The review has been sent successfully`, icon: "success" });
    setReview({
      ...review,
      rating: null,
      description: null,
      isRated: false,
    })
  };

  return (
    <div className={style.containerReview}>
      <h2>Your opinion is important</h2>
      <h3>How was your experience with this product?</h3>
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
      <form className={style.formReview} onSubmit={(e) => submitReview(e)}>
        {review.isRated ? (
          <div>
            <span>Would you like to say something?</span>
            <textarea
              name="description"
              rows="10"
              cols="50"
              placeHolder="Write here..."
              onChange={(e) => {
                setReview({
                  ...review,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>
        ) : null}
        <input type="submit" value="Post review" />
      </form>
    </div>
  );
}
