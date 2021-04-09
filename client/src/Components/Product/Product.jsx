import React, { useState } from 'react'
import styles from './Product.module.scss'
import Slider from './Slider/Slider'
export const Product = () => {
    const [value, setValue] = useState(1);
    const handleSum = () => {
        setValue(value + 1)
    }
    const handleRes = () => {
        if (value > 1) setValue(value - 1)
    }
    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <div className={styles.info}>
                    <span>ProArt Display PA278QV</span>
                    <ul className={styles.desc}>
                        <li>Pantalla con retroiluminación LED Full HD (1920 x 1080) de 23,8 pulgadas con panel de ángulo de visión amplio IPS de 178 °</li>
                        <li>Estándar de color internacional 100% sRGB y 100% Rec. 709 amplia gama de colores</li>
                        <li>Calman Verified con calibrado de fábrica para una excelente precisión de color Delta E 2</li>
                    </ul>
                </div>
            </div>
            <div className={styles.images}>
                <div className={styles.carousel}>
                    <Slider />
                </div>
                <div className={styles.buy}>
                    <label>On sale from <b>$299.99</b></label>
                    <div className={styles.cont}>
                        <input type='text' value={value} disabled/>
                        <div className={styles.change}>
                            <button onClick={handleSum}>+</button>
                            <button onClick={handleRes}>-</button>
                        </div>
                    </div>
                    <button onClick={() => { alert('Comprado!') }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

