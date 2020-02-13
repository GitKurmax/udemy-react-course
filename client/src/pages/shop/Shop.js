import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/shop/shop.saga';
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
    dispatch(actions.getCollections())
}, [download])

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={!download} {...props}/>}/>
      <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={!download} {...props}/>} />
    </div>
  );
}

export default ShopPage;