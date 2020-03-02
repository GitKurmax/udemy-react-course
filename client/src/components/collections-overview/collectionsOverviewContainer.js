import WithSpinner from '../../components/with-spinner/with-spinner';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from './CollectionsOverview';

const mapStateToProps = createStructuredSelector({
    isLoading: state.shop.download
  });


 export default connect(mapStateToProps)(WithSpinner(CollectionsOverview, true))
