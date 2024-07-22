import { Children, useReducer } from "react"
import AppReducer from "./AppReducer"
import AppContext from "./AppContext"

const initialState ={
    country:     { name: "Austria", value: "at" }
}

const AppProvider =({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider