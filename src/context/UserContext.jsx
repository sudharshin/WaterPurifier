import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { refreshToken as apiRefreshToken } from "../services/api"; // import your refresh API

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  // ✅ Login → set user + store in localStorage
  const login = (userData) => {
    const userWithTimestamp = {
      ...userData,
      tokenIssuedAt: Date.now(),
    };
    setUser(userWithTimestamp);
    localStorage.setItem("user", JSON.stringify(userWithTimestamp));
  };

  // ✅ Logout → clear user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.error("Session expired or user logged out manually.");
  };

  // ✅ Refresh token automatically
  const refreshToken = useCallback(async () => {
    try {
      if (!user || !user.refreshToken) return;

      const newTokens = await apiRefreshToken(user.refreshToken);

      // 🛑 If backend says session = 1 → terminate immediately
      if (newTokens?.session === 1) {
        console.error("Backend session expired. Logging out user.");
        logout();
        return;
      }

      // ✅ If refresh successful → update tokens and timestamp
      if (newTokens && newTokens.data?.accessToken) {
        const updatedUser = {
          ...user,
          accessToken: newTokens.data.accessToken,
          refreshToken: user.refreshToken,
          tokenIssuedAt: Date.now(),
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        console.error("Invalid refresh token response. Logging out user.");
        logout();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  }, [user]);

  // ✅ Check for 1-hour session timeout (currently set to 5 minutes for testing)
  useEffect(() => {
    if (!user?.tokenIssuedAt) return;

    const checkSession = () => {
      const now = Date.now();
      const elapsed = now - user.tokenIssuedAt;
      const oneHour = 60 * 60 * 1000; // change to 60 * 60 * 1000 for actual 1 hour

      if (elapsed >= oneHour) {
        console.error("Session exceeded allowed duration. Logging out user.");
        logout();
      }
    };

    const interval = setInterval(checkSession, 60 * 1000); // check every 1 minute
    return () => clearInterval(interval);
  }, [user]);

  // ✅ Automatically refresh token every 1 minute (change to 14 min in production)
  useEffect(() => {
    if (!user || !user.accessToken) return;

    const interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000); // 1 min for testing; use 14 * 60 * 1000 in prod

    return () => clearInterval(interval);
  }, [user, refreshToken]);

  return (
    <UserContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook
export const useUser = () => useContext(UserContext);

export { UserContext };
