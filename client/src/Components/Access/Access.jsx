import React, { useState } from "react";
import { SignUp } from "./SignUp/SignUp.jsx";
import { Login } from "./Login/Login.jsx";
import { ModifyUser } from "./ModifyUser/ModifyUser.jsx";
import style from "./access.module.scss";
import { Route } from "react-router";

export function Access() {
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
        <div className={style.containerLoginSignin}>
          <SignUp />
        </div>
        <div className={style.containerLoginSignin}>
          <Login />
        </div>
        <Route exact path="/modifyUser" component={ModifyUser} />
      </div>
    </div>
  );
}
