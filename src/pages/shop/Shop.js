import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollections } from '../../redux/shop/shop.actions';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import CollectionPage from '../collection/collection';
import WithSpinner from '../../components/with-spinner/with-spinner';

const CollectionPageWithSpinner = WithSpinner(CollectionPage);
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);


const ShopPage = ({ match }) => {
  const download = useSelector(state => state.shop.download);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCollections());
}, [download])

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={!download}/>} />
      <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={!download} {...props}/>} />
    </div>
  );
}

export default ShopPage;