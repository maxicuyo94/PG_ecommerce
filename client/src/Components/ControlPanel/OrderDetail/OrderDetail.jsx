import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
  getOrderDetail,
  updateOrder,
} from "../../../Redux/Actions/orderActions";
import Style from "../OrderDetail/orderdetail.module.scss";

export const OrderDetail = () => {
  const orderDetail = useSelector((state) => state.orderDetail);
  const orderInfo = useSelector((state) => state.orders);
  //const products = useSelector((state) => orderDetail.allproducts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetail(id));
    // dispatch(updateOrder(id));
  }, [dispatch, id]);

console.log(orderDetail)

  return (
    <div class="container">
      <div class="table">
        <h2>Order Detail N° {id}</h2>
        <td>Order Made By </td>
        <td>p</td>
        <tr>
          <td>Order Date</td>
          <td>asadsas</td>
        </tr>
        <tr>
          <td>Total amount</td>
          <td>$</td>
        </tr>
        <tr>
          <td>Order status</td>
          <td>status</td>
        </tr>
        <tr>
          <td>Payment</td>
          <td>Payment</td>
        </tr>
        <tr>
          <td>Order Quantity</td>
          <td>Products</td>
        </tr>
      </div>
    </div>
  );
};

export default OrderDetail;
