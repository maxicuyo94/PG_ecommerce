import React from 'react';
import { Link } from "react-router-dom";

import style from "./nav.module.scss";
import { SearchBar } from '../SearchBar/SearchBar'
import { Header } from './Header/Header';


export function Nav() {
  return (
    <div className={style.container}>
        <Header />
        <div className={style.contents}>
          <ul>
            <li>
              <Link to="/home">
                <text>Home</text>
              </Link>
            </li>
<<<<<<< HEAD
            <li>
              <Link to='/carrito'>
                <text>
                  Cart
                </text>
              </Link>
            </li>
            <li>
              <SearchBar />
            </li>
=======
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
>>>>>>> develop
            <li>
              <Link to="/login">
                <text>Log In</text>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <text>Register</text>
              </Link>
            </li>
          </ul>
        </div>
    </div>
  );
}
