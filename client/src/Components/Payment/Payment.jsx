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

    console.log(cart, user)

    const [input, setInput] = useState({
        streetName: "lomita",
        streetNumber: "lomitasss2",
        postalCode: "22cc"
    })

    const [form, setform] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        addres: {
            streetName: '',
            streetNumber: '',
            postalCode: '',
        },
    })

    

    let handleAddress = () => {
        setInput({
            streetName: "lomita",
            streetNumber: "lomitasss2",
            postalCode: "22cc"
        })
    }

    const handleForm = (e) => {
        e.preventDefault()
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
        console.log(form)
    }

    // let infoUser = {
    //     name: user.name,
    //     surname: user.surname,
    //     phone: user.phone,
    //     email: user.email,
    //     addres: input
    // }

    if(user.id){
        var infoUser = {
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            email: user.email,
            addres: input
        }
    } else {
        var infoUser = form
    }

    console.log(infoUser)

    let PayCart = async (e) => {
        e.preventDefault()
        let response = await dispatch(orderPayment(cart, infoUser))
        response && window.location.replace(response)
    }

    return (
        <div>
            {cart.map(item => <ItemCart product={item} />)}
            {user.id && <select>
                <option value="">Address</option>
                {
                    user.address && user.address.map(add => <option onChange={handleAddress} value={add}>{add.address}</option>)
                }
            </select>}

            {!user.id ? 
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="name" label="Name" variant="outlined" name="name" onChange={handleForm} />
                <TextField id="surname" label="Surname" variant="outlined" name="surname" onChange={handleForm} />
                <TextField id="phone" label="Phone" variant="outlined" name="phone" onChange={handleForm} />
                <TextField id="email" label="Email" variant="outlined" name="email" onChange={handleForm} />
                <TextField id="streetName" label="Street Name" variant="outlined" name="streetName" onChange={handleForm} />
                <TextField id="streetNumbre" label="Street Number" variant="outlined" name="streetNumbre" onChange={handleForm} />
                <TextField id="postalCode" label="Postal Code" variant="outlined" name="postalCode" onChange={handleForm} />
            </form>
            : 
            null
            }    
            
            <button onClick={(e) => PayCart(e)}>Pay</button>
            {/* <Button variant="contained">
                <a href={PayCart}>Pay</a>
            </Button> */}
        </div>
    )
}