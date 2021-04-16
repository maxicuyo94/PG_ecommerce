import * as actionType from "../action_types/actionTypes";


//Cart actions


export function setCart() {
    //check for previous cart in LocalStorage
    let previousStorage = window.localStorage.getItem("cart");
    if (previousStorage) {  
      previousStorage = JSON.parse(previousStorage);
    } else {
      previousStorage = [];
    }
  
    return { type: actionType.SET_CART, payload: previousStorage };
  }
  
  export const addItemCart = (payload) => {
    //check for previous cart in LocalStorage
    let previousStorage = window.localStorage.getItem("cart");
    if(previousStorage) {
      previousStorage = JSON.parse(previousStorage);
    } else {
      previousStorage = [];
    }
  
    // console.log(previousStorage)
    let found = previousStorage.find((item) => item.id === payload.id);
    // if item is already in the previous cart
    if(found) {
      previousStorage.map((prod) => {
        if (prod.id === payload.id) {
          prod.quantity += payload.quantity;
        }
        return prod;
      })
    } else {
    // if not in the prev cart, add to cart
      previousStorage.push(payload);
    }
  
    // console.log(previousStorage)
    const updatedStorage = JSON.stringify(previousStorage);
  
    // console.log(updatedStorage)
    window.localStorage.setItem("cart", updatedStorage);
  
    // let newLocalsStorge = window.localStorage.getItem("cart");
    // console.log(newLocalsStorge)
  
    return { type: actionType.ADD_ITEM_CART, payload }
  
  }
  
  export const deleteItemCart = (payload) => {
    let previousStorage = window.localStorage.getItem("cart");
    if(previousStorage) {
      previousStorage = JSON.parse(previousStorage);
      previousStorage = previousStorage.filter(el => el.id !== payload.id);
    } else {
      previousStorage = [];
    }
    console.log(previousStorage)
    const updatedStorage = JSON.stringify(previousStorage);
    window.localStorage.setItem("cart", updatedStorage);
  
      return { 	type: actionType.DELETE_ITEM_CART, payload }
  }
  
  export const clearCart = () => {
      localStorage.setItem('cart', '[]');
      return {
          type: actionType.CLEAR_CART
      }
  }
  
  export const editStock = (payload) => {
      return {
          type: actionType.EDIT_STOCK,
          payload
      }
  }