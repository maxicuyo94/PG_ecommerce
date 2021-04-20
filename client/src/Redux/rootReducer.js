import { combineReducers } from "redux";
import cartReducer from "./Cart/cartReducer";
import productReducer from "./Products/productReducer";
import orderReducer from "./Orders/orderReducer";
import usersReducer from "./Users/usersReducer";
import reviewsReducer from "./Reviews/reviewsReducer";

const rootReducer = combineReducers({
  cartReducer,
  productReducer,
  orderReducer,
  usersReducer,
  reviewsReducer,
});

export default rootReducer;
