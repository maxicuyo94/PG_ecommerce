import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useLocalStorage } from "./LocalStorage/useLocalStorage";
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
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./Redux/Cart/cartActions";
import { userStorage } from "./Redux/Users/usersActions"
import { Reset } from "./Components/Access/ResetPassword/ResetPassword";
import  { Review } from "./Components/Review/review"

function App() {
  // eslint-disable-next-line
  const [userLogedStorage, setUserLogedStorage] = useLocalStorage("supabase.auth.token", "");
  const dark = useSelector((state) => state.darkReducer.dark)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCart());
    if(userLogedStorage){
      dispatch(userStorage(userLogedStorage.currentSession.user.id))
    }
  }, [dispatch]);

  return (
    <Layout>
      <Route exact path="/" render={() => <Home dark={dark} />} />
      <Route
        exact
        path="/Access"
        render={() => <Access />}
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
        render={() => <Catalogue />}
      />
      <Route
        exact
        path="/AddProduct"
        render={() => <AddProduct />}
      />
      <Route
        exact
        path="/Order"
        render={() => <CheckOut />}
      />
      <Route
        exact
        path="/modifyProduct/:id"
        render={({ match }) => <ModifyProduct id={match.params.id} />}
      />
      <Route
        exact
        path="/rate-product/:id"
        render={({ match }) => <Review id={match.params.id} />}
      />
      <Route
        exact
        path="/controlpanel"
        render={() => <ControlPanel />}
      />
      <Route
        exact
        path="/review"
        render={() => <Review />}
      />
    </Layout>
  );
}

export default App;