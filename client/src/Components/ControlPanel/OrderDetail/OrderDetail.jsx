import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrder,
  updateOrder,
  getAllOrders,
} from "../../../Redux/Actions/orderActions";
// import { Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import Style from "./orderdetail.module.scss";

export function OrderDetail() {
  const orderDetail = useSelector((state) => state.orderDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrder(id));
    dispatch(updateOrder());
    dispatch(getAllOrders());
  });

  return (
    <div class="Style.Container">
      <h2>Order Detail</h2>

      
    </div>
  );
}

export default OrderDetail;
