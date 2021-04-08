import React, { useEffect, useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import './Slider.scss'

import { SlidesLarge, SlidesSmall } from './Slides'
const Slider = () => {
    const [value, setValue] = useState(0);
    //const [size, setSize] = useState(500)
    const onChange = value => {
        setValue(value);
    }

    return (
        <>
            <Carousel
                //arrows
                //autoPlay={3000}
                stopAutoPlayOnHover={true}
                slidesPerPage={1}
                value={value}
                infinite
                animationSpeed={800}
                centered
                offset={50}
                itemWidth={800}
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
        </>
    )
};
export default Slider
