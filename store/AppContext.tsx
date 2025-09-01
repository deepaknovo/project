import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

// Define types for state
type State = {
  
  apiData: any[];
};

type Action =
  | { type: "SET_API_DATA"; payload: any[] }


// Initial state
const initialState: State = {

  apiData: [],
 
};

// Reducer
function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_API_DATA":
      return { ...state, apiData: action.payload };
    default:
      return state;
  }
}

// Context type
type AppContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
