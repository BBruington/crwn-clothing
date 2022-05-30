import { initializeApp } from 'firebase/app';
//you need your own config for your data
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    ProviderId, 
} from 'firebase/auth';

import {
    getFirestore, 
    doc, //allows you to retrieve docs from firestorm database
    getDoc, 
    setDoc,    
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBrizqAlm9CLet5ovlVbYVQiZkUV_axKsU",
    authDomain: "crwn-clothing-db-d2dbc.firebaseapp.com",
    projectId: "crwn-clothing-db-d2dbc",
    storageBucket: "crwn-clothing-db-d2dbc.appspot.com",
    messagingSenderId: "906879502450",
    appId: "1:906879502450:web:e5e5ed0dfd618189579aeb"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  //aka you need an account to continue
  provider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);


    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch (e) {
            console.log('error creating user', e.message);
        }
    }
    return userDocRef;

    //if userdata exists 

    //then return userDocRef



    //if userdata !exists

    //then create / set the document with the data from userAuth
    //in my collection
  };