import React, { useState, createContext } from "react";

export const ValidAuth = createContext(null);

const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState({
    isLoggedin: false,
    isloggedout: false,
  });
  return (
    <ValidAuth.Provider value={{ account, setAccount }}>
      {children}
    </ValidAuth.Provider>
  );
};

export default AuthProvider;
