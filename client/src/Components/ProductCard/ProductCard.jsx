import React from 'react';
import Style from './productcard.module.scss'
import greyheart from './greyheart.png'
import sCart from './shopping-cart.svg'
import revs from './grafico-de-barras.png'
import {Link} from 'react-router-dom'

export function ProductCard(props){
	
	return(
		<div className={Style.container}>
			<Link to={`/product/${props.id}`}>
			<div className={Style.favorite}>
				<img src={greyheart}/>
				{/* <img src={revs}/> */}
			</div>
			<img src={props.images}
			 className={Style.img}/>
			 <div className={Style.review}>
				<label>★</label>
				<label>★</label>
				<label>★</label>
				<label>★</label>
				<label>★</label>
			 	<p>Reviews (4)</p>
			 </div>
			 <div className={Style.name}>
			 	<p>{props.name}</p>
			 </div>
			 <div className={Style.price}>
			 	<p><strong>US$ {props.price}</strong></p>
			 </div>
			 <div>
			 	<button> <img src={sCart}/><strong>Add to Cart</strong></button>
			 </div>
			 </Link>
		</div>
	)
}
