import { combineReducers } from 'redux';
import cartReducer from './Cart/cartReducer'
import productReducer from './Products/productReducer'
import orderReducer from './Orders/orderReducer'
import usersReducer from './Users/usersReducer'




const rootReducer = combineReducers(
    {
       cartReducer,
       productReducer,
       orderReducer,
       usersReducer,
    }
)

export default rootReducer;