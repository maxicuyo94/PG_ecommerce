import React from "react";
import style from "./footer.module.scss";

export function Footer() {
  return (
    <div className={style.container}>
      <div className={style.signNL}>
        <h4>Sign up to our NewsLetter</h4>
        <input className={style.input} placeholder="Email.." />
        <button className={style.input}>Suscribe</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h4>Information</h4>
        </div>
        <div>
          <h4>PC parts</h4>
        </div>
        <div>
          <h4>Desktop PC</h4>
        </div>
        <div>
          <h4>Laptops</h4>
        </div>
      </div>
    </div>
  );
}
