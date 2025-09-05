import React, { createContext, useContext, useState } from "react";

// ✅ Create context
const UserContext = createContext();

// ✅ Provider component
export const UserProvider = ({ children }) => {
  // Load user immediately from localStorage when context initializes
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  // ✅ Login → update state + save to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout → clear state + localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook to use context
export const useUser = () => useContext(UserContext);

export { UserContext };
