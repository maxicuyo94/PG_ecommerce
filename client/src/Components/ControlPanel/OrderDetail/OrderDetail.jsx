import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../../Redux/Actions/orderActions";

export function OrderDetail() {
  const orderDetail = useSelector((state) => state.orderDetail);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrder(id));
  });

  return (
    <div classname="Detail">
      <h2>Order Detail</h2>

    
    </div>
  );
}

export default OrderDetail;
