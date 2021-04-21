import React from "react";
import { Rating } from "./rating";
import { deleteReview } from "../../Redux/Reviews/reviewsActions";

export default function Modal({
  description,
  rating,
  idReview,
  idProduct,
  dispatch,
  renderReviews,
}) {
  const functionDeleteReview = () => {
    dispatch(deleteReview(idProduct, idReview)).then(() => renderReviews());
  };

  return (
    <div className="Dialog__Container">
      <div
        style={{ width: "fit-content", marginLeft: "10px", marginTop: "5px" }}
      >
        <Rating staticRating={rating} />
      </div>
      <p>{description}</p>
      {idReview && (
        <button className="delete_review" onClick={functionDeleteReview}>
          Delete review
        </button>
      )}
    </div>
  );
}
