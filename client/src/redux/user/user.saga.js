import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
  } from '../../firebase/firebase.utils';
  

const INITIAL_STATE = {
    currentUser: null,
    error: null
  };
  
export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UserActionTypes.SIGN_IN_SUCCESS:
        return {
          ...state,
          currentUser: action.payload,
          error: null
        };
      case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          currentUser: null,
          error: null
        };
      case UserActionTypes.SIGN_IN_FAILURE:
      case UserActionTypes.SIGN_OUT_FAILURE:
      case UserActionTypes.SIGN_UP_FAILURE:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
};
  
export const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',
    SIGN_OUT_START: 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
    SIGN_UP_START: 'SIGN_UP_START',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'
}

export const actions = {
    googleSignInStart: () => ({
        type: UserActionTypes.GOOGLE_SIGN_IN_START
    }),
    signInSuccess: user => ({
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: user
    }),
    signInFailure: error => ({
        type: UserActionTypes.SIGN_IN_FAILURE,
        payload: error
    }),
    emailSignInStart: emailAndPassword => ({
        type: UserActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPassword
    }),
    checkUserSession: () => ({
        type: UserActionTypes.CHECK_USER_SESSION
    }),
    signOutStart: () => ({
        type: UserActionTypes.SIGN_OUT_START
    }),
    signOutSuccess: () => ({
        type: UserActionTypes.SIGN_OUT_SUCCESS
    }),
    signOutFailure: error => ({
        type: UserActionTypes.SIGN_OUT_FAILURE,
        payload: error
    }),
    signUpStart: userCredentials => ({
        type: UserActionTypes.SIGN_UP_START,
        payload: userCredentials
    }),
    signUpSuccess:({ user, additionalData }) => ({
        type: UserActionTypes.SIGN_UP_SUCCESS,
        payload: { user, additionalData }
    }),
    signUpFailure: error => ({
        type: UserActionTypes.SIGN_UP_FAILURE,
        payload: error
    })
}

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
      const userRef = yield call(
        createUserProfileDocument,
        userAuth,
        additionalData
      );
      const userSnapshot = yield userRef.get();
      yield put( actions.signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
      sessionStorage.setItem('session', 'user')
    } catch (error) {
      console.log("Error --> " + error)
      yield put(actions.signInFailure(error));
    }
  }
  
  export function* signInWithGoogle() {
    try {
      const { user } = yield auth.signInWithPopup(googleProvider);
      // console.log('User --> ', user)
      yield getSnapshotFromUserAuth(user);
    } catch (error) {
      yield put(actions.signInFailure(error));
    }
  }
  
  export function* signInWithEmail({ payload: { email, password } }) {
    try {
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield getSnapshotFromUserAuth(user);
    } catch (error) {
      yield put(actions.signInFailure(error));
    }
  }
  
  export function* isUserAuthenticated() {
    try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) return;
      yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
      yield put(actions.signInFailure(error));
    }
  }
  
  export function* signOut() {
    try {
      yield auth.signOut();
      yield put(actions.signOutSuccess());
    } catch (error) {
      yield put(actions.signOutFailure(error));
    }
  }
  
  export function* signUp({ payload: { email, password, displayName } }) {
    try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(actions.signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
      yield put(actions.signUpFailure(error));
    }
  }
  
  export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
  }
  
  export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
  }
  
  export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
  }
  
  export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
  }
  
  export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
  }
  
  export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
  }
  
  export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
  }
  
  export function* userSagas() {
    yield all([
      call(onGoogleSignInStart),
      call(onEmailSignInStart),
      // call(isUserAuthenticated),
      call(onSignOutStart),
      call(onSignUpStart),
      call(onSignUpSuccess),
      call(onCheckUserSession)
    ]);
  }