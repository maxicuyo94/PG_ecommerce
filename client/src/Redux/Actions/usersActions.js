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

export const updateUser = (user, id) => {
  return async () => {
    await supabase
      .from("users,address(address,city,postalCode,country)")
      .update({
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        password: user.password,
        phone: user.phone,
        permission: user.permission,
      })
      .eq("id", id);

    const addressId = await supabase
      .from("addres")
      .select("id,user_id")
      .eq("user_id", id);

    await supabase
      .from("address")
      .update({
        user_id: user.id,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
      })
      .eq("id", addressId);
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

