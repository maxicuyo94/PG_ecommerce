import React, { useState } from "react";
import { SignUp } from "./SignUp/SignUp.jsx";
import { Login } from "./Login/Login.jsx";
import { ModifyUser } from "./ModifyUser/ModifyUser.jsx";
import style from "./loginsignup.module.scss";
import { Route } from "react-router";

export function LoginSignup() {
  const [stateCover, setStateCover] = useState("SignUp");

  const handleCover = () => {
    if (stateCover === "LogIn") {
      setStateCover("SignUp");
    } else {
      setStateCover("LogIn");
    }
  };

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
        <Route exact path="/modifyUser" component={<ModifyUser />} />
      </div>
    </div>
  );
}
