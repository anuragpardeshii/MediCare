import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://medi-care-dds6.vercel.app/api/auth/checkauth", {
          withCredentials: true,
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        // Suppress 401 errors (user is not logged in)
        if (err.response && err.response.status === 401) {
          setUser(null);
        } else {
          // Log other errors
          console.error("Error checking authentication:", err);
        }
      }
    };

    checkAuth();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.post("https://medi-care-dds6.vercel.app/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);