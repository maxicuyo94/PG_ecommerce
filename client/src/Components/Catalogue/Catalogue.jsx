import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import Style from './catalogue.module.scss'
=======
import Style from './catalogue.module.css'



>>>>>>> develop
import { Link } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
import { ProductCard } from '../ProductCard/ProductCard'
import { allProducts, getCategories, getProductsByCategories } from '../../Redux/Actions/actions'
import left from '../Catalogue/left-arrow.svg'
import right from '../Catalogue/right-arrow.svg'



export function Catalogue() {
  let i = true;
  const Productos = useSelector(state => state.wantedProducts)
  const [Pages, setPages] = useState(0)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(allProducts(Pages * 4, (Pages * 4) + 3))
  }, [Pages])

<<<<<<< HEAD
  function handlesubmit(e) {
    e.preventDefault();
    dispatch(allProducts())
  }
  //[0,3] [4,7] [8,11] [12,15] [16,19]
=======
console.log(Productos)
>>>>>>> develop
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


  // if( i === true){
  //   i = false
  //   return console.log(i)}
  // if( i === false){
  //   i = true;
  //   return console.log(i)
  // }

  return (
    <div className={Style.container}>
      <div name='filtros' className={Style.filters}>
        <div name='categories' className={Style.categoriesPrice}>
          <div className={Style.searchFilter}>
            <h4>Filters</h4>
            <SearchBar></SearchBar>
          </div>
          <h4>Categories</h4>
          <Link>Custom PCs</Link>
          <Link>All-in-One</Link>
          <Link>Compac PCs</Link>
        </div>

<<<<<<< HEAD
        <div name='Price' className={Style.categoriesPrice}>
          <h4>Prices</h4>
          <Link>0 - 1.000</Link>
          <Link>1.000 - 5.000</Link>
          <Link>5.000 - + </Link>
        </div>
        <div>
          <h4 className={Style.tags}>Brands</h4>
          <button>All Brands</button>
=======
      <select id='show'>
        <option value="" disabled selected>Change view..</option>
        <option value='list' id='list'>List</option>
        <option value='catalogue' id='catalogue'>Catalogue</option>
      </select>
    </div>
    <input style={{width:"20px", position:'relative', right:'50px'}} id="backward" type="image" src={left} alt="img" onClick={e => changepage(e)} />
    <input style={{width:"20px", position:'relative', right:'50px'}} id="upward" type="image" src={right} alt="img" onClick={e => changepage(e)} />
    <div className={i === true ? Style.Div : Style.DivB} name='muestraproducts'>
      {
        Productos && Productos.map((item, id) =>
          <ProductCard key={id} name={item.name} price={item.price} images={item.images[0]} id={item.id} />
        )
      }
    </div>
    <div name='filtros' className={Style.Div4}>
      <div name='categories' className={Style.Div5}>
        <div>
          <h1 className={Style.tags}>Filters</h1>
>>>>>>> develop
        </div>
      </div>
      {/* <div className={i === true ? Style.Div : Style.DivB} name='muestraproducts'> */}
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

<<<<<<< HEAD
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
=======
      <div name='Price' className={Style.Div5}>
        <h1 className={Style.tags}>Prices</h1>
        <button onClick={(e) => filters(e,'0-100')}>0 - 100</button>

        <button onClick={(e) => filters(e,'0-300')}>100 - 300</button>

        <button onClick={(e) => filters(e,'+')}>300 - +</button>
      </div>
      <div>
        <h1 className={Style.tags}>Brands</h1>
        <button>All Brands</button>
>>>>>>> develop
      </div>

    </div>
  )
}