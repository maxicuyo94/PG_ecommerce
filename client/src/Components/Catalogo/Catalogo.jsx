import React from 'react';
import {useSelector} from 'react-redux';
import Style from './catalogo.module.css'
const EJProductos = [{Nombre:'aa'}, {Nombre:'bbb'}, {Nombre:'ccc'},]

export function Catalogo() {
// const Productos = useSelector(state => state.Productos)

    return (
        <div className={Style.Div}>
           {
               EJProductos && EJProductos.map((item, id) => (
                <div className={Style.Div2}>
                    <h1>{item.Nombre}</h1>
                </div>
               ))
           }
        </div>
    )
}