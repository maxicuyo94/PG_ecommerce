import React, { useEffect, useCallback } from "react";
import { getProductsByCategories } from "../../Redux/Products/productActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.scss";
import { useTranslation } from "react-i18next";
import SwiperSlider from "./Swiper/SwiperSlider";
import { Banner2 } from "../Banner/Banner";
export function Home(props) {
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

  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
    <Banner2></Banner2>
      <div className={styles.containerTitle}>
        <span>{t("home.title")}</span>
      </div>
      <div className={styles.products}>
        <div className={styles.containerP}>
          <div className={styles.title}>
          <img style={{width:'45%'}}
              src={
                "https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png"
              } alt="Ups, we don't found anything here. Try again tomorrow!"
            />
            <span className={styles.tag}>{t("home-cat1.processors")}</span>
          </div>
          <div className={styles.carousel}>
            {productByCategories[0] && (
              <SwiperSlider products={productByCategories[0].data} />
            )}
          </div>
        </div>
        <div className={styles.containerP}>
          <div className={styles.title}>
          <img style={{width:'45%'}}
              src={
                "https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png"
              } alt="Ups, we don't found anything here. Try again tomorrow!"
            />
            <span className={styles.tag}>{t("home-cat2.laptops")}</span>
          </div>
          <div className={styles.carousel}>
            {productByCategories[1] && (
              <SwiperSlider products={productByCategories[1].data} />
            )}
          </div>
        </div>
        <div className={styles.containerP}>
          <div className={styles.title}>
          <img style={{width:'45%'}}
              src={
                "https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png"
              } alt="Ups, we don't found anything here. Try again tomorrow!"
            />
            <span className={styles.tag}>{t("home-cat3.keyboards")}</span>
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