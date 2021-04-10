import React, { useState } from 'react'
/* import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css' */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Slider.module.scss'
const Slider = ({ images }) => {
    //const [value, setValue] = useState(0);
    //const onChange = value => { setValue(value) };

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
