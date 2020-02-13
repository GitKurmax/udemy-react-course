import React from 'react';
import compose from 'redux'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import WithSpinner from '../../components/with-spinner/with-spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from './CollectionsOverview';

const mapStateToProps = createStructuredSelector({
    isLoading: state.shop.download
  });


 export default connect(mapStateToProps)(WithSpinner(CollectionsOverview, true))
