import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useLocalStorage } from './LocalStorage/useLocalStorage'
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { LoginSignup } from "./Components/LoginSigup/LoginSignup";
import { ModifyUser } from "./Components/LoginSigup/ModifyUser/ModifyUser";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel.jsx";
import { CheckOut } from "./Components/CheckOut/CheckOut.jsx";
import { useDispatch } from "react-redux";
import { setCart } from "./Redux/Cart/cartActions";
import { OrderDetail } from "./Components/ControlPanel/OrderDetail/OrderDetail";
import { Reset } from "./Components/LoginSigup/ResetPassword/ResetPassword"
import { userLogin } from "./Redux/Users/usersActions"

function App() {
  const [priority, setPriorityStorage] = useLocalStorage("priority", "")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCart());
    dispatch(userLogin());
  }, []);

  return (
    <Layout priority={priority}>
      <Route exact path="/" render={() => <Home priority={priority} />} />
      <Route exact path="/login" render={() => <LoginSignup priority={priority} />} />
      <Route exact path="/modifyUser/:id" render={({ match }) => <ModifyUser id={match.params.id} />} />
      <Route exact path="/resetPassword" component={Reset} />
      <Route exact path="/Product/:id" render={({ match }) => <Product priority={priority} id={match.params.id} />} />
      <Route exact path="/catalogue" render={() => <Catalogue priority={priority} />} />
      <Route exact path="/AddProduct" render={() => <AddProduct priority={priority} />} />
      <Route exact path="/Order" render={() => <CheckOut priority={priority} />} />
      <Route exact path="/modifyProduct/:id" render={({ match }) => <ModifyProduct id={match.params.id} />} />
      <Route exact path="/controlpanel" render={() => <ControlPanel priority={priority} />} />
      <Route exact path="/orderdetail/:id" render={() => <OrderDetail priority={priority} />} />
    </Layout>
  );
}

export default App;
