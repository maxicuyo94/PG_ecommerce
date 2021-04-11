import * as actionType from '../action_types/actionTypes'

const InitialState = {
    wantedProducts: [],
    productDetail: {},
    categories: [],
    productByCategories: {}
  };
  
  function Reducer(state = InitialState, action) {
    switch (action.type) { 
      case actionType.SEARCH:
        return {
          ...state,
          wantedProducts: action.payload
        };
        
      case actionType.PRODUCT_DETAIL:
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

      default:
        return state;
    }
  }
  
  export default Reducer;