import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
  });
  const login = (role) => {
    setAuth({ isAuthenticated: true, role });
  };
  const logout = () => {
    setAuth({ isAuthenticated: false, role: null });
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
