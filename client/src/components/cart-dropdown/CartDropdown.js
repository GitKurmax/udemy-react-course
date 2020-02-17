import React, { useContext } from 'react';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/CartItem';

import { withRouter } from 'react-router-dom';

import { CartContext  } from '../../providers/cart/cart.provider';

import './cart-dropdown.styles.scss';

const CartDropdown = ({history}) => {
  const { cartItems, toggleHidden } = useContext(CartContext);

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <CustomButton onClick={() => {
          history.push('/checkout');
          toggleHidden();
      }}>GO TO CHECKOUT</CustomButton>
    </div>
  )
}

export default withRouter(CartDropdown);
