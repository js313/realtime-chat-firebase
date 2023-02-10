import { createContext, useReducer } from "react";

export const DisplayContext = createContext();
export const DisplayContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    sidebar: window.innerWidth < 600 ? 0 : 1,
    input: false,
  };

  const displayReducer = (state, action) => {
    if (action.type === "TOGGLE_SIDEBAR") {
      return {
        ...state,
        sidebar: state.sidebar === 0 ? 22 : window.innerWidth < 600 ? 0 : 1,
      };
    }
  };

  const [state, dispatch] = useReducer(displayReducer, INITIAL_STATE);

  return (
    <DisplayContext.Provider value={{ data: state, dispatch }}>
      {children}
    </DisplayContext.Provider>
  );
};
