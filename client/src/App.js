import React from "react";
import { Route } from "react-router-dom";
//import logo from "./logo.svg";
//import styles from "./App.module.scss";
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
//import { Nav } from "./Components/Nav/Nav";
// import {Header} from './Components/Header/Header'
//import { Footer } from "./Components/Footer/Footer";
//import { ProductCard } from "./Components/ProductCard/ProductCard";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";

function App() {
  return (
    <Layout>
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Product/:id" component={Product} />
      <Route exact path="/Catalogue" component={Catalogue} />
      <Route exact path="/AddProduct" component={AddProduct} />
      <Route
        exact
        path="/modifyProduct/:id"
        render={({ match }) => <ModifyProduct id={match.params.id} />}
      />
    </Layout>
  );
}

export default App;
