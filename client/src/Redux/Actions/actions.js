import * as actionType from '../action_types/actionTypes'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zgycwtqkzgitgsycfdyk.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzczMDk4NCwiZXhwIjoxOTMzMzA2OTg0fQ.v7M4hQhgNYxkXa3zwDLs5dAWR_1egDuCASySblcNgSA")

export const Buscar =  (input) => {
  return async function (dispatch) {
    const data =  await supabase
    .from('products')
    .select("*")
    .ilike('name', `%${input}%`)
    dispatch({type: actionType.SEARCH, payload: data})
  }
}

export const productDetail =  (input) => {
  return async function (dispatch) {
    const data =  await supabase
    .from('products')
    .select("id")
    dispatch({type: actionType.PRODUCTDETAIL, payload: data})
  }
}



export const postProduct = (product) => {
  return async function (dispatch) {
    const { data, error } = await supabase
    .from('product')
    .insert([
      { name: `${product.name}`, images: `${product.images}`, stock: `${product.stock}`, price: `${product.price}`, model: `${product.model}`,
      brand: `${product.brand}`, description: `${product.description}`
     },
    ])
    dispatch({type: actionType.POSTPRUDOCT})
  }
}