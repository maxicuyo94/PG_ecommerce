import React from "react";
import { Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel.jsx";

function App() {
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
    </Layout>
  );
}

export default App;
