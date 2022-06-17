import { AnyAction } from "redux";

import { signInFailed, signUpFailed, signOutSuccess, signInSuccess, signOutFailed } from "./user.action";
  
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

  const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
  };
  
  //you can ...state to return unchanged keys/values
  //since useReducer returns a new object
export const userReducer = (state = INITIAL_STATE, action: AnyAction ) => {
  
  if(signInSuccess.match(action)) {
    return {...state, currentUser: action.payload };
  }

  if(signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;    
};

