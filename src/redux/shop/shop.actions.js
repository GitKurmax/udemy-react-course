import { ShopActionTypes } from './shop.types';
import { queryCollections } from '../../firebase/firebase.queries'

export const getCollections = () => {
    return async (dispatch) => {
        const data = await queryCollections();
        dispatch(setCollections(data))
    }
};

export const setCollections = (payload) => ({
    type: ShopActionTypes.SET_COLLECTIONS,
    payload
});