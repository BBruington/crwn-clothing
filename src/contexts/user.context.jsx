import { createContext, useEffect, useReducer } from "react";

import {createAction} from "../utils/reducer/reducer.utils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null, //init currentUser as null
});

//this is storing reducer types to be used
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

//you can ...state to return unchanged keys/values
//since useReducer returns a new object
const userReducer = (state, action) => {

  //payload stores the value needed to know how to update the object
  //aka what you are setting in the reducer
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};


export const UserProvider = ({ children }) => {
  //i can immediately pull {currentUser} from state
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user ));
    //dispatch can pull which reducers you want to use and call them
  };

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

/* 
                   -current-
const useReducer = (state, action) => {
  return {
    currentUser:
  }
}
//reducers are functions that return a new object
*/
