import { takeLatest, put } from 'redux-saga/effects';
import { queryCollections } from '../../firebase/firebase.queries';

const INITIAL_STATE = {
    collections: null,
    download: false
  };
  
export  const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_COLLECTIONS': 
      return {
        ...state,
        collections: action.payload,
        download: true
      }
    default:
      return state;
  }
};

export const ShopActionTypes = {
    FETCH_COLLECTIONS_START: 'GET_COLLECTIONS',
    SET_COLLECTIONS: 'SET_COLLECTIONS'
}

export const actions = {
    getCollections: () => ({type: ShopActionTypes.FETCH_COLLECTIONS_START}),
    setCollections: (payload) => ({type: ShopActionTypes.SET_COLLECTIONS, payload})
}


export function* fetchCollectionsAsync() {
    try {
        let data =  yield queryCollections();
        console.log(data)
        yield put(actions.setCollections(data));
    } catch (error){
        console.log(error.message)
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}