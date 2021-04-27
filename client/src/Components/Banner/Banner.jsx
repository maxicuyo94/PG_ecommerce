import React, {useState} from "react";
import { useSelector } from "react-redux";
import style from "./banner.module.scss";


export function Banner2() {
  const [Img, setImg] = useState('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')

  

  if(Img === 'https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg' ){
    setTimeout(() => {
      setImg('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')
    }, 8000);
  } else {
    setTimeout(() => {
      setImg('https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg')
    }, 8000);
  }
  return (
    <div style={{border:'solid',borderColor:'#9abf15',backgroundImage:`url(${Img})`, height:'143px', backgroundSize:'cover', display:'flex', justifyContent:'space-between'}}>
      <button className={style.button}
       onClick={() => setImg('https://www.neobyte.es/modules/simpleslideshow/slides/c4adceb0c96ae8c931d13c5d20027462.jpg')}></button>

      <button className={style.button}
       onClick={() => setImg('https://www.neobyte.es/modules/simpleslideshow/slides/5f294c70602e96ab0303b6caebd3bde5.jpg')}></button>
    </div>
  );
}
