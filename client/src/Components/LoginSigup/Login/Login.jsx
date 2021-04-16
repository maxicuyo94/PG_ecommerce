import React, { useState } from 'react';
import style from './login.module.scss';

export function Login() {
    const [user, setUser] = useState({
        email: "",
        userName: "",
        password: "",
    });

    const  handleState = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };



    return (
        <div className={style.container}>
            <form className="form">
                <div>
                    <input className={!user.email ? "danger" : ""} type="text" name="email" placeholder="Username or Email" value={user.email} onChange={handleState} />
                </div>
                <div>
                    <input className={!user.password ? "danger" : ""} type="password" name="password" placeholder="Password" value={user.password} onChange={handleState} />
                </div>
                <button type="button">LogIn</button>
            </form>
        </div>
    )
}