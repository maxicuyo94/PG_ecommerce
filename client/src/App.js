import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Catalogue} from './Components/Catalogue/Catalogue'
import {Product} from './Components/Product/Product'
import {Nav} from './Components/Nav/Nav'
import {Header} from './Components/Header/Header'
import {Footer} from './Components/Footer/Footer'



import { Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
   <Route path='/' component={Header}/>
   <Route path='/' component={Nav}/>
   <Route exact path='/product/:id' component={Product}/>
   <Route path='/' component={Catalogue}/>
   <Route path='/' component={Footer}/>
    </div>
  );
}

export default App;
