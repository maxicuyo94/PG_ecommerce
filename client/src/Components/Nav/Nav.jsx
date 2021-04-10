import React from 'react';
import { Link } from "react-router-dom";

import style from "./nav.module.css";
import { SearchBar } from '../SearchBar/SearchBar'
import { Header } from '../Header/Header';


export function Nav() {
  return (
    <div className={style.Div}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.navigation}>
        <div className={style.menu}>
          <a>Home</a>
          <ul>
            <li>
              {" "}
              <Link to="/home">
                <text className={style.b}>Home</text>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <SearchBar></SearchBar>
        </div>
        <div className={style.menu}>
          <a>Catalogue</a>
          <ul>
            <Link to='/catalogue'>
              <text className={style.c}>
                Catalogue
          </text>
            </Link>
          </ul>
        </div>
        <div className={style.menu}>

          <a>Log In</a>
          <ul>
            <li>
              <Link to="/login">
                <text className={style.b}>log in</text>
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.menu}>
          <a>Register</a>
          <ul>
            <li>
              <Link to="/register">
                <text className={style.b}>register</text>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
