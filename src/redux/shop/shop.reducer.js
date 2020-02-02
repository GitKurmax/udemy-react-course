const INITIAL_STATE = {
  collections: [],
  download: false
};

const shopReducer = (state = INITIAL_STATE, action) => {
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

export default shopReducer;