import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './Slider.module.scss'
const Slider = ({ images }) => {
    return (
        <div className={styles.carousel}>
            <Carousel
                //axis={'vertical'}
                //centerMode={true}
                //centerSlidePercentage={50}
                showArrows={false}
                showThumbs={true}
                dynamicHeight={true}
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                useKeyboardArrows={true}
                interval={1000}
                //width={'80%'}
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
