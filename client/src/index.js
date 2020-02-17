import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor }  from './redux/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import CartProvider from './providers/cart/cart.provider'


ReactDOM.render(
    <Provider store={store}>
        <CartProvider>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </CartProvider>
    </Provider>
    ,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
