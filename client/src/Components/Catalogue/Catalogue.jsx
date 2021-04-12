import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../ProductCard/ProductCard";
import { allProducts, getCategories } from "../../Redux/Actions/actions";
import left from "../Catalogue/left-arrow.svg";
import right from "../Catalogue/right-arrow.svg";
import Style from "./catalogue.module.scss";

export function Catalogue() {
  const Products = useSelector(state => state.wantedProducts)
  const Categories = useSelector(state => state.categories)
  const [Pages, setPages] = useState(0)
  const [Category, setCategory] = useState('')
  const [Prices, setPrices] = useState('')
  const dispatch = useDispatch()
  const [Input, setInput] = useState({ input: '' })
  
  const handlechange = (e) => {
    e.preventDefault();
    setInput({ ...Input, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(allProducts(Pages * 4, ((Pages * 4) + 4), Category, Prices,Input.input));
    dispatch(getCategories())
  }, [Pages, Category, Prices, Input])

  const handleInputChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleInputChangeP = (e) => {
    e.preventDefault();
    setPrices(e.target.value);
  };

  function changepage(e) {
    if (e.target.id === "backward" && Pages > 0) {
      setPages(Pages - 1);
    }
    if (e.target.id === "upward" && Products.length) {
      setPages(Pages + 1);
    }
  }

  return (
    <div className={Style.container}>
      <div name="filters" className={Style.filters}>
        <div name="categories" className={Style.categoriesPrice}>
          <div className={Style.searchFilter}>
          <input className={Style.Input} placeholder='Search...' onChange={(e) => handlechange(e)} value={Input.input} name='input'></input>
            <h4>Filters</h4>
          </div>
          <h4>Categories</h4>
          <select
            className={Style.categories}
            onChange={(e) => {
              handleInputChange(e);
            }}
          >
            <option value="">All</option>
            {Categories &&
              Categories.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div name="Price" className={Style.categoriesPrice}>
          <h4>Prices</h4>
          <select
            onChange={(e) => {
              handleInputChangeP(e);
            }}
          >
            <option value="">All</option>
            <option value="200">0 - 200</option>
            <option value="400">200 - 400</option>
            <option value="600">400 - + </option>
          </select>
        </div>
        <div>
          <h4 className={Style.tags}>Brands</h4>
          <button>All Brands</button>
        </div>
      </div>
      <div className={Style.catalogue} name="showproducts">
        <div className={Style.keypad}>
          <div>
            <img
              className={Style.backward}
              id="backward"
              type="image"
              src={left}
              alt="img"
              onClick={(e) => changepage(e)}
            />
            <img
              className={Style.upward}
              id="upward"
              type="image"
              src={right}
              alt="img"
              onClick={(e) => changepage(e)}
            />
          </div>
        </div>
        <div className={Style.products}>
          {
            Products && Products.map((item) =>
              <ProductCard  name={item.name} price={item.price} images={item.images[0]} id={item.id} />
            )
          }
        </div>
      </div>
    </div>
  );
}
