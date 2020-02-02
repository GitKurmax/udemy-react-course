import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/CollectionItem';

import { CollectionPageContainer, Title, ItemsContainer } from './collection-styles';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection[0];
  
  return (
    <CollectionPageContainer>
      <Title>{title}</Title>
      <ItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} width='100%'/>
        ))}
      </ItemsContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);