import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../Searchbar/Searchbar";
import { Header } from "./Header/Header";
import style from "./nav.module.scss";

export function Nav() {
  return (
        <Header />
        <div className={style.contents}>
          <ul>
            <li>
              <Link to="/">
                <text>Home</text>
              </Link>
            </li>
            <li>
              <Link to='/Catalogue'>
                <text>
                  Catalogue
                </text>
              </Link>
            </li>
            <li>
              <Link to='/addproduct'>
                <text>
                  Add Product
                </text>
              </Link>
            </li>
            <li>
              <SearchBar />
            </li>
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
