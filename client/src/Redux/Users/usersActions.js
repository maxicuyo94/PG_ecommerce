import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const postUser = async (user) => {
  const userResult = await supabase.from("users").insert([
    {
      name: user.name,
      surname: user.surname,
      email: user.email,
      username: user.username,
      password: user.password,
      phone: user.phone,
      permission: user.permission,
    },
  ]);

  const userId = await supabase
    .from("users")
    .select("id")
    .eq("email", user.email);

  await supabase.from("address").insert([
    {
      user_id: userId.data[0].id,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
    },
  ]);
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
      if(users){const { user, session, error } = await supabase.auth.signIn({
        email: users.email,
        password: users.password,
      })
      if(error) alert(error.message)
    }
     
    let userId = localStorage.getItem("supabase.auth.token") && JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession.user.id

    const JSON1 = userId && await supabase
    .from('users')
    .select('*,address(*)')
    .eq('id', userId)

    userId && dispatch({ type: actionType.USER_LOGIN, payload: JSON1.data[0] })
  }
}

export const sendMail = (email) => {
  return async function () {
    const { error, data } = await supabase.auth.api.resetPasswordForEmail(email)
    error && alert(error.message)
  }
}

export const ResetPassword = (access_token, new_password) => {
  return async function () {
    try {
      console.log(access_token, new_password)
      const { error, data } = await supabase.auth.api
        .updateUser(access_token, { password: new_password })
    } catch (e) {
      alert("Invalid dates")
    }
  }
}
