import { createContext, useEffect, useReducer } from "react";
import { useAxios } from "app/hooks/useAxios";

// CUSTOM COMPONENT
import { MatxLoading } from "app/components";

const initialState = {
  user: null,
  isInitialized: false,
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

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { apiNonAuth } = useAxios()

  const login = async (username, password, rememberMe) => {
    try{
      const response = await apiNonAuth.post(`/login/validate`, { username:username, password:password, rememberMe:rememberMe })
      if(response.status===200){
        const { user, token, role } = response.data;
        localStorage.setItem('token', token)
        dispatch({ type: "LOGIN", payload: { user, role } });
        return {status: response.status, data: role}
      }
    }
    catch(error){
      return {status: error.response.status, data: error.response.data}
    }
    // const { user, token, role } = { user: {name: 'damitha'}, token: 'token', role: 'ADMIN' };
    
  };

  // const login = async (email, password) => {
  //   console.log(password)
  //   const response = await axios.post("/api/auth/login", { email, password });
  //   const { user, token, role } = response.data;

  //   localStorage.setItem('token', token)

  //   dispatch({ type: "LOGIN", payload: { user, token, role } });
  // };


  const register = async (data) => {
    try {
      const response = await apiNonAuth.post("/signup/user", data);
      if (response.status === 201) {
        const { user, token, role, message } = response.data;
        localStorage.setItem('token', token);
        dispatch({ type: "REGISTER", payload: { user, role } });
        return { status: response.status, data: message };
      }
    } catch (error) {
      return {
        status: error.response?.status,
        data: error.response?.data
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
        const token = localStorage.getItem('token');
        if(token){
          await apiNonAuth.get(`/login/profile`, {headers: {'Authorization':`Bearer ${token}`}})
            .then((res) => {
              if(res.status===200){
                const { user, role } = res.data
                dispatch({ type: "INIT", payload: { isAuthenticated: true, user: user, role: role } });
              }
            })
            .catch((err) => {
              dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null, role: "GUEST" } });
            });
        }else{
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null, role: "GUEST" } });
          localStorage.removeItem('token')
        }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
