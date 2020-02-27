import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';
import ErrorBoundary from './components/error-boundary/error-boundary';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { actions as shopActions } from './redux/shop/shop.saga';
import { actions as userActions } from './redux/user/user.saga';

import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

import { CartContext } from './providers/cart/cart.provider';

const HomePage = lazy(() => import('./pages/homepage/HomePage'));
const ShopPage = lazy(() => import('./pages/shop/Shop'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    }
  }
  componentDidMount() {
    const { checkUserSession } = this.props;

    this.setState({
      cartItems: this.context.cartItems
    });
    
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
          <Header />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner/>}>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route exact path='/checkout' render={() => this.state.cartItems.length ? <CheckoutPage /> : <Redirect to='/shop' />} />
                <Route exact path="/signin" render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
              </Suspense>
            </ErrorBoundary>
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
