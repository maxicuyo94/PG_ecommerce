import React, { useEffect } from 'react'
import { getCategories, getProductsByCategories } from '../../Redux/Actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import style from './home.module.scss'
import { CategoriesHome } from './Categories/CategoriesHome'

export function Home() {

    // console.log(process.env.SUPABASE_KEY)
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    const productByCategories = useSelector(state => state.productByCategories)

    useEffect(() => {
        const getCateg = async () => {
            await dispatch(getCategories());
        }
        getCateg()
        const getProducts = async () => {
            await dispatch(getProductsByCategories());
        }
        getProducts()
    }, [])

    return (
        <div>
            <div>
                <h1>TOP PRODUCTS / DEALS</h1>
                <Link to="/">
                    <button type="submit">See All New Products</button>
                </Link>
            </div>

            <div className={style.categories}>
                {
                    categories && categories.slice(0, 3).map((category) =>
                        <CategoriesHome name={category.name} id={category.id} />
                    )
                }
            </div>
        </div>
    )
}
