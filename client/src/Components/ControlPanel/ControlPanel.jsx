import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  totalProducts,
  deleteProduct,
  getCategories,
  deleteCategory,
} from "../../Redux/Products/productActions.js";
import { allUsers, deleteUser } from "../../Redux/Users/usersActions";
import { 
  getAllOrders, 
  getOrderDetail, 
  getProductsOfOrder,
  getAllUserOrders } from "../../Redux/Orders/orderActions";
import style from "./controlpanel.module.scss";
import {
  Edit,
  Delete,
  //MoreVert,
  CheckBoxOutlineBlank,
  CheckBox,
} from "@material-ui/icons";
import EditUsers from "./EditUsers/EditUsers";
import { Link } from "react-router-dom";
import { OrderDetail } from "./OrderDetail/OrderDetail";
import Modal from "@material-ui/core/Modal";
//import { useLocalStorage } from "../../LocalStorage/useLocalStorage.js";
import { ProductSelection } from "./Modals/ProductSelection";

export function ControlPanel() {
  const dispatch = useDispatch();
  const userLoged = useSelector((state) => state.usersReducer.userLoged);
  const products = useSelector((state) => state.productReducer.allproducts);
  const categories = useSelector((state) => state.productReducer.categories);
  const users = useSelector((state) => state.usersReducer.users);
  const orders = useSelector((state) => state.orderReducer.orders);
  const orderDetailId = useSelector((state) => state.orderReducer.orderDetail);
  const userOrders = useSelector((state) => state.orderReducer.userOrders);
  const productsOfOrder = useSelector((state) => state.orderReducer.orderProducts);
  const container = products.lenght;
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const [tab, setTab] = useState(() => {
    return userLoged.permission === "customer" ? "purchasehistory" : "products";
  });

  const changeModal = async (id) => {
    await dispatch(getOrderDetail(id));
    setModal(true);
  };

  const openModalSelector = () => {
    setModalTwo(true);
  };

  const closeModal = () => {
    setModal(false);
    setModalTwo(false);
  };

  const [search, setSearch] = useState();
  const handleSearch = (e) => {
    setSearch(e);
  };

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

  const handleTab = (e) => {
    setTab(e.target.name);
  };

  const getProducts = async (e) => {
    await dispatch(getProductsOfOrder(e.target.value));
    openModalSelector();
  };
  useEffect(() => {
    dispatch(totalProducts(search));
    dispatch(getCategories(search));
    dispatch(allUsers(search));
    dispatch(getAllOrders());
    dispatch(getAllUserOrders(userLoged.id))
  }, [search, container, tab]);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const indexLastResult = currentPage * resultsPerPage;
  const indexFirstResult = indexLastResult - resultsPerPage;
  // const showedResults = state.allGames.slice(indexFirstResult, indexLastResult);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };


  return (
    <div className={style.container}>
      <h2>Control Panel</h2>
      <div className={style.barButtons}>
        {userLoged.permission !== "customer" && (
          <button name="products" onClick={(e) => handleTab(e)}>
            Products
          </button>
        )}
        {userLoged.permission !== "customer" && (
          <button name="orders" onClick={(e) => handleTab(e)}>
            Orders
          </button>
        )}
        {userLoged.permission === "customer" && (
          <button name="purchasehistory" onClick={(e) => handleTab(e)}>
          Purchase History
        </button>
        )}
        {userLoged.permission !== "customer" && (
          <button name="categories" onClick={(e) => handleTab(e)}>
            Categories
          </button>
        )}
        {userLoged.permission !== "customer" && (
          <button name="users" onClick={(e) => handleTab(e)}>
            Users
          </button>
        )}
        {userLoged.permission !== "customer" && (
          <Link to="/addproduct">
            <button>Add Product</button>
          </Link>
        )}
      </div>
      <div>
        <input
          className={style.search}
          placeholder="Search..."
          name="input"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
           {tab === "orders" && (
            <button className={style.buttonfilter}>Filter by state</button>
        )}
      </div>
      <div className={style.containerList}>
        <div className={style.bar}>
          <h4>
            <CheckBoxOutlineBlank />
          </h4>
          {tab === "products" ? <h4 className={style.name}>Product</h4> : null}
          {tab === "orders" ? <h4 className={style.name}>Order ID</h4> : null}
          {tab === "orders" ? <h4 className={style.name}>Status</h4> : null}
          {tab === "orders" ? <h4 className={style.name}>Date</h4> : null}
          {tab === "categories" ? (
            <h4 className={style.name}>Category</h4>
          ) : null}
          {tab === "users" ? <h4 className={style.name}>User</h4> : null}
          {tab === "purchasehistory" ? (
            <h4 className={style.name}>Purchase</h4>
          ) : null}
          <h4>Modify</h4>
          {tab === "orders" ? null : <h4>Delete</h4>}
        </div>
        <div className={style.containerList}>
        {tab === "purchasehistory"
            ? userOrders?.map((order) => {
                return (
                  <div className={style.list}>
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
                      className={style.name}
                    >
                      {order.id}
                    </span>
                    <span className={style.name}>{order.orderStatus}</span>
                    <span className={style.name}>{order.orderDate}</span>
                    <dvi>
                      <button
                        className={style.icon}
                        value={order.id}
                        onClick={(e) => getProducts(e)}
                      >
                        +
                      </button>
                      <Modal
                        class={style.modal}
                        open={modalTwo}
                        onClose={closeModal}
                      >
                        <ProductSelection
                          products={productsOfOrder}
                        ></ProductSelection>
                      </Modal>
                    </dvi>
                  </div>
                );
              })
            : null}
          {tab === "products"
            ? products?.map((product) => {
                return (
                  <div key={product.id} className={style.list}>
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

                    <span className={style.name}>
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
                  <div className={style.list}>
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
                      className={style.name}
                    >
                      {order.id}
                    </span>
                    <span className={style.name}>{order.orderStatus}</span>
                    <span className={style.name}>{order.orderDate}</span>
                    <dvi>
                      <button
                        className={style.icon}
                        value={order.id}
                        onClick={(e) => getProducts(e)}
                      >
                        +
                      </button>
                      <Modal
                        class={style.modal}
                        open={modalTwo}
                        onClose={closeModal}
                      >
                        <ProductSelection
                          products={productsOfOrder}
                        ></ProductSelection>
                      </Modal>
                    </dvi>
                  </div>
                );
              })
            : null}
          {tab === "categories"
            ? categories.map((category) => {
                return (
                  <div className={style.list}>
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
                    <span className={style.name}>{category.name}</span>
                    <Delete
                      class={style.icon}
                      id={category.id}
                      onClick={() => handleDelete(category.id)}
                    />
                  </div>
                );
              })
            : null}
          {tab === "users" &&
          (userLoged.permission === "superadmin" ||
            userLoged.permission === "admin")
            ? users.map((user) => {
                return (
                  <div key={user.id} className={style.list}>
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
                    <span className={style.name}>{user.name}</span>
                    <span className={style.name}>{user.permission}</span>
                    {user.permission === "superadmin" &&
                    userLoged.permission === "admin" ? null : (
                      <EditUsers permission={user.permission} id={user.id} />
                    )}
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
        <div className={style.paginate}>
        <button className={style.buttonpage} onClick={() => previousPage()}>Prev</button>
        <button className={style.currentpage}>{currentPage}</button>
        <button className={style.buttonpage} onClick={() => nextPage()}>Next</button>
      </div>
      </div>
      <Modal class={style.modal} open={modal} onClose={closeModal}>
        <OrderDetail id={orderDetailId.id} />
      </Modal>
    </div>
  );
}
