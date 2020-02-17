import React, { useState, useContext } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown'; 
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { actions as userActions } from '../../redux/user/user.saga';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { CartContext } from '../../providers/cart/cart.provider'

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = ({ currentUser, signOut }) => {
  
  const { hidden } = useContext(CartContext);
  
return (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={() => signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      )}
        <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
)}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(userActions.signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
