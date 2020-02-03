import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollections } from '../../redux/shop/shop.actions';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import CollectionPage from '../collection/collection';

const ShopPage = ({ match }) => {
  const download = useSelector(state => state.shop.download);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollections());
}, [download])

  return (
    download && (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
    )
  );
}

export default ShopPage;