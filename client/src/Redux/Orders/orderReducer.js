import * as actionType from "../action_types/actionTypes";

const InitialState = {
  orders: [],
  orderDetail: {},
};

function Reducer(state = InitialState, action) {
  switch (action.type) {
      case actionType.ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    case actionType.GET_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };
    default:
      return state;
  }
}
export default Reducer;