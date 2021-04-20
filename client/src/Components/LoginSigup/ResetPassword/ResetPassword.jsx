import React from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { ResetPassword } from "../../../Redux/Users/usersActions";

export function Reset() {
  const dispatch = useDispatch();
  let token =
    localStorage.getItem("supabase.auth.token") &&
    JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession
      .access_token;
  const resetP = (e) => {
    e.preventDefault();
    if (
      !/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,15})/.test(
        document.getElementById("password").value
      )
    ) {
      swal("Campos invalidos o vacios", "", "success");
    } else {
      dispatch(ResetPassword(token, document.getElementById("password").value));
    }
  };

  return (
    <form className="form">
      <div>
        <label>New password</label>
        <input type="text" id="password" placeholder="Epassword" />
      </div>
      <button type="submit" onClick={(e) => resetP(e)}>
        Reset password
      </button>
    </form>
  );
}
