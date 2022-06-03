import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null, //init currentUser as null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //init the value as null
  const value = { currentUser, setCurrentUser }; //generate the value going into the context

  //bc getAuth (aka user) persists user between refreshes,
  //we can force sign out when the app mounts
  // signOutUser();

  //this function runs when you mount AND when auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  //value = {value} is holding our contextual values
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  //the provider will wrap around any parts that
  //need the context inside
};
