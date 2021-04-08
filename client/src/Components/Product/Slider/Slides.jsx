import React from 'react'
import styles from './Slides.module.scss'

export const slidesInfo = [{
    src: 'https://cdn.pixabay.com/photo/2016/12/19/08/39/mobile-phone-1917737_960_720.jpg',
    alt: 'Project 1',
    desc: 'Project 1',

},
{
    src: 'https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159_960_720.jpg',
    alt: 'Project 2',
    desc: 'Project 2',

},
{
    src: 'https://cdn.pixabay.com/photo/2015/02/05/08/06/macbook-624707_960_720.jpg',
    alt: 'Project 3',
    desc: 'Project 3',

}
]
export const SlidesLarge = slidesInfo.map((slide, i) => {
    return (
        <div className={styles.container}>
            <img className={styles.imgLarge} src={slide.src} alt={slide.alt} key={i} />
        </div>
    )
})
export const SlidesSmall = slidesInfo.map((slide, j) => {
    return (
        <div className={styles.container}>
            <img className={styles.imgSmall} src={slide.src} alt={slide.alt} key={j} />
        </div>
    )
})