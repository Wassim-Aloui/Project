import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State variable that stors the authentication token
  const [token, setToken] = useState(null);
  
   // Function to update the authentication token when a user logs in
  const login = (newToken) => {
    setToken(newToken);
    console.log('Token in aithcontext:', newToken);
  };

   // Function to clear the authentication token when a user logs out
  const logout = () => {
    setToken(null);
  };
// Provide the AuthContext and its associated values to the components
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
