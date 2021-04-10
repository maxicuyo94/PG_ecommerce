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
        if(!action.priceA){return {
          ...state,
        wantedProducts: action.payload
        } }
        if(action.priceA === '0-100'){
        return {
          ...state,
          wantedProducts: action.payload.filter((a) => a.price < 100)
        }}
        if(action.priceA === '0-300'){
          return {
            ...state,
            wantedProducts: action.payload.filter((a) => a.price < 300)
          }}
          if(action.priceA === '+'){
            return {
              ...state,
              wantedProducts: action.payload.filter((a) => a.price < 1000)
            }}
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