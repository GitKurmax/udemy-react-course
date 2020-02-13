import { firestore } from './firebase.utils';

export const queryCollections = async () => {
    let collectionsArray = [];
    let docRef = await firestore.collection("collections").get();

    docRef.docs.forEach(querySnapshot => collectionsArray.push(querySnapshot.data()))
    return collectionsArray
}