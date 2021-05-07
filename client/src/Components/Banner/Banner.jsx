import React, { useEffect, useState } from "react";
import style from "./banner.module.scss";
import { Link } from "react-router-dom";
import simonImage from "./simonsays.png";
import points from "./points.png";

export function Banner2() {
  const [Img, setImg] = useState(points);

  useEffect(() => {
    if (Img === points) {
      setTimeout(() => {
        setImg(simonImage);
      }, 4000);
    } else {
      setTimeout(() => {
        setImg(points);
      }, 4000);
    }
  }, [Img]);

  return (
    <div>
    {
      Img === points ? <Link to='/points'>   
      <img className={style.container} src={Img} alt="points"/>
      {/* <div className={style.container} style={{backgroundImage:`url(${Img})`}}></div> */}
      </Link> : Img === simonImage ? <Link to='/videogame'>   
      <img className={style.container} src={Img} alt="Simon Say"/>
      </Link> : 
      <img className={style.container} src={Img} alt=""/>
    }
    </div>
  );
}
