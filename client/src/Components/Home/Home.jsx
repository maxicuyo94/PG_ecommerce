import React, { useEffect } from 'react'
import { getCategories } from '../../Redux/Actions/actions'
import {useDispatch, useSelector} from 'react-redux'

import style from './home.module.scss'
import {CategoriesHome} from './categories/CategoriesHome'

export function Home() {
    const dispatch = useDispatch()
    const categories = useSelector(state=> state.categories)
    useEffect(()=>{
        console.log("asdasd")
        const getCater = async () =>{
            await dispatch(getCategories());
        }
        getCater()

    },[])

    return (
        <div>
            <div>

            </div>

            <div className={style.categories}>
                {
                categories && categories.slice(0, 3).map((category)=>
                    <CategoriesHome name={category.name} id ={category.id}/>
                )
                }
            </div>
            <div>

            </div>
        </div>
    )
}
