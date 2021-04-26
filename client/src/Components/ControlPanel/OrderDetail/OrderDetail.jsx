import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetail,
  //updateOrder,
  getProductsOfOrder
} from "../../../Redux/Orders/orderActions";
import style from "./orderdetail.module.scss";
import { Link } from "react-router-dom";


export const OrderDetail = ({ id }) => {
  const order = useSelector((state) => state.orderReducer.orderDetail);
  const productsOfOrder = useSelector((state) => state.orderReducer.orderProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetail(id));
    dispatch(getProductsOfOrder(id));
  }, [dispatch, id]);


  return (
    <div className={style.div}>
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
          {order.orderStatus}
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
            <br></br>
            <span>Productos</span>
            {productsOfOrder?.map(function (product) {
              return (
                <tr>
                  <Link to={`/product/${product.product_id}`}>{product.title}</Link>
                  <td></td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
