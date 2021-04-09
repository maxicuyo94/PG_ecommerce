import React from 'react';
import {useSelector} from 'react-redux';
import Style from './catalogue.module.css'
import {Link} from 'react-router-dom'
import {SearchBar} from '../SearchBar/SearchBar'

const EJProductos = [{Nombre:'aa'}, {Nombre:'bbb'}, {Nombre:'ccc'},]

export function Catalogue() {

// const Productos = useSelector(state => state.Productos)

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
  <select>
    <option value="" disabled selected>Change view..</option>
    <option value='List' id='list'>List</option>
    <option value='catalog' id='catalog'>Catalog</option>
  </select>
 </div>
    <div className={Style.Div} name='muestraproducts'>
    {
        EJProductos && EJProductos.map((item, id) => (
            <div className={Style.Div2}>
            <h1>{item.Nombre}</h1>
            </div>
            ))
    }
 </div>
 <div name='filtros' className={Style.Div4}>
    <div name='categories' className={Style.Div5}>
    <div>
        <h1>Filters</h1>
        <SearchBar></SearchBar>
    </div>
    <h1>Categories</h1>
      <Link>Custom</Link>
      <Link>Otra</Link>
      <Link>Otra</Link>
     </div>

     <div name='Price' className={Style.Div5}>
     <h1>Prices</h1>
     <Link>0 - 1.000</Link>
      <Link>1.000 - 5.000</Link>
      <Link>5.000 - + </Link>
     </div>
     <div>
        <h1>Brands</h1>
        <button>All Brands</button>
    </div>
 </div>
</div>
)}