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
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
  // snapshotEqual,
} from 'firebase/firestore';

import { Category } from "../../store/categories/categories.types";//to form Category[]

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

export type ObjectToAdd = {
  title: string //reading the function below we know each object at lease contains a title
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string, 
  objectsToAdd: T[]
): Promise<void> => {
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
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);//cast type
}

export type AddtionalInformation = {
  displayName?: string; //????? redundant
}

export type UserData = { // userd for user reducer as well
  displayName: string;
  email: string;
  createAt: Date;
}

//create user db record from google auth
//not User != UserData, the former is fireback auth object/ the latter is what we use in redux
export const createUserDocumentFromAuth = async (
  userAuth: User, 
  addtionalInformation = {} as AddtionalInformation
):Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);//an instance of document
  const userSnapshot = await getDoc(userDocRef);//QuerySnapshot

  if (!userSnapshot.exists()) {//if user not exist, try create this document

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addtionalInformation,//redundant? 
      });
    } catch (error) {
      console.log('error creating the user with google auth', error);
    }

  }
  
  return userSnapshot as QueryDocumentSnapshot<UserData>;//return if not catched nowhere
} 

//interface layer 

//create a helper funtion to wrap createUserWithEmailAndPassword.
export const createAuthUserWithEmailAndPassword = async (
  email:string, 
  password:string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

//create a helper function to wrapsignInWithEmailAndPassword.
export const SignInAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password); 
}

//create a helper function to wrap signOut 
export const signOutUser = async () => await signOut(auth);

//create a helper function to observe CurrentUser
//open listener -- permanent runs
//if observed auth state changed ( userAuth=null/exist), run callback
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

//getCurrentUser function ? - saga