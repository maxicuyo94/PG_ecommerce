import React from 'react'
import styles from './Product.module.css'
import Slider from './Slider/Slider'
export const Product = () => {
    return (
        <div className={styles.container}>
            <div className='banner'>
                banner
            </div>
            <div className={styles.details}>
                <div className={styles.images}>
                    <Slider />
                </div>
                <div className={styles.info}>
                    <ul>
                        <li>Name</li>
                        <li>Price</li>
                        <li>Description</li>
                        <li>Model</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
