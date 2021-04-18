import React, { useEffect, useCallback } from "react";
import { getProductsByCategories } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./home.module.scss";
import { useTranslation } from "react-i18next";
import SwiperSlider from './Swiper/SwiperSlider'
export function Home() {

  const dispatch = useDispatch();
  const productByCategories = useSelector((state) => state.productByCategories);
  const stableDispatch = useCallback(dispatch, []);
  const [t, i18n] = useTranslation("global");
  useEffect(() => {
    stableDispatch(getProductsByCategories());
  }, [stableDispatch]);

  return (
    <div className={styles.container}>
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
            {productByCategories[0] && console.log(productByCategories[0].data)}
            {productByCategories[0] && <SwiperSlider products={productByCategories[0].data} />}
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
            {productByCategories[1] && console.log(productByCategories[1].data)}
            {productByCategories[1] && <SwiperSlider products={productByCategories[1].data} />}
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
            {productByCategories[2] && console.log(productByCategories[2].data)}
            {productByCategories[2] && <SwiperSlider products={productByCategories[2].data} />}
          </div>
        </div>

      </div>
    </div>
  );
}
