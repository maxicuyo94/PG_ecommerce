import React, { useEffect } from 'react'
import {getProductsByCategories} from '../../../Redux/Actions/actions'
import {useDispatch, useSelector} from 'react-redux'

export function CategoriesHome({id, name}) {
    const dispatch = useDispatch();
    const productCateg = useSelector(state => state.productByCategories)

    useEffect(()=>{
        const getProCate = async () =>{
            await dispatch(getProductsByCategories(id, name))
        }
        getProCate();
    },[])

    console.log(productCateg)

    return (
        <div>
            {name}
            {
                
            }
        </div>


    )
}
