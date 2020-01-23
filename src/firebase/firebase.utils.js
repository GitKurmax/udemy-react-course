import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAV9uKGin-HJl5oIT13wgSO-ogLnyHtN98",
    authDomain: "udemy-frontend-db.firebaseapp.com",
    databaseURL: "https://udemy-frontend-db.firebaseio.com",
    projectId: "udemy-frontend-db",
    storageBucket: "udemy-frontend-db.appspot.com",
    messagingSenderId: "602299322544",
    appId: "1:602299322544:web:4374042c61a26422a0ab75",
    measurementId: "G-JYG5TCBMLC"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;