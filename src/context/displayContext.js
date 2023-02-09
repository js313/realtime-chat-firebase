import { createContext, useReducer } from "react";

export const DisplayContext = createContext();
export const DisplayContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    sidebar: false,
  };

  const displayReducer = (state, action) => {
    if (action.type === "TOGGLE_SIDEBAR") {
      return { ...state, sidebar: !state.sidebar };
    }
  };

  const [state, dispatch] = useReducer(displayReducer, INITIAL_STATE);

  return (
    <DisplayContext.Provider value={{ data: state, dispatch }}>
      {children}
    </DisplayContext.Provider>
  );
};
