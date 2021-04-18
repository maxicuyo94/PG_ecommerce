import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel.jsx";
import { CheckOut } from "./Components/CheckOut/CheckOut.jsx";
import { useDispatch } from "react-redux";
import { setCart } from "./Redux/Cart/cartActions";
import { OrderDetail } from "./Components/ControlPanel/OrderDetail/OrderDetail";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCart());
  }, []);

  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/Product/:id" component={Product} />
      <Route exact path="/catalogue" component={Catalogue} />
      <Route exact path="/AddProduct" component={AddProduct} />
      <Route
        exact
        path="/modifyProduct/:id"
        render={({ match }) => <ModifyProduct id={match.params.id} />}
      />
      <Route exact path="/controlpanel" component={ControlPanel} />
      <Route exact path="/Order" component={CheckOut} />
      <Route exact path="/orderdetail/:id" component={OrderDetail} />
    </Layout>
  );
}

export default App;
