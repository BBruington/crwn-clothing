import { createContext, useState } from "react";


//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null, //init currentUser as null
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);//init the value as null
    const value = { currentUser, setCurrentUser }; //generate the value going into the context


    //value = {value} is holding our contextual values
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    //the provider will wrap around any parts that 
    //need the context inside
}
