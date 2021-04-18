import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "./Slider/Slider";
import { productDetail, getProductsByCategories } from "../../Redux/Actions/actions";
//import { NavLink } from "react-router-dom";
import styles from "./Product.module.scss";
import { CategoriesHome } from '../Home/Categories/CategoriesHome'
import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import swal from 'sweetalert';
import { addItemCart } from "../../Redux/Actions/cartActions";

export const Product = (props) => {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.productDetail);
    const productByCategories = useSelector(state => state.productByCategories)
    const id = props.id;
    const [value, setValue] = useState(1);
    const [nav, setNav] = useState('details')
    const [index, setIndex] = useState(1)
    const [slide, setSlide] = useState(1)

    const handleSum = () => { value < details.stock && value < 10 && setValue(value + 1) };
    const handleRes = () => { value > 1 && setValue(value - 1) };

    useEffect(() => {
        const idDetails = async () => {
            await dispatch(productDetail(id));
        };
        idDetails();
        const Products = async () => {
            await dispatch(getProductsByCategories());
        };
        Products();
        window.innerWidth < 601 ? setSlide(1) : setSlide(3)
        return () => {
            setNav('details')
        }
        // eslint-disable-next-line
    }, [id]);

    const handleAddToCart = (details) => {
        //console.log('add to cart')
        let cartItemModel = {
            title: details.name,
            image: details.images[0].url,
            id: details.id,
            quantity: value,
            price: details.price,
            stock: details.stock
        }
        dispatch(addItemCart(cartItemModel))
        setValue(1)
        swal("Done!","Added to cart","success");
    }


    return (
        <div className={styles.container}>
            <ul className={styles.nav}>
                <li onClick={() => { setNav('about') }}>About Product</li>
                <li onClick={() => { setNav('details') }}>Details</li>
                <li onClick={() => { setNav('category') }}>Categories</li>
            </ul>
            <div className={styles.main}>
                <div className={styles.details}>
                    <div className={styles.info}>
                        <span>{details.name?.split(" ").slice(0, 3).join(" ")}</span>
                        <div className={styles.desc}>
                            <ul className={styles.values}>
                                {nav === 'details' && details.description &&
                                    Object.entries(details.description).map(([key, value]) => {
                                        return (
                                            <li key={key}>
                                                <b>{key.split(/(?=[A-Z])/).join(' ')}</b>: {value.toString()}
                                            </li>
                                        );
                                    })}
                                {nav === 'category' && details.categories &&
                                    details.categories.map((category) => {
                                        return (
                                            <li key={category.id}>
                                                <b>{category.name}</b>
                                            </li>
                                        );
                                    })}
                                {nav === 'about' && details.name &&
                                    <li>{details.name?.split(" ").slice(3, details.name.length).join(" ")}</li>}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.images}>
                    <div className={styles.carousel}>
                        <Slider images={details.images} />
                    </div>
                    <div className={styles.buy}>
                        <label>
                            On sale from <b>${(details.price * value).toFixed(2)}</b>
                        </label>
                        <div className={styles.cont}>
                            <input type="text" value={value} disabled />
                            <div className={styles.change}>
                                <button onClick={handleSum}>+</button>
                                <button onClick={handleRes}>-</button>
                            </div>
                        </div>
                        {details.stock > 0?<button onClick={() => { handleAddToCart(details) }} >
                            Add to Cart
                        </button>:<button onClick={() => { swal("Sorry!","Come back in a few days","error"); }} >
                            Sold out
                        </button>}
                    </div>
                </div>
            </div>

            <div className={styles.related}>
                <div className={styles.title}>
                    <span>MORE PRODUCTS</span>
                </div>
                <Carousel
                    arrows
                    slidesPerPage={slide}
                    infinite
                    animationSpeed={200}
                    centered
                >
                    {
                        productByCategories.length > 0 &&
                        productByCategories[Math.floor(Math.random() * 3)].data.map((product) => {
                            return product.images &&
                                <CategoriesHome key={product.id} id={product.id} name={product.name} price={product.price} image={product.images} />
                        })

                    }
                </Carousel>
            </div>
        </div>
    );
};
