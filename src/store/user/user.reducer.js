//this is our reducer

import { USER_ACTION_TYPES } from "./user.types";
  
  const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
  };
  
  //you can ...state to return unchanged keys/values
  //since useReducer returns a new object
export const userReducer = (state = INITIAL_STATE, action ) => {
  
    //payload stores the value needed to know how to update the object
    //aka what you are setting in the reducer
    const { type, payload } = action;
  
    switch (type) {
      case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
        return {...state, currentUser: payload, };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
          return { ...state, currentUser: null };
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
          return { ...state, error: payload };
        default:
          return state;
          //the root reducer will run all reducers so 
          //default needs to return state if a specific one goes unused
      }
    };

