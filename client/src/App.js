import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useLocalStorage } from "./LocalStorage/useLocalStorage";
import { ProtectedRoute } from './AuthRoutes/ProtectedRoute'
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { Access } from "./Components/Access/Access";
import { ModifyUser } from "./Components/Access/ModifyUser/ModifyUser";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel.jsx";
import { CheckOut } from "./Components/CheckOut/CheckOut.jsx";
import { useDispatch } from "react-redux";
import { setCart } from "./Redux/Cart/cartActions";
import { restoredRedux } from "./Redux/LocalStorage/localstorageActions"
import { Reset } from "./Components/Access/ResetPassword/ResetPassword";

function App() {
  // eslint-disable-next-line
  const [userLocalStorage , setUserLocalStorager] = useLocalStorage("user", "")

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCart());
  }, [dispatch]);

  return (
    <Layout>
      <Route exact path="/" render={() => <Home />} />
      <ProtectedRoute
        exact
        path="/Access"
        component={() => <Access />}
      />
      <Route
        exact
        path="/modifyUser/:id"
        render={({ match }) => <ModifyUser id={match.params.id} />}
      />
      <Route exact path="/resetPassword" component={Reset} />
      <Route
        exact
        path="/Product/:id"
        render={({ match }) => (
          <Product id={match.params.id} />
        )}
      />
      <Route
        exact
        path="/catalogue"
        render={() => <Catalogue/>}
      />
      <Route
        exact
        path="/AddProduct"
        render={() => <AddProduct/>}
      />
      <Route
        exact
        path="/Order"
        render={() => <CheckOut/>}
      />
      <Route
        exact
        path="/modifyProduct/:id"
        render={({ match }) => <ModifyProduct id={match.params.id} />}
      />
      <ProtectedRoute
        exact
        path="/controlpanel"
        component={() => <ControlPanel />}
      />
    </Layout>
  );
}

export default App;
