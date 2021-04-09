import React, { useEffect, useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import styles from './Slider.module.scss'
import { SlidesLarge, SlidesSmall } from './Slides'
const Slider = () => {
    const [value, setValue] = useState(0);
    //const [size, setSize] = useState(500)
    const onChange = value => {
        setValue(value);
    }

    return (
        <div className={styles.carousel}>
            <Carousel
                autoPlay={3000}
                stopAutoPlayOnHover={true}
                infinite
                centered
                value={value}
                slidesPerPage={1}
                animationSpeed={500}
                offset={50}
                itemWidth={800}
                onChange={onChange}
            >
                {SlidesLarge}
            </Carousel>
            <Dots
                value={value}
                onChange={onChange}
                thumbnails={SlidesSmall}
            />
        </div>
    )
};
export default Slider
