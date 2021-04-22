import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
//import { SearchBar } from "../SearchBar/SearchBar";
//import { Header } from "./Header/Header";
import { useTranslation } from "react-i18next";
import style from "./nav.module.scss";
import MiniShop from "./MiniShop/MiniShop";
import BtnLang from "./BtnLang/BtnLang";
import { userLogOut } from "../../Redux/Users/usersActions";
import { useSelector } from "react-redux";

export function Nav({ priority }) {
  // eslint-disable-next-line
  const userLoged = useSelector(state =>  state.usersReducer.userLoged)
  const [t, i18n] = useTranslation("global");
  const history = useHistory()

  // useEffect(()=> {
  //   history.push("/")
  // })


  const handleLogOut = () => {
    userLogOut();
  }

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
              <text>{t("navLink1.linkOne")}</text>
            </Link>
          </li>
          <li>
            <Link to="/catalogue">
              <text>{t("navLink2.linkTwo")}</text>
            </Link>
          </li>
          <li>
            <Link to="/controlpanel">
              <text>{t("navLink6.linkSix")}</text>
            </Link>
          </li>
          {/* {!localStorage.getItem('supabase.auth.token') ?  */}
          <li>
            <Link to="/access">
              <text>{t("navLink4.linkFour")}</text>
            </Link>
          </li>
          {/* : */}
          {userLoged&&<li>
              <text onClick={handleLogOut}>Log Out</text>
          </li>}
          {/* } */}
          <li>
            <Link to="/register">
              <text>{t("navLink5.linkFive")}</text>
            </Link>
          </li>
          
          <li>
            <MiniShop />
          </li>
          <li>
            <BtnLang />
          </li>
        </ul>
      </div>
    </div>
  );
}
