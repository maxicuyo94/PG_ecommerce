import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const createReview = () => {
  return async () => {
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          rating: reviews.rating,
          description: reviews.description,
        },
      ])
      .catch((err) => alert(`${err}`));
  };
};

export const getReviewsOfProduct = (id) => {
  return async function (dispatch) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", id);

    dispatch({
      type: actionType.GET_REVIEW_PRODUCT,
      payload: reviews,
    });
  };
};


export const updateReview = (id_review) => {
    return async function (dispatch) {
      const JSON = await supabase
        .from("review")
        .update({
          description: id_review.description,
          rating: id_review.rating
        })
        .eq("id_review", id);
    };
  };
  

export const deleteReview = (id, id_review) => {
  return async () => {
    await supabase.from("reviews").delete().eq("id_review", id);
  };
};
