import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddlware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from '../redux/root-saga';

import rootReducer from './root-reducer';

const sagaMiddlware = createSagaMiddlware();

const middlewares = [sagaMiddlware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddlware.run(rootSaga);

export const persistor = persistStore(store);
