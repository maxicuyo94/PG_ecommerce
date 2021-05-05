import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { ProductCard } from "../ProductCard/ProductCard";
import { useLocation, useHistory } from 'react-router-dom'
import { allProducts, getCategories, } from "../../Redux/Products/productActions";
//import left from "../../Assets/static/arrow-back.svg";
//import right from "../../Assets/static/arrow-next.svg";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import styles from "./catalogue.module.scss";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { CategoriesHome } from '../Home/Categories/CategoriesHome'
import { Banner2 } from '../Banner/Banner'
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import Cards from './Cards/Cards'
export function Catalogue({ dark }) {
  const [t, i18n] = useTranslation("global");
  const Products = useSelector((state) => state.productReducer.wantedProducts);
  const Categories = useSelector((state) => state.productReducer.categories);
  const [Pages, setPages] = useState(0);
  const [Category, setCategory] = useState("");
  const [Prices, setPrices] = useState(["", ""]);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const Input = useSelector(state => state.productReducer.Searchingg)
  const [view, setView] = useState(false)


  const location = useLocation()
  const history = useHistory()

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  let query = useQuery();


  useEffect(() => {
    setPages(0);
  }, [Category, Prices]);

  useEffect(() => {
    if (query.has('category')) {
      const selectQuery = query.get('category')
      stableDispatch(
        allProducts(Pages * 4, Pages * 4 + 4, selectQuery, Prices, Input)
      );
    } else {
      stableDispatch(
        allProducts(Pages * 4, Pages * 4 + 4, Category, Prices, Input)
      );
    }

    dispatch(getCategories());

  }, [dispatch, stableDispatch, Pages, Category, Prices, Input, history.location.pathname, history.location.search]);


  const handleInputChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };


  const handleInputChangeP = (e) => {
    e.preventDefault();
    e.target.value === ""
      ? setPrices(["", ""])
      : e.target.value === "400"
        ? setPrices([e.target.value, ""])
        : setPrices([e.target.value, 200 + parseInt(e.target.value)]);
  };

  const prevPage = () => {

    Pages > 0 && setPages(Pages - 1);
  }
  const nextPage = () => {
    Products.length > 3 && setPages(Pages + 1);
  }

  return (
    <div
      className={
        dark && view ?
          styles.containerDark :
          dark && !view ?
            styles.containerListDark :
            !dark && view ? styles.container : styles.containerList
      }>
      <div className={styles.filter}>
        <div className={styles.title}>
          <span>{t("catalogue.textTwo")}</span>
        </div>
        <div className={styles.categories}>

          <span>{t("catalogue.texThree")}</span>
          <select onChange={handleInputChange}>
            <option value="">{t("catalogue.textFour")}</option>
            {Categories?.map((category, i) => (
              <option value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className={styles.price}>
          <span>{t("catalogue.textFive")}</span>
          <select onChange={handleInputChangeP}>
            <option value="">{t("catalogue.textSix")}</option>
            <option value="0">0 - 200</option>
            <option value="200">200 - 400</option>
            <option value="400">400 - + </option>
          </select>
        </div>
        <div className={styles.view}>
          <span>{t("catalogue.view")} </span>
          <button onClick={() => { setView(!view) }}>
            {!view ?
              <ViewModuleOutlinedIcon />
              : <ViewListOutlinedIcon />}
          </button>
        </div>
        <div className={styles.pagination}>
          <button onClick={prevPage}>
            <ArrowBackIosOutlinedIcon style={{ fontSize: '1rem' }} />
          </button>
          <input type='text' value={Pages + 1} disabled />
          <button onClick={nextPage}>
            <ArrowForwardIosOutlinedIcon style={{ fontSize: '1rem' }} />
          </button>
        </div>
      </div>
      <div className={styles.products}>

        <div className={styles.searched}>
          {Products?.map((item) => (
            <Cards
              key={item.id}
              id={item.id}
              stock={item.stock}
              title={item.name}
              price={item.price}
              image={item.images}
              discount={item.discount}
              reviews={item.reviews}
              view={view}
            />
          ))
          }
        </div>
      </div>
    </div>
  );
}

/* <div>
          <h3>{t("catalogue.category")}:</h3>
          {
            document.getElementById('categories') && (<div>
              <label className={styles.tag}>
                {document.getElementById('categories').value}
              </label>
            </div>)
          }
          <h3>{t("catalogue.prices")}:</h3>
          {
            document.getElementById('prices') && (<div>
              <label className={styles.tag}>
                {document.getElementById('prices').value}
              </label>
            </div>)
          }
        </div> */