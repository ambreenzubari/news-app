const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_COUNTRY":
            return {
                ...state,
                country: action.payload
            };
       
            default:
                return state;
    }
}

export default AppReducer;