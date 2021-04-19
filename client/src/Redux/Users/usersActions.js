import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const postUser = (users) => {
  return async () => {
    try {
      const { user, session, error } = await supabase
        .auth.signUp({
          email: users.email,
          password: users.password,
        })

      await supabase.from("users").insert([
        {
          id: user.id,
          name: users.name,
          surname: users.surname,
          email: user.email,
          user_name: users.userName,
          phone: users.phone
        },
      ]);

      await supabase.from("address").insert([
        {
          user_id: user.id,
          address: users.address,
          city: users.city,
          postal_code: users.postal_code,
          country: users.country
        },
      ]);

      console.log(user)
    } catch (e) {
      swal('Oops!', e, 'error')
    }
  }
};

export const updateUser = (users) => {
  return async () => {

    const { user, error } = await supabase.auth.update({
      email: "new@email.com",
      password: "new-password",
    })

    await supabase
      .from("users")
      .update({
        user_name: users.userName,
        phone: users.phone,
      })
      .eq("id", users.id);

    const addressId = await supabase
      .from("address")
      .select("id")
      .eq("user_id", users.id)

    await supabase
      .from("address")
      .update({
        address: users.address,
        city: users.city,
        postal_code: users.postal_code,
        country: users.country,
      })
      .eq("id", addressId.data[0].id);
  };
};

export const allUsers = (users) => {
  return async function (dispatch) {
    let JSON = await supabase.from("users").select("*");
    dispatch({ type: actionType.ALL_USERS, payload: JSON.data });
  };
};

export const deleteUser = (id) => {
  return async () => {
    await supabase
    .from("address")
    .delete("*")
    .match({ user_id: id });
    await supabase.from("users").delete().eq("id", id);
  };
};

export const userLogin = (users) => {
  return async function (dispatch) {
    const { user, session, error } = await supabase.auth.signIn({
      email: users.email,
      password: users.password,
    })

    if(error) alert(error.message)
    // else console.log(user) 



    const JSON = await supabase
    .from('users')
    .select('*,address(*)')
    .eq('email', users.email)

    dispatch({ type: actionType.USER_LOGIN, payload: JSON.data[0] })
  }
}

export const sendMail = (email) => {
  return async function () {
    const { error, data } = await supabase.auth.api.resetPasswordForEmail(email)
    error && swal('Oops!', error.message, 'error')
  }
}

export const ResetPassword = (access_token, new_password) => {
  return async function () {
    try {
      console.log(access_token, new_password)
      const { error, data } = await supabase.auth.api
        .updateUser(access_token, { password: new_password })
    } catch (e) {
      swal('Oops', 'Invalid dates', 'error')
    }
  }
}

export const userLogOut = () => {
  localStorage.removeItem("supabase.auth.token")

    // try {
    //   localStorage.removeItem("supabase.auth.token")
    // } catch (e) {
    //   alert(e)
    // }
}
