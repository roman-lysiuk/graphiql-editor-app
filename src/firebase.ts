/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
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
  apiKey: 'AIzaSyDA-RF3yn2rnhikYzrA9IKzWYH5V33QYwE',
  authDomain: 'graphiql-9c957.firebaseapp.com',
  projectId: 'graphiql-9c957',
  storageBucket: 'graphiql-9c957.appspot.com',
  messagingSenderId: '542539761661',
  appId: '1:542539761661:web:1c85728b879649c68b7b94',
  measurementId: 'G-504BK7RGRZ',
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
    // console.error(err);
    // alert(err.message);
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
    // console.error(err);
    // alert(err.message);
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
    // console.error(err);
    // alert(err.message);
  }
  return user;
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    // console.error(err);
    // alert(err.message);
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
