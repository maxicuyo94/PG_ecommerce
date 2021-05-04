import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar"
import { useTranslation } from "react-i18next";
import style from "./nav.module.scss";
import MiniShop from "./MiniShop/MiniShop";
import BtnLang from "./BtnLang/BtnLang";
import BtnDark from './BtnDark/BtnDark'
import Profile from './Profile/Profile'
import { useSelector } from "react-redux";

export function Nav({ priority, dark }) {
  const userLoged = useSelector(state =>  state.usersReducer.userLoged)
  const [t, i18n] = useTranslation("global");

  return (
    <div className={dark ? style.containerDark : style.container}>
      <div className={style.contents}>
        
          <NavLink to={"/"} className={style.logo}>
            <img
              src={
                "https://res.cloudinary.com/techstore/image/upload/v1619885737/logo-nav_qycrol.png"
              } alt="Ups, we don't found anything here. Try again tomorrow!"
            />
          </NavLink>
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
            <SearchBar/>
            </li>
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
