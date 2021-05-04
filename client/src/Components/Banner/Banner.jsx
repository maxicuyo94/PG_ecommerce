import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import style from "./banner.module.scss";
import {Link} from 'react-router-dom'
import simonImage from './simonsays.png'
import points from './points.png'
import { PowerInputSharp } from "@material-ui/icons";


export function Banner2() {
  const [Img, setImg] = useState('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')

  useEffect(() => {
    if(Img === 'https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg' ){
      setTimeout(() => {
        setImg('https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg')
      }, 3000);
    }  else if(Img === 'https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg') {
      setTimeout(() => {
        setImg(points)
      }, 3000);
    } else if(Img === points) {
      setTimeout(() => {
        setImg(simonImage)
      }, 3000)
    } else {
      setTimeout(() => {
        setImg('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')
      }, 3000);
    }
  }, [Img]) 

  return (
    <div>
    {
      Img === points ? <Link to='/points'>   
      <div className={style.container} style={{backgroundImage:`url(${Img})`}}></div>
      </Link> : Img === simonImage ? <Link to='/videogame'>   
      <div className={style.container} style={{backgroundImage:`url(${Img})`}}></div>
      </Link> : 
       <div className={style.container} style={{backgroundImage:`url(${Img})`}}></div>
    }
    </div>
  );
}