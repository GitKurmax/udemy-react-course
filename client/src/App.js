import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import ShopPage from './pages/shop/Shop';
import HomePage from './pages/homepage/HomePage';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { actions as shopActions } from './redux/shop/shop.saga';
import { actions as userActions } from './redux/user/user.saga';

import CheckoutPage from './pages/checkout/checkout';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import { CartContext } from './providers/cart/cart.provider';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    }
  }
  unsubscribeFromAuth = null;
  
  componentDidMount() {
    const { checkUserSession, getCollections } = this.props;
    
    this.setState({
      cartItems: this.context.cartItems
    });
    // getCollections();    
    checkUserSession();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.context.cartItems.length !== prevState.cartItems.length) {
      this.setState({
        cartItems: this.context.cartItems
      });
    }
  }

  render() {
    return (
      <>
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/shop" component={ShopPage}/>
            <Route exact path='/checkout' render={() => this.state.cartItems.length ? <CheckoutPage />: <Redirect to='/shop' /> }/>
            <Route exact path="/signin" render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage /> }/>
          </Switch>     
        </Router>
      </>
    );
  }
}

App.contextType = CartContext;

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(userActions.checkUserSession()),
  getCollections: () => dispatch(shopActions.getCollections())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
