import React, { useState, useEffect } from "react";
import style from "./modifyreview.module.scss";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateReview, deleteReview } from "../../Redux/Reviews/reviewsActions";
import { cancelReview } from "./deleteReview";

export function ModifyReview({ id }) {
  const reviews = useSelector((state) => state.reviewsReducer.users);
  const [data, setData] = useState({
    description: "",
    ranting: "",
    id,
  });

  const [hover, setHover] = useState(null);

  // const dispatch = useDispatch();
  // const reviews = useSelector((state) => state.reviewsReducer.reviews);

  const upReview = (upReview) => {
    upReview.preventDefault();
    updateReview(data, data.id);
  };

  // useEffect(() => {
  //     dispatch(getReviewById(data.id));
  // }, [dispatch, id]);
  //
  // useEffect(() => {
  //   setData({
  //     description: reviews.description,
  //     ranking: reviews.rating
  //   });
  // }, [reviews]);

  return (
    <div className={style.containerReview}>
      <h2>You changed your opinion?</h2>
      <h3>Don't worry, you can fix it!</h3>
      <h4>Set new rating</h4>
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
                  setData({
                    ...data,
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
                  ratingValue <= (hover || data.rating) ? "#9abf15" : "#e4e5e9"
                }
              />
            </label>
          );
        })}
      </div>
      <form className={style.formReview}>
        {data.isRated ? (
          <div>
            <span>Tell us more:</span>
            <textarea
              name="description"
              rows="10"
              cols="50"
              placeHolder="Write here..."
              onChange={(e) => {
                setData({
                  ...data,
                  description: e.target.value,
                });
              }}
              onSubmit={upReview}
            ></textarea>
          </div>
        ) : null}
        <input type="submit" value="Modify review" />
      </form>
    </div>
  );
}
