import { createContext, useReducer } from "react";

const initialState = {
  searchText: '',
  searchImg: '',
  isAuthenticated: false,
  role: "GUEST", // Add role to initial state
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user, role } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user, role };
    }
    case "LOGIN": {
      const { user, role } = action.payload;
      return { ...state, isAuthenticated: true, user, role };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null, role: "GUEST" };
    }
    case "REGISTER": {
      const { user, role } = action.payload;
      return { ...state, isAuthenticated: true, user, role };
    }
    default:
      return state;
  }
};

const LayoutTopBarContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const LayoutTopBarProvider = ({ children }) => {  

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <LayoutTopBarContext.Provider value={{ ...state }}>
            {children}
        </LayoutTopBarContext.Provider>
    );
};

export default LayoutTopBarContext;