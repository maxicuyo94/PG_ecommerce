import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './catalogue.module.scss'
import { Link } from 'react-router-dom'
import { SearchBar } from '../SearchBar/Searchbar';
import { ProductCard } from '../ProductCard/ProductCard'
import { allProducts, getCategories, getProductsByCategories } from '../../Redux/Actions/actions'
import left from '../Catalogue/left-arrow.svg'
import right from '../Catalogue/right-arrow.svg'


export function Catalogue() {
  let i = true;
  const Productos = useSelector(state => state.wantedProducts)
  const Categories = useSelector(state => state.categories)
  const Filter = useSelector(state => state.filters)
  const [Pages, setPages] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allProducts(Pages * 4, (Pages * 4) + 3));
    dispatch(getCategories())
  }, [Pages])

  // useEffect(() => {
  //   dispatch(allProducts(Filter.categories, Filter.prices, Filter.pages))
  // }, [Filter])

  const handleInputChange = (e) => {
    if (e.target.value !== "All") {
      return dispatch(allProducts(Pages * 4, (Pages * 4) + 3));
    }
    dispatch(allProducts(Pages * 4, (Pages * 4) + 3));
  }

  function changepage(e) {
    if (e.target.id === "backward" && Pages > 0) {
      setPages(Pages - 1)
    }
    if (e.target.id === "upward" && Productos.length) {
      setPages(Pages + 1)
    }
  }

  return (
    <div className={Style.container}>
      <div name='filtros' className={Style.filters}>
        <div name='categories' className={Style.categoriesPrice}>
          <div className={Style.searchFilter}>
            <h4>Filters</h4>
          </div>
          <h4>Categories</h4>
          <select className={Style.categories} onChange={handleInputChange}>
            <option value="All">All</option>
            {Categories && Categories.map((item, i) => <option key={i} value={item.name}>{item.name}</option>)}
          </select>
        </div>
        <div name='Price' className={Style.categoriesPrice}>
          <h4>Prices</h4>
          <select>
            <option value="All">All</option>
            <option value="100">0 - 100</option>
            <option value="300">100 - 300</option>
            <option value="500">300 - + </option>
          </select>
        </div>
        <div>
          <h4 className={Style.tags}>Brands</h4>
          <button>All Brands</button>
        </div>
      </div>
      {/* <div className={i === true ? Style.Div : Style.DivB} name='muestraproducts'> */}
      <div className={Style.catalogue} name='muestraproducts'>
        <div className={Style.keypad}>
          <div>
            <img className={Style.backward} id="backward" type="image" src={left} alt="img" onClick={e => changepage(e)} />
            <img className={Style.upward} id="upward" type="image" src={right} alt="img" onClick={e => changepage(e)} />
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