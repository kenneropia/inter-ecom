import { useState, createContext, useContext } from "react";
import {
  login as userLogin,
  logOut as userLogout,
  getUser,
} from "../context/utils";

function useAuth() {
  const [user, setUser] = useState({});
  // Login updates the user data with a name parameter
  const login = async (loginForm: { password: string; email: string }) => {
    const user = await userLogin(loginForm);
    setUser(user);
  };

  // Logout updates the user data to default
  const logout = () => {
    userLogout();
    setUser({});
  };
  const UserContext = createContext({ user, login, logout, getUser });
  return useContext(UserContext);
}

export default useAuth;
