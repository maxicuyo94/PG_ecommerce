import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useLocalStorage } from '../../../LocalStorage/useLocalStorage'
import { Footer } from '../../Footer/Footer';
import style from './signup.module.scss';

export function SignUp() {
    const history = useHistory()
    const [priority, setPriorityStorage] = useLocalStorage("priority", "")
    const [user, setUser] = useState({
        name: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
    });
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState()
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
        if (success === VAL) {
            console.log(success)
            history.go(0)
        }
    }, [success])

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
        console.log(errors)
        setSuccess(state)
    }

console.log(errors)
    return (

            <form className={style.container}>
                <div>
                    <label className={errors.name  && success === false ? style.danger : ""} htmlFor="name">Name</label>
                    <input className={errors.name  && success === false ? style.danger : ""} type="text" name="name" placeholder="Name" value={user.name} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.lastName  && success === false ? style.danger : ""} htmlFor="name">Lastname</label>
                    <input className={errors.lastName  && success === false ? style.danger : ""} type="text" name="lastName" placeholder="Lastname" value={user.lastname} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.userName  && success === false ? style.danger : ""} htmlFor="name">UserName</label>
                    <input className={errors.userName  && success === false ? style.danger : ""} type="text" name="userName" placeholder="Username" value={user.userName} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.email  === "validate" || (errors.email  && success === false) ? style.danger : ""} htmlFor="name">Email</label>
                    <input className={errors.email  === "validate" || (errors.email  && success === false) ? style.danger : ""} type="text" name="email" placeholder="Email" value={user.email} onChange={handleState} />
                </div>
                <div>
                    <label className={errors.password === "validate" || (errors.password  && success === false) ? style.danger : ""} htmlFor="name">Password</label>
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