import * as actionType from '../action_types/actionTypes'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zgycwtqkzgitgsycfdyk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E"
const supabase = createClient(supabaseUrl, supabaseKey)

export const Buscar =  (input) => {
  return async function (dispatch) {
    const JSON =  await supabase
    .from('product')
    .select('*')
    .ilike('name', `%${input}%`)
    dispatch({type: actionType.SEARCH, payload: JSON.data})
  }
}


export const allProducts =  () => {
  return async function (dispatch) {
    const JSON =  await supabase
    .from('product')
    .select("*")
    console.log(JSON)
    dispatch({type: actionType.SEARCH, payload: JSON.data})
  }
}

export const productDetail =  (input) => {
  return async function (dispatch) {
    const JSON =  await supabase
    .from('product')
    .select("id")
    dispatch({type: actionType.PRODUCT_DETAIL, payload: JSON.data})
  }
}

export const getCategories = () => {
  return async function (dispatch) {
    const JSON = await supabase
    .from('categories')
    .select('*')
    dispatch({type: actionType.GET_CATEGORIES, payload: JSON.data})
  }
}

export const getProductsByCategories = (id) => {
  return async function (dispatch) {
    const JSON = await supabase
    .from('product_categories')
    .select(`${id}`)
    console.log(JSON)
    // dispatch({type: actionType.GET_CATEGORIES, payload: JSON.data})
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
    dispatch({type: actionType.POST_PRODUCT})
  }
}