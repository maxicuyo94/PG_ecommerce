import React, { useEffect } from 'react'
import {allProducts} from '../../../Redux/Actions/actions'
import {useDispatch, useSelector} from 'react-redux'

export function CategoriesHome({id, name}) {
    const dispatch = useDispatch();
    // const productCateg = useSelector(state => state.)

    useEffect(()=>{
        const getProCate = async () =>{
            await dispatch(allProducts())
        }
        getProCate();
    })


    return (
        <div>
            {name}
            {
                
            }
        </div>


    )
}
