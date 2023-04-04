import { createContext, useEffect, useReducer } from "react";
// import axios from "axios";

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false,
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    case "REGISTER": {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (username) => {
    // const response = await axios.post("/api/auth/login", { email, password });
    // const { user } = response.data;
    localStorage.setItem("username", username);
    dispatch({ type: "LOGIN", payload: { username } });
  };

  const register = async (username) => {
    // const response = await axios.post("/api/auth/register", {
    //   email,
    //   username,
    //   password,
    // });
    // const { user } = response.data;

    localStorage.setItem("username", username);
    dispatch({ type: "REGISTER", payload: { username } });
  };

  const logout = () => {
    localStorage.removeItem("username");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        // const { data } = await axios.get("/api/auth/profile");
        console.log(localStorage.getItem("username"), "dataa________");
        if (localStorage.getItem("username")) {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user: localStorage.getItem("username"),
            },
          });
        } else {
          throw new Error("not login");
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return "Loading-----";

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
