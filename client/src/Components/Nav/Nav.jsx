import React, { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
//import { SearchBar } from "../SearchBar/SearchBar";
//import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import style from "./nav.module.scss";
import MiniShop from "./MiniShop/MiniShop";
import BtnLang from "./BtnLang/BtnLang";
import BtnDark from './BtnDark/BtnDark'
import Profile from './Profile/Profile'
import { useSelector } from "react-redux";

export function Nav({ priority }) {
  // eslint-disable-next-line
  const userLoged = useSelector(state =>  state.usersReducer.userLoged)
  const [t, i18n] = useTranslation("global");
  const history = useHistory();


  return (
    <div className={style.container}>
      {/* <Header /> */}
      <div className={style.contents}>
        <div className={style.logo}>
          <NavLink to={"/landing"}>
            <img
              src={
                "https://res.cloudinary.com/techstore/image/upload/v1618082875/edobvt8ghwyblnagtkoj.png"
              } alt="Ups, we don't found anything here. Try again tomorrow!"
            />
          </NavLink>
        </div>
        <ul>
          <li>
            <Link to="/">
              <span>{t("navLink1.linkOne")}</span>
            </Link>
          </li>
          <li>
            <Link to="/catalogue">
              <span>{t("navLink2.linkTwo")}</span>
            </Link>
          </li>
          {userLoged?.id&&<li>
            <Link to="/controlpanel">
              <span>{t("navLink6.linkSix")}</span>
            </Link>
          </li>  }        
          <li>
            <MiniShop />
          </li>
          <li>
            <BtnLang />
          </li>
          <li>
            <BtnDark />
          </li>
          <Profile/>
        </ul>
      </div>
    </div>
  );
}
