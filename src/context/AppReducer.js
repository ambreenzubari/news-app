const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
