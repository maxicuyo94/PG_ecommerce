import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  totalProducts,
  deleteProduct,
  getCategories,
  deleteCategory,
} from "../../Redux/Products/productActions.js";
import { allUsers, deleteUser } from "../../Redux/Users/usersActions";
import { getAllOrders, getOrderDetail } from "../../Redux/Orders/orderActions";
import style from "./controlpanel.module.scss";
import {
  Edit,
  Delete,
  CheckBoxOutlineBlank,
  CheckBox,
} from "@material-ui/icons";
import EditUsers from './EditUsers/EditUsers'
import { Link } from "react-router-dom";
import { OrderDetail } from "./OrderDetail/OrderDetail";
import Modal from "@material-ui/core/Modal";
import { useLocalStorage } from "../../LocalStorage/useLocalStorage.js";

export function ControlPanel() {
  const dispatch = useDispatch();
  const userLoged = useSelector(state => state.usersReducer.userLoged)

  const products = useSelector((state) => state.productReducer.allproducts);
  const categories = useSelector((state) => state.productReducer.categories);
  const users = useSelector((state) => state.usersReducer.users);
  const orders = useSelector((state) => state.orderReducer.orders);
  const orderDetailId = useSelector((state) => state.orderReducer.orderDetail);
  const [modal, setModal] = useState(false);

  const changeModal = async (id) => {
    await dispatch(getOrderDetail(id));
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const checkProducts = products?.length;

  useEffect(() => {
    dispatch(totalProducts());
    dispatch(getCategories());
    dispatch(allUsers());
    dispatch(getAllOrders());
  }, [dispatch, checkProducts]);

  const handleDelete = async (id) => {
    if (tab === "products") {
      await dispatch(deleteProduct(id));
      await dispatch(totalProducts());
    } else if (tab === "users") {
      await dispatch(deleteUser(id));
      await dispatch(allUsers());
    } else if (tab === "categories") {
      await dispatch(deleteCategory(id));
      await dispatch(getCategories());
    }
  };

  const [checkbox, setCheckbox] = useState(false);
  const checkPress = (id) => {
    if (checkbox === false) {
      setCheckbox(true);
    } else setCheckbox(false);
  };

  const [tab, setTab] = useState("products");
  const handleTab = (e) => {
    setTab(e.target.name);
  };

  return (
    <div class={style.container}>
      <h2>Control Panel</h2>
      <div class={style.barButtons}>
        <button name="products" onClick={(e) => handleTab(e)}>
          Products
        </button>
        <button name="orders" onClick={(e) => handleTab(e)}>
          Orders
        </button>
        <button name="purchasehistory" onClick={(e) => handleTab(e)}>
          Purchase History
        </button>
        <button name="categories" onClick={(e) => handleTab(e)}>
          Categories
        </button>
        {userLoged.permission === "superadmin" && <button name="users" onClick={(e) => handleTab(e)}>
          Users
        </button>}
        {tab === "products" ? (
          <Link to="/addproduct">
            <button>Add Product</button>
          </Link>
        ) : null}
      </div>
      <div class={style.containerList}>
        <div class={style.bar}>
          <h4>
            <CheckBoxOutlineBlank />
          </h4>
          {tab === "products" ? <h4 class={style.name}>Product</h4> : null}
          {tab === "orders" ? <h4 class={style.name}>Order ID</h4> : null}
          {tab === "orders" ? <h4 class={style.name}>Status</h4> : null}
          {tab === "orders" ? <h4 class={style.name}>Date</h4> : null}
          {tab === "categories" ? <h4 class={style.name}>Category</h4> : null}
          {tab === "users" ? <h4 class={style.name}>User</h4> : null}
          {tab === "purchasehistory" ? (
            <h4 class={style.name}>Purchase</h4>
          ) : null}
          <h4>Modify</h4>
          {tab === "orders" ? null : <h4>Delete</h4>}
        </div>
        <div class={style.containerList}>
          {tab === "products"
            ? products.map((product) => {
              return (
                <div key={product.id} class={style.list}>
                  {checkbox ? (
                    <CheckBox
                      id={product.id}
                      class={style.icon}
                      onClick={() => checkPress(product.id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      id={product.id}
                      class={style.icon}
                      onClick={() => checkPress(product.id)}
                    />
                  )}

                  <span class={style.name}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </span>
                  <Link to={`/modifyproduct/${product.id}`}>
                    <Edit class={style.icon} />
                  </Link>
                  <Delete
                    class={style.icon}
                    id={product.id}
                    onClick={() => handleDelete(product.id)}
                  />
                </div>
              );
            })
            : null}
          {tab === "orders"
            ? orders.map((order) => {
              return (
                <div class={style.list}>
                  {checkbox ? (
                    <CheckBox
                      id={order.id}
                      class={style.icon}
                      onClick={() => checkPress(order.id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      id={order.id}
                      class={style.icon}
                      onClick={() => checkPress(order.id)}
                    />
                  )}
                  <span
                    onClick={() => changeModal(order.id)}
                    class={style.name}
                  >
                    {order.id}
                  </span>
                  <span class={style.name}>{order.orderStatus[0]}</span>
                  <span class={style.name}>{order.orderDate}</span>
                </div>
              );
            })
            : null}
          {tab === "categories"
            ? categories.map((category) => {
              return (
                <div class={style.list}>
                  {checkbox ? (
                    <CheckBox
                      id={category.id}
                      class={style.icon}
                      onClick={() => checkPress(category.id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      id={category.id}
                      class={style.icon}
                      onClick={() => checkPress(category.id)}
                    />
                  )}
                  <span class={style.name}>{category.name}</span>
                  <Delete
                    class={style.icon}
                    id={category.id}
                    onClick={() => handleDelete(category.id)}
                  />
                </div>
              );
            })
            : null}
          {tab === "users" && userLoged.permission === "superadmin"
            ? users.map((user) => {
              return (
                <div key={user.id} class={style.list}>
                  {checkbox ? (
                    <CheckBox
                      id={user.id}
                      class={style.icon}
                      onClick={() => checkPress(user.id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      id={user.id}
                      class={style.icon}
                      onClick={() => checkPress(user.id)}
                    />
                  )}
                  <span class={style.name}>{user.name}</span>
                  <EditUsers
                    permission={user.permission}
                    id={user.id}
                  />
                  <Delete
                    class={style.icon}
                    id={user.id}
                    onClick={() => handleDelete(user.id)}
                  />
                </div>
              );
            })
            : null}
        </div>
      </div>
      <Modal class={style.modal} open={modal} onClose={closeModal}>
        <OrderDetail id={orderDetailId.id} />
      </Modal>
    </div>
  );
}
