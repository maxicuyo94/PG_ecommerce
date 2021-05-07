import React from 'react'
import { Link } from 'react-router-dom'
import simon from '../../Assets/static/game-3.svg'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>TechStore</h1>
        <p className={styles.text}>
          This is an e-commerce were you can buy anything from computers to its components.
        </p>
      </div>
      {/* <div clasName={styles.vl}/> */}
      <div className={styles.routes}>
        <div className={styles.links}>
          <Link className={styles.link} to='/about'>About</Link>
          <Link className={styles.link} to='/points'>Points</Link>
        </div>
      <div className={styles.game}>
        <Link to='/videogame'>Play Simon Says and earn discount points!</Link>
        <Link to='/videogame'>
          <img className={styles.icon} styles={{marginLeft: "20rem"}} src={simon} alt='videogame'/>
        </Link>
      </div>
      </div>
    </footer>
  )
}

export default Footer

