
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Style from './catalogue.module.css'
import {Link} from 'react-router-dom'

import {SearchBar} from '../SearchBar/SearchBar'
import {ProductCard} from '../ProductCard/ProductCard'
import {allProducts, getCategories, getProductsByCategories } from '../../Redux/Actions/actions'



export  function Catalogue() {
  let i = true;
  
  const dispatch = useDispatch()
    useEffect(()=> {const Buscar = async () => await  dispatch(allProducts()); Buscar()} , [])
  const EJProductos = useSelector(state => state.wantedProducts)
  
  function handlesubmit(e){
  e.preventDefault();
  dispatch(allProducts())
  }

  // if( i === true){
  //   i = false
  //   return console.log(i)}
  // if( i === false){
  //   i = true;
  //   return console.log(i)
  // }
  
  return (
  <div name='all'>
   <div className={Style.Div3} name='botonera'>
    <select>
      <option value="" disabled selected>Sort by..</option>
      <option value='compu' id='compu'>Compu</option>
      <option value='servicios' id='servicios'>Servicios</option>
      <option value='precios' id='precios'>Precios</option>
    </select>
  
    <select>
      <option value="" disabled selected>Show..</option>
      <option value='35' id='35'>Compu</option>
      <option value='15' id='15'>Servicios</option>
      <option value='15' id='15'>Precios</option>
    </select>
  
    <select id='show'> 
      <option  value="" disabled selected>Change view..</option>
      <option value='list' id='list'>List</option>
      <option value='catalogue' id='catalogue'>Catalogue</option>
    </select>
    <button onClick={(e)=> handlesubmit(e)}></button>
   </div>
      <div className={ i === true ? Style.Div : Style.DivB} name='muestraproducts'>
      {
          EJProductos && EJProductos.map((item, id) => (
             <ProductCard></ProductCard>
              ))
      }
   </div>
  
  
   <div name='filtros' className={Style.Div4}>
      <div name='categories' className={Style.Div5}>
      <div>
          <h1 className={Style.tags}>Filters</h1>
          <SearchBar></SearchBar>
      </div>
      <h1 className={Style.tags}>Categories</h1>
        <Link>Custom PCs</Link>
        <Link>All-in-One</Link>
        <Link>Compac PCs</Link>
       </div>
  
       <div name='Price' className={Style.Div5}>
       <h1 className={Style.tags}>Prices</h1>
       <Link>0 - 1.000</Link>
        <Link>1.000 - 5.000</Link>
        <Link>5.000 - + </Link>
       </div>
       <div>
          <h1 className={Style.tags}>Brands</h1>
          <button>All Brands</button>
      </div>
   </div>
  </div>
  )}