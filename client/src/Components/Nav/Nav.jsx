import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import style from "./nav.module.scss";

export function Nav() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className={style.container}>
      <Header />
      <div className={style.contents}>
        <ul>
          <li>
            <Link to="/">
              <text>{t("navLink1.linkOne")}</text>
            </Link>
          </li>
          <li>
            <Link to="/catalogue">
              <text>{t("navLink2.linkTwo")}</text>
            </Link>
          </li>
          <li>
            <Link to="/addproduct">
              <text>{t("navLink3.linkThree")}</text>
            </Link>
          </li>
          {/* <li>
              <SearchBar />
            </li> */}
          <li>
            <Link to="/login">
              <text>{t("navLink4.linkFour")}</text>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <text>{t("navLink5.linkFive")}</text>
            </Link>
          </li>
          <li>
            <button onClick={() => i18n.changeLanguage("es")}>ES</button>
          </li>
          <li>
            <button onClick={() => i18n.changeLanguage("en")}>EN</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
