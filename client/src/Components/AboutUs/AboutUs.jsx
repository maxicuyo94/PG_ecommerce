import React from 'react'
import style from './aboutus.module.scss'

import John from './img/ejemplo.png'
import Fondo from './img/fondo.jpg'

import Linkedin from '../../Assets/static/linkedin-logo.svg'
import Github from '../../Assets/static/github-logo.svg'

export default function AboutUs(){

  return(

    <div className={style.containerAbout}>
      <label className={style.title}>Who we are?</label>
      <label className={style.tdescription}>We are a team of 10 people passionate about programming. This ecommerce is the final project of the intensive bootcamp Soy Henry.</label>
      <div className={style.cardsContainer}>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Victoria Coronado</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Marcos Lezcano</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}} className={style.imglogo}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}} className={style.imglogo}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Sergio Solís</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}  className={style.imglogo}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}  className={style.imglogo}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Joaquín Ponzone</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Joaquín Cardozo</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Sebastián Golijow</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Mariano Celi</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Martín Navarro</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Maximiliano Mendez</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>

      <div className={style.card}>
      <div className={style.cntImg}>
      <img src={John} style={{width:"100%"}}/>
    </div>
        <div className={style.cardDescription}>
        <label className={style.name}>Flaviano Di Berardino</label>
        <div className={style.logos}>
        <div className={style.logo}>
        <img src={Github} style={{width:"40px"}}/>
        </div>
        <div className={style.logo}>
        <img src={Linkedin} style={{width:"40px"}}/>
        </div>
        </div>
        </div>
      </div>




      </div>
    </div>
  )
}
