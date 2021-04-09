import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Catalogue } from './Components/Catalogue/Catalogue'
import { Product } from './Components/Product/Product'
import { Nav } from './Components/Nav/Nav'
// import {Header} from './Components/Header/Header'
import { Footer } from './Components/Footer/Footer'
import { Route, Router } from "react-router-dom"
import { ProductCard } from './Components/ProductCard/ProductCard'
import {Home} from './Components/Home/Home'


function App() {
  return (
    <div className="App">
      {/* <Route path='/' component={Header}/> */}
      <Route path='/' component={Nav} />
      <div className="">
        <Route exact path='/Home' component={Home}/>
        <Route exact path='/product/:id' component={Product} />
        <Route exact path='/Catalogue' component={Catalogue} />
        <Route path='/' component={Footer} />
      </div>
    </div>
  );
}

export default App;
