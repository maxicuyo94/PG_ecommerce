import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const Search = (input) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from("product")
      .select("*")
      .ilike("name", `%${input}%`);
    dispatch({ type: actionType.SEARCHB, payload: JSON.data });
  };
};

export const totalProducts = () => {
  return async function (dispatch) {
    let JSON = await supabase
      .from("product")
      .select("*")
    dispatch({
      type: actionType.PRODUCTS,
      payload: JSON.data,
    });
  };
};

export const allProducts = (limit, offset, cate, price, input) => {
  let nm = !cate ? '' : 'categories.name'
  let prg = !price[0] ? '' : 'price'
  let prl = !price[1] ? '' : 'price'
  let name = !input ? '' : 'name'
  return async function (dispatch) {
    let JSON = await supabase
      .from('product')
      .select('name,images,price,ranking,id,stock,categories(name)')
      .ilike(name, `%${input}%`)
      .eq(nm, cate)
      .gt(prg, price[0])
      .lt(prl, price[1])
    dispatch({ type: actionType.SEARCH, payload: JSON.data, pages: { limit, offset } })
  }
}


export const productDetail = (input) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from("product")
      .select("*, categories(id, name)")
      .eq("id", input);
    dispatch({ type: actionType.PRODUCT_DETAIL, payload: JSON.data[0] });
  };
};

export const getCategories = () => {
  return async function (dispatch) {
    const JSON = await supabase.from("categories").select("*");
    dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data });
  };
};

export const getProductsByCategories = (input) => {
  return async function (dispatch) {
    let Pname = !input ? "" : "name";
    const categoriesID = await supabase
      .from("categories")
      .select("id, name")
      .range(0, 2);

    const productsID = await Promise.all(
      categoriesID.data.map(async (categoryID) => {
        const productID = await supabase
          .from("product_categories")
          .select("product_id, product(name)")
          .eq("categories_id", categoryID.id);
        return { data: productID.data, name: categoryID.name };
      })
    );
    const products = await Promise.all(
      productsID.map(async (arrProductbyCategory) => {
        const promiseProducts = await Promise.all(
          arrProductbyCategory.data.map(async (objID) => {
            const product = await supabase
              .from("product")
              .select("*")
              .eq("id", objID.product_id);
            return product.data[0];
          })
        );
        return { name: arrProductbyCategory.name, data: promiseProducts };
      })
    );

    dispatch({ type: actionType.GET_PRODUCTBYCATEGORIES, payload: products });
  };
};

export const postProduct = (product) => {
  return async (dispatch) => {
    const productResult = await supabase.from("product").insert([
      {
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
        model: product.model,
        ranking: product.ranking,
        storage: product.storage,
        status: product.status,
      },
    ]);

    const productId = await supabase
      .from("product")
      .select("id")
      .eq("name", product.name);

    product.categories.map(async (category) => {
      const categoryId = await supabase
        .from("categories")
        .select("id")
        .eq("name", category);

      await supabase.from("product_categories").insert([
        {
          product_id: productId.data[0].id,
          categories_id: categoryId.data[0].id,
        },
      ]);
    });
    dispatch({ type: actionType.POST_PRODUCT });
  };
};

export const postCategory = (category) => {
  return async (dispatch) => {
    await supabase.from("categories").insert([
      {
        name: category.name,
        description: category.description,
      },
    ]);
    const JSON = await supabase.from("categories").select("*");
    dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data });
  };
};

export const updateProduct = (product, id) => {
  console.log(product.images)
  return async () => {
    await supabase
      .from("product_categories")
      .delete("*")
      .match({ product_id: id });
    product.categories.map(async (category) => {
      await supabase
        .from("product_categories")
        .insert([{ product_id: id, categories_id: category.id }]);
    });
    await supabase
      .from("product")
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
        model: product.model,
        ranking: product.ranking,
        storage: product.storage,
        status: true,
      })
      .eq("id", id);
  };
};

export const deleteProduct = (id) => {
  return async () => {
    console.log(id)
    await supabase
    .from("images")
    .delete("*")
    .match({ product_id: id });
    await supabase
      .from('product')
      .delete()
      .eq("id", id);
};

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
      country: user.country
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
      .eq("user_id", id)

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
    let JSON = await supabase
      .from('users')
      .select('name,surname,email,user_name,permission,phone,address(address,city,postalCode,country)')
    dispatch({ type: actionType.allUsers, payload: JSON.data })
  }
}

