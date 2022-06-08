import { USER_ACTION_TYPES } from "./user.types";

import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => 
    createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user );
    //dispatch can pull which reducers you want to use and call them
