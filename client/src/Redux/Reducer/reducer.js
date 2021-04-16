import * as actionType from "../action_types/actionTypes";

const InitialState = {
  allproducts: [],
  wantedProducts: [],
  productDetail: {},
  categories: [],
  productByCategories: {},
  users: [],
  cart: [],
};

function Reducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.PRODUCTS:
      return {
        ...state,
        allproducts: action.payload,
      };
    case actionType.SEARCH:
        return {
          ...state,
          wantedProducts: action.payload.filter(category => category.categories.length).slice(action.pages.limit,action.pages.offset)
        };
    case actionType.SEARCHB:
      return {
        ...state,
        wantedProducts: action.payload,
      };

    case actionType.PRODUCT_DETAIL:
      state.productDetail = {};
      return {
        ...state,
        productDetail: action.payload,
      };

    case actionType.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case actionType.GET_PRODUCTBYCATEGORIES:
      return {
        ...state,
        productByCategories: action.payload,
      };
    case actionType.ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case actionType.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case actionType.ADD_UNIT_ITEM_CART:
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.id === action.payload.id) {
            el.quantity = el.quantity + 1;
          }
          return el;
        }),
      };
    case actionType.REMOVE_UNIT_ITEM_CART:
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.id === action.payload.id) {
            el.quantity = Math.max(1, el.quantity - 1);
          }
          return el;
        }),
      };

    case actionType.ADD_ITEM_CART:
      let found = state.cart.find((item) => item.id === action.payload.id);
      if (found)
        return {
          ...state,
          cart: state.cart.map((prod) => {
            if (prod.id === action.payload.id) {
              prod.quantity += action.payload.quantity;
            }
            return prod;
          }),
        };
      else
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
    case actionType.DELETE_ITEM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== action.payload.id),
      };

    case actionType.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };


    default:
      return state;
  }
}

export default Reducer;
