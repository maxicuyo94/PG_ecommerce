import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, sendMail } from "../../../Redux/Users/usersActions";
import { useHistory, useLocation } from "react-router-dom";
import style from "./login.module.scss";
//import { useLocalStorage } from "../../../LocalStorage/useLocalStorage";

export function Login() {
  const dispatch = useDispatch();
  const userRegistered = useSelector(state => state.usersReducer.userLoged)
  const location = useLocation()
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userRegistered?.id) {
      if (location.state.from) {
        history.push(location.state.from)
      } 
    }
  }, [userRegistered])

  const handleState = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUsers = (e) => {
    const userLog = async () => {
      await dispatch(userLogin(user));
    };
    userLog();
  };

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
          name="login"
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
        <div className={style.containerGG}>
          <div className={style.githubButton}
            onClick={() =>
              window.location.href = "https://zgycwtqkzgitgsycfdyk.supabase.co/auth/v1/authorize?provider=github"}
          >
            <img src="/images/GitHub-Mark-Light-32px.png"
              className={style.googleButton} type="button"
            />
            <span>Sign in with GitHub</span>
          </div>
          <img
            src="/images/btn_google_signin_dark_normal_web.png"
            className={style.googleButton}
            type="button"
            onClick={() =>
              window.location.href = "https://zgycwtqkzgitgsycfdyk.supabase.co/auth/v1/authorize?provider=google"} />
        </div>
      </>
    </form>
  );
}
