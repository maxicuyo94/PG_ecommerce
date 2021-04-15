import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import style from "./nav.module.scss";
import MiniShop from './MiniShop/MiniShop'
export function Nav() {
  const [t, i18n] = useTranslation("global");

  return (
    <div className={style.container}>
        <Header />
        <div className={style.contents}>
          <div className={style.logo}>
          <NavLink to={'/landing'}>
            <img src={'https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png'} />
          </NavLink>
        </div>
          <ul>
            <li>
              <Link to="/">
                <text>Home</text>
              </Link>
            </li>
            <li>
              <Link to='/catalogue'>
                <text>
                  Catalogue
                </text>
              </Link>
            </li>
            <li>
              <Link to='/controlpanel'>
                <text>
                  Control Panel
                </text>
              </Link>
            </li>
            <li>
              <MiniShop />
            </li>
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
