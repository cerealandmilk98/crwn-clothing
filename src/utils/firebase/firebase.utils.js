import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCUHZP2I2VFFq0YfGT6RrKkGKjz1s1hXko",
  authDomain: "crwn-clothing-db-d6c7b.firebaseapp.com",
  projectId: "crwn-clothing-db-d6c7b",
  storageBucket: "crwn-clothing-db-d6c7b.appspot.com", // fixed .app → .appspot.com
  messagingSenderId: "799052792332",
  appId: "1:799052792332:web:b59320060d113ea53f6429",
};

// ✅ Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// ✅ Setup Google provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// ✅ Auth & Sign-in functions
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// ✅ Firestore
export const db = getFirestore();

// ✅ Create user doc
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  
  return await createAuthUserWithEmailAndPassword(auth, email, password);
}