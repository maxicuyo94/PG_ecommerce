import React from 'react';
import Style from './productcard.module.scss'
import greyheart from './greyheart.png'
import sCart from './shopping-cart.svg'
// import revs from './grafico-de-barras.png'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { addItemCart } from '../../Redux/Actions/cartActions';




export function ProductCard(props) {
	const dispatch = useDispatch()
	const handleAddCart = (props) => {
		const newItem = {
			id: props.id,
			images: props.images,
			title: props.name,
			quantity: 1,
			price: props.price,
			stock: props.stock
		}
		dispatch(addItemCart(newItem))
		swal("Done!", "Added to cart", "success");
	}

	return (
		<div className={Style.container}>
			<Link to={`/product/${props.id}`}>
				<div className={Style.favorite}>
					<img src={greyheart} />
					{/* <img src={revs}/> */}
				</div>
				<img src={props.images} className={Style.img} alt={props.name} />
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
					{props.stock > 0 ? <button img src={sCart} onClick={() => handleAddCart(props)} >
						Add to Cart
                        </button> : <button img src={sCart} onClick={() => { swal("Sorry!", "Come back in a few days", "error"); }} >
						Sold out
                        </button>}
				</div>
			</Link>
		</div>
	)
}
