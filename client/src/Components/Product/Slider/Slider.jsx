import React, { useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import { SlidesLarge, SlidesSmall } from './Slides'
import styles from './Slider.module.css'
const Slider = () => {
    const [value, setValue] = useState(0);

    const onChange = value => {
        setValue(value);
    }

    return (
            <div className={styles.imgContainer}>
                <Carousel
                    arrows
                    autoPlay={3000}
                    stopAutoPlayOnHover={true}
                    slidesPerPage={1}
                    value={value}
                    infinite
                    animationSpeed={800}
                    centered
                    offset={100}
                    itemWidth={900}
                    onChange={onChange}

                >
                    {
                        SlidesLarge
                    }
                </Carousel>
                <Dots
                    value={value}
                    onChange={onChange}
                    thumbnails={SlidesSmall}
                />
            </div>
    )
};

/* <div>
        <Carousel
            arrows
            slidesPerPage={1}
            infinite
            animationSpeed={1000}
            centered
            offset={50}
            itemWidth={400}
            slides={Slides}
        />
    </div> */
export default Slider
