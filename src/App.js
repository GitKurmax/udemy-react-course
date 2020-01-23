import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ShopPage from './pages/shop/Shop';
import HomePage from './pages/homepage/HomePage';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          
          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log("currentUser: " + this.state.currentUser)
        });
      } else {
        this.setState({currentUser: userAuth})
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <>
        <Router>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/shop" component={ShopPage}/>
            <Route path="/signin" component={SignInAndSignUpPage}/>
          </Switch>     
        </Router>
      </>
    );
  }
  
}

export default App;
