import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { CollectionItemElem, BackgroundImageElem, CollectionFooter, StyledButton } from './collectio-item.styles';

const CollectionItem = ({ item, addItem, width}) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemElem width = {width}>
      <BackgroundImageElem url={imageUrl}/>
      <CollectionFooter>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </CollectionFooter>
      <StyledButton onClick={() => addItem(item)} inverted>
        Add to cart
      </StyledButton>
    </CollectionItemElem>
  );
};

const mapDispatchToProps = dispatch => ({
   addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);