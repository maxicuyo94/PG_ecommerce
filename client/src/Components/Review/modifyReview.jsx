import React, { useState, useEffect } from "react";
import style from "./modifyreview.module.scss";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../Redux/Reviews/reviewsActions";

export function ModifyReview({ id }) {
  const [data, setData] = useState({
    description: "",
    rating: "",
   //id,
  });

  const [hover, setHover] = useState(null);

  const dispatch = useDispatch();

  // const dispatch = useDispatch();
  // const reviews = useSelector((state) => state.reviewsReducer.reviews);

  const upReview = (upReview) => {
    upReview.preventDefault();
    dispatch(updateReview(data, id));
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
      <form className={style.formReview} onSubmit={(e) => upReview(e)}>
        {data.isRated ? (
          <div>
            <span>Would you like to give your opinion to others?</span>
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
            ></textarea>
          </div>
        ) : null}
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
