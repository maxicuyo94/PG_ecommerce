import React from "react";
import { Link, NavLink } from "react-router-dom";
//import { SearchBar } from "../SearchBar/SearchBar";
//import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import style from "./nav.module.scss";
import MiniShop from "./MiniShop/MiniShop";
import BtnLang from "./BtnLang/BtnLang";
import BtnDark from './BtnDark/BtnDark'
import { userLogOut } from "../../Redux/Users/usersActions";
import { useDispatch, useSelector } from "react-redux";

export function Nav({ priority }) {
  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");
  const user = useSelector(state => state.usersReducer.userLoged)
  const dispatch = useDispatch();

  console.log(user)
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
          <li>
            <Link to="/controlpanel">
              <span>{t("navLink6.linkSix")}</span>
            </Link>
          </li>
          {!user.id ?
          <li>
            <Link to="/login">
              <span>{t("navLink4.linkFour")}</span>
            </Link>
          </li>
          :
          <li>
            <Link to="/">
              <span onClick={() => dispatch(userLogOut())}>Log Out</span>
            </Link>
          </li>
          }
          
          <li>
            <MiniShop />
          </li>
          <li>
            <BtnLang />
          </li>
          <li>
            <BtnDark />
          </li>
        </ul>
      </div>
    </div>
  );
}
