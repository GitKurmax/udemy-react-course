import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => {
    console.log(shop.collections)
    return shop.collections
  }
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => {
      console.log(collections.filter(collection => collection.title.toLowerCase() === collectionUrlParam))
      return  collections.filter(collection => collection.title.toLowerCase() === collectionUrlParam)
    }
  );