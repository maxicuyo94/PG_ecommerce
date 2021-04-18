import React, { useEffect, useState } from 'react';
import { prueba } from '../../../Redux/Actions/actionsUser'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '../../../LocalStorage/useLocalStorage'
import { Footer } from '../../Footer/Footer';
import style from './signup.module.scss';

export function SignUp() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userLog = useSelector(state => state.prueba)
    const [priority, setPriorityStorage] = useLocalStorage("priority", "")
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        userName: "",
        password: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        country: ""
    });
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(true)
    const VAL = "validated"

    const handleState = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        const asyncFunction = async () => {
            if (success === VAL) {
                await dispatch(prueba("user"))
                // history.go(0)
                console.log("algo")
            }
            console.log("loqueseas")
        }
        asyncFunction()
    }, [success])

    useEffect(()=> {
        console.log(userLog)
    },[userLog])

    const created = () => {
        let state = "waiting"
        for (const prop in errors) {
            if (errors[prop]) {
                 state = false
                 break
            }else{
                state = VAL
            }
        }
        setSuccess(state)
    }

console.log(success)
    return (

            <form className={style.container}>
                <div>
                    <label className={errors.name  && success === false ? style.danger : ""} htmlFor="name">Name</label>
                    <input className={errors.name  && success === false ? style.danger : ""} type="text" name="name" placeholder="Name" value={user.name} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.lastName  && success === false ? style.danger : ""} htmlFor="surname">Surname</label>
                    <input className={errors.lastName  && success === false ? style.danger : ""} type="text" name="surname" placeholder="Surname" value={user.lastname} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="userName">UserName</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="userName" placeholder="Username" value={user.userName} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="phone">Phone</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="address">Address</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="address" placeholder="Address" value={user.address} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="city">City</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="city" placeholder="Username" value={user.city} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="postal_code">Postal Code</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="postal_code" placeholder="Username" value={user.postal_code} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="country">Country</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="country" placeholder="Username" value={user.country} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.email  === "validate" || (errors.email  && success === false) ? style.danger : ""} htmlFor="email">Email</label>
                    <input className={errors.email  === "validate" || (errors.email  && success === false) ? style.danger : ""} type="text" name="email" placeholder="Email" value={user.email} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.password === "validate" || (errors.password  && success === false) ? style.danger : ""} htmlFor="password">Password</label>
                    <input className={errors.password === "validate" || (errors.password  && success === false) ? style.danger : ""} type="password" name="password" placeholder="Password" value={user.password} onChange={handleState} />
                </div>
                <button type="button" className={success === VAL ? style.successButton :  style.simpleButton} onClick={created}>SignUp</button>
            </form>

    );
};

export function validate(user) {
    var error = {}
    for (const prop in user) {
        if (prop === "email") {
            if (user[prop] && !/\S+@\S+\.\S+/.test(user[prop])) {
                error[prop] = "validate"
            } else if (!user[prop]){
                error[prop] = true
            } else {
                error[prop] = false
            }
        } else if (prop === "password") {
            if (user[prop] && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(user[prop])) {
                error[prop] = "validate"
            } else if (!user[prop]){
                error[prop] = true
            } else {
                error[prop] = false
            }
        } else if (!user[prop]) {
            error[prop] = true
        } else {
            error[prop] = false
        }
    }
    return error
};

// export function validate(user) {
//     var error = {}
//     for (const prop in user) {
//         if (prop === "email") {
//             if (user[prop] && !/\S+@\S+\.\S+/.test(user[prop])) {
//                 error[prop] = true
//             } else {
//                 error[prop] = false
//             }
//         } else if (prop === "password") {
//             if (user[prop] && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(user[prop])) {
//                 error[prop] = true
//             } else {
//                 error[prop] = false
//             }
//         }
//     }
//     return error
// };