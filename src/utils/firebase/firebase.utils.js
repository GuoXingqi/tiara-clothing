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
  signOut,
  onAuthStateChanged,
 } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  //returns a collection reference even if it does not exist in our db yet
  const collectionRef = collection(db, collectionKey);
  //craete a batch to prepare documents to write
  const batch = writeBatch(db);//similar to a atomic transaction 
  //generating documents for each objects in objectsToAdd
  objectsToAdd.forEach((object) => {
    const DocRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(DocRef, object);
  });

  await batch.commit();  
  console.log('donebatch');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}

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

//interface layer 

//create a helper funtion to wrap createUserWithEmailAndPassword.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

//create a helper function to wrapsignInWithEmailAndPassword.
export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password); 
}

//create a helper function to wrap signOut 
export const signOutUser = async () => await signOut(auth);

//create a helper function to observe CurrentUser
//open listener -- permanent runs
//if observed auth state changed ( userAuth=null/exist), run callback
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);