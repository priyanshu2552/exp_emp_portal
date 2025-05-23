import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// contexts/UserContext.js
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!token || !storedUser) return;

      const role = storedUser.role;
      const endpoint =
        role === "admin"
          ? "http://localhost:5000/api/admin/dashboard"
          : "http://localhost:5000/api/employee/dashboard";

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
