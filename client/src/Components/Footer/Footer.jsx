import React from "react";
import style from "./footer.module.scss";
import { useTranslation } from "react-i18next";

export function Footer() {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  return (
    <div className={style.container}>
      <div className={style.contents}>
        <div className={style.signNL}>
          <h4>{t("footer.textOne")}</h4>
          <input
            className={style.input}
            placeholder={t("footer.placeholder")}
          />
          <button className={style.input}>{t("footer.textTwo")}</button>
        </div>
        <div className={style.info}>
          <div>
            <h4>{t("footer.texThree")}</h4>
          </div>
          <div>
            <h4>{t("footer.textFour")}</h4>
          </div>
          <div>
            <h4>{t("footer.textFive")}</h4>
          </div>
          <div>
            <h4>{t("footer.textSix")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
