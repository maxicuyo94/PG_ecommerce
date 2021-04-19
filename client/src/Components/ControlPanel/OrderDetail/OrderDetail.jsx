import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderDetail,
  updateOrder,
} from "../../../Redux/Orders/orderActions";
// import Style from "../OrderDetail/orderdetail.module.scss";

export const OrderDetail = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  //console.log(order);

  return (
    <div class="container">
      <div class="table">
        <h2>Order Detail N° {id}</h2>
        <td>Made By </td>
        <td> User N° {order.user_id}</td>
        <tr>
          <td>Date</td>
          <td>{order.orderDate}</td>
        </tr>
        <tr>
          <td>Payment Method</td>
          <td>{order.paymentType}</td>
        </tr>
        <tr>
          <td>Status</td>
          {/* <td>order.orderStatus</td> hay que hacer un map */}
        </tr>
        <div class="table">
          {order.details &&
            order.details.map(function (detail) {
              return (
                <tr>
                  <td>{detail.name}</td>
                  <td>{detail.price}</td>
                  <td>{detail.quantity}</td>
                </tr>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
