import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Searchbar } from './Components/Searchbar/Searchbar'
import { Catalogo } from './Components/Catalogo/Catalogo'
import { Product } from './Components/Product/Product'
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path='/' component={Searchbar} />
      <Route exact path='/product/:id' component={Product} />
      <Route path='/' component={Catalogo} />

    </div>
  );
}

export default App;
