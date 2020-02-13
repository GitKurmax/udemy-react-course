import { addItemToCart, removeItemFromCart } from './cart.utils';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { UserActionTypes } from '../user/user.saga';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
    return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
    };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
    return {
        ...state,
        cartItems: state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
        )
    };
    case CartActionTypes.CLEAR_CART:
    return {
        ...state,
        cartItems: []
    };
    default:
      return state;
  }
};

export const CartActionTypes = {
    TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',
    ADD_ITEM: 'ADD_ITEM',
    CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART",
    REMOVE_ITEM: "REMOVE_ITEM",
    CLEAR_CART: "CLEAR_CART" 
  };
  
export const actions = {
    toggleCartHidden: () => ({
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    }),
    addItem: item => ({
        type: CartActionTypes.ADD_ITEM,
        payload: item
    }),
    removeItem: item => ({
        type: CartActionTypes.REMOVE_ITEM,
        payload: item
    }),
    clearItemFromCart: item => ({
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: item
    }),
    clearCart: () => ({
        type: CartActionTypes.CLEAR_CART,
    })
}

export function* clearCartOnSignOut() {
    yield put(actions.clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSaga() {
    yield all([call(onSignOutSuccess)])
}
