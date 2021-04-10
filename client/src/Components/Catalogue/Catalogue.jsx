import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './catalogue.module.scss'
import { ProductCard } from '../ProductCard/ProductCard'
import { allProducts, getCategories, getProductsByCategories } from '../../Redux/Actions/actions'
import left from '../Catalogue/left-arrow.svg'
import right from '../Catalogue/right-arrow.svg'


export function Catalogue() {
  const Productos = useSelector(state => state.wantedProducts)
  const [Pages, setPages] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allProducts(Pages * 4, (Pages * 4) + 3))
  }, [Pages])

  function handlesubmit(e) {
    e.preventDefault();
    dispatch(allProducts())
  }

  function changepage(e) {

    if (e.target.id === "backward" && Pages > 0) {
      setPages(Pages - 1)
    }
    if (e.target.id === "upward" && Productos.length) {
      setPages(Pages + 1)
      console.log(Pages)
      console.log(e.target.id)
    }
  }

 function filters(e, priceA){
e.preventDefault();
dispatch(allProducts(Pages*4,(Pages*4)+3,priceA))
}

  return (
    <div className={Style.container}>
      <div name='filtros' className={Style.filters}>
        <div name='categories' className={Style.categoriesPrice}>
          <div className={Style.searchFilter}>
          <h1 className={Style.tags}>Filters</h1>
      <select id='category' className={Style.Div5}>

      <option >Search</option>


        <option value='Laptops'>Laptops</option>

        <option value='KeyBoards'>KeyBoards</option>

        <option value='Processors'>Processors</option>

        <option value='Monitors'>Monitors</option>

      </select>
      <h1 className={Style.tags}>Prices</h1>
      <select id='price' className={Style.Div5}>
      <option >Search</option>

        <option value='0-100'>0 - 100</option>

        <option value='0-300'>100 - 300</option>

        <option value='+'>300 - +</option>
      </select>

      <button onClick={(e) => filters(e,document.getElementById('price').value, document.getElementById('category').value)}>Filtrar</button>

      <div>
        <h1 className={Style.tags}>Brands</h1>
        <button>All Brands</button>
      </div>
            </div>
            </div>
            
      </div>
      <div className={Style.catalogue} name='muestraproducts'>
        <div className={Style.keypad}>
          <div>
            <img className={Style.backward} id="backward" type="image" src={left} alt="img" onClick={e => changepage(e)} />
            <img className={Style.upward} id="upward" type="image" src={right} alt="img" onClick={e => changepage(e)} />
          </div>
          <div name='botonera'>
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
              <option value="" disabled selected>Change view..</option>
              <option value='list' id='list'>List</option>
              <option value='catalogue' id='catalogue'>Catalogue</option>
            </select>
            <button onClick={(e) => handlesubmit(e)}></button>
          </div>
        </div>
        <div className={Style.products}>
          {
            Productos && Productos.map((item, id) =>
              <ProductCard key={id} name={item.name} price={item.price} images={item.images[0]} />
            )
          }
        </div>
      </div>

    </div>
  )
}