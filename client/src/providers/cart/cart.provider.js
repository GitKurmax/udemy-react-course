import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as CartActions } from '../../redux/cart/cart.saga';

import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal
} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const currentUser = useSelector(state => state.user.currentUser);
  const cartItemsFromFirestore = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();

  const addItem = item => {
      return setCartItems(addItemToCart(cartItems, item))
    };

  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
  const toggleHidden = () => setHidden(!hidden);
  const clearItemFromCart = item =>
    setCartItems(filterItemFromCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
  }, [cartItems]);

  useEffect(() => {
    dispatch(CartActions.addCartToFirebase(cartItems));
  },[cartItems])

  useEffect(() => {
    setCartItems(cartItemsFromFirestore);
  },[cartItemsFromFirestore])

  useEffect(() => {
    if(currentUser) {
      dispatch(CartActions.getCartFromFirebase());
    }
  }, [currentUser])

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;