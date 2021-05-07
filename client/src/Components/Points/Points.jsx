import React, { useEffect, useRef, useState } from 'react'
import styles from './Points.module.scss'

export function Points() {
    const [active, setActive] = useState("cuadrado")
    const [ cascadeChildrens, setCascadechildrens ] = useState([])
    const cascade = useRef()

    let elCascade = [<div className={styles[active]}></div>]

    // useEffect(()=>{
    //     const change = async () => {
    //         setCascadechildrens(elCascade)
    //     }
    //     change()
    // },[])
    
    useEffect(()=>{
        if(active==="cuadrado" && cascadeChildrens.length === 0){
            console.log(elCascade)
            setCascadechildrens(state=> [...state, <div className={styles[active]}></div>])
        }
        setActive("caida")
        if(active === "caida"){
            setTimeout(()=> {
                console.log("hola",cascade.current.children[0])
                cascade.current.removeChild(cascade.current.children[0])
                setActive("cuadrado")
            }, 1100)
        }

    },[active])

    console.log(active)

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.cascade} ref={cascade}>
                    {cascadeChildrens && cascadeChildrens[0]}
                </div>
                <h1 className={styles.tag}>TechStore Points</h1>
                <div className={styles.border}>
                    <section className={styles.section}>
                        <h2 className={styles.text}>
                            ¿Como obtener TechPoints?
                        </h2>
                        <h2 className={styles.text}>
                            Por cada dolar gastado en la tienda se te otorgara 1 punto de descuento.
                        </h2>
                    </section>
                </div>
                <div className={styles.border}>
                    <section className={styles.section}>
                        <h2 className={styles.text}>
                            Si recomiendas a un amigo la pagina y este realiza una compra, se te otorgara a ti <strong>Tambien</strong> el 20% de los
                        puntos que este obtendra.
                        </h2>
                    </section>
                </div>
            </div>
        </div>
    )
}