import React from 'react';
import Style from './productcard.module.scss'
import greyheart from './greyheart.png'
import sCart from './shopping-cart.svg'
import revs from './grafico-de-barras.png'
import { Link, NavLink } from 'react-router-dom'
import swal from 'sweetalert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';
import { addItemCart } from '../../Redux/Actions/cartActions';
import { useDispatch } from 'react-redux'
export function ProductCard(props) {
	const dispatch = useDispatch();
	const handleAddToCart = (details) => {
		let cartItemModel = {
			title: details.name,
			images: details.images,
			id: details.id,
			quantity: 1,
			price: details.price,
			stock: details.stock
		}
		console.log('Images', cartItemModel.images)
		dispatch(addItemCart(cartItemModel))
		swal("Done!", "Added to cart", "success");
	}
	return (
		<div className={props.stock ? Style.container : Style.off} >
			<div className={Style.stock}>
				{props.stock > 0 ?
					<span className={Style.on}> On Stock! <CheckCircleIcon fontSize="small" /></span>
					:
					<span className={Style.out}> Sold Out! <BlockIcon fontSize="small" /></span>
				}
			</div>
			<div className={Style.image} >
				<NavLink to={`/product/${props.id}`}>
					<img src={props.images} alt='.' />
				</NavLink>
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
				<NavLink to={`/product/${props.id}`}>
					{props.name}
				</NavLink>
			</div>
			<div className={Style.price}>
				<span>US$<b>{props.price}</b></span>
			</div>

			{props.stock > 0 ?
				<button className={Style.btnOn}
					onClick={() => { handleAddToCart(props) }} >
					Add to Cart
                </button>
				:
				<button className={Style.btnOut}
					onClick={() => { swal("Sorry!", "Come back in a few days", "error"); }} >
					Sold out
                </button>
			}
		</div >
	)
}