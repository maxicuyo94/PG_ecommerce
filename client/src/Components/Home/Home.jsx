import React, { useEffect, useCallback, useState } from "react";
import swal from "sweetalert";
import { useLocation } from 'react-router-dom'
import { getProductsByCategories } from "../../Redux/Products/productActions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./home.module.scss";
import { useTranslation } from "react-i18next";
import SwiperSlider from "./Swiper/SwiperSlider";

export function Home() {
  const location = useLocation()

  const [fromLocation, setFromLocation] = useState(()=>{
    if (location.state){
      return location.state.from
    }
  })
  const dispatch = useDispatch();
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );
  const stableDispatch = useCallback(dispatch, []);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  //const dark = useSelector((state) => state.darkReducer.dark)
  useEffect(() => {
    stableDispatch(getProductsByCategories());
  }, [stableDispatch]);


  if(fromLocation){
    swal(`Para ingresar a ${fromLocation} debe registrarse`)
    setFromLocation(null)
  }
  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <div className={styles.containerTitle}>
        <span>{t("home.title")}</span>
      </div>
      <div className={styles.products}>
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat1.processors")}</span>
            <NavLink to={`/catalogue`}>
              <p>{t("seeProducts.products")}</p>
            </NavLink>
          </div>
          <div className={styles.carousel}>
            {productByCategories[0] && (
              <SwiperSlider products={productByCategories[0].data} />
            )}
          </div>
        </div>
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat2.laptops")}</span>
            <NavLink to={`/catalogue`}>
              <p>{t("seeProducts.products")}</p>
            </NavLink>
          </div>
          <div className={styles.carousel}>
            {productByCategories[1] && (
              <SwiperSlider products={productByCategories[1].data} />
            )}
          </div>
        </div>
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat3.keyboards")}</span>
            <NavLink to={`/catalogue`}>
              <p>{t("seeProducts.products")}</p>
            </NavLink>
          </div>
          <div className={styles.carousel}>
            {productByCategories[2] && (
              <SwiperSlider products={productByCategories[2].data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
