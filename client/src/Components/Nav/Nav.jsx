import React from 'react';
import { Link } from "react-router-dom";
import Style from "./nav.module.css";
import {SearchBar} from '../SearchBar/SearchBar'

export function Nav() {
  return (
    <div className={Style.Div}>
      <div className={Style.menu}>
      <a>Home</a>
        <ul>
          <li>
            {" "}
            <Link to="/home">
              <text className={Style.b}>Home</text>
            </Link>
          </li>
        </ul>
      </div>
      <div>
    <SearchBar></SearchBar>
      </div>
      <div className={Style.menu}>
     <a>Carrito</a>
      <ul>
          <Link to='/carrito'>
          <text className={Style.c}>
              carrito
          </text>
          </Link>
      </ul>
      </div>
      <div className={Style.menu}>
        
        <a>Log In</a>
        <ul>
          <li>
            <Link to="/login">
              <text className={Style.b}>log in</text>
            </Link>
          </li>
        </ul>
      </div>
      <div className={Style.menu}>
   <a>Register</a>
        <ul>
          <li>
            <Link to="/register">
              <text className={Style.b}>register</text>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
