import React from 'react'
import styles from './Points.module.scss'

export function Points(){
    return (
        <div className={styles.div2}>
            <h1 className={styles.tag}>TechStore Points</h1>
            <p className={styles.div}>
            ⚫ Por cada dolar gastado en la tienda se te otorgara 1 punto de descuento.
            </p>
            <p className={styles.div}>
            ⚫ Si recomiendas a un amigo la pagina y este realiza una compra, se te otorgara a ti <strong>Tambien</strong> el 20% de los
               puntos que este obtendra.
             </p>
        </div>
    )
}