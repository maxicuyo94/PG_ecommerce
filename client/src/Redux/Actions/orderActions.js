import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllOrders = () => {
  return async function (dispatch) {
    let JSON = await supabase.from("order").select("*");
    dispatch({
      type: actionType.GET_ALL_ORDERS,
      payload: JSON.data,
    });
  };
};

export const getOrder = (id) => {
  return async function (dispatch) {
    const JSON = await supabase.from("order_detail").select("*").eq("id", id);
    dispatch({
      type: actionType.GET_ORDER,
      payload: JSON.data,
    });
  };
};

export const updateOrder = (status, id) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from("order")
      .update({
        orderStatus: status,
      })
      .eq("id", id);
  };
};
