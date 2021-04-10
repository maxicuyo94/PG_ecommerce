import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './Slider.module.scss'
const Slider = ({ images }) => {

    return (
        <div className={styles.carousel}>
            <Carousel
                showThumbs={true}
                dynamicHeight={true}
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
            >
                {images?.map((slide, i) => {
                    return (
                        <div key={i} >
                            <img src={slide} alt='.' />
                        </div>
                    )
                })}
            </Carousel>

        </div>
    )
};
export default Slider
