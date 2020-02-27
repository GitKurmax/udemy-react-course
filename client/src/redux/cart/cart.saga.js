import { addItemToCart, removeItemFromCart } from '../../providers/cart/cart.utils';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { UserActionTypes } from '../user/user.saga';

import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase.utils';

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
    case CartActionTypes.UPDATE_CART_ITEMS:
    return {
        ...state,
        cartItems: action.payload
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
    CLEAR_CART: "CLEAR_CART",
    ADD_CART_TO_FIREBASE: "ADD_ITEM_TO_FIREBASE",
    GET_CART_FROM_FIREBASE: "GET_CART_FROM_FIREBASE",
    UPDATE_CART_ITEMS: "UPDATE_CART_ITEMS"
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
    }),
    addCartToFirebase: item => ({
        type: CartActionTypes.ADD_CART_TO_FIREBASE,
        payload: item
    }),
    getCartFromFirebase: item => ({
      type: CartActionTypes.GET_CART_FROM_FIREBASE
    }),
    updateCartItems: items => ({
      type: CartActionTypes.UPDATE_CART_ITEMS,
      payload: items
    })
}

export function* clearCartOnSignOut() {
    yield put(actions.clearCart())
}

export function* putCartToFirebase(action) {
  console.log("Put to firebase")
    try {
      const user = firebase.auth().currentUser;
      if(user) {
      const userId = user.uid;
      const usersRef = firestore.collection("users").doc(userId);
      const newCart = action.payload;
      
      yield usersRef.update({cart: newCart});
      } else {
        console.log('No user')
      }

    } catch(error) {
      console.log("Cart.saga: 95 --> ", error)
    }
}

export function* takeCartFromFirebase() {
  try {
    const user = firebase.auth().currentUser;
    if(user) {
      const userId = user.uid;
      const usersRef = firestore.collection("users").doc(userId);
    
      const cart = yield usersRef.get();
      yield put(actions.updateCartItems(cart.data().cart))
  } else {
      console.log('No user')
    }
  } catch(error) {
    console.log("Cart.saga: 106 --> ", error)
  }
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* onAddingItemToFirebase() {
  yield takeLatest(CartActionTypes.ADD_CART_TO_FIREBASE, putCartToFirebase)
}

export function* onGetCartFromFirebase() {
  yield takeLatest(CartActionTypes.GET_CART_FROM_FIREBASE, takeCartFromFirebase)
}

export function* cartSaga() {
    yield all([
      call(onSignOutSuccess),
      call(onAddingItemToFirebase),
      call(onGetCartFromFirebase)
    ])
}
