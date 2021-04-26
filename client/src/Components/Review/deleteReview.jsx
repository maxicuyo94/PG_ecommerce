import React from "react";
import { deleteReview } from "../../Redux/Reviews/reviewsActions";

export function deletingReview ({
  description,
  idReview,
  idProduct,
  dispatch,
  renderReviews,
}) {
  const functionDeleteReview = () => {
    dispatch(deleteReview(idProduct, idReview))
  };

  return (
    <div className="Dialog__Container">
      <div
        style={{ width: "fit-content", marginLeft: "10px", marginTop: "5px" }}
      >
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

export default deletingReview;