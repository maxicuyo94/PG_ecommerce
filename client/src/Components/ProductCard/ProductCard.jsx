import React from 'react';
import Style from './productcard.module.scss'
import greyheart from './greyheart.png'
import sCart from './shopping-cart.svg'
import revs from './grafico-de-barras.png'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
export function ProductCard(props) {

	return (
		<div className={Style.container}>
			{/* <div className={Style.favorite}>
				<span><FavoriteIcon /></span>
			</div> */}
			<div className={Style.image} >
				<img src={props.images} alt='.' />
			</div>
			{/* <div className={Style.review}>
				<label>★</label>
				<label>★</label>
				<label>★</label>
				<label>★</label>
				<label>★</label>
				<p>Reviews (4)</p>
			</div> */}
			<div className={Style.name}>
				<span>{props.name}</span>
			</div>
			<div className={Style.price}>
				<span>US$<b>{props.price}</b></span>
			</div>

			{props.stock > 0 ?
				<button
					onClick={() => { swal("Done!", "Added to cart", "success"); }} >
					Add to Cart
                </button>
				:
				<button
					onClick={() => { swal("Sorry!", "Come back in a few days", "error"); }} >
					Sold out
                </button>}
		</div >
	)
}