import React, { useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import styles from './Slider.module.scss'
const Slider = ({ images }) => {
    const [value, setValue] = useState(0);
    const onChange = value => { setValue(value) };

    return (
        <div className={styles.carousel}>
            <Carousel 
                arrows
                autoPlay={3000}
                stopAutoPlayOnHover={true}
                infinite
                centered
                value={value}
                slidesPerPage={1}
                animationSpeed={500}
                offset={40}
                onChange={onChange}
            >
                {images?.map((slide, i) => 
                        <div className={styles.Large} key={i} >
                            <img src={slide} alt='.' />
                        </div>
                    )
                }
            </Carousel>
            <Dots
                value={value}
                onChange={onChange}
                thumbnails={images?.map((slide, i) => {
                    return (
                        <div className={styles.Small} key={i}>
                            <img src={slide} alt='.' />
                        </div>
                    )
                })}
            />
        </div>
    )
};
export default Slider
