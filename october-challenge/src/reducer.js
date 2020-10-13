export const initialState = {
    darkMode: false,
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DARK_MODE":
        return { ...state, darkMode: !state.darkMode };
      default:
        return state;
    }
  };
  export default reducer;