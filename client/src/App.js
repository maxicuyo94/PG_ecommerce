import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { ProtectedRoute } from "./AuthRoutes/ProtectedRoute";
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
import { userStorage } from "./Redux/Users/usersActions";
import { Reset } from "./Components/Access/ResetPassword/ResetPassword";
import { Review } from "./Components/Review/review"
import { Payment } from "./Components/Payment/Payment"
import { ModifyReview } from './Components/Review/modifyReview';
import { checkout } from "./Redux/Cart/cartActions";
import swal from "sweetalert";

function App() {
  // eslint-disable-next-line
  const [userLogedStorage, setUserLogedStorage] = useLocalStorage(
    "supabase.auth.token",
    ""
  );
  const dark = useSelector((state) => state.darkReducer.dark);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (userLogedStorage)
      dispatch(userStorage(userLogedStorage.currentSession.user.id));
    dispatch(setCart(userLogedStorage.currentSession?.user.id));
  }, [dispatch, userLogedStorage]);

  if (window.location.href.includes("approved")) {
    swal("Payment approved", "", "success").then((resp) => {
      if (resp) {
        dispatch(
          checkout(userLogedStorage.currentSession?.user.id, "approved")
        );
        history.push("/");
      }
    });
  } else if (window.location.href.includes("pending")) {
    swal("Payment pending", "", "warning").then((resp) => {
      if (resp) {
        dispatch(checkout(userLogedStorage.currentSession?.user.id, "pending"));
        history.push("/");
      }
    });
  } else if (window.location.href.includes("rejected")) {
    swal("Payment rejected", "", "error").then((resp) => {
      if (resp) {
        dispatch(
          checkout(userLogedStorage.currentSession?.user.id, "rejected")
        );
        history.push("/");
      }
    });
  }

  return (
    <Layout dark={dark}>
      <Route exact path="/" render={() => <Home dark={dark} />} />
      <ProtectedRoute exact path="/Access" component={() => <Access />} />
      <ProtectedRoute
        exact
        path="/myprofile"
        component={({ match }) => (
          <ModifyUser id={match.params.id} dark={dark} />
        )}
      />
      <Route exact path="/resetPassword" render={() => <Reset dark={dark} />} />
      <Route
        exact
        path="/Product/:id"
        render={({ match }) => <Product id={match.params.id} dark={dark} />}
      />
      <Route exact path="/catalogue" render={() => <Catalogue dark={dark} />} />
      <Route
        exact
        path="/AddProduct"
        render={() => <AddProduct dark={dark} />}
      />
      <Route exact path="/Order" render={() => <CheckOut dark={dark} />} />
      <ProtectedRoute
        exact
        path="/modifyProduct/:id"
        restringed="customer"
        component={({ match }) => (
          <ModifyProduct id={match.params.id} dark={dark} />
        )}
      />
      <Route
        exact
        path="/rate-product/:id"
        render={({ match }) => <Review id={match.params.id} dark={dark} />}
      />
      <ProtectedRoute
        exact
        path="/controlpanel"
        component={() => <ControlPanel dark={dark} />}
      />
      <Route exact path="/review" render={() => <Review dark={dark} />} />
      <Route
        exact
        path="/order/payment"
        render={() => <Payment dark={dark} />}
      />
      <ProtectedRoute
        exact
        path="/modifyReview/:id"
        restringed="customer"
        component={({ match }) => (
          <ModifyReview id={match.params.id} dark={dark} />
        )}
      />
    </Layout>
  );
}

export default App;
