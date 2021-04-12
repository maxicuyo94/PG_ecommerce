import React, { useEffect } from 'react'
import { Buscar, getProductsByCategories } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import styles from './home.module.scss'

import { CategoriesHome } from './Categories/CategoriesHome'

import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'


export function Home() {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    const productByCategories = useSelector(state => state.productByCategories)
    const products = useSelector(state => state.wantedProducts)

    useEffect(() => dispatch(getProductsByCategories()), [])

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <h1>TOP PRODUCTS / DEALS</h1>
                {/* <Link to="/">
                    <button type="submit">See All New Products</button>
                </Link> */}
            </div>
            <div className={styles.products}>

                <div className={styles.containerP} >
                    <div className={styles.title}>
                        <span>Computers</span>
                        <span>Components</span>
                        <NavLink to={`/`}>
                            <h6>See all Products</h6>
                        </NavLink>
                    </div>
                    <div className={styles.carousel}>
                        {console.log('Categorias:', productByCategories[1])}

                        <Carousel
                            arrows
                            slidesPerPage={5}
                            infinite
                            animationSpeed={200}
                            centered
                        >
                            {
                                productByCategories[0]&& productByCategories[0].data.sort(() => Math.random() - 0.5).map((product, i) => {
                                    { return product.images && <CategoriesHome key={product.id} id={product.id} name={product.name} price={product.price} image={product.images[0]} /> }
                                })
                            }
                        </Carousel>

                    </div>
                </div>
                <div className={styles.containerP} >
                    <div className={styles.title}>
                        <span>Laptops</span>
                        <NavLink to={`/home`}>
                            <h6>See all Products</h6>
                        </NavLink>
                    </div>
                    <div className={styles.carousel}>

                        <Carousel
                            arrows
                            slidesPerPage={5}
                            infinite
                            animationSpeed={200}
                            centered
                        >
                            {
                                productByCategories[1]&& productByCategories[1].data.sort(() => Math.random() - 0.5).map((product, i) => {
                                    { return product.images && <CategoriesHome key={product.id} id={product.id} name={product.name} price={product.price} image={product.images[0]} /> }
                                })
                            }
                        </Carousel>

                    </div>
                </div>
                <div className={styles.containerP} >
                    <div className={styles.title}>
                        <span>Keyboards</span>
                        <NavLink to={`/home`}>
                            <h6>See all Products</h6>
                        </NavLink>
                    </div>
                    <div className={styles.carousel}>

                        <Carousel
                            arrows
                            slidesPerPage={5}
                            infinite
                            animationSpeed={200}
                            centered
                        >
                            {
                                productByCategories[2]&& productByCategories[2].data.sort(() => Math.random() - 0.5).map((product, i) => {
                                    { return product.images && <CategoriesHome key={product.id} id={product.id} name={product.name} price={product.price} image={product.images[0]} /> }
                                })
                            }
                        </Carousel>

                    </div>
                </div>


            </div>


            {/* <div className={style.categories}>
                {
                    categories && categories.slice(0, 3).map((category) =>
                        <CategoriesHome name={category.name} id={category.id} />
                    )
                }
            </div> */}

        </div>
    )
}


/* autoFocus={false}
                            showIndicators={false}
                            emulateTouch={false}
                            swipeable={false}
                            useKeyboardArrows={false}
                            showStatus={false}
                            showThumbs={false}
                            //centerMode={true}
                            showArrows={true}
                            //dynamicHeight={true}
                            //infiniteLoop={true}
                            stopOnHover={true}
                            //interval={1000}
                            preventMovementUntilSwipeScrollTolerance={false}
                            swipeScrollTolerance={0}
                        //centerSlidePercentage={20}
                        {
                                products.length > 0 && products.map((product, i) => {
                                    { return product.images.length > 0 && <CategoriesHome key={product.id} id={product.id} name={product.name} price={product.price} image={product.images[0]} /> }
                                })
                            }
                        */
