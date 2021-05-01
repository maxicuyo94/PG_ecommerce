import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../ProductCard/ProductCard";
import {
  allProducts,
  getCategories,
} from "../../Redux/Products/productActions";
import left from "../../Assets/static/arrow-back.svg";
import right from "../../Assets/static/arrow-next.svg";
import Style from "./catalogue.module.scss";
import { useTranslation } from "react-i18next";



export function Catalogue() {
  const [t, i18n] = useTranslation("global");
  const Products = useSelector((state) => state.productReducer.wantedProducts);
  const Categories = useSelector((state) => state.productReducer.categories);
  const [Pages, setPages] = useState(0);
  const [Category, setCategory] = useState("");
  const [Prices, setPrices] = useState(["", ""]);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const Input = useSelector(state => state.productReducer.Searchingg)
  const [Count, setCount] = useState(true)



  useEffect(() => {
    setPages(0);
  }, [Category, Prices]);

  useEffect(() => {
    stableDispatch(
      allProducts(Pages * 4, Pages * 4 + 4, Category, Prices, Input, Count)
    );
    dispatch(getCategories());
  }, [dispatch, stableDispatch, Pages, Category, Prices, Input, Count]);

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
            <h4 className={Style.title}>{t("catalogue.textTwo")}</h4>
          </div>
          <h3 className={Style.tag}>{t("catalogue.texThree")}</h3>
          <select id='categories'
            className={Style.select}
            onChange={(e) => {
              handleInputChange(e);
            }}
          >
            <option className={Style.tagg} value="">{t("catalogue.textFour")}</option>
            {Categories &&
              Categories.map((item, i) => (
                <option className={Style.tagg} key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div name="Price" className={Style.categoriesPrice}>
          <h3 className={Style.tag}>{t("catalogue.textFive")}</h3>
          <select id='prices' className={Style.select}
            onChange={(e) => {
              handleInputChangeP(e);
            }}
          >
            <option className={Style.tagg} value="">{t("catalogue.textSix")}</option>
            <option className={Style.tagg} name="0 - 200" value="0">0 - 200</option>
            <option className={Style.tagg} value="200">200 - 400</option>
            <option className={Style.tagg} value="400">400 - + </option>
          </select>
        </div>

        <div>
          <h3 className={Style.tag}>{t("catalogue.category")}:</h3>
          {
            document.getElementById('categories') && (<div>
            <label className={Style.tag}>
              {document.getElementById('categories').value}
            </label>
            </div>)
          }
           <h3 className={Style.tag}>{t("catalogue.prices")}:</h3>
             {
            document.getElementById('prices') && (<div>
            <label className={Style.tag}>
              {document.getElementById('prices').value}
            </label>
            </div>)
          }
        </div>
      </div>
      <div className={Style.catalogue} name="showproducts">
      <div style={{width:"56rem"}}>
        <div className={Style.keypad}>
        <button className={Style.button} onClick={() => Count === true ? setCount(false) : setCount(true)}>
            {t("catalogue.view")}
          </button>
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
      </div>
        <div>
          <div className={Count === true ? Style.products : Style.products2}>
            {Products &&
              Products.map((item) => (
                <ProductCard
                  stock={item.stock}
                  title={item.name}
                  price={item.price}
                  image={item.images[0]?.url}
                  id={item.id}
                  discount={item.discount}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
