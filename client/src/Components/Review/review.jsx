import React, { useEffect, useState } from "react";
import style from "./review.module.scss";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createReview } from "../../Redux/Reviews/reviewsActions";
import { cancelReview } from "./deleteReview";
import { useLocalStorage } from  '../../LocalStorage/useLocalStorage'
import swal from "sweetalert";

export function Review({
  id,
  renderReviews,
  currentReviewsOfProduct,
}) {
  const [userLog] = useLocalStorage("supabase.auth.token")
  const userId = userLog.currentSession.user.id
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

  useEffect(() => {
    const userActive = JSON.parse(localStorage.getItem("User"));
    if (userActive) {
      setUserId(userActive.id);
      setReview({
        ...review,
        userId: userActive.id,
      });
    }
  });

  const submitReview = (e) => {
    e.preventDefault();

    const userPreviousReview = currentReviewsOfProduct.find(
      (review) => review.userId === userId
    );

    if (userPreviousReview) {
      swal({
        text: `We're sorry! You can leave a single review`,
        icon: "warning",
      });
      return;
    }
    if (!review.rating) return;

    dispatch(createReview(review)).then(() => renderReviews());
    swal({ text: `The review has been sent successfully`, icon: "success" });
  };


  return (
    <div className={style.containerReview}>
      <span>Rate this product</span>
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
            <span>Would you like to give your opinion to others?</span>
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
              onSubmit={submitReview}
            ></textarea>
          </div>
        ) : null}
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
