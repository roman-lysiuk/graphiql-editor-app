/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable no-alert */

import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { IUserState, initialState } from './store/userSlice';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    const e = err as Error;
    // console.error(err);
    alert(e.message as string);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  let user: IUserState = initialState;
  try {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const usr = userCredential.user;
      user = { id: usr.uid, token: usr.refreshToken, email: usr.email as string };
    });
  } catch (err) {
    const e = err as Error;
    // console.error(err);
    alert(e.message as string);
  }
  return user;
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  let user: IUserState = initialState;
  try {
    console.log(auth, email, password);
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const usr = userCredential.user;
      user = { id: usr.uid, token: usr.refreshToken, email: usr.email as string };
    });
  } catch (err) {
    const e = err as Error;
    // console.error(err);
    alert(e.message as string);
  }
  return user;
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    const e = err as Error;
    // console.error(err);
    alert(e.message as string);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
