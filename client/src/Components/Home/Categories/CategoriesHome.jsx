import React, { useEffect } from 'react';
import { getProductsByCategories } from '../../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from "../../ProductCard/ProductCard";

export function CategoriesHome({ id, name }) {
    const dispatch = useDispatch();
    const productCateg = useSelector(state => state.productByCategories)

    useEffect(() => {
        const getProCate = async () => {
            await dispatch(getProductsByCategories(id, name))
        }
        getProCate();
    }, [])

    // const showingProducts = async () => {
    //     if(productCateg.KeyBoards != undefined) {
    //         for 
    //     }
    // }

        console.log("PRODUCTS", productCateg)


    return (
        <div className="container">
            <div className="title">
                <h2>{name}</h2>
                <div className="showingProducts">

                </div>
            </div>
        </div>
    )
};
