import { initializeApp } from 'firebase/app';
//you need your own config for your data
import { 
    getAuth, 
//this tracks the auth that
// uses sign ins and persists it between refreshes

    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore, 
    doc, //allows you to retrieve docs from firestorm database
    getDoc, //check data
    setDoc,    // update data
    collection, 
    writeBatch, 
    query, 
    getDocs,
    // QuerySnapshot, 
} from 'firebase/firestore' //what governs our database

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

                         //adding shop-data.js objects
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
        //aka set that location and set it with the value of the object
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'catagories');
                            //put in a db and the collection key; 'catagories'
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    //     .reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {}); 
    
    // return categoryMap;
    //THIS WAS MOVED TO category.selector.js
}

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

    return userSnapshot;

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

//when auth changes aka user changes, use this callback
export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};