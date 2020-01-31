import SHOP_DATA from './shop.data';

const INITIAL_STATE = {
  collections: [1],
  download: false
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_COLLECTIONS': 
    return {
      ...state,
      collections: action.payload,
     }
    default:
      return state;
  }
};

export default shopReducer;