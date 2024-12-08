
import React,{createContext, useContext, useState} from "react";

const StateContext = createContext();

export default function ContextProvider({children}) {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);


    return (
        <StateContext.Provider
            value={{
                loading,setLoading,
                user,setUser
            }}
        >

            {loading?<></>:children}
        </StateContext.Provider>
    )
}

export function useStateContext() {
    return useContext(StateContext)
}
