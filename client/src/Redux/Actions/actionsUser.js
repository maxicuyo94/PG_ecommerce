// import * as actionType from "../action_types/actionTypes";
// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export const updateUser = (user, id) => {
//     return async () => {
//       await supabase
//         .from("users")
//         .update({
//           name: user.name,
//           surname: user.surname,
//           email: user.email,
//           username: user.username,
//           password: user.password,
//           phone: user.phone,
//           permission: user.permission,
//         })
//         .eq("id", id);
  
//       const addressId = await supabase
//         .from("addres")
//         .select("id,user_id")
//         .eq("user_id", id)
//   console.log(addressId)
//       await supabase
//         .from("address")
//         .update({
//           user_id: user.id,
//           address: user.address,
//           city: user.city,
//           postalCode: user.postalCode,
//           country: user.country,
//         })
//         .eq("id", addressId);
//     };
//   };
  
//   // export const postUser = async (users) => {
//   //   const { user, session, error } = await supabase
//   //   .auth.signUp({
//   //     email: 'example@email.com',
//   //     password: 'holahola',
//   //   })
  
//   //   console.log(user,session,error)
//   // }
  
//   export const allUsers = () => {
//     return async function (dispatch) {
//       let JSON = await supabase
//         .from('users')
//         .select(',address()')
//       dispatch({ type: actionType.ALL_USERS, payload: JSON.data })
//     }
//   };
  
//   export const userLogin = (user) => {
//     return async function (dispatch) {
//       let JSON = await supabase
//         .from('users')
//         .select(',address()')
//       dispatch({ type: actionType.ALL_USERS, payload: JSON.data })
//     }
//   }

//   export const allProducts = (limit, offset, category, price, input) => {
//     let categoriesName = !category ? '' : 'categories.name'
//     let lowestPrice = !price[0] ? '' : 'price'
//     let highestPrice = !price[1] ? '' : 'price'
//     let name = !input ? '' : 'name'
//     return async function (dispatch) {
//       let JSON = await supabase
//         .from('product')
//         .select('name,images,price,ranking,id,stock,categories(name)')
//         .ilike(name, `%${input}%`)
//         .eq(categoriesName, category)
//         .gt(lowestPrice, price[0])
//         .lt(highestPrice, price[1])
  
//       console.log("hola", JSON)
//       dispatch({ type: actionType.SEARCH, payload: JSON.data, pages: { limit, offset } })
//     }
//   }


//   export const postUser = (user) => {
//     console.log(user)
//     return async (dispatch) => {
//       await supabase.from("users").insert([
//         {
//           name: user.name,
//           surname: user.surname,
//           email: user.email,
//           user_name: user.userName,
//           user_password: user.password,
//           phone: user.phone
//         },
//       ]);
  
//       const userId = await supabase
//         .from("users")
//         .select("id")
//         .eq("email", user.email);
//       console.log(userId)
//       await supabase.from("address").insert([
//         {
//           user_id: userId.data[0].id,
//           address: user.address,
//           city: user.city,
//           postal_code: user.postal_code,
//           country: user.country
//         },
//       ]);
//       dispatch({ type: actionType.POST_USER });
//     }
//   };