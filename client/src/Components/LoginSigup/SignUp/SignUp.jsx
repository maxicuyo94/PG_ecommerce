import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useLocalStorage } from '../../../LocalStorage/useLocalStorage'
import style from './signup.module.scss';

export function SignUp() {
    const [priority, setPriorityStorage] = useLocalStorage ("priority", "")
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        lastName: "", 
        email: "",
        userName: "",
        password: "",
    });
    const [validated, setValidated] = useState ({})

    const  handleState = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        setValidated(validate({
            ...user,
            [e.target.name]: e.target.value
        }))
    }

    const created = () =>{
        setPriorityStorage(1, true)
        history.go(1)
    }


    return (
        <div className={style.container}>
            <form className="form">
                <div>
                    <label htmlFor="name">Name *</label>
                    <input className={!user.email ? style.danger : ""} type="text" name="name" placeholder="Name" value={user.name} onChange={handleState} />
                </div>
                <div>
                    <label htmlFor="name">Lastname *</label>
                    <input className={!user.email ? style.danger  : ""} type="text" name="lastName" placeholder="Lastname" value={user.lastname} onChange={handleState} />
                </div>
                <div>
                    <label htmlFor="name">UserName *</label>
                    <input className={!user.email ? style.danger : ""} type="text" name="userName" placeholder="Username" value={user.userName} onChange={handleState} />
                </div>
                <div>
                    <label htmlFor="name">Email*</label>
                    <input className={!user.email ? style.danger : ""} type="text" name="email" placeholder="Email" value={user.email} onChange={handleState} />
                </div>
                <div>
                    <label htmlFor="name">Password *</label>
                    <input className={!user.password ? style.danger : ""} type="password" name="password" placeholder="Password" value={user.password} onChange={handleState} />
                </div>
                <button type="button" className={validated.validated ? style.success : style.error} onClick={created}>SignUp</button>
            </form>
        </div>
    );
};



export function validate(user) {
    let error = {}
    for (const prop in user) {
        if(!user[prop]){
            error[prop] = 'Campos invalido o vacio.'
        }else if (prop === "email") {
            if (!/\S+@\S+\.\S+/.test(user[prop])){
                error[prop] = 'Campos invalido o vacio.'
                return error.error = "Los campos estan vacios o son invalidos"
            }else{
                error[prop] = ''
            }
        }else if (prop === "password"){
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(user[prop])){
                error[prop] = 'Campos invalido o vacio.'
            }else{
                error[prop] = ''
            }
        }else{
            error[prop] = ''
        }
    }
    return error
  };