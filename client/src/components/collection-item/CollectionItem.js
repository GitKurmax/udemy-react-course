import React, { useContext } from 'react';
import { CartContext } from '../../providers/cart/cart.provider';

import { CollectionItemElem, BackgroundImageElem, CollectionFooter, StyledButton } from './collectio-item.styles';

const CollectionItem = ({ item, width}) => {
  const { name, price, imageUrl } = item;
  const { addItem } = useContext(CartContext);

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

export default CollectionItem;