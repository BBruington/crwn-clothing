import { initializeApp } from 'firebase/app';
//you need your own config for your data
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut
} from 'firebase/auth';

import {
    getFirestore, 
    doc, //allows you to retrieve docs from firestorm database
    getDoc, //check data
    setDoc,    // update data
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

const googleProvider = new GoogleAuthProvider();

  //aka you need an account to continue
googleProvider.setCustomParameters({
    prompt: "select_account",
});

//getAuth checks data from doc
export const auth = getAuth();
//auth is only way to authorize permission to crud -heh-

export const signInWithGooglePopup = 
() => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = 
() => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); //used to access database
  //points directly to app database

export const createUserDocumentFromAuth = async (
      userAuth, 
      additionalInformation = {}
) => {
    if (!userAuth) return; 

    const userDocRef = doc(db, 'users', userAuth.uid);
    //looks at the db, checks the users collections, then
    //one's unique id

    const userSnapshot = await getDoc(userDocRef);
    //getDoc checks the data of userDocRef

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        //we know when users are signing in

        try {
            //setDoc creates the data into the doc
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt, 
                ...additionalInformation
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

export  const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export  const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);