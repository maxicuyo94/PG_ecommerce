import React from 'react'
import {Link} from 'react-router-dom'
import Style from "./header.module.css";


var hoy = new Date();
var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + '-' + hoy.getSeconds();
var fechayhora = fecha + ' ' + hora
export function Header() {
    return (
        <div className={Style.Div}>
        <strong>{fechayhora}</strong>
        <strong>Mon-Fri: 9:00am - 5:30am</strong>
        <strong>Call us: 333-222-111</strong>
        <Link><img className={Style.Img}  src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/1200px-Instagram.svg.png'/></Link>
        <Link><img className={Style.Img}  src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png'/></Link>

        </div>
    )
}