import React, { useState } from 'react';
import { SignUp } from './SignUp/SignUp.jsx';
import { Login } from './Login/Login.jsx';
import { ModifyUser } from './ModifyUser/ModifyUser.jsx'

import style from './loginsignup.module.scss';

export function LoginSignup() {

    return (
        <div className={style.container}>
            <SignUp />
            <Login />
            <ModifyUser/>
        </div>
    );
};

