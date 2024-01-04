import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Assuming userData is an object containing user information
    setUser(userData);
  };

  const logout = () => {
    // Clear user data on logout
    setUser(null);
  };

  return (
    //provider is a component provided by react context api. used to wrap components that need to access to the context
    //value pro defines values that will be exposed to components within provider's subtree
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
