import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollections } from '../../redux/shop/shop.actions';

const FetchCollections = ({children}) => {
    const download = useSelector(state => state.shop.download);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCollections());
    })

    return (
        download && <div>{children}</div>
    )
}

export default FetchCollections;