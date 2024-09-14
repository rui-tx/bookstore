import { useState, useEffect } from "react";

import AuthContext from "../AuthContext";

const getLocalStorageIsLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

const getLocalStorageUser = () => {
  const user = localStorage.getItem("user");
  return localStorage.getItem("user") ? JSON.parse(user) : [];
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(getLocalStorageIsLoggedIn());
  const [user, setUser] = useState(getLocalStorageUser());

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
