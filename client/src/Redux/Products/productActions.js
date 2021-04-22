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
      .select("*, images(url)")
      .ilike("name", `%${input}%`);
    dispatch({ type: actionType.SEARCHB, payload: JSON.data });
  };
};

export const totalProducts = () => {
  return async function (dispatch) {
    let JSON = await supabase.from("product").select("*, images(url)");
    dispatch({
      type: actionType.PRODUCTS,
      payload: JSON.data,
    });
  };
};

export const allProducts = (limit, offset, cate, price, input) => {
  let nm = !cate ? "" : "categories.name";
  let prg = !price[0] ? "" : "price";
  let prl = !price[1] ? "" : "price";
  let name = !input ? "" : "name";
  return async function (dispatch) {
    let JSON = await supabase
      .from("product")
      .select("name,price,rating,id,stock,categories(name), images(url)")
      .ilike(name, `%${input}%`)
      .eq(nm, cate)
      .gt(prg, price[0])
      .lt(prl, price[1]);
    dispatch({
      type: actionType.SEARCH,
      payload: JSON.data,
      pages: { limit, offset },
    });
  };
};

export const productDetail = (input) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from("product")
      .select("*, categories(id, name), images(url)")
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
    // eslint-disable-next-line
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
              .select("*, images(url)")
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
    await supabase.from("product").insert([
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

    product.images.map(async (image) => {
      await supabase.from("images").insert([
        {
          url: image.link,
          product_id: productId.data[0].id,
          cloudinary_id: image.public_id,
        },
      ]);
    });

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
    product.delImages.map(async (img) => {
      await supabase.from("images").delete("*").match({ url: img.url });
    });
    product.upImages.map(async (image) => {
      await supabase.from("images").insert([
        {
          url: image.link,
          product_id: id,
          cloudinary_id: image.public_id,
        },
      ]);
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
    await supabase.from("product_categories").delete("*").eq("product_id", id);
    await supabase.from("images").delete("*").match({ product_id: id });
    await supabase.from("product").delete().eq("id", id);
  };
};

export const deleteCategory = (id) => {
  return async () => {
    console.log(id);
    await supabase.from("categories").delete("*").match({ id: id });
  };
};
