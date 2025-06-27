import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopupk,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUHZP2I2VFFq0YfGT6RrKkGKjz1s1hXko",
  authDomain: "crwn-clothing-db-d6c7b.firebaseapp.com",
  projectId: "crwn-clothing-db-d6c7b",
  storageBucket: "crwn-clothing-db-d6c7b.firebasestorage.app",
  messagingSenderId: "799052792332",
  appId: "1:799052792332:web:b59320060d113ea53f6429",
};

const firebassApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

  
  //id user data does nto exist
  // create / set the document with the data from userAuth is my collection

  // if user data exist
  
  // return userDocRef
};

export default createUserDocumentFromAuth;
