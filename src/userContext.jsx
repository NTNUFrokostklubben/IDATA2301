import { createContext } from "react";


export const UserContext = createContext({
    user:{},
    handleLogin: function (User){},
});