import * as actionType from '../action_types/actionTypes'

const InitialState = {
    wantedProducts: [],
    productDetail: {},
    categories: [],
    productByCategories: {},
    filter:{
      categories:"",
      prices:100,
      pages:0
    }
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
          productByCategories: {...state.productByCategories,           
            [action.payload.name]:{name: action.payload.name, product: action.payload.product}
        }
        };

      default:
        return state;
    }
  }
  
  export default Reducer;