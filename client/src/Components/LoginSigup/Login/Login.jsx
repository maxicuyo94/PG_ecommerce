import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userLogin, sendMail } from "../../../Redux/Users/usersActions"
import { useHistory, Link } from "react-router-dom"
import style from './login.module.scss';

export function Login() {
    const dispatch = useDispatch()
    const history = useHistory()


    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    let userId = localStorage.getItem("supabase.auth.token") && JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession.user.id

    const handleState = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const loginUsers = () => {
        dispatch(userLogin(user));
    }

    // userId && history.push("/catalogue")

    //No BORRAR!!!
    const resetPassword = () => {
        dispatch(sendMail(document.getElementById("email").value))
    }

    return (

        <form className={style.container}>
            {!userId && <div>
                <div>
                    <input className={!user.email ? "danger" : ""} type="text" name="email" placeholder="Email" value={user.email} onChange={handleState} />
                </div>
                <div>
                    <input className={!user.password ? "danger" : ""} type="password" name="password" placeholder="Password" value={user.password} onChange={handleState} />
                </div>
                <button className={style.simpleButton} type="button" onClick={(e) => loginUsers(e)}>LogIn</button>
            </div>
            }
            {/* No BORRAR!!! */}
            <input type="text" id="email" placeholder="Email" />
            <button type="button" onClick={(e) => resetPassword(e)}>Forgot password?</button>
            {userId && <Link to={`/modifyUser/${userId}`}>
                Modify User
                </Link>}
        </form>
    )
}