import * as actionType from "../action_types/actionTypes";

const InitialState = {
  allproducts: [],
  wantedProducts: [],
  productDetail: {},
  categories: [],
  productByCategories: {},
  users: [],
  cart: [],
  orders: [],
  userOrders: [],
  orderDetail: {},
  userLoged:{}
};

function usersReducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
      case actionType.USER_LOGIN:
        return {
          ...state,
          userLoged: action.payload
        };
    default:
      return state;
  }
}

export default usersReducer;