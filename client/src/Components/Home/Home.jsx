import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getProductsByCategories, getProductsVisited } from "../../Redux/Products/productActions";
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
  const lastProducts = useSelector(state => state.productReducer.lastProducts)
  const stableDispatch = useCallback(dispatch, []);
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  //const dark = useSelector((state) => state.darkReducer.dark)
  let amount = localStorage.getItem("amountTotal") && JSON.parse(localStorage.getItem("amountTotal"))
  let lsemail = localStorage.getItem("supabase.auth.token")?.currentSession && JSON.parse(localStorage.getItem("supabase.auth.token").currentSession.user.email)  
  const urlParams = new URLSearchParams(window.location.search);
  let idOrder = urlParams.get('merchant_order_id') && urlParams.get('merchant_order_id');
  let status = urlParams.get('status') && urlParams.get('status');
  let mpEmail = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[0];
  let userId = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[1];
  let streetName = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[2];
  let streetNumber = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[3];
  let postalCode = urlParams.get('external_reference') && urlParams.get('external_reference').split(',')[4];
  let address = `${streetName} ${streetNumber}`
  let userEmail = lsemail?lsemail:mpEmail;
  

  const fecha = new Date();
  const hoy = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;

  if (urlParams.get('status')) {
    let responseStatus = status === 'approved'?'success'
    :status === 'rejected'?'error':'warning'
    swal(`Payment ${status}`, "", responseStatus)
    if (!userId) {
      dispatch(checkout(null, status, amount,userEmail,address,postalCode,hoy));
    } else {
      dispatch(
        checkout(userId, status, amount,userEmail,address,postalCode,hoy)
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