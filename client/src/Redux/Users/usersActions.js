import * as actionType from "../action_types/actionTypes";

import { createClient } from "@supabase/supabase-js";
import swal from "sweetalert";
import { addItemCart, setCart } from "../Cart/cartActions";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const postUser = (users) => {
  return async () => {
    const { user, error } = await supabase
      .auth
      .signUp({ email: users.email, password: users.password })

    if (error) {
      alert(error.message)
      return error
    } else {
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
      await supabase.from("order").insert([
        {
          user_id: user.id,
          orderStatus: 'inCart',
        },
      ]);
      return user
    }
  }
};

export const updateUser = (users) => {
  return async () => {
    // eslint-disable-next-line
    const { user, error } = await supabase.auth.update({
      email: "new@email.com",
      password: "new-password",
    });

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
      .eq("user_id", users.id);

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

export const allUsers = (user) => {
  return async function (dispatch) {
    if(!user) {
    let JSON = await supabase.from("users").select("*");
    return dispatch({ type: actionType.ALL_USERS, payload: JSON.data });
  }
  let JSON = await supabase.from("users").select("*").ilike("name", `%${user}%`);
  dispatch({ type: actionType.ALL_USERS, payload: JSON.data });
  };
};

export const deleteUser = (id) => {
  return async () => {
    await supabase.from("address").delete("*").match({ user_id: id });
    await supabase.from("users").delete().eq("id", id);
  };
};


export const userLogin = (users) => {
  return async function (dispatch) {
    const { data: user, error } = await supabase.auth.signIn({
      email: users.email,
      password: users.password,
    })
    if (error) {
      alert(error.message)
    } else {
      let previousStorage = localStorage.getItem("cart") && JSON.parse(window.localStorage.getItem("cart"))
      let guestCartAdded = previousStorage.map(item => addItemCart(item))
      console.log( guestCartAdded )
      dispatch({ type: actionType.USER_LOGIN, payload: user.user });
      const userLoged = await supabase
      .from("users")
      .select("*,address(*)")
      .eq("email", users.email);
      dispatch({ type: actionType.USER_LOGIN, payload: userLoged.data[0] });
      setTimeout(() => {
        dispatch(setCart(user.user.id));
      }, 2000);
    }
  }
};

export const userStorage = (id) => {
  return async function (dispatch) {    
    if(id) {
      const userLoged = await supabase
        .from("users")
        .select("*,address(*)")
        .eq("id", id);
      dispatch({ type: actionType.USER_LOGIN, payload: userLoged.data[0]});
    }
    // else {
    //   swal("no logged", "wanna log in?", "error");
    // }
  }
}

export const sendMail = (email) => {
  return async function () {
    // eslint-disable-next-line
    const { error, data } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    error ? swal("Oops!", error.message, "error") : swal("We send you an email to reset your password");

  };
};

export const ResetPassword = (access_token, new_password) => {
  return async function () {
    try {
      console.log(access_token, new_password);
      // eslint-disable-next-line
      const { error, data } = await supabase.auth.api.updateUser(access_token, {
        password: new_password,
      });
    } catch (e) {
      swal("Oops", "Invalid dates", "error");
    }
  };
};

export const userLogOut = () => {
  return function (dispatch) {
    const { error } = supabase.auth.signOut()
    localStorage.setItem("cart", "[]")

    if(error){
      return error
    }else{
      dispatch({ type: actionType.SET_CART, payload: [] });
      dispatch({ type: actionType.USER_LOGOUT })
    }
  }
};

export const changeUserPermission = (id, newPermission) => {
  return async function (){
    await supabase
    .from("users")
    .update({
      permission: newPermission,
    })
    .eq("id", id);
  }
}