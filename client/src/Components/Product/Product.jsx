import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "./Slider/Slider";
import { productDetail } from "../../Redux/Actions/actions";
import { NavLink } from "react-router-dom";
import styles from "./Product.module.scss";

export const Product = (props) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.productDetail);
  const id = props.match.params.id;
  const [value, setValue] = useState(1);
  const handleSum = () => {
    value < details.stock && value < 10 && setValue(value + 1);
  };
  const handleRes = () => {
    value > 1 && setValue(value - 1);
  };
  useEffect(() => {
    const idDetails = async () => {
      await dispatch(productDetail(id));
    };
    idDetails();
    //console.log('estoy en product: ', details)
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.info}>
          <span>{details.name}</span>
          <div className={styles.desc}>
            <ul className={styles.values}>
              {details.description &&
                Object.entries(details.description).map(([key, value]) => {
                  return (
                    <li key={key}>
                      <b>{key}</b>: {value.toString()}
                    </li>
                  );
                })}
            </ul>
            <NavLink to={`/modifyProduct/${id}`}>
              <button>Modify Product</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles.images}>
        <div className={styles.carousel}>
          <Slider images={details.images} />
        </div>
        <div className={styles.buy}>
          <label>
            On sale from <b>${(details.price * value).toFixed(2)}</b>
          </label>
          <div className={styles.cont}>
            <input type="text" value={value} disabled />
            <div className={styles.change}>
              <button onClick={handleSum}>+</button>
              <button onClick={handleRes}>-</button>
            </div>
          </div>
          <button
            onClick={() => {
              alert("The product is yours!");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
