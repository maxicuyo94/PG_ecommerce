import React from 'react'
import whatsapp from '../../Assets/static/whatsapp.svg'
import chat from '../../Assets/static/comment-oval-outlined-balloon.svg'
import styles from './Whatsapp.module.scss'

const Whatsapp = () => {
  return (
    <>
        {/* <h4 className={styles.text}>Contact us!</h4>
        <img src={chat} alt='whatsapp' className={styles.chat_icon}/> */}
        <a href='https://wa.me/5491124543732' target='_blank'>
          <img src={whatsapp} alt='whatsapp' className={styles.whatsapp_icon}/>
        </a>
    </>
  )
}

export default Whatsapp
