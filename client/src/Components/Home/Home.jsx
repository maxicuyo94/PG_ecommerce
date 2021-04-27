import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getProductsByCategories } from "../../Redux/Products/productActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./home.module.scss";
import { useTranslation } from "react-i18next";
import SwiperSlider from "./Swiper/SwiperSlider";
import { checkout } from "../../Redux/Cart/cartActions";
import swal from "sweetalert";

export function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const productByCategories = useSelector(
    (state) => state.productReducer.productByCategories
  );
  const stableDispatch = useCallback(dispatch, []);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  //const dark = useSelector((state) => state.darkReducer.dark)
  let amount = localStorage.getItem("amountTotal") && JSON.parse(localStorage.getItem("amountTotal"))
  
  const urlParams = new URLSearchParams(window.location.search);
  let status = urlParams.get('merchant_order_id') && urlParams.get('merchant_order_id');
  let userOrder = urlParams.get('status') && urlParams.get('status');
  let userId = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[1];
  let userEmail = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[0];
  let userName = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[2];
  let userSurname = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[3];

  if (urlParams.get('status')) {
    let responseStatus = status === 'approved'?'success'
    :status === 'rejected'?'error':'warning'
    swal(`Payment ${status}`, "", responseStatus)
    if (!userId) {
      dispatch(checkout(null, status, amount,userEmail));
    } else {
      dispatch(
        checkout(userId, status, amount,userEmail)
      );
    }
    history.push("/");
  };

  useEffect(() => {
    stableDispatch(getProductsByCategories());
  }, [stableDispatch]);

  return (
    <div className={props.dark ? styles.containerDark : styles.container}>
      <div className={styles.containerTitle}>
        <span>{t("home.title")}</span>
      </div>
      <div className={styles.products}>
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