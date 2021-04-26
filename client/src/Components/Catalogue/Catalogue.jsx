import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../ProductCard/ProductCard";
import {
  allProducts,
  getCategories,
} from "../../Redux/Products/productActions";
import left from "../Catalogue/left-arrow.svg";
import right from "../Catalogue/right-arrow.svg";
import Style from "./catalogue.module.scss";
import { useTranslation } from "react-i18next";

const Stylish = {
  fontFamily:'roboto',

}
const Stylish2 = {
  fontFamily:'roboto',
  border:'solid'

}

export function Catalogue() {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const Products = useSelector((state) => state.productReducer.wantedProducts);
  const Categories = useSelector((state) => state.productReducer.categories);
  const [Pages, setPages] = useState(0);
  const [Category, setCategory] = useState("");
  const [Prices, setPrices] = useState(["", ""]);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const Input = useSelector(state => state.productReducer.Searchingg)

  

  useEffect(() => {
    setPages(0);
  }, [Category, Prices]);

  useEffect(() => {
    stableDispatch(
      allProducts(Pages * 4, Pages * 4 + 4, Category, Prices, Input)
    );
    dispatch(getCategories());
  }, [dispatch, stableDispatch, Pages, Category, Prices, Input]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };
  const handleclick = () => {
    setCategory("");
  }

  const handleInputChangeP = (e) => {
    e.preventDefault();
    e.target.value === ""
      ? setPrices(["", ""])
      : e.target.value === "400"
      ? setPrices([e.target.value, ""])
      : setPrices([e.target.value, 200 + parseInt(e.target.value)]);
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
            <h4>{t("catalogue.textTwo")}</h4>
          </div>
          <h4>{t("catalogue.texThree")}</h4>
          <select id='categories'
            className={Style.categories}
            onChange={(e) => {
              handleInputChange(e);
            }}
          >
            <option value="">{t("catalogue.textFour")}</option>
            {Categories &&
              Categories.map((item, i) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div name="Price" className={Style.categoriesPrice}>
          <h4>{t("catalogue.textFive")}</h4>
          <select id='prices'
            onChange={(e) => {
              handleInputChangeP(e);
            }}
          >
            <option value="">{t("catalogue.textSix")}</option>
            <option value="0">0 - 200</option>
            <option value="200">200 - 400</option>
            <option value="400">400 - + </option>
          </select>
        </div>
        <div>
          <h4 className={Style.tags}>{t("catalogue.textSeven")}</h4>
          <button>{t("catalogue.textEight")}</button>
        </div>
        <div>
          <label style={Stylish}>Category: </label>
          {
            document.getElementById('categories') && (<div>
            <h3 style={Stylish2}> 
              {document.getElementById('categories').value}
              {/* <button onClick={() => handleclick()}>X</button> */}
            </h3>
            </div>)
          }
           <label style={Stylish}>Prices: </label>
             {
            document.getElementById('prices') && (<div>
            <h3 style={Stylish2}> 
              {document.getElementById('prices').value}
              {/* <button>X</button> */}
            </h3> 
            </div>)
          }
        </div>
      </div>
      <div className={Style.catalogue} name="showproducts">
        <div className={Style.keypad}>
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

        <div>
          <div className={Style.products}>
            {console.log(Products)}
            {Products &&
              Products.map((item) => (
                <ProductCard
                  stock={item.stock}
                  title={item.name}
                  price={item.price}
                  images={item.images[0]?.url}
                  id={item.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}