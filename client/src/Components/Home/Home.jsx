import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { getProductsByCategories } from "../../Redux/Actions/actions";
import { CategoriesHome } from "./Categories/CategoriesHome";
import styles from "./home.module.scss";

export function Home() {
    const dispatch = useDispatch()
    const productByCategories = useSelector(state => state.productByCategories)

    useEffect(() => dispatch(getProductsByCategories()), [])

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <h1>TOP PRODUCTS / DEALS</h1>
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
        </div>
        <div className={styles.containerP}>
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
              {productByCategories[1] &&
                productByCategories[1].data
                  .sort(() => Math.random() - 0.5)
                  .map((product, i) => {
                    // eslint-disable-next-line
                    {
                      return (
                        product.images && (
                          <CategoriesHome
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]}
                          />
                        )
                      );
                    }
                  })}
            </Carousel>
          </div>
        </div>
        <div className={styles.containerP}>
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
              {productByCategories[2] &&
                productByCategories[2].data
                  .sort(() => Math.random() - 0.5)
                  .map((product, i) => {
                    // eslint-disable-next-line
                    {
                      return (
                        product.images && (
                          <CategoriesHome
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.images[0]}
                          />
                        )
                      );
                    }
                  })}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

