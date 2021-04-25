import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { ItemCart } from '../CheckOut/ItemCart';
import { orderPayment } from "../../Redux/Orders/orderActions"


export function Payment() {
    const user = useSelector((state) => state.usersReducer.userLoged);
    const cart = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch()

    console.log(cart, user)

    const [input, setInput] = useState({
        streetName: "lomita",
        streetNumber: "lomitasss2",
        postalCode: "22cc"
    })

    let handleAddress = () => {
        setInput({
            streetName: "lomita",
            streetNumber: "lomitasss2",
            postalCode: "22cc"
        })
    }

    let infoUser = {
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
        addres: input
    }

    console.log(user)

    let PayCart = async (e) => {
        e.preventDefault()
        let response = await dispatch(orderPayment(cart, infoUser))
        response && window.location.replace(response)
    }

    return (
        <div>
            {cart.map(item => <ItemCart product={item} />)}
            <select>
                <option value="">Address</option>
                {
                    user.address && user.address.map(add => <option onChange={handleAddress} value={add}>{add.address}</option>)
                }
            </select>
            <button onClick={(e) => PayCart(e)}>Pay</button>
            {/* <Button variant="contained">
                <a href={PayCart}>Pay</a>
            </Button> */}
        </div>
    )
}