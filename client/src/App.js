import React from 'react'
import logo from './logo.svg'
import styles from './App.module.scss'
import Layout from './Components/Layout/Layout'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { Product } from './Components/Product/Product'
import { Nav } from './Components/Nav/Nav'
// import {Header} from './Components/Header/Header'
import { Footer } from './Components/Footer/Footer'
import { Route, Router } from "react-router-dom"
import { ProductCard } from './Components/ProductCard/ProductCard'
import { Home } from './Components/Home/Home'
import { AddProduct } from './Components/AddProduct/AddProduct.jsx'
import { ModifyProduct } from './Components/ModifyProduct/ModifyProduct.jsx'


function App() {
  return (
    <Layout>
      <Route exact path='/Home' component={Home} />
      <Route exact path='/Product/:id' component={Product} />
      <Route exact path='/Catalogue' component={Catalogue} />
      <Route exact path='/AddProduct' component={AddProduct} />
      <Route exact path='/modifyProduct/:id' render={({match}) => <ModifyProduct id={(match.params.id)}/>}/>
    </Layout>




    // <div className={styles.App}>

    //   {/* <Route path='/' component={Header}/> */}
    //   <Route path='/' component={Nav} />
    //   <div className={styles.containerBody}>
    //     <Route exact path='/Home' component={Home}/>
    //     <Route exact path='/product/:id' component={Product} />
    //     <Route exact path='/Catalogue' component={Catalogue} />
    //     <Route exact path='/addproduct' component={AddProduct}/>
    //   </div>
    //   <Route path='/' component={Footer} />

    // </div>
  );
}

export default App;
