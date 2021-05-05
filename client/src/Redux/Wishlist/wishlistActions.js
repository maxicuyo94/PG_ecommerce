import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);
  

export const addToWishlist = async (payload) => {
  let userId =
  localStorage.getItem("supabase.auth.token") &&
  JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession.user
    .id;

if (userId) {
   let payload = await supabase.from("wishlist").insert([
        {
          product_id: payload.id,
          user_id: userId,
        },
      ]);
    }
    return { type: actionType.ADD_ITEM_WISHLIST, payload };
};

export const deleteWishlist = (payload) => {
      let userId =
        localStorage.getItem("supabase.auth.token") &&
        JSON.parse(localStorage.getItem("supabase.auth.token")).currentSession
          .user.id;
  
      if (userId) {
        let deleteItem = async () => {
          const idWishlist = await supabase
            .from("wishlist")
            .select("id")
            .eq("user_id", userId);
  
          await supabase.from("wishlist").delete().match({
            product_id: payload.id,
          });
        };
        deleteItem();
      }
    return { type: actionType.DELETE_ITEM_WISHLIST, payload };
  };