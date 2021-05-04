import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getProductsByCategories, getProductsVisited } from "../../Redux/Products/productActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.scss";
import { useTranslation } from "react-i18next";
import SwiperSlider from "./Swiper/SwiperSlider";
import { checkout, checkstock } from "../../Redux/Cart/cartActions";
import swal from "sweetalert";
import queryString from 'query-string';
import { Banner2 } from '../Banner/Banner'
import axios from 'axios';

export function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );
  const lastProducts = useSelector(state => state.productReducer.lastProducts)
  const stableDispatch = useCallback(dispatch, []);
  // eslint-disable-next-line
  const [t] = useTranslation("global");
  //const dark = useSelector((state) => state.darkReducer.dark)

  const queryParams = queryString.parse(window.location.search);

  let amount = localStorage.getItem("amountTotal") && JSON.parse(localStorage.getItem("amountTotal"))
  let products = useSelector((state) => state.cartReducer.cart);
  let lsemail = localStorage.getItem("supabase.auth.token")?.currentSession && JSON.parse(localStorage.getItem("supabase.auth.token").currentSession.user.email)

  let idOrder = queryParams.merchant_order_id
  let status = queryParams.status
  let external = queryParams.external_reference
  let mpEmail = external && external.split(',')[0];
  let userId = external && external.split(',')[1];
  let streetName = external && external.split(',')[2];
  let streetNumber = external && external.split(',')[3];
  let postalCode = external && external.split(',')[4];
  let discount = external && external.split(',')[7];
  let address = `${streetName} ${streetNumber}`
  let userEmail = lsemail ? lsemail : mpEmail;
  let discountPoints = discount == 0.1 ? 1000 : discount == 0.2 ? 2000 : discount == 0.4 ? 10000 : null;

  const fecha = new Date();
  const hoy = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

  if (status) {
    let responseStatus = status === 'approved' ? 'success'
      : status === 'rejected' ? 'error' : 'warning'
    swal(`Payment ${status}`, "", responseStatus)

    if (userId !== 'undefined') {
      const response = dispatch(checkstock(userId, status, (amount * (1 - discount)), discountPoints, products))
      response && dispatch(checkout(userId, status, amount, userEmail, address, postalCode))
    } else {
      const produc = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"))
      const response = dispatch(checkstock(null, status, (amount * (1 - discount)), discountPoints, produc))
      response && dispatch(checkout(null, status, amount, userEmail, address, postalCode))
    }
    history.push("/");
  };

  useEffect(() => {
    stableDispatch(getProductsByCategories());

  }, [stableDispatch]);


  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <Banner2 />
      <div className={styles.containerTitle}>
        <span>{t("home.title")}</span>
      </div>
      <div className={styles.products}>
        {lastProducts?.length > 0 && <div className={styles.containerP}>
          <div className={styles.title}>
            <span>¡This product has to be yours!</span>
          </div>
          <div className={styles.carousel}>
            {lastProducts.length > 0 && (
              <SwiperSlider products={lastProducts} />
            )}
          </div>
        </div>}
        <div className={styles.containerP}>
          <div className={styles.title}>
            <span>{t("home-cat1.processors")}</span>
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