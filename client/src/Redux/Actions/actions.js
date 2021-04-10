import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const Buscar = (input) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from("product")
      .select("*")
      .ilike("name", `%${input}%`);
    dispatch({ type: actionType.SEARCH, payload: JSON.data });
  };
};


export const allProducts =  (limit,offset,priceA) => {
  return async function (dispatch) {
    const JSON =  await supabase
    .from('product')
    .select('name,price,images,ranking,id')
    .range(limit,offset)
    console.log(JSON)
    dispatch({type: actionType.SEARCH, payload: JSON.data,priceA})
  }
}


export const productDetail = (input) => {
  return async function (dispatch) {

    const JSON =  await supabase
    .from('product')
    .select("*")
    .eq('id',input)
    dispatch({type: actionType.PRODUCT_DETAIL, payload: JSON.data[0]})
  }
}


export const getCategories = () => {
  return async function (dispatch) {
    const JSON = await supabase.from("categories").select("*");
    dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data });
  };
};

export const getProductsByCategories = (id, name) => {
  return async function (dispatch) {

    const JSON = await supabase
    .from('product_categories')
    .select(`product_id`)
    .eq(`categories_id`, id)

    const productArr = []

    JSON.data.map(async(productId)=>{
      
      const product = await supabase
      .from('product')
      .select(`*`)
      .eq('id', productId.product_id)
      productArr.push(product.data[0])
      }
    )
    const objProduct = {
      product: productArr,
      name: name, 
    }
    dispatch({type: actionType.GET_PRODUCTBYCATEGORIES, payload: objProduct})
  }
}



export const postProduct = (product) => {
  return async function (dispatch) {
    const resp = await supabase
      .from("product")
      .insert([
        {
          name: product.name,
          description: product.description,
          price: product.price,
          // images: product.images,
          brand: product.brand,
          stock: product.stock,
          model: product.model,
          ranking: product.ranking,
          storage: product.storage,
          status: product.status,
        },
      ]);
    dispatch({ type: actionType.POST_PRODUCT });
  };
};
