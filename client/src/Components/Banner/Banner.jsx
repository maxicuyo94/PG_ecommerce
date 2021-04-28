import React, {useState} from "react";
import { useSelector } from "react-redux";
import style from "./banner.module.scss";


export function Banner2() {
  const [Img, setImg] = useState('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')

  

  if(Img === 'https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg' ){
    setTimeout(() => {
      setImg('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')
    }, 5000);
  } else {
    setTimeout(() => {
      setImg('https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg')
    }, 5000);
  }
  return (
    <div className={style.container} style={{backgroundImage:`url(${Img})`}}>
      <button className={style.button}
       onClick={() => setImg('https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg')}></button>

      <button className={style.button}
       onClick={() => setImg('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')}></button>
    </div>
  );
}
