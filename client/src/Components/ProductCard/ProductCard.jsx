import React from 'react';
import Style from './productcard.module.css'

export function ProductCard(){
	return(
		<div className={Style.container}>

			<img src={'http://digitalifemelilla.com/6261-thickbox_default/caja-pc-atx-hummer-tg-rgb-cristal-templado.jpg'}
			 className={Style.img}/>
			 <div className={Style.review}>
			 <p>★★★★★ Reviews (4)</p>
			 </div>
			 <div className={Style.name}>
			 <p>EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One</p>
			 <p><strong>$499.00</strong></p>
			 </div>
			 <div>
			 <button className={Style.button}>Add to Cart</button>
			 </div>
			 
		</div>
		)
}

export default ProductCard

