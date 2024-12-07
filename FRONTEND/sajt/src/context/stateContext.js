
import React,{createContext, useContext, useState} from "react";

const StateContext = createContext();

export default function ContextProvider({children}) {

    const [loading, setLoading] = useState(false);



    return (
        <StateContext.Provider
            value={{
                loading,setLoading,
            }}
        >

            {loading?<></>:children}
        </StateContext.Provider>
    )
}

export function useStateContext() {
    return useContext(StateContext)
}
