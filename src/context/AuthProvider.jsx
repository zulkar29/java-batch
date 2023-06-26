import * as React from "react";
import * as Auth from "../utils/auth";
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState(null);
  let history = useNavigate();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("bjitToken");
      const user = window.localStorage.getItem("bjitUser");
      if (token) {
        setToken(token);
      }
      if (user) {
        setUser(JSON.parse(user));
      }
      setIsLoading(false);
    }
  }, []);

  const login = React.useCallback(async ({ email, password }) => {


    setIsLoading(true);
    try {
      const user = await Auth.login({ email, password });
      setUser(user?.user);
      setToken(user?.access_token);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("bjitToken", user?.access_token);
        window.localStorage.setItem("bjitUser", JSON.stringify(user?.user));
      }
      history('/');

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setError(error || "Something went wrong");
      setIsLoading(false);
    }
  }, []);

  const register = () => {}; // register the user
  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bjitToken");
      window.localStorage.removeItem("bjitUser");
    }
    history('/login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isError,
        error,
        login,
        logout,
        register,
      }}
      {...props}
    />
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

// const UserProvider = (props) => (
//   <UserContext.Provider value={useAuth().user} {...props} />
// );

// const useUser = () => React.useContext(UserContext);
