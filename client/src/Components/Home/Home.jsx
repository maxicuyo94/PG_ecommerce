import React, { useEffect, useState, useCallback } from "react";
import { getProductsByCategories } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./home.module.scss";
import { CategoriesHome } from "./Categories/CategoriesHome";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useTranslation } from "react-i18next";

export function Home() {
  const dispatch = useDispatch();
  const productByCategories = useSelector((state) => state.productByCategories);
  const [slide, setSlide] = useState(1);
  const stableDispatch = useCallback(dispatch, []);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    window.innerWidth < 601 ? setSlide(1) : setSlide(3);
    stableDispatch(getProductsByCategories());
  }, [stableDispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <h1>{t("home.title")}</h1>
      </div>
      <div className={styles.products}>
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat1.processors")}</span>
            <NavLink to={`/catalogue`}>
              <h6>{t("seeProducts.products")}</h6>
            </NavLink>
          </div>
          <div className={styles.carousel}>
            <Carousel
              arrows
              slidesPerPage={slide}
              infinite
              animationSpeed={200}
              centered
            >
              {productByCategories[0] &&
                productByCategories[0].data
                  .sort(() => Math.random() - 0.5)
                  .map((product, i) => {
                    {
                      return (
                        product.images && (
                          <CategoriesHome
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]}
                          />
                        )
                      );
                    }
                  })}
            </Carousel>
          </div>
        </div>
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat2.laptops")}</span>
            <NavLink to={`/catalogue`}>
              <h6>{t("seeProducts.products")}</h6>
            </NavLink>
          </div>
          <div className={styles.carousel}>
            <Carousel
              arrows
              slidesPerPage={slide}
              infinite
              animationSpeed={200}
              centered
            >
              {productByCategories[1] &&
                productByCategories[1].data
                  .sort(() => Math.random() - 0.5)
                  .map((product, i) => {
                    {
                      return (
                        product.images && (
                          <CategoriesHome
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]}
                          />
                        )
                      );
                    }
                  })}
            </Carousel>
          </div>
        </div>
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat3.keyboards")}</span>
            <NavLink to={`/catalogue`}>
              <h6>{t("seeProducts.products")}</h6>
            </NavLink>
          </div>
          <div className={styles.carousel}>
            <Carousel
              arrows
              slidesPerPage={slide}
              infinite
              animationSpeed={200}
              centered
            >
              {productByCategories[2] &&
                productByCategories[2].data
                  .sort(() => Math.random() - 0.5)
                  .map((product, i) => {
                    {
                      return (
                        product.images && (
                          <CategoriesHome
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]}
                          />
                        )
                      );
                    }
                  })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
