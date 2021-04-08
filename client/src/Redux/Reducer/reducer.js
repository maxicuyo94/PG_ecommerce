import * as actionType from '../action_types/actionTypes'

const InitialState = {
    wantedProducts: [],
    productDetail: {}
  };
  
  function Reducer(state = InitialState, action) {
    switch (action.type) { 
      case actionType.SEARCH:
        return {
          ...state,
          wantedProducts: action.payload
        };
        
      case actionType.PRODUCTDETAIL:
        return {
          ...state,
          productDetail: action.payload
        };
  
      case "": 
        return {};
  
      case "":
        return {};

      default:
        return state;
    }
  }
  
  export default Reducer;