import React from 'react';
import Style from './productcard.module.css'
import greyheart from './greyheart.png'
import sCart from './shopping-cart.svg'
import revs from './grafico-de-barras.png'
const props = {
		name: 'Acer 32" Curved AMD FreeSync 1ms 165 Hz FHD 1920x1080 Gaming Monitor HDMI DP',
		images: ["https://i.ebayimg.com/images/g/vWUAAOSwpqJfsorU/s-l640.jpg"],
		stock: "15",
		price: "455.00",
		ranking: [5]
	}


export function ProductCard(){
	return(
		<div className={Style.container}>
			<div className={Style.favorite}>
				<img src={greyheart}/>
				<img src={revs}/>
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
			 	<p><strong>{props.price}</strong></p>
			 </div>
			 <div>
			 	<button> <img src={sCart}/><strong>Add to Cart</strong></button>
			 </div>
		</div>
	)
}

export default ProductCard

