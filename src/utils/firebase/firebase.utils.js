// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
  getAuth, 
  // signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
 } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // snapshotEqual,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgDfaIXHv3O1svD81wzY_SPFC5w8cvVLY",
  authDomain: "tiara-clothing-db.firebaseapp.com",
  projectId: "tiara-clothing-db",
  storageBucket: "tiara-clothing-db.appspot.com",
  messagingSenderId: "406956304114",
  appId: "1:406956304114:web:225d22fe4c5da360e2126b"
};

// Initialize Firebase
//const firebaseApp = initializeApp(firebaseConfig); -- solve varaible defined but not used warning
initializeApp(firebaseConfig);

// google auth provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

//db, initialize fireStore
export const db = getFirestore();

//create user db record from google auth
export const createUserDocumentFromAuth = async (userAuth, addtionalInformation = {}) => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);//an instance of document
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {//if user not exist, try create this document

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addtionalInformation,
      });
    } catch (error) {
      console.log('error creating the user with google auth', error.message);
    }

  }
  
  return userDocRef;
} 

//interface layer aka helper function

//create a funtion wrapping create a userAuth account firebase method.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

//create a function to wraping sign in with email and password
export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password); 
}