import React from 'react'
import styles from './Product.module.scss'
import Slider from './Slider/Slider'
export const Product = () => {
    return (
        <div className={styles.container}>
            <div className='banner'>
                banner
            </div>
            <div className={styles.details}>
                <div className={styles.left}>
                    <div className={styles.info}>
                        <h3>ProArt Display PA278QV</h3>
                        <ul className={styles.list}>
                            <li>Pantalla con retroiluminación LED Full HD (1920 x 1080) de 23,8 pulgadas con panel de ángulo de visión amplio IPS de 178 °</li>
                            <li>Estándar de color internacional 100% sRGB y 100% Rec. 709 amplia gama de colores</li>
                            <li>Calman Verified con calibrado de fábrica para una excelente precisión de color Delta E 2</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.images}>
                        <Slider />
                    </div>
                    <div className={styles.buy}>
                        <label>On sale from: $299.99</label>
                        <select>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => {
                                    return <option>{el}</option>
                                })
                            }
                        </select>
                        <button onClick={()=>{alert('Comprado!')}}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
