import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, sendMail } from "../../../Redux/Users/usersActions";
import { useHistory, Link } from "react-router-dom";
import style from "./login.module.scss";
import { useLocalStorage } from "../../../LocalStorage/useLocalStorage";

export function Login() {
  const dispatch = useDispatch();
  const userRegistered = useSelector(state => state.usersReducer.userLoged)
  const history = useHistory();  

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  useEffect(()=> {
    if(userRegistered.id){
      history.push("/")
    }
  },[userRegistered])

  const handleState = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUsers = () => {
    const userLog = async () => {
      await dispatch(userLogin(user));
    };
    userLog();
  };

  // userId && history.push("/catalogue")

  //No BORRAR!!!
  const resetPassword = () => {
    dispatch(sendMail(document.getElementById("email").value));
  };

  return (
    <form className={style.container}>
        <>
          <div>
            <input
              className={!user.email ? "danger" : ""}
              type="text"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleState}
            />
          </div>
          <div>
            <input
              className={!user.password ? "danger" : ""}
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleState}
            />
          </div>
          <button
            className={style.simpleButton}
            type="button"
            onClick={(e) => loginUsers(e)}
          >
            LogIn
          </button>
          <div>
            <input type="text" id="email" placeholder="Email" />
          </div>
            <button className={style.simpleButton} type="button" onClick={(e) => resetPassword(e)}>
              Forgot password?
            </button>
        </>
    </form>
  );
}
