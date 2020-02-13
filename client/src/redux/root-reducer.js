import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/user.saga';
import { cartReducer } from './cart/cart.saga';
import { shopReducer } from './shop/shop.saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
