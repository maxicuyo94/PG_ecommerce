import React from "react";
import { Link } from "react-router-dom";
import style from "./header.module.scss";

const today = new Date();
const date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
const hour =
  today.getHours() + ":" + today.getMinutes() + "-" + today.getSeconds();
const dateandtime = date + " " + hour;

export function Header() {
  return (
    <div className={style.container}>
      <div className={style.contents}>
        <strong>{dateandtime}</strong>
        <strong>Mon-Fri: 9:00am - 5:30am</strong>
        <strong>Call us: 333-222-111</strong>
        <Link>
        {/* eslint-disable-next-line */}
          <img
            className={style.img}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/1200px-Instagram.svg.png"
          />
        </Link>
        <Link>
        {/* eslint-disable-next-line */}
          <img
            className={style.img}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png"
          />
        </Link>
      </div>
    </div>
  );
}
