import React, { useEffect, useState } from 'react'
import styles from './SimonSays.module.scss'

const SimonSays = () => {
  const [start, setStart] = useState(false)
  const [sequence, setSequence] = useState([])
  const [level, setLevel] = useState(1)
  const [color, setColor] = useState('')

  const colorsByNum = {
    0: 'celeste',
    1: 'violeta',
    2: 'naranja',
    3: 'verde'
  }
  // const secuenceGenerator = () => {
  //   const secuence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
  // }
  const startGame = e => {
    e.preventDefault()
    const randomArr = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    setSequence([...sequence, ...randomArr])
    setStart(true)
  }

  const lightButton = e => {
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.gameboard}>
        <div id="celeste" className={color === 'celeste' ? styles.celeste_light : styles.celeste} data-color="celeste"></div>
        <div id="violeta" className={color === 'violeta' ? styles.violeta_light : styles.violeta} data-color="violeta"></div>
        <div id="naranja" className={color === 'naranja' ? styles.naranja_light : styles.naranja} data-color="naranja"></div>
        <div id="verde" className={color === 'verde' ? styles.verde_light : styles.verde} data-color="verde"></div>
        {
          !start && <button onClick={e => {startGame(e); lightButton()}} id="btnEmpezar" className={styles.btn_start}>Empezar a jugar!</button>
        }
      </div>
    </div>
  )
}

export default SimonSays
