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

  // validates the token, asking the API for the user profile
  const validateToken = async (token) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch("/api/v1/user/profile", requestOptions);
      const data = await response.json();

      if (!data.status) {
        if (data.message.includes("Token is not valid")) {
          console.error("Token is not valid");
          return false;
        }
        console.error("API request returned an error: ", data.errors);
        return false;
      }

      // Token is valid
      return true;
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, user, setUser, validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
