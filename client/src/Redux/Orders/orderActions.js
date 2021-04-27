import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const axios = require('axios');
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllOrders = (status) => {
  return async function (dispatch) {
    if(status) {
      let JSON = await supabase.from("order").select("*").eq('orderStatus', status);
      dispatch({
        type: actionType.GET_ALL_ORDERS,
        payload: JSON.data,
      });
    } else {
      let JSON = await supabase.from("order").select("*");
      dispatch({
        type: actionType.GET_ALL_ORDERS,
        payload: JSON.data,
      });
    }
  };
};

//Harcodeada para probar reviews
export const getAllUserOrders = (userId) => {
  return async function (dispatch) {
    let JSON = await supabase.from("order").select("*").eq("user_id", userId);
    dispatch({
      type: actionType.GET_ALL_ORDERS_USER,
      payload: JSON.data,
    });
  };
};

export const getOrderDetail = (id) => {
  return async function (dispatch) {
    let orderRequest = await supabase.from("order").select("*").eq("id", id);
    let order = orderRequest.data[0];
    let orderDetail = await supabase
      .from("order_detail")
      .select("*")
      .eq("order_id", id);

    order.details = orderDetail.data;

    dispatch({
      type: actionType.GET_ORDER_DETAIL,
      payload: order,
    });
  };
};

export const updateOrder = (status, id) => {
  return async function (dispatch) {
    // eslint-disable-next-line
    const {data, error} = await supabase
      .from("order")
      .update({
        orderStatus: status,
      })
      .eq("id", id);
      return error
  };
};

export const getProductsOfOrder = (id) => {
  return async function (dispatch) {
    let products = await supabase
      .from("order_detail")
      .select("*, product_id")
      .eq("order_id", id);
    dispatch({
      type: actionType.GET_PRODUCTS_ORDER,
      payload: products.data,
    });
  };
};

export const orderPayment = (cart,infoUser) => {
  return async function () {
    try{
      let response = await axios.post("http://localhost:3001/mercadopago/checkout", {cart,infoUser})
      return response.data.redirect
    } catch(e){
      alert(e)
    }
  }
};

export const orderEmail = (email) => {
  return async function () {
    try{
      await axios.post(`http://localhost:3001/mercadopago/send/?email=${email}`)
    } catch(e){
      alert("Order pending")
    }
  }
};

