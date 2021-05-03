import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import style from "./banner.module.scss";
import {Link} from 'react-router-dom'

export function Banner2() {
const [Img, setImg] = useState('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')


useEffect(() => {
  if(Img === 'https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg' ){
    setTimeout(() => {
      setImg('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')
    }, 5000);
  }  else if(Img === 'https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg') {
    setTimeout(() => {
      setImg('http://buysidefocus.com/wp-content/uploads/2016/09/hedge-fund-bonus-2.jpg')
    }, 5000);
  } else {
    setTimeout(() => {
      setImg('https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg')
    }, 5000)
  }
}, [Img]) 
  return (
    <div>
    {
      Img === 'http://buysidefocus.com/wp-content/uploads/2016/09/hedge-fund-bonus-2.jpg' ? <Link to='/points'>   
      <div className={style.container} style={{backgroundImage:`url(${Img})`}}></div>
      </Link> : <div className={style.container} style={{backgroundImage:`url(${Img})`}}></div>
    }
    </div>
  );
}