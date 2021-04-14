import * as actionType from "../action_types/actionTypes";

const InitialState = {
  wantedProducts: [],
  productDetail: {},
  users: [],
  categories: [],
  productByCategories: {},
};

function Reducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.SEARCH:
      return {
        ...state,
        wantedProducts: action.payload.filter(category => category.categories.length).slice(action.pages.limit, action.pages.offset)
      };
    case actionType.SEARCHB:
      return {
        ...state,
        wantedProducts: action.payload
      };

    case actionType.PRODUCT_DETAIL:
      state.productDetail = {}
      return {
        ...state,
        productDetail: action.payload
      };

    case actionType.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };

    case actionType.GET_PRODUCTBYCATEGORIES:
      return {
        ...state,
        productByCategories: action.payload
      };
    case actionType.ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}

export default Reducer;
