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
            <h4 className={Style.tag}>{t("catalogue.textTwo")}</h4>
          </div>
          <h4 className={Style.tag}>{t("catalogue.texThree")}</h4>
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
          <h4 className={Style.tag}>{t("catalogue.textFive")}</h4>
          <select id='prices' className={Style.select}
            onChange={(e) => {
              handleInputChangeP(e);
            }}
          >
            <option className={Style.tagg} value="">{t("catalogue.textSix")}</option>
            <option className={Style.tagg} value="0">0 - 200</option>
            <option className={Style.tagg} value="200">200 - 400</option>
            <option className={Style.tagg} value="400">400 - + </option>
          </select>
        </div>
     
        <div>
          <label className={Style.tag}>Category: </label>
          {
            document.getElementById('categories') && (<div>
            <h3 className={Style.tag}> 
              {document.getElementById('categories').value}
            </h3>
            </div>)
          }
           <label className={Style.tag}>Prices from: </label>
             {
            document.getElementById('prices') && (<div>
            <h3 className={Style.tag}> 
              {document.getElementById('prices').value}
            </h3> 
            </div>)
          }
        </div>
        <button className={Style.button} onClick={() => Count === true ? setCount(false) : setCount(true)}>
            Change view
          </button>
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
          <div style={{display:'flex'}}>
            <h4 className={Style.tagg}>Catalogue /</h4>

          {
           document.getElementById('categories') && <h4 className={Style.tagg}>{document.getElementById('categories').value}</h4> 
          }
          {
           document.getElementById('categories') && <h4 className={Style.tagg}>{document.getElementById('prices').value}  </h4> 
          }
          </div>
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