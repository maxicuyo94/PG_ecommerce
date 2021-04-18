import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../LocalStorage/useLocalStorage'
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from './SignUp/SignUp.jsx';
import { Login } from './Login/Login.jsx';
import { ModifyUser } from './ModifyUser/ModifyUser.jsx'

import style from './loginsignup.module.scss';
import { Route } from 'react-router';
import { prueba } from '../../Redux/Actions/actions.js';

export function LoginSignup() {
    const [stateCover, setStateCover] = useState("LogIn")
    const stateRedux = useSelector((state) => state.prueba);

    const dispatch = useDispatch();

    const handleCover = () => {
        if (stateCover === "LogIn") {
            setStateCover("SignUp")
        } else {
            setStateCover("LogIn")
        }
    }

    return (
        <div className={style.container}>
            <div className={style.contents}>
            <div className={stateCover === "LogIn" ? style.login : style.signup}>
                <button onClick={handleCover}>{stateCover}</button>
            </div>
            <div>
                <SignUp />
            </div>
            <div>
                <Login />
            </div>
            <Route exact path='/modifyUser' component={<ModifyUser />} />
            </div>
        </div>
    );
};

