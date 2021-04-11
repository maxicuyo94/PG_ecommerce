import * as actionType from '../action_types/actionTypes'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zgycwtqkzgitgsycfdyk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E"
const supabase = createClient(supabaseUrl, supabaseKey)

export const Buscar = (input) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from('product')
      .select('*')
      .ilike('name', `%${input}%`)
    dispatch({ type: actionType.SEARCH, payload: JSON.data })
  }
}


export const allProducts = (limit, offset, cate, price) => {
  let nm = !cate ? '' : 'categories.name'
  let pr = !price ? '' : 'price'
  return async function (dispatch) {
      let JSON = await supabase
        .from('product')
        .select('name,images,price,ranking,categories(name)')
        .eq(nm, cate)
        .gt(pr,price-200) 
        .lt(pr,price)   
    dispatch({ type: actionType.SEARCH, payload: JSON.data, pages:{limit,offset} })
  }
}

export const productDetail = (input) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from('product')
      .select("*")
      .eq('id', input)
    dispatch({ type: actionType.PRODUCT_DETAIL, payload: JSON.data[0] })
  }
}

export const getCategories = () => {
  return async function (dispatch) {
    const JSON = await supabase
      .from('categories')
      .select('*')
    dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data })
  }
}

export const getProductsByCategories = (id, name) => {
  return async function (dispatch) {
    const JSON = await supabase
      .from('product_categories')
      .select(`product_id`)
      .eq(`categories_id`, id)

    const productArr = []

    JSON.data && JSON.data.map(async (productId) => {

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
    dispatch({ type: actionType.GET_PRODUCTBYCATEGORIES, payload: objProduct })
  }
}


export const postProduct = (product) => {
  return async (dispatch) => {
    await supabase
      .from("product")
      .insert([
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
        }
      ])

    const productId = await supabase
      .from('product')
      .select('id')
      .eq('name', product.name)

    product.categories.map(async (category) => {
      const categoryId = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        
      await supabase
        .from('product_categories')
        .insert([
          { product_id: productId.data[0].id, categories_id: categoryId.data[0].id}
        ])
    })
    dispatch({ type: actionType.POST_PRODUCT })
  }
}
