import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import {
  getReviewOfProduct,
  createReview,
} from "../../Redux/Reviews/reviewsActions";
import { getUserOrders } from "../../Redux/Orders/orderActions";
import Rating from "./rating";
import swal from "sweetalert";

export function Reviews({ productId, renderReviews, currentReviewsOfProduct }) {
  const dispatch = useDispatch();

  const [userPurchase, setUserPurchase] = useState(false);
  const [userId, setUserId] = useState();

  const [review, setReview] = useState({
    rating: null,
    description: null,
    userId,
  });

  const setRatingValue = (rating) => {
    setReview({
      ...review,
      rating,
    });
  };

  useEffect(() => {
    const userActive = JSON.parse(localStorage.getItem("User"));
    if (userActive) {
      setUserId(userActive.id);
      setReview({
        ...review,
        userId: userActive.id,
      });
    } else return;

    dispatch(getUserOrders(userActive.id)).then((orders) => {
      if (!orders) return;
      let completed = orders.filter((order) => order.status === "completed");
      for (let cart of completed) {
        if (cart.products && cart.products[0]) {
          for (let product of cart.products) {
            if (product.id == productId) {
              setUserPurchase(true);
              return;
            }
          }
        }
      }
    });
  }, []);

  const submitReview = (e) => {
    e.preventDefault();

    const userPreviousReview = currentReviewsOfProduct.find(
      (review) => review.userId == userId
    );

    if (userPreviousReview) {
      swal({
        text: `We're sorry! You can only leave a single review`,
        icon: "warning",
      });
      return;
    }

    if (!userPurchase) {
      swal({
        text: `You must buy the product before making the review`,
        icon: "warning",
      });
      return;
    }

    if (!review.rating) return;

    dispatch(createReview(productId, review)).then(() => renderReviews());
    swal({ text: `The review has been sent successfully`, icon: "success" });
  };

  if (!userId) return null;

  return (
    <>
      <div>
        <Rating setRatingValue={setRatingValue} />
      </div>
      <div className="review_container">
        <div className="Review__Input">
          {/* <Form.Group controlId="exampleForm.ControlTextarea1"> */}
          <Form
            as="textarea"
            placeholder="Leave us your opinion about this product!"
            rows={3}
            value={review.description}
            onChange={(e) => {
              setReview({
                ...review,
                description: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="button_container">
        <div className="button_send">
          <button className="button-home" onClick={submitReview}>
            <span className="text-button-home">{"Send"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
export default Reviews;
