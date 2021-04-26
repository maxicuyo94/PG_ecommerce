import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { ItemCart } from '../CheckOut/ItemCart';
import { orderPayment } from "../../Redux/Orders/orderActions"
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
            justifyContent: 'center'
        },
    },
}));


export function Payment() {
    const classes = useStyles();
    const user = useSelector((state) => state.usersReducer.userLoged);
    const cart = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        streetName: "",
        streetNumber: "",
        postalCode: ""
    })
    const [form, setform] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        streetName: '',
        streetNumber: 0,
        postalCode: '',
    })

    const handleAddress = (e) => {
        e.preventDefault()
        let addresUser = user.address.find(item => item.address === e.target.value)
        setInput({
            streetName: addresUser.address,
            streetNumber: addresUser.streetNumber,
            postalCode: addresUser.postal_code,
        })
    }

    const handleForm = (e) => {
        e.preventDefault()
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    if (user.id) {
        var infoUser = {
            name: user.name,
            surname: user.surname,
            phone: parseInt(user.phone),
            email: user.email,
            addres: input
        }
    } else {
        var infoUser = {
            name: form.name,
            surname: form.surname,
            phone: parseInt(form.phone),
            email: form.email,
            addres: {
                streetName: form.streetName,
                streetNumber: parseInt(form.streetNumber),
                postalCode: form.postalCode,
            }
        }
    }


    let PayCart = async (e) => {
        e.preventDefault()
        let response = await dispatch(orderPayment(cart, infoUser))
        response && window.location.replace(response)
    }

    return (
        <div>
            {cart.map(item => <ItemCart product={item} />)}
            {user.id && <select onChange={handleAddress}>
                <option value="">Address</option>
                {
                    user.address && user.address.map((add, i) => <option key={i} value={add.address}>{add.address}</option>)
                }
            </select>}

            {!user.id ?
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="name" label="Name" variant="outlined" name="name" onChange={handleForm} />
                    <TextField id="surname" label="Surname" variant="outlined" name="surname" onChange={handleForm} />
                    <TextField id="phone" label="Phone" variant="outlined" name="phone" onChange={handleForm} />
                    <TextField id="email" label="Email" variant="outlined" name="email" onChange={handleForm} />
                    <TextField id="streetName" label="Street Name" variant="outlined" name="streetName" onChange={handleForm} />
                    <TextField id="streetNumber" label="Street Number" variant="outlined" name="streetNumber" onChange={handleForm} />
                    <TextField id="postalCode" label="Postal Code" variant="outlined" name="postalCode" onChange={handleForm} />
                </form>
                :
                null
            }

            <button onClick={(e) => PayCart(e)}>Pay</button>
        </div>
    )
}