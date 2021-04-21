import React, { useState , useEffect  } from 'react';
import { useDispatch } from "react-redux";
import { postUser } from "../../../Redux/Users/usersActions"
import { Link } from "react-router-dom"
import style from './signup.module.scss'

export function SignUp() {
    const dispatch = useDispatch()
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
     // eslint-disable-next-line
    const [validated, setValidated] = useState({})
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
        setValidated(validate(user))
    }, [user])

    useEffect(() => {
      dispatch(postUser(user))
    }, [dispatch, user, success])

    const created = (e) => {
        e.preventDefault()
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
        dispatch(postUser(user))
    }

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
                <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="city" placeholder="City" value={user.city} onChange={handleState} />
            </div>
            <div>
                <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="postal_code">Postal Code</label>
                <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="postal_code" placeholder="Postal Code" value={user.postal_code} onChange={handleState} />
            </div>
            <div>
                <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="country">Country</label>
                <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="country" placeholder="Country" value={user.country} onChange={handleState} />
            </div>
            <div>
                <label className={errors.email  === "validate" || (errors.email  && success === false) ? style.danger : ""} htmlFor="email">Email</label>
                <input className={errors.email  === "validate" || (errors.email  && success === false) ? style.danger : ""} type="text" name="email" placeholder="Email" value={user.email} onChange={handleState} />
            </div>
            <div>
                <label className={errors.password === "validate" || (errors.password  && success === false) ? style.danger : ""} htmlFor="password">Password</label>
                <input className={errors.password === "validate" || (errors.password  && success === false) ? style.danger : ""} type="password" name="password" placeholder="Password" value={user.password} onChange={handleState} />
            </div>
            <Link to="/login">
                <button type="button" className={success === VAL ? style.successButton :  style.simpleButton} onClick={e => created(e)}>SignUp</button>
            </Link>
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
