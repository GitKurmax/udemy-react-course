import React from 'react';
import { connect } from 'react-redux';

import { actions as cartActions } from '../../redux/cart/cart.saga';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={() => itemCount ? toggleCartHidden() : !!itemCount}>
    <ShoppingIcon className='shopping-icon' />
  <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
   toggleCartHidden: () => dispatch(cartActions.toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);